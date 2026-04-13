import { atom, useAtom } from "jotai";
import { useEffect, useState, useRef } from "react";

const pictures = Array.from({length: 17}, (_, i) => `${i + 1}.png`);

export const pageAtom = atom(0);
export const bookOpenAtom = atom(false);
export const contentSectionAtom = atom(0);
export const staticViewAtom = atom(false);
export const lockViewAtom = atom(false);
export const fixedPoseAtom = atom(false);
export const sidebarOpenAtom = atom(false);
export const voiceVolumeAtom = atom(1.0);
export const voiceSpeedAtom = atom(1.0);
export const isMutedAtom = atom(false);

// Nội dung cho từng trang - mỗi trang có thể có nhiều phần
const pageContents = {
  0: {
    title: "Chủ quyền trong ta",
    sections: [
      {
        content: "Hành trình bước ra thế giới.\nThực hiện: Nhóm 4.\nMôn học: HCM202."
      }
    ]
  },
  1: {
    title: "Mục lục & Lời mở đầu",
    sections: [
      {
        content: "Mục lục\n\n01 Quan niệm về Độc lập dân tộc.\n02 Độc lập thực chất.\n03 Độc lập gắn liền với Tự do và Hạnh phúc.\n04 Chủ quyền Quốc gia.\n05 Bài học tự chủ.\n06 Cá nhân tự chủ.\n07 Tự chủ trong kỷ nguyên số.\n08 Trích nguồn."
      },
      {
        content: "Lời mở đầu\n\nHành trình ra đi tìm đường cứu nước của lãnh tụ vĩ đại Hồ Chí Minh là hành trình mang ý nghĩa lịch sử và thời đại, gắn liền với khát vọng vươn lên của dân tộc Việt Nam. Từ hình ảnh Bác Hồ ra đi tìm đường cứu nước tại bến cảng Nhà Rồng, một quyết định đầy dũng cảm và tầm nhìn, tư tưởng về độc lập, tự do đã được hun đúc và lan tỏa qua nhiều thế hệ. Hành trình ấy không chỉ dừng lại ở việc giành lại độc lập dân tộc, mà còn mở ra con đường cho mỗi cá nhân tự chủ, phát triển bản thân trong một thế giới hội nhập. Ngày nay, hình ảnh một thanh niên Việt Nam hiện đại tự tin trên đấu trường quốc tế chính là sự tiếp nối tinh thần ấy. Đó là minh chứng cho việc chuyển hóa lý tưởng lớn lao thành động lực cá nhân, góp phần khẳng định vị thế của Việt Nam trên bản đồ thế giới."
      }
    ]
  },
  2: {
    title: "Quan niệm về Độc lập",
    sections: [
      {
        content: "Quan niệm về Độc lập dân tộc\n\nQuyền thiêng liêng và bất khả xâm phạm\nLịch sử dựng và giữ nước của dân tộc Việt Nam từ ngàn xưa đến nay đã gắn liền với truyền thống yêu nước, đấu tranh chống giặc ngoại xâm. Điều đó đã thể hiện niềm khát khao to lớn của dân tộc ta về nền độc lập dân tộc, tự do liên thiêng, bất hủ mà Chủ tịch Hồ Chí Minh chính là hiện thân cho tinh thần ấy.\n\nNăm 1919, nhân dịp các nước đồng minh thắng trận trong chiến tranh thế giới thứ nhất họp Hội Nghị Versailes (Pháp), thay mặt cho những người yêu nước, Hồ Chí Minh đã gửi tới bản hội nghị những yêu sách của nhân dân An Nam, gồm 8 điểm với 2 nội dung chính là đòi quyền bình đẳng về mặt pháp lý và đòi các quyền tự do, dân chủ cho nhân dân Đông Dương. Bản yêu sách không được hội nghị chấp nhận, nhưng sự kiện trên đã cho thấy lần đầu tiên tư tưởng Hồ Chí Minh về quyền của các dân tộc thuộc địa, mà trước hết là quyền bình đẳng và tự do, đã được hình thành."
      },
      {
        content: "\"Không có gì quý hơn độc lập, tự do\"\n\nTừ những nền móng đã được dựng nên, tư tưởng của Hồ Chí Minh về độc lập dân tộc tiếp tục được phát huy và bồi dưỡng qua từng năm, tiếp tục được phát huy như trong Chánh cương vắn tắt của Đảng (1930), Hồ Chí Minh đã quán triệt mục tiêu chính trị của Đảng gồm: (1) Đánh đổ chủ nghĩa đế quốc và chủ nghĩa phong kiến; (2) Làm cho Việt Nam được hoàn toàn độc lập. Và cả trong Tuyên ngôn độc lập năm 1945, thay mặt Chính phủ lâm thời, Hồ Chí Minh trịnh trọng tuyên bố trước quốc dân, đồng bào, thế giới rằng: \“Nước Việt Nam có quyền được hưởng tự do và độc lập, và sự thực đã thành một nước tự do và độc lập. Toàn thể dân Việt Nam quyết đem tất cả tinh thần và lực lượng, tính mệnh và của cải để giữ vững quyền tự do và độc lập ấy\".\n\nÝ chí và quyết tâm ấy tiếp tục được nở rộ lên trong 2 cuộc chiến tranh chống Pháp và đế quốc Mỹ xâm lược. Như trong cuộc kêu gọi Liên Hợp Quốc năm 1946, người đã nói rằng: \“Nhân dân chúng tôi thành thật mong muốn hòa bình, nhưng nhân dân chúng tôi cũng kiên quyết đấu tranh đến cùng để bảo vệ những quyền thiêng liêng nhất: toàn vẹn lãnh thổ cho Tổ quốc và độc lập cho đất nước.” Vào ngày 19/12/1946 ra lệnh hiệu triệu: “Không! Chúng ta thà hy sinh tất cả, chứ nhất quyết không chịu mất nước, không chịu làm nô lệ.” Năm 1965, “Chiến tranh cục bộ” được triển khai, Hồ Chí Minh không nao núng mà nêu ra một chân lý thời đại, một tuyên ngôn bất hủ chứng minh tinh thần sắt đá của ngài: “Không gì quý hơn độc lập, tự do.\”"
      }
    ]
  },
  3: {
    title: "Độc lập thực chất",
    sections: [
      {
        content: "Không chỉ là hình thức\n\nTrong quá trình xâm lược, thực dân, đế quốc thường hay dùng chiêu trò mị dân, thành lập các chính quyền bù nhìn bản xứ, tuyên truyền cái được gọi là “độc lập tự do giả hiệu”, muốn dùng chiêu bài này để hợp pháp hóa sự trở lại, chia rẽ khối đoàn kết dân tộc, và làm giảm sự ủng hộ đối với Chính phủ Việt Nam Dân chủ Cộng hòa do Hồ Chí Minh đứng đầu. Ví dụ như:\n\n- Hiệp định sơ bộ 6/3/1946: Pháp ký hiệp định công nhận Việt Nam là một \"quốc gia tự do\" nằm trong Liên bang Đông Dương thuộc khối Liên hiệp Pháp.\n- Nội dung giả hiệu: Pháp \"trả lại\" độc lập trên giấy tờ nhưng vẫn kiểm soát trực tiếp các lĩnh vực quan trọng như quân đội (quân đội Liên hiệp Pháp vẫn hoạt động), tài chính và ngoại giao. Chính quyền Bảo Đại thực chất chỉ là một chính phủ tay sai, không có quyền lực thực sự.\n- Bản chất mị dân: Đây là độc lập giả hiệu vì Việt Nam vẫn nằm trong hệ thống thuộc địa của Pháp; Pháp vẫn giữ quyền ngoại giao, quân sự và kinh tế. Mục đích thực sự là để đưa quân ra miền Bắc thay thế quân Tưởng và hợp thức hóa hành động xâm lược.\n- Tạo dựng chính quyền bù nhìn: Pháp tìm cách tách Bảo Đại ra khỏi Chính phủ VNDCCH, ký kết các Hiệp định Vịnh Hạ Long (1947, 1948) và Hiệp định Élysée (1949) để thành lập \"Quốc gia Việt Nam\" do Bảo Đại làm Quốc trưởng."
      },
      {
        content: "Theo Chủ tịch Hồ Chí Minh, độc lập dân tộc phải là độc lập thật sự, hoàn toàn và triệt để trên các lĩnh vực. Trên cơ sở nghiên cứu các cuộc cách mạng tiêu biểu của thế giới đã giúp Hồ Chí Minh rút ra những bài học kinh nghiệm đối với cách mạng Việt Nam rằng: “Chúng ta đã hy sinh làm cách mệnh, thì nên làm cho đến nơi...”. Có nghĩa là đấu tranh cho quyền độc lập, tự do của dân tộc thì đó phải là độc lập, tự do thực sự, hoàn toàn, triệt để. Người khẳng định: “Độc lập nghĩa là chúng tôi điều khiển lấy mọi công việc của chúng tôi, không có sự can thiệp ở ngoài vào”\n\n“VIỆT NAM HOÀN TOÀN THỐNG NHẤT VÀ ĐỘC LẬP, CÓ QUỐC HỒI RIÊNG, CHÍNH PHỦ RIÊNG, QUÂN ĐỘI RIÊNG, NGOẠI GIAO RIÊNG, KINH TẾ VÀ TÀI CHÍNH RIÊNG”."
      }
    ]
  },
  4: {
    title: "Tự do và Hạnh phúc",
    sections: [
      {
        content: "Theo Hồ Chí Minh, độc lập dân tộc phải gắn liền với tự do của nhân dân. Người đánh giá cao học thuyết Tam dân của Tôn Trung Sơn về độc lập và tự do, dân tộc độc lập, dân quyền tự do và dân sinh hạnh phúc.\n\nBằng lý lẽ của mình, Chủ tịch Hồ Chí Minh khẳng định người dân Việt Nam xứng đáng nhận được sự tự do về quyền lợi và bình đẳng qua: “Người ta sinh ra tự do và bình đẳng về quyền lợi, và phải luôn được tự do và bình đẳng về quyền lợi... Đó là những lẽ phải không ai chối cãi được.”\n\nTrong Chánh cương vắn tắt của Đảng (1930) cũng đã xác định mục tiêu rõ ràng, đó là: “Làm cho nước Nam được độc lập... Thủ tiêu hết các thứ quốc trái... Thâu hết ruộng đất của đế quốc chủ nghĩa làm của công chia dân cày nghèo. Bỏ sưu thuế cho dân cày nghèo. Thi hành luật làm ngày 8 giờ.”\n\nĐiều này càng được chứng tỏ rõ ràng hơn. Sau Cách Mạng tháng 8, năm 1945. Người nói: “Nước độc lập mà dân không được hưởng hạnh phúc tự do, thì độc lập cũng chẳng có ý nghĩa gì.”"
      },
    ]
  },
  5: {
    title: "Chủ quyền & Tự chủ",
    sections: [
      {
        content: "Chủ quyền quốc gia - Nhân dân là người làm chủ\n\nKế thừa tư tưởng “Dân là chủ”, mỗi cá nhân ngày nay cần chuyển hóa quyền làm chủ quốc gia thành năng lực và trách nhiệm làm chủ chính bản thân mình. Hồ Chí Minh từng nhấn mạnh rằng: “Một dân tộc không tự lực cánh sinh mà cứ ngồi chờ dân tộc khác giúp đỡ thì không xứng đáng được độc lập”. Trong kỷ nguyên hội nhập, bài học về tư duy độc lập, tự chủ và tinh thần tự cường của Người trở thành kim chỉ nam để mỗi cá nhân rèn luyện để trở thành những công dân toàn cầu.\n\n\"NƯỚC TA LÀ NƯỚC DÂN CHỦ, ĐỊA VỊ CAO NHẤT LÀ DÂN, VÌ DÂN LÀ CHỦ\""
      },
      {
        content: "Bài học tự chủ - Nhân dân là người làm chủ\n\nTư tưởng Hồ Chí Minh về sự tự chủ và tự lực cánh sinh là sợi chỉ đỏ xuyên suốt con đường cứu nước và giữ nước của dân tộc Việt Nam. Đây là bài học về việc phát huy tối đa nội lực để quyết định vận mệnh của chính mình. Trong suốt cuộc đời hoạt động cách mạng, Hồ Chí Minh luôn nêu cao khẩu hiệu: \"Tự lực cánh sinh, dựa vào sức mình là chính\".\n\nNgười khẳng định rằng độc lập dân tộc chỉ có thể bền vững khi nó được giành lấy và bảo vệ bởi chính sức mạnh của toàn dân. Dù sự giúp đỡ quốc tế là quan trọng, nhưng nội lực dân tộc mới là nhân tố quyết định thành công. Nếu bản thân không có thực lực, không nỗ lực vươn lên thì sự giúp đỡ bên ngoài cũng trở nên vô ích. Người nhấn mạnh: \"Phải có thực lực, thực lực là cái chiêng, ngoại giao là cái tiếng, chiêng có to tiếng mới lớn\"."
      }
    ]
  },
  6: {
    title: "Cá nhân & Kỷ nguyên số",
    sections: [
      {
        content: "Cá nhân tự chủ - Bài học từ sự khổ luyện của Bác\n\nHồ Chí Minh là biểu tượng ngời sáng của một cá nhân tự chủ, luôn có ý chí, nghị lực phi thường để vượt qua mọi nghịch cảnh. Trong hành trình cứu nước, Người không ngại dấn thân vào gian khổ, làm đủ mọi nghề để kiếm sống và hoạt động cách mạng: từ phụ bếp, dọn tuyết, quét lò đến làm vườn, bồi bàn hay thợ sửa ảnh. Dù trong cảnh túng quẫn hay khi bị giam cầm trong ngục tù, Người vẫn giữ vững tinh thần lạc quan và ý chí kiên cường\n\nVới phương châm \"Chỉ có khổ học mới thành công\", Người đã tự học qua cả sách vở lẫn thực tiễn cuộc sống tại các cường quốc hàng đầu thế giới:\n\nNgoại ngữ: Người thông thạo nhiều thứ tiếng như Pháp, Anh, Trung Quốc, Nga... để trực tiếp nghiên cứu tinh hoa văn hóa nhân loại.\n\nTri thức: Người dành thời gian tại các thư viện lớn như Thư viện Quốc gia Pháp, Sorbonne hay các kho lưu trữ tại Anh và Nga để trau dồi lý luận."
      },
      {
        content: "Tự chủ trong kỷ nguyên số - Thách thức của thế hệ mới\n\nTrong kỷ nguyên số đầy biến động, việc rèn luyện bản lĩnh tự chủ là sứ mệnh sống còn để thế hệ trẻ khẳng định vị thế của người chủ tương lai của đất nước. Theo tư tưởng Hồ Chí Minh, tự chủ bắt đầu từ tư duy độc lập, sáng tạo và tinh thần \"tự lực cánh sinh\", không ỷ lại mà phải chủ động chiếm lĩnh tri thức để \"tự giúp lấy mình\" trước khi đợi người khác giúp. Thách thức lớn nhất hiện nay không chỉ là sự bùng nổ công nghệ mà còn là cuộc đấu tranh cam go chống lại \"giặc nội xâm\" – chính là chủ nghĩa cá nhân, lối sống thực dụng và sự lười biếng đang dễ dàng lan tỏa trong môi trường ảo. Để không bị cuốn trôi, mỗi bạn trẻ cần kiên trì tu dưỡng đạo đức suốt đời, thực hiện phương châm \"học đi đôi với hành\" và biết gạn đục khơi trong để tiếp thu tinh hoa nhân loại mà vẫn giữ vững bản sắc văn hóa dân tộc. Chính sự tự chủ dựa trên nền tảng đạo đức và trí tuệ ấy sẽ tạo nên một thế hệ \"vừa hồng, vừa chuyên\", đủ sức đưa Việt Nam vững bước trong tiến trình hội nhập và phát triển"
      }
    ]
  },
  7: {
    title: "Tài liệu & Tuổi trẻ",
    sections: [
      {
        content: "Thông điệp tuổi trẻ\n\n\"TUỔI TRẺ LÀ TUỔI CỦA TƯƠNG LAI. MUỐN CÓ TƯƠNG LAI RẠNG RỠ PHẢI NẮM LẤY BẰNG CHÍNH Ý CHÍ VÀ NGHỊ LỰC CỦA BẢN THÂN\"."
      },
      {
        content: "Nguồn trích dẫn\n\nDuiker, W. J. (2000). HỒ CHÍ MINH - CHÂN DUNG MỘT CUỘC ĐỜI (Nguyễn Học & L. H. Mạnh, Trans.). thuviensach.vn."
      }
    ]
  },
  8: {
    title: "Ghi chú & Lời kết",
    sections: [
      {
        content: "Ghi chú\n\nTài liệu phục vụ mục đích nghiên cứu học thuật và lưu hành nội bộ"
      },
      {
        content: "Lời kết\n\nHành trình bước ra thế giới - Nhóm 4\n\nXin cảm ơn đồng đội và giảng viên đã đồng hành cùng tôi trên chặng đường này. Cuốn sách là một sản phẩm thể hiện sự tri ân và tự hào sâu sắc."
      }
    ]
  },
  9: {
    title: "Hoàn thành",
    sections: [
      {
        content: "Đây là điểm kết thúc của cuốn sách Chủ Quyền Trong Ta. Xin chân thành cảm ơn!"
      }
    ]
  }
};

export const pages = [];
for (let i = 0; i < pictures.length; i += 2) {
  pages.push({
    front: pictures[i],
    back: pictures[i + 1] ? pictures[i + 1] : 'back'
  });
}


// Component hiển thị nội dung trang
const PageContent = ({ pageNumber, isOpen }) => {
  const content = pageContents[pageNumber] || pageContents[0];
  const [isMobile, setIsMobile] = useState(false);
  const [currentSection, setCurrentSection] = useAtom(contentSectionAtom);
  const [sidebarOpen, setSidebarOpen] = useAtom(sidebarOpenAtom);
  const [, setBookOpen] = useAtom(bookOpenAtom);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Reset section khi chuyển trang
  useEffect(() => {
    setCurrentSection(0);
  }, [pageNumber, setCurrentSection]);

  if (!isOpen) return null;

  const sections = content.sections || [];
  const currentContent = sections[currentSection] || sections[0];
  const hasNextSection = currentSection < sections.length - 1;
  const hasPrevSection = currentSection > 0;

  // Debug
  console.log("Debug mobile content:", {
    content,
    sections,
    currentSection,
    currentContent,
    hasNextSection,
    hasPrevSection,
  });

  // Mobile layout: content ở dưới màn hình
  if (isMobile) {
    return (
      <div className="fixed bottom-0 left-0 right-0 h-[50vh] bg-gradient-to-t from-black/90 to-black/50 backdrop-blur-sm z-50 flex flex-col">
        {/* Scrollable content area */}
        <div className="flex-1 overflow-y-auto scrollbar-hide mobile-scroll-container">
          <div className="text-white p-4 pb-2 min-h-full">
            <h2 className="text-2xl font-bold mb-4 break-words">
              {content.title}
            </h2>
            {currentContent?.image && (
              <img
                src={currentContent.image}
                alt="Minh hoạ"
                className="w-full max-h-60 object-contain rounded-lg mb-3 bg-white/5"
                onError={(e) => {
                  e.currentTarget.onerror = null;
                  e.currentTarget.src =
                    "https://via.placeholder.com/800x450?text=No+Image";
                }}
              />
            )}
            <p className="text-base leading-relaxed break-words whitespace-pre-line">
              {currentContent?.content ||
                content.sections?.[0]?.content ||
                "Không có nội dung"}
            </p>
          </div>
        </div>

        {/* Fixed navigation buttons */}
        {sections.length > 1 && (
          <div className="flex justify-between items-center p-4 pt-2 gap-2 bg-gradient-to-t from-black/80 to-transparent">
            <button
              className={`px-3 py-2 rounded-lg text-sm transition-all duration-300 ease-out
                ${
                  hasPrevSection
                    ? "bg-white/20 text-white hover:bg-white/30 shadow-md hover:shadow-lg backdrop-blur-md border border-white/10 hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-white/40"
                    : "bg-gray-500/20 text-gray-400 cursor-not-allowed opacity-60"
                }`}
              onClick={() => {
                if (hasPrevSection) setCurrentSection(currentSection - 1);
              }}
              disabled={!hasPrevSection}
            >
              ← Phần trước
            </button>

            <span className="text-sm text-white/70">
              {currentSection + 1}/{sections.length}
            </span>

            <button
              className={`px-3 py-2 rounded-lg text-sm transition-all duration-300 ease-out
                ${
                  hasNextSection
                    ? "bg-white/20 text-white hover:bg-white/30 shadow-md hover:shadow-lg backdrop-blur-md border border-white/10 hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-white/40"
                    : "bg-gray-500/20 text-gray-400 cursor-not-allowed opacity-60"
                }`}
              onClick={() => {
                if (hasNextSection) setCurrentSection(currentSection + 1);
              }}
              disabled={!hasNextSection}
            >
              Phần sau →
            </button>
          </div>
        )}
      </div>
    );
  }

  // Desktop layout: content ở bên trái
  return (
    <div className="fixed left-0 top-0 h-full w-[35%] bg-[#FDFBF7] shadow-[10px_0_20px_rgba(0,0,0,0.05)] z-40 pointer-events-auto flex flex-col transform transition-transform duration-700 ease-in-out font-serif hidden md:flex">
      {/* Nút đóng lồng trong Sidebar */}
      <button
        className="absolute top-4 right-4 text-gray-400 font-sans hover:text-[#8b5a2b] transition-colors p-2 rounded-full hover:bg-[#8b5a2b]/10 text-sm font-medium flex items-center justify-center z-50 cursor-pointer"
        onClick={() => setSidebarOpen(false)}
        title="Đóng nội dung"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
      </button>

      {/* Vùng cuộn văn bản */}
      <div className="flex-1 overflow-y-auto p-8 md:p-12 w-full flex flex-col custom-scrollbar">
        <h2 className="text-3xl md:text-4xl font-bold mb-6 text-left break-words text-[#5c4033] border-b-2 border-[#d2b48c] pb-4 pr-6">
          {content.title}
        </h2>
        {currentContent?.image && (
          <img
            src={currentContent.image}
            alt="Minh hoạ"
            className="w-full max-h-64 object-contain rounded-lg mb-6 shadow-sm border border-gray-200"
            onError={(e) => {
              e.currentTarget.onerror = null;
              e.currentTarget.src =
                "https://via.placeholder.com/800x450?text=No+Image";
            }}
          />
        )}
        <p className="text-lg md:text-xl leading-relaxed text-left break-words whitespace-pre-line flex-1 text-gray-800">
          {currentContent.content}
        </p>

        {/* Nút chuyển đổi phần */}
        {sections.length > 1 && (
          <div className="flex justify-between items-center mt-8 gap-4 relative z-60">
            <button
              className={`px-5 py-2.5 rounded-lg border text-sm md:text-base font-medium transition-all duration-300 ease-out pointer-events-auto cursor-pointer
                ${
                  hasPrevSection
                    ? "border-[#8b5a2b] text-[#8b5a2b] hover:bg-[#8b5a2b] hover:text-white shadow-sm hover:shadow active:scale-[0.98]"
                    : "border-gray-300 text-gray-400 cursor-not-allowed opacity-60"
                }`}
              onClick={() => {
                if (hasPrevSection) setCurrentSection(currentSection - 1);
              }}
              disabled={!hasPrevSection}
            >
              ← Phần trước
            </button>

            <span className="text-base font-medium text-[#8b5a2b]">
              {currentSection + 1} / {sections.length}
            </span>

            <button
              className={`px-5 py-2.5 rounded-lg border text-sm md:text-base font-medium transition-all duration-300 ease-out pointer-events-auto cursor-pointer
                ${
                  hasNextSection
                    ? "border-[#8b5a2b] text-[#8b5a2b] hover:bg-[#8b5a2b] hover:text-white shadow-sm hover:shadow active:scale-[0.98]"
                    : "border-gray-300 text-gray-400 cursor-not-allowed opacity-60"
                }`}
              onClick={() => {
                if (hasNextSection) setCurrentSection(currentSection + 1);
              }}
              disabled={!hasNextSection}
            >
              Phần sau →
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

// Nút bật/tắt chế độ Cố định: pose/camera mặc định, cho phép xoay/zoom
const FixedPoseToggle = () => {
  const [fixedPose, setFixedPose] = useAtom(fixedPoseAtom);
  return (
    <button
      className={`px-3 py-2 md:px-5 md:py-3 rounded-full transition-all duration-300 text-xs md:text-base min-h-[36px] md:min-h-[40px] min-w-[36px] md:min-w-[44px] flex items-center justify-center shadow-md border border-black/10 ${
        fixedPose
          ? "bg-black text-white hover:bg-black/90"
          : "bg-white/90 text-black hover:bg-white"
      }`}
      onClick={() => setFixedPose(!fixedPose)}
      title={fixedPose ? "Thoát cố định" : "Cố định"}
      aria-pressed={fixedPose}
    >
      {/* Icon mobile */}
      <svg
        className="h-4 w-4 md:hidden"
        viewBox="0 0 24 24"
        fill="currentColor"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M12 2c.552 0 1 .448 1 1v6.586l2.293-2.293a1 1 0 111.414 1.414L12 13l-4.707-4.293a1 1 0 111.414-1.414L11 9.586V3c0-.552.448-1 1-1z" />
        <path d="M5 21a1 1 0 010-2h14a1 1 0 010 2H5z" />
      </svg>
      {/* Text desktop */}
      <span className="hidden md:inline">
        {fixedPose ? "Thoát cố định" : "Cố định"}
      </span>
    </button>
  );
};

export const UI = () => {
  const [page, setPage] = useAtom(pageAtom);
  const [bookOpen, setBookOpen] = useAtom(bookOpenAtom);
  const [sidebarOpen, setSidebarOpen] = useAtom(sidebarOpenAtom);
  const [fixedPose, setFixedPose] = useAtom(fixedPoseAtom);

  // Mở sidebar khi mở sách lần đầu
  useEffect(() => {
    if (bookOpen) setSidebarOpen(true);
  }, [bookOpen, setSidebarOpen]);

  const [bgKey, setBgKey] = useState("1");
  const [audioEnabled, setAudioEnabled] = useState(false);
  const [currentVideo, setCurrentVideo] = useState(null);
  const [videoLoading, setVideoLoading] = useState(false);
  const pageBarRef = useRef(null);

  // Khởi tạo audio và enable sau user interaction
  useEffect(() => {
    const enableAudio = () => {
      setAudioEnabled(true);
      document.removeEventListener("click", enableAudio);
      document.removeEventListener("touchstart", enableAudio);
    };

    document.addEventListener("click", enableAudio);
    document.addEventListener("touchstart", enableAudio);

    return () => {
      document.removeEventListener("click", enableAudio);
      document.removeEventListener("touchstart", enableAudio);
    };
  }, []);

  const outroAudioRef = useRef(null);
  const [outroPlayed, setOutroPlayed] = useState(false);

  useEffect(() => {
    if (!audioEnabled) return;

    const audio = new Audio("/audios/page-flip-01a.mp3");
    audio.volume = 0.3; // Giảm volume để không quá to

    const playAudio = async () => {
      try {
        await audio.play();
      } catch (error) {
        console.log("Audio play failed:", error.message);
        // Không hiển thị error để tránh làm phiền user
      }
    };

    playAudio();
  }, [page, audioEnabled]);

  // Phát nhạc khi tới trang cuối (Mặt sau)
  useEffect(() => {
    if (!audioEnabled) return;

    if (!outroAudioRef.current) {
      outroAudioRef.current = new Audio(
        "/audios/NhucoBacHo_PhamTuyen (mp3cut.net).mp3"
      );
      outroAudioRef.current.volume = 0.6;
    }

    const isLast = page === pages.length;

    if (isLast && !outroPlayed) {
      outroAudioRef.current
        .play()
        .then(() => setOutroPlayed(true))
        .catch((e) => console.log("Outro play failed:", e?.message));
    }

    if (!isLast && outroPlayed) {
      try {
        outroAudioRef.current.pause();
        outroAudioRef.current.currentTime = 0;
      } catch {}
      setOutroPlayed(false);
    }
  }, [page, audioEnabled, outroPlayed]);

  // VOICE OVER LOGIC
  const [voiceVolume, setVoiceVolume] = useAtom(voiceVolumeAtom);
  const [voiceSpeed, setVoiceSpeed] = useAtom(voiceSpeedAtom);
  const [isMuted, setIsMuted] = useAtom(isMutedAtom);
  const voiceAudioRef = useRef(null);

  // Effect 1: Handle page change and play sequence
  useEffect(() => {
    if (!audioEnabled) return;

    const currentAudioPaths = [];
    if (page === 0) {
      currentAudioPaths.push("/audios/1.wav");
    } else {
      currentAudioPaths.push(`/audios/${page * 2}.wav`);
      currentAudioPaths.push(`/audios/${page * 2 + 1}.wav`);
    }

    let isCancelled = false;
    
    const playSequential = async (index) => {
      if (index >= currentAudioPaths.length || isCancelled) return;

      const path = currentAudioPaths[index];
      
      const audio = new Audio(path);
      voiceAudioRef.current = audio;
      
      // Khởi tạo thuộc tính từ atom hiện tại
      audio.volume = voiceVolume;
      audio.playbackRate = voiceSpeed;
      audio.muted = isMuted;

      audio.onended = () => {
        if (!isCancelled) playSequential(index + 1);
      };

      try {
        await audio.play();
        if (isMuted) audio.pause(); // Nếu đang tắt tiếng thì pause ngay (hoặc để volume 0)
      } catch (err) {
        if (!isCancelled) playSequential(index + 1);
      }
    };

    // Stop current audio when page changes
    if (voiceAudioRef.current) {
      voiceAudioRef.current.pause();
      voiceAudioRef.current = null;
    }

    playSequential(0);

    return () => {
      isCancelled = true;
      if (voiceAudioRef.current) {
        voiceAudioRef.current.pause();
        voiceAudioRef.current = null;
      }
    };
  }, [page, audioEnabled]); // CHỈ phụ thuộc vào page và audioEnabled

  // Effect 2: Update audio properties WITHOUT restarting playback
  useEffect(() => {
    if (voiceAudioRef.current) {
      voiceAudioRef.current.volume = voiceVolume;
      voiceAudioRef.current.playbackRate = voiceSpeed;
      voiceAudioRef.current.muted = isMuted;
      
      if (isMuted) {
          voiceAudioRef.current.pause();
      } else if (audioEnabled && voiceAudioRef.current.paused && voiceAudioRef.current.currentTime > 0) {
          voiceAudioRef.current.play().catch(() => {});
      }
    }
  }, [voiceVolume, voiceSpeed, isMuted]);

  // Tự động mở sách khi click vào trang
  const handlePageClick = (pageNumber) => {
    setPage(pageNumber);
    setBookOpen(true);
  };

  // Auto-scroll nút trang đang chọn vào giữa vùng nhìn
  useEffect(() => {
    const container = pageBarRef.current;
    if (!container) return;
    const btn = container.querySelector(`[data-page="${page}"]`);
    if (btn && typeof btn.scrollIntoView === "function") {
      btn.scrollIntoView({
        behavior: "smooth",
        inline: "center",
        block: "nearest",
      });
    }
  }, [page]);

  return (
    <>
      {/* Video background */}
      {currentVideo && (
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          className={`fixed inset-0 w-full h-full object-cover z-[-1] transition-opacity duration-500 ${
            videoLoading ? "opacity-0" : "opacity-100"
          }`}
          onLoadStart={() => {
            console.log("Video loading:", currentVideo);
            setVideoLoading(true);
          }}
          onCanPlay={() => {
            console.log("Video can play:", currentVideo);
            // Delay để đảm bảo video load xong
            setTimeout(() => setVideoLoading(false), 300);
          }}
          onError={(e) => {
            console.log("Video error:", e, currentVideo);
            setVideoLoading(false);
          }}
        >
          <source src={currentVideo} type="video/mp4" />
        </video>
      )}

      {/* Loading overlay */}
      {videoLoading && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[-1] flex items-center justify-items-center">
          <div className="text-white text-lg">Đang tải video...</div>
          <div className="text-red-800 text-lg">
            Bạn có thể về lại Lăng Bác rồi qua map khác để tải video
          </div>
        </div>
      )}

      <main className="pointer-events-none select-none z-10 fixed inset-0 flex justify-between flex-col overflow-x-hidden">
        <a className="pointer-events-auto mt-10 ml-10" href="">
          {/* <img
            className="w-20 max-w-full"
            src="/images/wawasensei-white.png"
            alt="WAWA SENSEI"
          /> */}
        </a>
        {/* Switch background options - dropdown top-center removed */}


        <div className={`pointer-events-auto flex justify-center pb-4 md:pb-6 mt-auto relative z-60 transition-all duration-700 ease-in-out ${sidebarOpen ? 'w-full md:w-[65%] md:ml-auto' : 'w-full'}`}>
          <div className="bg-white/95 backdrop-blur-md rounded-xl shadow-2xl px-4 py-2.5 flex items-center gap-4 md:gap-7 border border-gray-100/50">
            {/* Nội dung (Toggle Sidebar) */}
            <div className="flex items-center border-r border-gray-200 pr-4 md:pr-7">
              <button 
                title={sidebarOpen ? "Đóng nội dung" : "Mở nội dung"}
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className={`transition-all duration-300 flex items-center gap-2 px-2 py-1.5 rounded-lg font-medium text-sm md:text-base ${
                  sidebarOpen 
                    ? "text-blue-600 bg-blue-50/80" 
                    : "text-gray-500 hover:text-gray-800 hover:bg-gray-50"
                }`}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path></svg>
                <span className="hidden md:inline">Nội dung</span>
              </button>
            </div>

            {/* Cố định (Fixed Pose) */}
            <div className="flex items-center border-r border-gray-200 pr-4 md:pr-7">
              <button 
                title={fixedPose ? "Thoát cố định" : "Cố định camera"}
                onClick={() => setFixedPose(!fixedPose)}
                className={`transition-all duration-300 flex items-center gap-2 px-2 py-1.5 rounded-lg font-medium text-sm md:text-base ${
                  fixedPose 
                    ? "text-blue-600 bg-blue-50/80" 
                    : "text-gray-500 hover:text-gray-800 hover:bg-gray-50"
                }`}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill={fixedPose ? "currentColor" : "none"} stroke="currentColor" strokeWidth={fixedPose ? "0" : "2.5"} strokeLinecap="round" strokeLinejoin="round">
                  {fixedPose ? (
                    <>
                      <path d="M12 2c.552 0 1 .448 1 1v6.586l2.293-2.293a1 1 0 111.414 1.414L12 13l-4.707-4.293a1 1 0 111.414-1.414L11 9.586V3c0-.552.448-1 1-1z" />
                      <path d="M5 21a1 1 0 010-2h14a1 1 0 010 2H5z" />
                    </>
                  ) : (
                    <>
                      <path d="M12 2v6.586l2.293-2.293a1 1 0 011.414 1.414L12 13l-4.707-4.293a1 1 0 011.414-1.414L11 9.586V2h1z" />
                      <path d="M5 21h14" />
                    </>
                  )}
                </svg>
                <span className="hidden md:inline">{fixedPose ? "Bỏ cố định" : "Cố định"}</span>
              </button>
            </div>

            {/* Controls group */}
            <div className="flex items-center gap-4">
              {/* Prev */}
              <button 
                title="Trang trước"
                className={`transition-colors flex items-center ${page === 0 ? "text-gray-300 cursor-not-allowed" : "text-gray-500 hover:text-gray-800"}`} 
                onClick={() => page > 0 && handlePageClick(page - 1)}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M11.5 12l8.5 6V6zM2 12l8.5 6V6z"></path></svg>
              </button>
              
              {/* Page indicator */}
              <div className="flex items-center text-sm md:text-base font-bold rounded-lg overflow-hidden shrink-0 mx-1">
                <div className="bg-black text-white px-3 md:px-5 py-1.5 md:py-2 min-w-[3rem] text-center">{page + 1}</div>
                <div className="bg-gray-700 text-gray-200 px-3 md:px-5 py-1.5 md:py-2 min-w-[3rem] text-center">{pages.length + 1}</div>
              </div>
              
              {/* Next */}
              <button 
                title="Trang sau"
                className={`transition-colors flex items-center ${page >= pages.length ? "text-gray-300 cursor-not-allowed" : "text-gray-500 hover:text-gray-800"}`} 
                onClick={() => page < pages.length && handlePageClick(page + 1)}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12.5 12l-8.5-6v12zM22 12l-8.5-6v12z"></path></svg>
              </button>
            </div>

            {/* Audio Controls */}
            <div className="flex items-center gap-3 border-l border-gray-200 pl-4 md:pl-8 ml-2">
              {/* Mute Toggle */}
              <button 
                title={isMuted ? "Bật tiếng" : "Tắt tiếng"} 
                className={`transition-colors p-2 ${isMuted ? "text-red-500" : "text-gray-500 hover:text-gray-800"}`}
                onClick={() => setIsMuted(!isMuted)}
              >
                {isMuted ? (
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M11 5L6 9H2v6h4l5 4V5z"></path><line x1="23" y1="9" x2="17" y2="15"></line><line x1="17" y1="9" x2="23" y2="15"></line></svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M11 5L6 9H2v6h4l5 4V5z"></path><path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path></svg>
                )}
              </button>

              {/* Volume Slider - Hidden on small mobile */}
              <div className="hidden sm:flex items-center gap-2 group relative">
                <input 
                  type="range" 
                  min="0" 
                  max="1" 
                  step="0.01" 
                  value={voiceVolume} 
                  onChange={(e) => setVoiceVolume(parseFloat(e.target.value))}
                  className="w-16 md:w-24 h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-black"
                  title={`Âm lượng: ${Math.round(voiceVolume * 100)}%`}
                />
              </div>

              {/* Speed Selector */}
              <div className="relative group">
                <select 
                  className="bg-transparent text-xs md:text-sm font-bold text-gray-600 hover:text-black cursor-pointer appearance-none outline-none border-none p-1"
                  value={voiceSpeed.toString()}
                  onChange={(e) => setVoiceSpeed(parseFloat(e.target.value))}
                  title="Tốc độ đọc"
                >
                  <option value="0.5">0.5x</option>
                  <option value="0.75">0.75x</option>
                  <option value="1">1.0x</option>
                  <option value="1.25">1.25x</option>
                  <option value="1.5">1.5x</option>
                  <option value="2">2.0x</option>
                </select>
                <div className="absolute -right-1 top-1/2 -translate-y-1/2 pointer-events-none opacity-50">
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor"><path d="M7 10l5 5 5-5z"></path></svg>
                </div>
              </div>
            </div>

            {/* Right tools group */}
            <div className="flex items-center border-l border-gray-200 pl-4 md:pl-6 ml-2">
              {/* Fullscreen */}
              <button title="Toàn màn hình" className="text-gray-500 hover:text-gray-800 transition-colors p-2" onClick={() => {
                if (!document.fullscreenElement) {
                  document.documentElement.requestFullscreen().catch(() => {});
                } else {
                  document.exitFullscreen().catch(() => {});
                }
              }}>
                 <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3"></path></svg>
              </button>
            </div>
          </div>
        </div>
      </main>

      {/* Hiển thị nội dung trang khi sách mở */}
      <PageContent pageNumber={page} isOpen={sidebarOpen} />

      {/* Nút đóng sách (Chỉ hiện trên Mobile) */}
      {sidebarOpen && (
        <button
          className="fixed top-4 right-4 z-[70] bg-white/90 text-black px-3 py-2 rounded-full transition-all duration-300 ease-out text-sm min-h-[44px] min-w-[44px] flex items-center justify-center
          shadow-lg hover:shadow-xl hover:bg-white backdrop-blur-md border border-black/5
          hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98]
          focus:outline-none focus:ring-2 focus:ring-black/20 md:hidden"
          onClick={() => setBookOpen(false)}
        >
          ✕ Đóng
        </button>
      )}
    </>
  );
};
