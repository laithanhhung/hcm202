const fs = require('fs');
const path = require('path');

const projectPath = __dirname;

try {
    // 1. UI.jsx
    const uiPath = path.join(projectPath, 'src', 'components', 'UI.jsx');
    let ui = fs.readFileSync(uiPath, 'utf8');

    ui = ui.replace(/\/textures\//g, '/images/');

    const picStart = ui.indexOf('const pictures = [');
    const picEnd = ui.indexOf('];', picStart) + 2;
    if (picStart !== -1 && picEnd !== -1) {
        const newPictures = `const pictures = Array.from({length: 16}, (_, i) => \`\${i + 1}.png\`);`;
        ui = ui.substring(0, picStart) + newPictures + ui.substring(picEnd);
    } else {
        console.log("pictures array not found");
    }

    const pageStart = ui.indexOf('export const pages = [');
    const pageEndMatch = 'back: "Chủ Tịch Hồ Chí Minh",\n});';
    let pageEnd = ui.indexOf(pageEndMatch);

    // Try alternate format with windows line endings
    if (pageEnd === -1) {
        const pageEndMatchWin = 'back: "Chủ Tịch Hồ Chí Minh",\r\n});';
        pageEnd = ui.indexOf(pageEndMatchWin);
        if (pageEnd !== -1) {
            pageEnd += pageEndMatchWin.length;
        }
    } else {
        pageEnd += pageEndMatch.length;
    }

    if (pageStart !== -1 && pageEnd !== -1) {
        const newPages = `export const pages = [];
for (let i = 0; i < pictures.length; i += 2) {
  pages.push({
    front: pictures[i],
    back: pictures[i + 1] ? pictures[i + 1] : 'back'
  });
}
pages.push({
  front: '16.png',
  back: 'back'
});
`;
        ui = ui.substring(0, pageStart) + newPages + ui.substring(pageEnd);
    } else {
        console.log("pages logic not found");
    }
    fs.writeFileSync(uiPath, ui);

    // 2. Book.jsx
    const bookPath = path.join(projectPath, 'src', 'components', 'Book.jsx');
    let book = fs.readFileSync(bookPath, 'utf8');
    book = book.replace(/\/textures\//g, '/images/');
    fs.writeFileSync(bookPath, book);

    // 3. index.css
    const cssPath = path.join(projectPath, 'src', 'index.css');
    let css = fs.readFileSync(cssPath, 'utf8');
    css = css.replace(/\/textures\//g, '/images/');
    fs.writeFileSync(cssPath, css);

    console.log("Replacement completed successfully.");
} catch(e) {
    console.error(e);
}
