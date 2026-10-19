export type Empire = {
  name: string;
  thaiName: string;
  crest: string;
  subtitle: string;
  capital: string;
  motto: string;
  description: string;
};

export const empire: Empire = {
  name: "Empire of Fourcadir",
  thaiName: "จักรวรรดิโฟร์คาเดียร์",
  crest: "/images/crests-presentation/unity-crown.png",
  subtitle: "Union of Eight",
  capital: "Fourcadir Central Capital",
  motto: "Empire of Fourcadir · Union of Eight",
  description:
    "ตราจักรวรรดิเป็นสัญลักษณ์ของการรวมตัวกันของแปดตระกูลผู้พิทักษ์ ภายใต้ Unity Crown และอำนาจส่วนกลางของจักรวรรดิ Fourcadir",
};

/* The empire's charter, from Fourcadir.pdf. */
export const empireCharter = {
  overview:
    "จักรวรรดิโฟร์คาเดียร์ (Fourcadir Empire) คือมหาอำนาจที่เกิดจากการรวมตัวกันของ 7 นครรัฐ (7 Islands) โดยมีเกาะตรงกลางเป็นเมืองหลวง (Central Capital)",
  crestMeaning:
    "มงกุฎตรงกลางหมายถึงองค์จักรพรรดิ และวงแหวน 7 วงที่ล้อมรอบและเกี่ยวกระหวัดกันหมายถึง 7 ตระกูลที่ต้องพึ่งพาอาศัยกัน หากวงใดวงหนึ่งแตกหัก โครงสร้างทั้งหมดจะสั่นคลอน",
  currentSituation:
    "บัลลังก์ว่างเปล่า (The Empty Throne) จักรพรรดิองค์ก่อนสวรรคตโดยไร้ทายาทหรือหายสาบสูญไป ทำให้วงแหวนทั้ง 7 เริ่มบิดเบี้ยว แต่ละตระกูลพยายามผลักดันตัวเองขึ้นเป็นผู้นำ หรือไม่ก็พยายามฉีกตัวเป็นอิสระ",
};

export type CapitalDistrict = {
  name: string;
  thaiName: string;
  zone: string;
  summary: string;
  places: { name: string; detail: string }[];
};

/* Districts of Fourcadir Central Capital, from Fourcadir.pdf. */
export const capitalDistricts: CapitalDistrict[] = [
  {
    name: "The Palace of Unified Sovereigns",
    thaiName: "มหาปราสาทสัตตราชันย์",
    zone: "ใจกลางนครหลวง",
    summary:
      "โอ่อ่า ศักดิ์สิทธิ์ และเปี่ยมไปด้วยพลังอำนาจที่แตกต่างกัน 7 รูปแบบ แต่ถูกหลอมรวมให้อยู่ภายใต้หลังคาเดียวกัน",
    places: [
      {
        name: "ห้องโถงแปดเหลี่ยม",
        detail: "ห้องโถงทรงแปดเหลี่ยม (Octagon) ขนาดมหึมา พื้นปูด้วยหินอ่อนสีดำขัดมันที่สะท้อนเงาของผู้เดินราวกับกระจก",
      },
      {
        name: "โดมท้องฟ้า",
        detail: "โดมสูงที่ไม่มีเสาค้ำจุน ถูกร่ายเวทจำลองท้องฟ้าของจักรวรรดิในเวลาจริง เพื่อเตือนใจว่าพวกเขากำลังปกครองท้องฟ้าเดียวกัน",
      },
      {
        name: "The Round Table of Unity",
        detail: "โต๊ะกลมศิลาขาวขนาดใหญ่สลักแผนที่จักรวรรดิเรืองแสง ใช้สำหรับวางแผนยุทธศาสตร์ร่วมกัน",
      },
      {
        name: "The Sacred Council of Eight",
        detail: "อาคารทรงแปดเหลี่ยมที่เชื่อมกับทางเข้าพระราชวัง ภายในมีบัลลังก์ทั้ง 8 จัดเรียงเป็นวงกลม เก้าอี้ของ Erebos ยังคงถูกทำความสะอาดและเว้นว่างไว้เสมอ เป็นที่ประชุมสุดยอดผู้นำ ทั้งถกเถียงนโยบายและนัดมาดื่มชาปรับความเข้าใจกัน",
      },
    ],
  },
  {
    name: "Fourcadir Imperial Academy",
    thaiName: "สถาบันปั้นวีรชน",
    zone: "โซนทิศตะวันออก",
    summary: "บรรยากาศเงียบสงบและเต็มไปด้วยวิชาการ",
    places: [
      {
        name: "สถาบันจักรพรรดิโฟร์คาเดียร์",
        detail: "มหาวิทยาลัยที่รวบรวมบุคลากรระดับหัวกะทิจากทุกตระกูล ทั้งอาจารย์ดาบจากเมืองของ Michael อาจารย์ปรุงยาจากเมืองของ Abigail และอาจารย์ธุรกิจจากเมืองของ Fortuna",
      },
      {
        name: "เป้าหมาย",
        detail: "เด็กรุ่นใหม่ที่จบจากที่นี่จะไม่ได้ภักดีแค่ตระกูลตัวเอง แต่จะภักดีต่อจักรวรรดิและความเป็นเพื่อนของผู้นำทั้ง 8",
      },
    ],
  },
  {
    name: "Harmonia Districts",
    thaiName: "ย่านฮาร์โมเนีย",
    zone: "โซนทิศใต้และทิศตะวันตก",
    summary: "พื้นที่กว้างขวางสำหรับประชากร",
    places: [
      {
        name: "ลักษณะเมือง",
        detail: "ผสมผสานสถาปัตยกรรมของทุกวัฒนธรรม มีคลองน้ำใสจาก Remuria ไหลผ่านเมือง และระบบรักษาความปลอดภัยจาก Remus ที่แน่นหนา",
      },
      {
        name: "บ้านเรือน",
        detail: "มีตั้งแต่คอนโดมิเนียมหรูหราไปจนถึงบ้านสวนที่อบอุ่น ผู้คนจากเมืองทหารและเมืองพ่อค้ามาแต่งงานและสร้างครอบครัวกันที่นี่",
      },
    ],
  },
  {
    name: "Amenities & Entertainment",
    thaiName: "โซนสิ่งอำนวยความสะดวกและบันเทิง",
    zone: "โซนทิศเหนือ",
    summary: "แหล่งรวมไลฟ์สไตล์ของนครหลวง",
    places: [
      {
        name: "The Grand Plaza",
        detail: "ลานกว้างขนาดใหญ่ที่มีน้ำพุศักดิ์สิทธิ์ ใช้จัดงานเทศกาล งานเฉลิมฉลอง และตลาดนัดแลกเปลี่ยนสินค้าระดับจักรวาล",
      },
      {
        name: "The Dimension Hub",
        detail: "สถานีขนส่งมิติที่ไม่ใช้ราง แต่เป็นประตูวาร์ปด้วยพลังของ Astraea เดินทางไปเยือนทั้ง 7 เมืองได้ในเวลาสั้น ๆ (ต้องได้รับอนุญาตก่อน)",
      },
      {
        name: "Moonlight Central Hospital",
        detail: "โรงพยาบาลกลางแสงจันทร์ ศูนย์การแพทย์ที่ดีที่สุด ผสานวิทยาการรักษาด้วยพลังแสงจาก House Saint-Cross และวิชาสมุนไพรจาก House Venom-Veil",
      },
    ],
  },
];
