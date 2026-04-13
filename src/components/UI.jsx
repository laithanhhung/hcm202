import { atom, useAtom } from "jotai";
import { useEffect, useState, useRef } from "react";

const pictures = Array.from({length: 17}, (_, i) => `${i + 1}.png`);

export const pageAtom = atom(0);
export const bookOpenAtom = atom(false);
export const contentSectionAtom = atom(0);
export const staticViewAtom = atom(false);
export const lockViewAtom = atom(false);
export const fixedPoseAtom = atom(false);

// Nội dung cho từng trang - mỗi trang có thể có nhiều phần
const pageContents = {
  0: {
    title: "TƯ TƯỞNG HỒ CHÍ MINH VỀ ĐỘC LẬP DÂN TỘC VÀ CHỦ NGHĨA XÃ HỘI",
    sections: [
      {
        content:
          "Chào mừng bạn đến với cuốn sách về tư tưởng Hồ Chí Minh về độc lập dân tộc và chủ nghĩa xã hội.",
      },
    ],
  },
  1: {
    title:
      "Độc lập, tự do là quyền thiêng liêng, bất khả xâm phạm của tất cả các dân tộc",
    sections: [
      {
        content:
          "Độc lập, tự do là quyền thiêng liêng, bất khả xâm phạm của mọi dân tộc. Từ ngàn xưa, lịch sử Việt Nam gắn liền với truyền thống yêu nước và đấu tranh chống giặc ngoại xâm, thể hiện khát vọng có được nền độc lập và tự do cho nhân dân – một giá trị thiêng liêng mà Hồ Chí Minh luôn hiện thân.\n\n Năm 1919, nhân dịp các nước Đồng minh thắng trận trong Chiến tranh thế giới thứ nhất họp Hội nghị Vécxây (Pháp), thay mặt những người Việt Nam yêu nước, Hồ Chí Minh gửi Bản Yêu sách của nhân dân An Nam tới Hội nghị Vécxây, bao gồm 8 điểm với hai nội dung chính là đời quyền bình đẳng về mặt pháp lý và đòi các quyển tự do, dân chủ của người dân Đông Dương, Bản yêu sách không được Hội nghị chấp nhận nhưng qua sự kiện trên cho thấy lần đầu tiên, tư tưởng Hồ Chí Minh về quyền của các dân tộc thuộc địa mà trước hết là quyền bình đẳng và tự do đã hình thành, thể hiện tư tưởng về quyền dân tộc và quyền con người hình thành từ sớm. ",
      },

      {
        content: `Trong Chánh cương vắn tắt của Đảng (1930), Người xác định mục tiêu chính trị là đánh đổ đế quốc chủ nghĩa Pháp và bọn phong kiến và Làm cho nước Nam hoàn toàn độc lập.

 Trong Tuyên ngôn độc lập 1945, Hồ Chí Minh trịnh trọng tuyên bố Việt Nam có quyền hưởng tự do và độc lập, đồng thời kêu gọi toàn dân quyết tâm bảo vệ nền độc lập đó. Tư tưởng này được cụ thể hóa qua các cuộc kháng chiến chống thực dân Pháp và đế quốc Mỹ, người đã nói với đồng bào và các quốc gia trên thế giới : Nước Việt Nam có quyền hưởng tự do và độc lập, và sự thực đã thành một nước tự do và độc lập. Toàn thể dân Việt Nam quyết đem tất cả tinh thần và lực lượng, tính mệnh và của cải để giữ vững quyền tự do và độc lập ấy. `,
      },
      {
        content: `Trong Lời kêu gọi toàn quốc kháng chiến  19/12/1946 với những lời hiệu triệu nổi tiếng như Khong! Chung ta tha hy sinh tat ca, chu nhat dinh khong chiu mat nuoc, nhat dinh khong chiu lam no le va Khong co gi quy hon doc lap, tu do, tro thanh tuyen ngon bat hu, kich le nhan dan Viet Nam anh dung chien dau, bao ve chu quyen, toan ven lanh tho va quyen dan toc co ban.`,
      },
    ],
  },
  2: {
    title: "Độc lập dân tộc phải gắn liền với tự do, hạnh phúc của nhân dân",
    sections: [
      {
        content:
          " Theo Hồ Chí Minh, độc lập dân tộc phải gắn liền với tự do và hạnh phúc của nhân dân. Người đánh giá cao học thuyết Tam dân của Tôn Trung Sơn về dân tộc độc lập, dân quyền tự do và dân sinh hạnh phúc và khẳng định: dân tộc Việt Nam đương nhiên phải được tự do và bình đẳng về quyền lợi, đó là lẽ phải không ai chối cãi được. Trong Chánh cương vắn tắt của Đảng (1930), Hồ Chí Minh xác định mục tiêu cách mạng là làm cho nước Nam hoàn toàn độc lập, tiêu diệt mọi thứ áp bức, chia ruộng đất cho dân nghèo, bỏ sưu thuế, và bảo đảm quyền lợi lao động. ",
      },
      {
        content:
          " Sau thắng lợi Cách mạng Tháng Tám 1945, Người nhấn mạnh: Nước độc lập mà dân không hưởng hạnh phúc tự do, thì độc lập cũng chẳng có nghĩa lý gì và yêu cầu thực hiện ngay các quyền cơ bản cho dân: có ăn, có mặc, có chỗ ở và được học hành. Suốt đời hoạt động cách mạng, Hồ Chí Minh luôn coi độc lập gắn liền với tự do và hạnh phúc cho nhân dân, bộc bạch tâm huyết: Tôi chỉ có một sự ham muốn tột bậc là làm sao cho nước ta được hoàn toàn độc lập, dân ta được hoàn toàn tự do, đồng bào ai cũng có cơm ăn áo mặc, ai cũng được học hành.,",
      },
    ],
  },
  3: {
    title: "Độc lập dân tộc phải là nền độc lập thật sự, hoàn toàn và triệt để",
    sections: [
      {
        content:
          "Theo Hồ Chí Minh, độc lập dân tộc phải là nền độc lập thật sự, hoàn toàn và triệt để, không thể chỉ là độc lập giả hiệu do thực dân, đế quốc tạo ra thông qua các chính phủ bù nhìn nhằm che đậy bản chất xâm lược và bóc lột. Người nhấn mạnh rằng nền độc lập mà nhân dân không có quyền tự quyết về ngoại giao, không có quân đội riêng, không có tài chính riêng… thì độc lập đó chẳng có ý nghĩa gì. Trên tinh thần này, ngay sau Cách mạng Tháng Tám, trong bối cảnh đất nước gặp nhiều khó khăn và thù trong giặc ngoài, Hồ Chí Minh cùng Chính phủ Việt Nam Dân chủ Cộng hòa đã sử dụng nhiều biện pháp, đặc biệt là ngoại giao, để bảo đảm nền độc lập thật sự của đất nước.",
      },
    ],
  },
  4: {
    title: "Độc lập dân tộc gắn liền với thống nhất và toàn vẹn lãnh thổ",
    sections: [
      {
        content:
          "Trong lịch sử, dân tộc Việt Nam luôn đối mặt với âm mưu xâm lược và chia cắt đất nước. Thực dân Pháp từng chia nước ta thành ba kỳ với chế độ cai trị riêng, sau Cách mạng Tháng Tám, miền Bắc bị quân Tưởng Giới Thạch chiếm đóng, miền Nam bị Pháp xâm lược, và Pháp còn đưa ra Nam Kỳ tự trị nhằm chia cắt đất nước. Trước thực trạng này, Hồ Chí Minh khẳng định: Đồng bào Nam Bộ là dân nước Việt Nam. Sông có thể cạn, núi có thể mòn, song chân lý đó không bao giờ thay đổi. \n\n   Sau Hiệp định Giơnevơ (1954), khi đất nước tạm thời chia cắt hai miền, Người vẫn kiên trì đấu tranh cho thống nhất, nhấn mạnh: Nước Việt Nam là một, dân tộc Việt Nam là một. Trong Di chúc, Hồ Chí Minh bày tỏ niềm tin tuyệt đối vào thắng lợi cách mạng, vào sự thống nhất Tổ quốc và sự sum họp của đồng bào Nam – Bắc. Có thể khẳng định rằng, tư tưởng độc lập dân tộc luôn gắn liền với thống nhất và toàn vẹn lãnh thổ là tư tưởng xuyên suốt trong cuộc đời hoạt động cách mạng của Hồ Chí Minh.",
      },
    ],
  },
  5: {
    title:
      "Cách mạng giải phóng dân tộc muốn thắng lợi phải đi theo con đường cách mạng vô sản",
    sections: [
      {
        content:
          "Khi thực dân Pháp xâm lược, Việt Nam đứng trước vấn đề sống còn là phải đấu tranh giải phóng dân tộc. Các phong trào yêu nước trước đó thất bại do khủng hoảng giai cấp lãnh đạo và đường lối cách mạng. Hồ Chí Minh đi tìm con đường cứu nước ở phương Tây nhưng nhận thấy cách mạng tư sản không giải phóng được dân chúng và thuộc địa, vì vậy Người quyết định lựa chọn con đường cách mạng vô sản sau khi nghiên cứu Cách mạng Tháng Mười Nga 1917 và luận cương của Lênin (1920).",
      },
      {
        content:
          "Theo Hồ Chí Minh, ở các nước thuộc địa như Việt Nam, giải phóng dân tộc phải đi trước, gắn với giải phóng xã hội, giai cấp và con người, khác với con đường ở châu Âu. Sau này Người khẳng định: Muốn cứu nước và giải phóng dân tộc không có con đường nào khác con đường cách mạng vô sản. Đây là con đường cách mạng triệt để nhất phù hợp với yêu cầu của cách mạng Việt Nam và xu thế phát triển của thời đại.  Trong Chánh cương vắn tắt của Đảng (1930), Người xác định chiến lược là làm tư sản dân quyền cách mạng và thổ địa cách mạng để tiến tới xã hội chủ nghĩa, nhưng đặt giải phóng dân tộc, đánh đổ đế quốc lên hàng đầu, còn chống phong kiến sẽ thực hiện từng bước. Đây là điểm sáng tạo của Hồ Chí Minh, kết hợp nhiệm vụ giải phóng dân tộc với con đường cách mạng vô sản phù hợp với điều kiện Việt Nam và xu thế thời đại.",
      },
    ],
  },
  6: {
    title:
      "Cách mạng giải phóng dân tộc, trong điều kiện Việt Nam, muốn thắng lợi phải do Đảng Cộng sản lãnh đạo",
    sections: [
      {
        content:
          "Theo Hồ Chí Minh, Đảng Cộng sản là nhân tố chủ quan quyết định thành công của cách mạng giải phóng dân tộc. Chủ nghĩa Mác – Lênin chỉ rõ, giai cấp công nhân phải có chính đảng để giác ngộ, tập hợp, huấn luyện quần chúng và đưa họ vào đấu tranh. Hồ Chí Minh tiếp thu lý luận này và nhấn mạnh vai trò của đảng trong tác phẩm Đường cách mệnh (1927): cách mạng trước hết phải có đảng cách mạng, để trong thì vận động và tổ chức dân chúng, ngoài thì liên lạc với các dân tộc bị áp bức và giai cấp vô sản toàn thế giới; đảng vững thì cách mạng mới thành công.\n\n",
      },
      {
        content:
          "Trong bối cảnh Việt Nam là nước thuộc địa – phong kiến, Người cho rằng Đảng Cộng sản vừa là đội tiên phong của giai cấp công nhân, vừa là đội tiên phong của nhân dân lao động, trong sạch, tận tâm phục vụ Tổ quốc, trở thành Đảng của cả dân tộc Việt Nam. Hồ Chí Minh khẳng định: Chính vì Đảng Lao động Việt Nam là Đảng của giai cấp công nhân và nhân dân lao động, cho nên nó phải là Đảng của dân tộc Việt Nam, là một luận điểm quan trọng, bổ sung và phát triển lý luận Mác-xít về vai trò của đảng.",
      },
    ],
  },
  7: {
    title:
      "Cách mạng giải phóng dân tộc phải dựa trên lực lượng đại đoàn kết toàn dân tộc, lấy liên minh công – nông làm nền tảng",
    sections: [
      {
        content:
          "Hồ Chí Minh quan niệm rằng cách mạng là sự nghiệp chung của toàn dân, dựa vào đại đoàn kết dân tộc, vì có dân là có tất cả, được lòng dân thì được tất cả, mất lòng dân thì mất tất cả. Người kế thừa tư tưởng Mác – Lênin, nhấn mạnh rằng quần chúng nhân dân là chủ thể sáng tạo ra lịch sử; cách mạng không phải việc của một vài người mà là của toàn dân. Theo Hồ Chí Minh, công nông là gốc cách mạng, liên minh công – nông là nền tảng, đồng thời Đảng phải tập hợp dân cày nghèo, tiểu tư sản, trí thức, trung nông, lợi dụng hoặc trung lập hóa các giai cấp khác chưa rõ mặt phần cách mạng. Khi thực dân Pháp xâm lược lần hai, Người kêu gọi mọi người Việt Nam, không phân biệt giai tầng, tôn giáo, dân tộc hay đẳng phái, đoàn kết chống kẻ thù chung. Hồ Chí Minh nhấn mạnh, công nhân và nông dân là hai giai cấp đông đảo, bị bóc lột nặng nề, nên lòng cách mạng càng bền, chí cách mạng càng quyết; nếu họ thắng sẽ được cả thế giới, nếu thua chỉ mất một kiếp khổ.",
      },
    ],
  },
  8: {
    title:
      "Cách mạng giải phóng dân tộc cần chủ động, sáng tạo, có khả năng giành thắng lợi trước cách mạng vô sản ở chính quốc",
    sections: [
      {
        content:
          "Hồ Chí Minh chỉ ra rằng cách mạng thuộc địa không phụ thuộc vào cách mạng vô sản ở chính quốc mà có thể giành thắng lợi trước, trái ngược với quan điểm từng được Quốc tế Cộng sản xem nhẹ vai trò cách mạng thuộc địa. Người nhấn mạnh mối quan hệ bình đẳng, tác động qua lại giữa cách mạng thuộc địa và cách mạng vô sản ở chính quốc; mỗi bên có vai trò riêng nhưng không lệ thuộc lẫn nhau.\n\n",
      },
      {
        content:
          "Hồ Chí Minh lập luận rằng thuộc địa có vị trí chiến lược đặc biệt đối với chủ nghĩa đế quốc, là nơi tập trung nọc độc và sức sống của chủ nghĩa tư bản, và nhấn mạnh tinh thần đấu tranh cách mạng quyết liệt của các dân tộc thuộc địa, khi được tập hợp và giác ngộ sẽ hình thành một lực lượng khổng lồ, giúp tiêu diệt chủ nghĩa đế quốc, đồng thời hỗ trợ cách mạng vô sản ở chính quốc. Người viết trong Tuyên ngôn của Hội Liên hiệp thuộc địa rằng công cuộc giải phóng phải do chính dân tộc thuộc địa nỗ lực thực hiện. Thực tiễn thắng lợi cách mạng Việt Nam năm 1945 và phong trào giải phóng dân tộc thế giới những năm 1960 chứng minh luận điểm này của Hồ Chí Minh vừa sáng tạo, vừa có giá trị lý luận và thực tiễn to lớn.",
      },
    ],
  },
  9: {
    title:
      "Cách mạng giải phóng dân tộc phải được tiến hành bằng phương pháp bạo lực cách mạng",
    sections: [
      {
        content:
          'Hồ Chí Minh vận dụng sáng tạo quan điểm của các nhà kinh điển Mác – Ăngghen và Lênin về bạo lực cách mạng, cho rằng "bạo lực là bà đỡ của một chế độ xã hội cũ đang thai nghén một chế độ mới" và không có bạo lực cách mạng thì không thể giành chính quyền từ tay kẻ thù.\n\nTrong bộ Tư bản, quyển I, tập thứ nhất, xuất bản lần đầu tiên năm 1867, C. Mác viết: "Bạo lực là bà đỡ của một chế độ xã hội cũ đang thai nghén một chế độ mới". Năm 1878, trong tác phẩm Chống Đuyrinh, Ph. Ăngghen nhắc lại: "Bạo lực còn đóng một vai trò khác trong lịch sử, vai trò cách mạng; nói theo Mác, bạo lực còn là bà đỡ cho mọi xã hội cũ đang thai nghén một xã hội mới; bạo lực là công cụ mà sự vận động xã hội dùng để tự mở đường cho mình và đập tan những hình thức chính trị đã hóa đá và chết cứng"',
      },
    ],
  },
  10: {
    title: "Mở đầu – Ngọn đuốc soi đường",
    sections: [
      {
        content:
          "Tư tưởng Hồ Chí Minh về chủ nghĩa xã hội là kết tinh của truyền thống yêu nước, khát vọng độc lập, tự do và tinh thần nhân văn sâu sắc của dân tộc Việt Nam. Người đã tiếp thu sáng tạo chủ nghĩa Mác – Lênin, vận dụng phù hợp vào thực tiễn Việt Nam, xác định rõ chủ nghĩa xã hội là con đường duy nhất để xây dựng một xã hội dân giàu, nước mạnh, dân chủ, công bằng, văn minh. Đây là lý tưởng xuyên suốt trong sự nghiệp cách mạng của Hồ Chí Minh.",
      },
    ],
  },
  11: {
    title: "CNXH – Xã hội vì con người",
    sections: [
      {
        content:
          "Theo Hồ Chí Minh, mục tiêu cao nhất của chủ nghĩa xã hội là vì con người, vì hạnh phúc của nhân dân. Chủ nghĩa xã hội phải đảm bảo cho mọi người có cơm ăn, áo mặc, được học hành, không còn cảnh áp bức, bất công, bóc lột. Xã hội chủ nghĩa là nơi mỗi người dân đều được phát huy hết khả năng, sống trong tự do, bình đẳng, đoàn kết và nhân ái.",
      },
      {
        content:
          "Việt Nam lựa chọn con đường tiến lên CNXH là kết quả của cả một quá trình nhận thức và đấu tranh lâu dài, phù hợp với khát vọng độc lập, tự do, hạnh phúc của dân tộc. Sau khi giành được độc lập dân tộc, Hồ Chí Minh xác định rõ rằng chỉ có CNXH mới đảm bảo sự phát triển bền vững, lâu dài cho đất nước, đảm bảo bình đẳng, bác ái và tự do thực sự cho nhân dân. Đây là con đường tất yếu không chỉ xuất phát từ xu thế thời đại mà còn đáp ứng nguyện vọng của toàn dân tộc Việt Nam. Dưới ánh sáng của tư tưởng Hồ Chí Minh, Việt Nam từng bước xây dựng nền tảng vật chất, chính trị, văn hóa – xã hội để tiến lên CNXH, dù còn nhiều khó khăn, thử thách nhưng vẫn kiên định với mục tiêu, lý tưởng đã lựa chọn.",
      },
    ],
  },
  12: {
    title: "Đặc trưng của xã hội CNXH",
    sections: [
      {
        content:
          "Hồ Chí Minh đã chỉ rõ những đặc điểm nổi bật, mang tính bản chất của xã hội chủ nghĩa. Về chính trị, đó là một xã hội do nhân dân làm chủ, dưới sự lãnh đạo của Đảng Cộng sản. Về kinh tế, chủ nghĩa xã hội nhấn mạnh vai trò công hữu về tư liệu sản xuất, phát triển kinh tế hiện đại, đảm bảo phân phối công bằng và hợp lý. Về văn hóa – đạo đức, xã hội chủ nghĩa đề cao các giá trị bình đẳng, nhân văn, tôn trọng con người và phát huy tối đa tiềm năng sáng tạo của mỗi cá nhân. Chủ nghĩa xã hội còn gắn liền với mục tiêu xây dựng một xã hội đoàn kết, dân chủ, công bằng và văn minh, trong đó mọi người đều có cơ hội phát triển và cống hiến cho đất nước. Những đặc trưng này tạo nên sức hấp dẫn và sức sống lâu bền của chủ nghĩa xã hội trong tư tưởng Hồ Chí Minh.",
      },
      {
        content:
          "Mục tiêu lớn nhất của chủ nghĩa xã hội ở Việt Nam là bảo đảm độc lập, tự do, hạnh phúc cho nhân dân. Theo Hồ Chí Minh, xây dựng chủ nghĩa xã hội không chỉ là phát triển kinh tế mà còn phải đi đôi với việc mở rộng dân chủ về chính trị, nâng cao trình độ văn hóa, đảm bảo công bằng xã hội. Cụ thể, mục tiêu của chủ nghĩa xã hội là xây dựng một xã hội dân chủ, công bằng, văn minh, trong đó mọi người đều có việc làm, thu nhập ổn định, được học tập, chăm sóc sức khỏe, được sống trong môi trường an toàn, lành mạnh. Hồ Chí Minh nhấn mạnh rằng, chỉ khi nào người dân thực sự hạnh phúc, tự do thì chủ nghĩa xã hội mới có ý nghĩa trọn vẹn.",
      },
    ],
  },
  13: {
    title: "Động lực của CNXH",
    sections: [
      {
        content:
          "Theo Hồ Chí Minh, động lực quan trọng nhất để xây dựng CNXH là sức mạnh của nhân dân. Đó là tinh thần dân chủ, đoàn kết, lòng yêu nước, ý chí tự lực, tự cường. Bên cạnh đó, vai trò lãnh đạo của Đảng, sự quản lý của Nhà nước và xây dựng con người mới xã hội chủ nghĩa cũng là những yếu tố quyết định thành công của sự nghiệp này. Hồ Chí Minh nhấn mạnh: De tram lan khong dan cung chiu, kho van lan dan lieu cung xong. Sự đồng thuận, đoàn kết và phát huy sức mạnh toàn dân là điều kiện tiên quyết để xây dựng thành công CNXH.",
      },
      {
        content:
          "Việt Nam đi lên CNXH từ một nước nông nghiệp lạc hậu, do đó phải trải qua thời kỳ quá độ lâu dài và nhiều khó khăn. Thời kỳ này vừa phải cải tạo những tàn dư của xã hội cũ, vừa xây dựng các yếu tố mới phù hợp với CNXH. Hồ Chí Minh khẳng định, đây là quá trình phức tạp, đòi hỏi sự kiên trì, sáng tạo và quyết tâm cao của toàn dân tộc. Trong thời kỳ quá độ, cần kết hợp cải tạo xã hội cũ với xây dựng xã hội mới, phát triển kinh tế, nâng cao dân trí, xây dựng hệ thống chính trị vững mạnh, đồng thời giữ vững độc lập dân tộc và chủ quyền quốc gia.",
      },
    ],
  },
  14: {
    title: "Nguyên tắc xây dựng CNXH",
    sections: [
      {
        content:
          "Hồ Chí Minh chỉ rõ một số nguyên tắc cơ bản khi xây dựng CNXH ở Việt Nam, gồm: kiên định chủ nghĩa Mác – Lênin, giữ vững độc lập dân tộc, đoàn kết và học hỏi kinh nghiệm quốc tế nhưng phải sáng tạo phù hợp với điều kiện thực tiễn nước ta; kết hợp xây dựng với đấu tranh, phát huy sức mạnh toàn dân. Đặc biệt, phải đảm bảo vai trò lãnh đạo của Đảng Cộng sản, củng cố khối đại đoàn kết toàn dân, lấy liên minh công – nông – trí thức làm nền tảng, đồng thời gắn bó chặt chẽ với phong trào cách mạng thế giới để tạo nên sức mạnh tổng hợp cho sự nghiệp xây dựng CNXH.",
      },
      {
        content:
          "Hồ Chí Minh luôn nhấn mạnh mối quan hệ chặt chẽ giữa độc lập dân tộc và CNXH. Độc lập dân tộc là tiền đề để xây dựng CNXH; ngược lại, CNXH là nền tảng vững chắc để bảo vệ và phát huy thành quả của độc lập dân tộc. Hai mục tiêu này không thể tách rời mà phải song hành trong sự nghiệp phát triển đất nước. Theo Hồ Chí Minh, chỉ có CNXH mới bảo đảm cho độc lập dân tộc được vững chắc, lâu dài, đồng thời tạo điều kiện để phát triển toàn diện đất nước trên mọi lĩnh vực.",
      },
    ],
  },
  15: {
    title: "Vận dụng hôm nay – Kiên định, sáng tạo",
    sections: [
      {
        content:
          "Ngày nay, tư tưởng Hồ Chí Minh về CNXH tiếp tục là nền tảng tư tưởng, kim chỉ nam cho công cuộc đổi mới và phát triển đất nước. Thế hệ trẻ có nhiệm vụ giữ vững lý tưởng, phát huy tinh thần đổi mới, sáng tạo, hội nhập quốc tế nhưng vẫn giữ vững bản sắc và tự chủ, góp phần xây dựng một Việt Nam giàu mạnh, dân chủ, công bằng, văn minh. Việc vận dụng tư tưởng Hồ Chí Minh đòi hỏi phải kiên định mục tiêu độc lập dân tộc gắn liền với CNXH, đồng thời linh hoạt, sáng tạo trong giải quyết các vấn đề thực tiễn, không ngừng đổi mới tư duy, phát huy sức mạnh toàn dân tộc và tranh thủ thời cơ của thời đại để đưa đất nước phát triển nhanh, bền vững.",
      },
    ],
  },
  16: {
    title: "Mối Quan Hệ Độc Lập Dân Tộc Và Chủ Nghĩa Xã Hội",
    sections: [
      {
        content:
          "1.Độc lập dân tộc là cơ sở, tiền đề để tiến lên chủ nghĩa xã hội\nHồ Chính khẳng định phương hướng chiến lược của cách mạng nước ta là: giải phóng dân tộc, giành độc lập dân tộc sẽ là mục tiêu đầu tiên của cách mạng, là cơ sở, tiền đề của mục tiêu tiếp theo - chủ nghĩa xã hội và chủ nghĩa cộng sản.\n- Độc lập dân tộc là tiền đề để xây dựng CNXH\n- CNXH là cơ sở bảo vệ thành quả của cách mạng giải phóng dân tộc",
      },
      {
        content:
          "2.CNXH là cơ sở bảo vệ thành quả của cách mạng giải phóng dân tộc \n+ Chủ nghĩa xã hội là xu thế tất yếu của thời và phù hợp với lợi ích của nhân dân Việt Nam\n+ Chủ nghĩa xã hội, theo Hồ Chí Minh, còn là một xã hội tốt đẹp, không còn chế độ áp bức bóc lột.\n+ Chủ nghĩa xã hội bảo vệ thành quả cách mạng giải phóng dân tộc.\n=> Như vậy, theo Hồ Chí Minh, xây dựng chủ nghĩa xã hội là xây dựng cơ sở cho phát triển của đất nước trên tất cả các lĩnh vực\n+ Quan điểm của CN - Mác - Lê Nin: Đây là hai giai đoạn của một quá trình cách mạng không ngừng.\n+ Quan điểm của Hồ Chí Minh: \n- Cách mạng giải phóng dân tộc là tiền đề để tiến hành cách mạng XHCN.\n- Cách mạng XHCN là cơ sở để bảo vệ thành quả cách mạng giải phóng dân tộc,\n+ Quan điểm của Hồ Chí Minh: \n- Cách mạng giải phóng dân tộc là tiền đề để tiến hành cách mạng XHCN.	\n- Cách mạng XHCN là cơ sở để bảo vệ thành quả cách mạng giải phóng dân tộc",
      },
      {
        content:
          "3.Điều kiện bảo đảm độc lập dân tộc gắn liền với chủ nghĩa xã hội \n+ Một là, phải đảm bảo vai trò lãnh đạo tuyệt đối của đảng cộng sản trong suốt tiến trình cách mạng\n-Vấn đề mang tính nguyên tắc\n-Nguyên tắc mang tính định hướng xây dựng CNXH\n-Đảm bảo nguyên tắc này để tránh chệch hướng XHCN hiện nay\n+ Hai là, phải củng cố và tăng cường khối cường khối đại đoàn kết dân tộc mà nền tảng là khối liên minh công - nông - trí:\n-Vấn đề có ý nghĩa chiến lược\n-Quyết định thành công của cách mạng\n+Ba là, phải đoàn kết, gắn bó chặt chẽ với cách mạng thế giới:-\nTạo nên sức mạnh tổng hợp\n-Để góp phần chung cho nền hòa bình, độc lập, dân chủ và chủ nghĩa xã hội trên thế giới",
      },
    ],
  },
  17: {
    title: "Vận Dụng Trong Giai Đoạn Hiện Nay",
    sections: [
      {
        content:
          'Kiên định mục tiêu và con đường cách mạng mà Hồ Chí Minh đã xác định:\n\nTiến tới chủ nghĩa xã hội và chủ nghĩa cộng sản là quá trình hợp quy luật, phù hợp với khát vọng của nhân dân Việt Nam, là sự lựa chọn đúng đắn của Hồ Chí Minh và sự khẳng định của Đảng Cộng sản Việt Nam.\n\nTrong Cương Lĩnh của Đảng từ thực tiễn phong phú của cách mạng Việt Nam, Đảng đã rút ra những bài học quan trọng và đầu tiên là phải "nắm vững ngọn cờ độc lập dân tộc và chủ nghĩa xã hội - ngọn cờ quang vinh mà Chủ tịch Hồ Chí Minh đã trao lại cho thế hệ hôm nay và các thế hệ mai sau".',
      },
      {
        content:
          "Phát huy sức mạnh dân chủ xã hội chủ nghĩa:\n\nPhát huy sức mạnh dân chủ xã hội chủ nghĩa là phát huy sức mạnh bản chất ưu việt của chế độ xã hộc chủ nghĩa.\n\nPhát huy sức mạnh dân chủ xã hội chủ nghĩa không tách rời quá trình hoàn thiện hệ thống pháp luật, tôn trọng, bảo đảm, bảo vệ quyền con người, quyền và nghĩa vụ công dân theo tinh thần của Hiến pháp hiện hành.\n\nPhát huy sức mạnh dân chủ xã hội chủ nghĩa đi đôi với cường pháp chế, đề cao trách nhiệm công dân và đạo đức xã hội.",
      },
      {
        content:
          "Củng cố, kiện toàn, phát huy sức mạnh và hiệu quả hoạt động của toàn bộ hệ thống chính trị:\n\nĐặc điểm của hệ thống chính trị ở Việt Nam là tính nhất nguyên và tính thống nhất: Nhất nguyên về chính trị, về tổ chức, về tư tưởng; thống nhất dưới sự lãnh đạo của Đảng Cộng sản Việt Nam, thống nhất Nhân dân thực hiện quyền làm chủ thông qua hoạt động của Nhà nước, của cả hệ thống chính trị và cách thức dân chủ trực tiếp, dân chủ đại diện.",
      },
      {
        content:
          'Đấu tranh chống những biểu hiện suy thoái về tư tưởng, chính trị, đạo đức, lối sống và "tự diễn biến", "tự chuyển hóa" trong nội bộ:\n\nChỉ trong một thời gian ngắn so với lịch sử của Đảng, tình trạng suy thoái về tư tưởng chính trị, đạo đức, lối sống của một bộ phận không nhỏ cán bộ, đảng viên đã xuất hiện và ngày càng nghiêm trọng.\n\nVận dụng tư tưởng Hồ Chí Minh về độc lập dân tộc và chủ nghĩa xã hội trong giai đoạn hiện nay là phải tích cực thực hiện, thực hiện có hiệu quả các nghị quyết của Đảng trong đó các nghị quyết về xây dựng Đảng giữ vị trí cực kỳ quan trọng vì xây dựng Đảng là nhiệm vụ then chốt trong sự nghiệp đổi mới.',
      },
    ],
  },
};

export const pages = [];
for (let i = 0; i < pictures.length; i += 2) {
  pages.push({
    front: pictures[i],
    back: pictures[i + 1] ? pictures[i + 1] : 'back'
  });
}
pages.push({
  front: '17.png', // Changed to 17 to match the last image available
  back: 'back'
});


// Component hiển thị nội dung trang
const PageContent = ({ pageNumber, isOpen }) => {
  const content = pageContents[pageNumber] || pageContents[0];
  const [isMobile, setIsMobile] = useState(false);
  const [currentSection, setCurrentSection] = useAtom(contentSectionAtom);

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
    <div className="fixed left-0 top-0 h-full w-[30vw] min-w-[300px] max-w-[90vw] bg-gradient-to-r from-black/80 to-black/20 backdrop-blur-sm z-50 pointer-events-none flex flex-col p-8 pb-28 transform transition-transform duration-500 ease-in-out">
      <div className="text-white max-w-lg pointer-events-auto w-full flex-1 flex flex-col">
        <h2 className="text-4xl font-bold mb-6 text-left break-words">
          {content.title}
        </h2>
        {currentContent?.image && (
          <img
            src={currentContent.image}
            alt="Minh hoạ"
            className="w-full max-h-64 object-contain rounded-lg mb-4 bg-white/5"
            onError={(e) => {
              e.currentTarget.onerror = null;
              e.currentTarget.src =
                "https://via.placeholder.com/800x450?text=No+Image";
            }}
          />
        )}
        <p className="text-lg leading-relaxed text-left break-words whitespace-pre-line flex-1">
          {currentContent.content}
        </p>

        {/* Nút chuyển đổi phần */}
        {sections.length > 1 && (
          <div className="flex justify-between items-center mt-6 gap-4 relative z-60">
            <button
              className={`px-4 py-2 rounded-lg text-sm transition-all duration-300 ease-out pointer-events-auto cursor-pointer relative z-70
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
              className={`px-4 py-2 rounded-lg text-sm transition-all duration-300 ease-out pointer-events-auto cursor-pointer relative z-70
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
        {/* Switch background options - dropdown top-center */}
        <div className="pointer-events-auto fixed top-6 left-1/2 -translate-x-1/2 z-30">
          <select
            className="bg-black/40 text-white px-3 py-2 rounded-lg border border-white/30 backdrop-blur-sm text-sm md:text-base"
            value={bgKey}
            onChange={(e) => {
              const value = e.target.value;
              setBgKey(value);
              const map = {
                1: "/images/background.jpg",
                2: "/images/backgroundVD1.mp4",
                3: "/images/BackgroundVD2.mp4",
              };

              // Check if it's a video file
              if (map[value].endsWith(".mp4")) {
                // Set video background with loading state
                console.log("Setting video:", map[value]);
                setVideoLoading(true);
                setCurrentVideo(map[value]);
                document.documentElement.style.setProperty(
                  "--app-bg-image",
                  "none"
                );
              } else {
                // Set image background
                console.log("Setting image:", map[value]);
                setVideoLoading(false);
                setCurrentVideo(null);
                document.documentElement.style.setProperty(
                  "--app-bg-image",
                  `url('${map[value]}')`
                );
              }
            }}
          >
            <option value="1">Lăng Bác</option>
            {/* <option value="2">Vịnh Hạ Long</option> */}
            <option value="3">Sài Gòn</option>
          </select>
        </div>
        {/* Nhóm nút Cố định - Desktop (cạnh dropdown) */}
        <div
          className="pointer-events-auto fixed top-6 z-30 hidden md:flex items-center gap-2"
          style={{ left: "50%", transform: "translateX(calc(-50% + 220px))" }}
        >
          {/* Nút Cố định pose */}
          <FixedPoseToggle />
        </div>

        {/* Nhóm nút Cố định - Mobile (góc phải trên) */}
        <div className="pointer-events-auto fixed top-14 left-1/2 -translate-x-1/2 z-30 flex md:hidden items-center gap-2">
          <FixedPoseToggle />
        </div>

        <div
          ref={pageBarRef}
          className="w-full overflow-x-auto pointer-events-auto flex justify-center relative z-60 bg-gradient-to-t from-black/60 to-transparent"
        >
          <div className="overflow-x-auto flex items-center gap-2 md:gap-4 max-w-full p-2 md:p-10">
            {[...pages].map((_, index) => (
              <button
                key={index}
                className={`px-2 py-1 md:px-4 md:py-3 rounded-full text-xs md:text-lg uppercase shrink-0 min-h-[44px] transition-all duration-300 ease-out
                  ${
                    index === page
                      ? "bg-white/90 text-black shadow-lg"
                      : "bg-black/30 text-white shadow-sm"
                  }
                  border border-white/10 hover:border-white/30 backdrop-blur-md
                  hover:-translate-y-0.5 hover:shadow-xl active:translate-y-0 active:scale-[0.98]
                  focus:outline-none focus:ring-2 focus:ring-white/40`}
                onClick={() => handlePageClick(index)}
                data-page={index}
              >
                {index === 0 ? "Mặt trước" : `Trang ${index}`}
              </button>
            ))}
            <button
              className={`px-2 py-1 md:px-4 md:py-3 rounded-full text-xs md:text-lg uppercase shrink-0 min-h-[44px] transition-all duration-300 ease-out
                ${
                  page === pages.length
                    ? "bg-white/90 text-black shadow-lg"
                    : "bg-black/30 text-white shadow-sm"
                }
                border border-white/10 hover:border-white/30 backdrop-blur-md
                hover:-translate-y-0.5 hover:shadow-xl active:translate-y-0 active:scale-[0.98]
                focus:outline-none focus:ring-2 focus:ring-white/40`}
              onClick={() => handlePageClick(pages.length)}
              data-page={pages.length}
            >
              Mặt sau
            </button>
          </div>
        </div>
      </main>

      {/* Hiển thị nội dung trang khi sách mở */}
      <PageContent pageNumber={page} isOpen={bookOpen} />

      {/* Nút đóng sách */}
      {bookOpen && (
        <button
          className="fixed top-4 right-4 z-30 bg-white/90 text-black px-3 py-2 md:px-4 md:py-2 rounded-full transition-all duration-300 ease-out text-sm md:text-base min-h-[44px] min-w-[44px] flex items-center justify-center
          shadow-lg hover:shadow-xl hover:bg-white backdrop-blur-md border border-black/5
          hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98]
          focus:outline-none focus:ring-2 focus:ring-black/20"
          onClick={() => setBookOpen(false)}
        >
          ✕ Đóng
        </button>
      )}
    </>
  );
};
