export type Character = {
  slug: string;
  name: string;
  thaiName: string;
  title: string;
  house: string;
  city: string;
  key: string;
  eye: string;
  domain: string;
  army: string;
  accent: string;
  symbol: string;
  summary: string;
  powers: string[];
};


export const characters: Character[] = [
  {
    slug: "michael-saint-cross",
    name: "Michael Fourcadir Saint-Cross",
    thaiName: "มิคาเอล โฟร์คาเดียร์ เซนต์–ครอส",
    title: "The Living Sun",
    house: "House Saint-Cross",
    city: "Lux Aeternum",
    key: "The Key of Domination",
    eye: "Eye of Solar Judgment",
    domain: "Eternal Daybreak",
    army: "The Solaris Crusade",
    accent: "#e7c66f",
    symbol: "☀",
    summary: "จักรพรรดิแห่งแสงศักดิ์สิทธิ์ ผู้ยึดมั่นในกฎ วัฏจักร และคำปฏิญาณเหนือความต้องการส่วนตน",
    powers: ["Solaris Divinity", "Divine Edict", "Heaven’s Fall"],
  },
  {
    slug: "astraea-paradiseswan",
    name: "Astraea Fourcadir ParadiseSwan",
    thaiName: "แอสตราเอีย โฟร์คาเดียร์ พาราไดซ์–สวอน",
    title: "The Weaver of Cosmos",
    house: "House ParadiseSwan",
    city: "Astra Caelum",
    key: "The Key of Chronos & Cosmos",
    eye: "Eye of Star Creation",
    domain: "Cosmic Genesis",
    army: "The Astral Vanguard",
    accent: "#8ea1ff",
    symbol: "✦",
    summary: "จักรพรรดิแห่งดวงดาวและโชคชะตา ผู้มองเห็นอนาคตนับพันและแบกรับราคาของทุกเส้นทาง",
    powers: ["Star Magic", "Arcane Genesis", "Starfall Genesis"],
  },
  {
    slug: "abigail-venom-veil",
    name: "Abigail Fourcadir Venom-Veil",
    thaiName: "แอบิเกล โฟร์คาเดียร์ เวนอม–เวล",
    title: "The Biological Architect",
    house: "House Venom-Veil",
    city: "Floraven Mortis",
    key: "The Key of Psyche",
    eye: "Eye of Serpent Psyche",
    domain: "Garden of Delirium",
    army: "The Viper Shades",
    accent: "#77d58b",
    symbol: "♢",
    summary: "จักรพรรดินีแห่งพิษและจิตวิญญาณ นักรังสรรค์ชีวิตผู้เปลี่ยนพิษให้เป็นยาและความกลัวให้เป็นอาวุธ",
    powers: ["Bio-Hazard Alchemy", "Life Synthesis", "Neural Override"],
  },
  {
    slug: "last-void-requiem",
    name: "Last Fourcadir Void-Requiem",
    thaiName: "ลาสต์ โฟร์คาเดียร์ วอยด์–เรเควียม",
    title: "The Silent Reaper",
    house: "House Void-Requiem",
    city: "Silentharrow",
    key: "The Key of Entropy",
    eye: "Eye of Eternal Entropy",
    domain: "The Silent Graveyard",
    army: "The Silent Requiem",
    accent: "#b5b2c7",
    symbol: "⌛",
    summary: "จักรพรรดิแห่งความว่างและบทเพลงอวสาน ผู้ได้ยินเสียงของทุกสิ่งที่กำลังเดินทางสู่จุดจบ",
    powers: ["Entropy Arts", "Concept Erasure", "The Final Hour"],
  },
  {
    slug: "remuria-azure-song",
    name: "Remuria Fourcadir Azure-Song",
    thaiName: "รีมูเรีย โฟร์คาเดียร์ อาซัวร์–ซอง",
    title: "The Ocean Incarnate",
    house: "House Azure-Song",
    city: "Thalassara",
    key: "The Key of Elements",
    eye: "Eye of Elemental Flow",
    domain: "Deep Blue Opera",
    army: "The Azure Armada",
    accent: "#67c8e8",
    symbol: "≋",
    summary: "จักรพรรดินีแห่งวารี ผู้ฟังกระแสของโลกผ่านเสียงคลื่นและประพันธ์ภัยพิบัติราวกับบทเพลง",
    powers: ["Abyssal Resonance", "Disaster Compose", "Deluge of the Deep"],
  },
  {
    slug: "fortuna-royal-flush",
    name: "Fortuna Fourcadir Royal-Flush",
    thaiName: "ฟอร์จูนา โฟร์คาเดียร์ รอยัล–ฟลัช",
    title: "The Glitch of Reality",
    house: "House Royal-Flush",
    city: "Aurea Fortuna",
    key: "The Key of Causality",
    eye: "Eye of Fated Probability",
    domain: "Casino of Destiny",
    army: "The Golden Syndicate",
    accent: "#f1a9d4",
    symbol: "◆",
    summary: "จักรพรรดินีแห่งโชคและความเป็นไปได้ ผู้มองโลกเป็นสมการที่ทุกปาฏิหาริย์มีราคา",
    powers: ["Probability Transaction", "Probability Hack", "Devil’s Luck"],
  },
  {
    slug: "remus-iron-bastion",
    name: "Remus Fourcadir Iron-Bastion",
    thaiName: "รีมัส โฟร์คาเดียร์ ไอรอน–บาสเตียน",
    title: "The Unbroken God",
    house: "House Iron-Bastion",
    city: "Ferrum Vanguard",
    key: "The Key of Matter",
    eye: "Eye of Structural Analysis",
    domain: "Unlimited Iron Works",
    army: "The Iron Wolves",
    accent: "#9ca8b4",
    symbol: "⬢",
    summary: "จักรพรรดิแห่งเหล็กกล้าและการพิทักษ์ ป้อมปราการผู้พร้อมยืนรับการแตกสลายแทนจักรวรรดิ",
    powers: ["Ferro-Forge", "Matter Forge", "Matter Reconstruction"],
  },
  {
    slug: "erebos-night-fall",
    name: "Erebos Fourcadir Night-Fall",
    thaiName: "เอเรบอส โฟร์คาเดียร์ ไนท์–ฟอล",
    title: "The Void Walker",
    house: "House Night-Fall",
    city: "Nihil Ruina",
    key: "The Key of Chaos",
    eye: "Eye of Devouring Void",
    domain: "The Horizon of Nihility",
    army: "The Lost Lineage",
    accent: "#a178e8",
    symbol: "◉",
    summary: "จักรพรรดิผู้ล่วงหล่นแห่งรัตติกาล ผู้ปฏิเสธการสิ้นสุดของรัชสมัยและทำให้วงแหวนเริ่มแตกร้าว",
    powers: ["Void Dimension", "Void Construction", "Dimension Rifts"],
  },
];



export type Chapter = {
  slug: string;
  order: string;
  title: string;
  pov: string;
  excerpt: string;
  content: string[];
};

export const chapters: Chapter[] = [
  {
    slug: "prologue",
    order: "Prologue",
    title: "The Day the Ring Cracked",
    pov: "The Imperial Hall",
    excerpt:
      "ในประวัติศาสตร์ของ Forcadia ไม่มีผู้ใดบันทึกวันที่วงแหวนแตก",
    content: [
      "ในประวัติศาสตร์ของ Forcadia ไม่มีผู้ใดบันทึกวันที่วงแหวนแตก",
      "ไม่ใช่เพราะมันไม่สำคัญ แต่เพราะในวันนั้น—เวลาเองก็ไม่ยอมจดจำ",
      "ท้องฟ้าเหนือมหานครหลวง Fourcadir แปรเปลี่ยนเป็นสีเทาอมทอง ดั่งโลหะที่เพิ่งถูกหลอม พลังของ Unity Crown สั่นสะเทือนเหนือห้องโถงแปดเหลี่ยม เสียงโลหะเสียดสีกันดังขึ้นจากที่ซึ่งไม่ควรมีวัตถุใดส่งเสียงได้",
      "บัลลังก์ทั้งแปดตั้งเรียงเป็นวง—เจ็ดถูกครอบครอง หนึ่งว่างเปล่า",
      "ไม่มีใครนั่งบนบัลลังก์แห่งรัตติกาลอีกต่อไป",
      "และถึงแม้ไม่มีผู้ใดเอ่ยคำ ทุกคนก็รับรู้ตรงกันว่า…",
      "วัฏจักรได้เริ่มแตกร้าวแล้ว",
    ],
  },
  {
    slug: "the-law-of-the-ring",
    order: "Interlude",
    title: "The Law of the Ring",
    pov: "The Imperial Record",
    excerpt:
      "จักรวรรดิ Forcadia มิได้ยืนหยัดด้วยผู้ปกครองเพียงผู้เดียว แต่มันถูกค้ำจุนด้วยวัฏจักร",
    content: [
      "จักรวรรดิ Forcadia มิได้ยืนหยัดด้วยผู้ปกครองเพียงผู้เดียว",
      "แต่มันถูกค้ำจุนด้วย “วัฏจักร”",
      "ตั้งแต่ยุคปฐมจักรพรรดิ ได้มีการบัญญัติกฎสูงสุดไว้สามประการ—",
      "หนึ่ง: ไม่มีอำนาจใดครอบครองบัลลังก์ได้ตลอดกาล",
      "สอง: ทุกสองร้อยห้าสิบปี อำนาจจักรวรรดิจะต้องคืนสู่ Unity Crown",
      "สาม: ผู้ฝ่าฝืนกฎวัฏจักร จะถูกนับว่าเป็นศัตรูของ Forcadia ทั้งปวง",
      "กฎนี้ไม่เคยถูกละเมิด",
      "จนกระทั่งรัตติกาลปฏิเสธที่จะลาลับ",
    ],
  },
  {
    slug: "the-empty-throne",
    order: "Chapter I",
    title: "The Empty Throne",
    pov: "Michael Saint-Cross",
    excerpt:
      "สองร้อยห้าสิบปีสิ้นสุดแล้ว และอำนาจจะต้องคืนสู่ Unity Crown",
    content: [
      "ห้องโถงสัตตราชันย์เงียบงัน",
      "พื้นหินอ่อนสีดำสะท้อนเงาของผู้ปกครองทั้งเจ็ดราวกับกระจก มันบิดเบี้ยวเล็กน้อย—ไม่ใช่เพราะพื้นไม่เรียบ แต่เพราะอำนาจที่ยืนอยู่เหนือมันไม่อาจอยู่ร่วมกันได้อย่างสมบูรณ์อีกต่อไป",
      "Michael Fourcadir Saint-Cross—หรือในภาษาศักดิ์สิทธิ์โบราณ “มิคาเอล”—ยืนอยู่หน้าบัลลังก์แห่งรุ่งอรุณ แสงสีทองอ่อนแผ่ออกมาจากร่างของเขาโดยไม่ต้องเรียกใช้เวทใด ๆ มันเป็นแสงของคำปฏิญาณ—และของการสิ้นสุด",
      "“สองร้อยห้าสิบปีสิ้นสุดแล้ว”",
      "เสียงของเขานุ่ม แต่หนักแน่นพอจะกดอากาศทั้งห้องให้ต่ำลง",
      "“ตามกฎแห่งจักรวรรดิ อำนาจจะต้องคืนสู่ Unity Crown”",
      "ไม่มีเสียงคัดค้าน",
      "Remus Fourcadir Iron-Bastion กำมือแน่น เหล็กกล้าบนเกราะส่งเสียงครางต่ำราวสัตว์ป่าที่รู้ว่าศึกกำลังมา",
      "Remuria Fourcadir Azure-Song หลับตา ฟังบางสิ่งที่ไม่มีใครอื่นได้ยิน—กระแสน้ำที่ไม่ไหลอยู่ในห้องนี้",
      "Fortuna Fourcadir Royal-Flush ยิ้มบาง ๆ ราวกับกำลังคำนวณตัวเลขที่ไม่มีใครมองเห็น",
      "Last Fourcadir Void-Requiem ยืนนิ่ง เงาของเขาไม่สะท้อนบนพื้น",
      "มีเพียง Astraea Fourcadir ParadiseSwan ที่เงยหน้ามองโดมฟ้า",
      "หมู่ดาวบนเพดานเคลื่อนตัวช้าลง—ช้าลงกว่าที่ควรจะเป็น",
      "เขาเห็นเส้นทางนับพัน",
      "และไม่มีเส้นทางใดจบลงอย่างสงบ",
      "“Erebos Fourcadir Night-Fall จะไม่มา” ใครบางคนกล่าว",
      "คำพูดนั้นไม่ใช่คำถาม",
      "บัลลังก์แห่งรัตติกาลยังคงว่างเปล่า",
      "และในความว่างนั้น ทุกคนต่างได้ยินเสียงเดียวกัน—",
      "เสียงของวงแหวนที่กำลังร้าว",
    ],
  },
  {
    slug: "the-refusal-of-night",
    order: "Chapter II",
    title: "The Refusal of Night",
    pov: "Erebos Night-Fall",
    excerpt:
      "สองร้อยห้าสิบปี เป็นเพียงข้ออ้างของผู้ที่กลัวการคงอยู่",
    content: [
      "ณ Nihil Ruina เมืองซึ่งไม่อยู่ในบัญชีของกาลเวลา",
      "ท้องฟ้าไม่เคยเปลี่ยนสี ที่นี่ไม่มีรุ่งอรุณ และไม่ยอมรับรัตติกาล",
      "Erebos นั่งอยู่บนบัลลังก์ออบซิเดียน เงาของเขาไม่ทอดยาว ไม่สั้นลง และไม่ขยับตามแสง—เพราะแสงทั้งหมดถูกกลืนหายไปก่อนจะถึงพื้น",
      "“สองร้อยห้าสิบปี…”",
      "เขาเอ่ยเสียงแผ่ว ราวกับกำลังลิ้มรสคำโกหก",
      "“เป็นเพียงข้ออ้างของผู้ที่กลัวการคงอยู่”",
      "The Sovereign Key of Chaos ลอยขึ้นเหนือฝ่ามือของเขา รูปร่างของมันไม่แน่นอน เปลี่ยนแปลงทุกครั้งที่ผู้มองพยายามจดจำ",
      "กำแพงของความจริงสั่นไหว",
      "ที่นครหลวง Fourcadir วงแหวน Unity Crown ร้าวเป็นเส้นบาง ๆ—เส้นแรกในประวัติศาสตร์",
    ],
  },
  {
    slug: "when-sovereigns-hesitate",
    order: "Chapter III",
    title: "When Sovereigns Hesitate",
    pov: "The Sacred Council",
    excerpt:
      "การลังเลเองก็เป็นการเลือก และทุกเส้นทางจบลงด้วยคำว่าสงคราม",
    content: [
      "ระฆังแห่ง Sacred Council of Eight ดังขึ้น",
      "ไม่ใช่เพื่อเรียกการประชุม",
      "แต่เพื่อเตือนว่า การลังเลเองก็เป็นการเลือก",
      "Michael Fourcadir Saint-Cross ยืนขึ้นก่อนใคร แสงอาทิตย์ยามเช้าส่องผ่านโดมฟ้า แม้ในยามที่ควรเป็นกลางคืน",
      "Remus Fourcadir Iron-Bastion วางมือบนค้อนเหล็ก เขาไม่พูด แต่พื้นหินใต้เท้าสั่นเบา ๆ",
      "Remuria Fourcadir Azure-Song หลับตา เสียงคลื่นดังแผ่วในห้องที่ไร้น้ำ",
      "Fortuna Fourcadir Royal-Flush ยิ้ม เธอมองเห็นตัวเลขลอยอยู่เหนือศีรษะทุกคน—โอกาสรอด โอกาสทรยศ",
      "Last Fourcadir Void-Requiem ยืนเงียบ เงาของเขาไม่ปรากฏบนพื้น",
      "และสุดท้าย—",
      "Astraea Fourcadir ParadiseSwan เงยหน้ามองท้องฟ้าแห่งจักรวรรดิ",
      "เขาเห็นเส้นทางนับพัน",
      "ทุกเส้นจบลงด้วยคำว่า “สงคราม”",
      "“ถ้าเราต้องฆ่าเพื่อน…”",
      "Astraea เอ่ยเสียงแผ่ว",
      "“เพื่อรักษาจักรวรรดิ—บางทีจักรวรรดินี้อาจไม่ควรอยู่รอด”",
      "ในวินาทีนั้น Forcadia ก้าวเข้าสู่ศักราชแห่งสงครามตระกูล",
      "แต่สิ่งที่กำลังจะถูกทำลาย…",
      "อาจไม่ใช่เพียงจักรวรรดิ",
      "หากคือความเชื่อว่า อำนาจสามารถถูกส่งต่อโดยไม่เปื้อนเลือด",
    ],
  },
];

export type City = {
  slug: string;
  name: string;
  thaiName: string;
  ruler: string;
  position: string;
  description: string;
  title: string;
  atmosphere: string;
  architecture: string;
  landmark: string;
  faction: string;
  accent: string;
  symbol: string;
  emblem: string;
};

export const cities: City[] = [
  {
    slug: "fourcadir-central-capital",
    name: "Fourcadir Central Capital",
    thaiName: "นครหลวงโฟร์คาเดียร์",
    ruler: "Sacred Council of Eight",
    position: "center",
    title: "หัวใจแห่งจักรวรรดิ จุดบรรจบของแปดเส้นทาง",
    description:
      "นครหลวงซึ่งเป็นสมบัติส่วนรวมของทุกตระกูล และเป็นที่ตั้งของ Unity Crown",
    atmosphere:
      "โอ่อ่า ศักดิ์สิทธิ์ และเต็มไปด้วยพลังที่แตกต่างกันจากผู้ปกครองทั้งแปด",
    architecture:
      "อาคารหินอ่อนสีขาวและทอง ล้อมรอบมหาปราสาททรงแปดเหลี่ยม",
    landmark: "The Palace of Unified Sovereigns",
    faction: "The Sacred Council of Eight",
    accent: "#e7c66f",
    symbol: "✦",
     emblem: "/images/empire/imperial-crest.png",
  },
  {
    slug: "lux-aeternum",
    name: "Lux Aeternum",
    thaiName: "ลักซ์ เอเทอร์นัม",
    ruler: "Michael Saint-Cross",
    position: "north",
    title: "นครแห่งแสงนิรันดร์",
    description:
      "ป้อมปราการแสงศักดิ์สิทธิ์ที่ไม่มีวันมืดดับ สร้างขึ้นจากคริสตัลสวรรค์",
    atmosphere:
      "ท้องฟ้าสว่างอยู่เสมอ ระฆังศักดิ์สิทธิ์ดังทั่วนครในทุกยามเช้า",
    architecture:
      "มหาวิหาร หอคอยทองคำ และกำแพงคริสตัลที่สะท้อนแสงอาทิตย์",
    landmark: "The Citadel of Eternal Dawn",
    faction: "House Saint-Cross",
    accent: "#e7c66f",
    symbol: "☀",
    emblem: "/images/houses/saint-cross.webp",
  },
  {
    slug: "astra-caelum",
    name: "Astra Caelum",
    thaiName: "แอสตรา คาเอลุม",
    ruler: "Astraea ParadiseSwan",
    position: "northeast",
    title: "นครแห่งฟากฟ้าดารา",
    description:
      "พระราชวังดาราสวรรค์ซึ่งลอยอยู่เหนือหมู่ดาว และเป็นศูนย์กลางการศึกษาจักรวาล",
    atmosphere:
      "เงียบสงบ ไร้น้ำหนัก และเต็มไปด้วยแสงดาวซึ่งเคลื่อนไหวตามชะตากรรม",
    architecture:
      "หอคอยคริสตัลลอยฟ้า สะพานแสง และโดมดูดาวขนาดมหึมา",
    landmark: "The Celestial Swan Palace",
    faction: "House ParadiseSwan",
    accent: "#8ea1ff",
    symbol: "✦",
    emblem: "/images/houses/paradise-swan.webp",
  },
  {
    slug: "floraven-mortis",
    name: "Floraven Mortis",
    thaiName: "ฟลอราเวน มอร์ทิส",
    ruler: "Abigail Venom-Veil",
    position: "east",
    title: "นครบุปผามรณะ",
    description:
      "เมืองสวนพิษที่งดงามและอันตราย ซ่อนคฤหาสน์และห้องทดลองไว้ใต้เถาวัลย์",
    atmosphere:
      "หมอกสีเขียวปกคลุมสวน ดอกไม้เปลี่ยนสีตามอารมณ์ของผู้ที่เดินผ่าน",
    architecture:
      "คฤหาสน์ไม้ดำ เรือนกระจก และหอทดลองชีวเวท",
    landmark: "The Manor of the Venom Veil",
    faction: "House Venom-Veil",
    accent: "#77d58b",
    symbol: "♢",
    emblem: "/images/houses/venom-veil.webp",
  },
  {
    slug: "silentharrow",
    name: "Silentharrow",
    thaiName: "ไซเลนท์ฮาร์โรว์",
    ruler: "Last Void-Requiem",
    position: "southeast",
    title: "นครแห่งความเงียบงัน",
    description:
      "เมืองที่วิหารวิญญาณตั้งตระหง่าน ท่ามกลางเสียงกระซิบของผู้ล่วงลับ",
    atmosphere:
      "เสียงทุกชนิดเบาลงเมื่อเข้าสู่เขตเมือง และเงาทอดยาวผิดธรรมชาติ",
    architecture:
      "หินสีเทาด้าน หอนาฬิกาทราย และวิหารที่ไม่มีระฆัง",
    landmark: "The Temple of the Final Requiem",
    faction: "House Void-Requiem",
    accent: "#b5b2c7",
    symbol: "⌛",
    emblem: "/images/houses/void-requiem.webp",
  },
  {
    slug: "thalassara",
    name: "Thalassara",
    thaiName: "ธาลัสซารา",
    ruler: "Remuria Azure-Song",
    position: "south",
    title: "นครราชันวารี",
    description:
      "อาณาจักรใต้สมุทรลึก มีวังคริสตัลทะเลซึ่งสะท้อนแสงจันทร์",
    atmosphere:
      "เสียงเพลงจากมหาสมุทรไหลผ่านทุกอาคารราวกับเมืองทั้งเมืองกำลังขับขาน",
    architecture:
      "ปะการัง ไข่มุก โดมแก้วใต้น้ำ และสะพานที่สร้างจากกระแสน้ำ",
    landmark: "The Palace of the Deep Blue Opera",
    faction: "House Azure-Song",
    accent: "#67c8e8",
    symbol: "≋",
    emblem: "/images/houses/azure-song.webp",
  },
  {
    slug: "aurea-fortuna",
    name: "Aurea Fortuna",
    thaiName: "เอาเรีย ฟอร์ทูนา",
    ruler: "Fortuna Royal-Flush",
    position: "southwest",
    title: "นครทองคำแห่งโชคชะตา",
    description:
      "มหานครแห่งการค้าและความเป็นไปได้ ซึ่งทุกข้อตกลงอาจเปลี่ยนอนาคต",
    atmosphere:
      "แสงนีออนและแสงทองส่องตลอดคืน ผู้คนซื้อขายทั้งสินค้า ข่าวสาร และโอกาส",
    architecture:
      "ตึกระฟ้า หอประมูล โรงมหรสพ และอาคารที่ประดับด้วยทองคำขาว",
    landmark: "The Palace of Fated Probability",
    faction: "House Royal-Flush",
    accent: "#f1a9d4",
    symbol: "◆",
    emblem: "/images/houses/royal-flush.webp",
  },
  {
    slug: "ferrum-vanguard",
    name: "Ferrum Vanguard",
    thaiName: "แฟร์รุม แวนการ์ด",
    ruler: "Remus Iron-Bastion",
    position: "west",
    title: "นครป้อมเหล็กพิทักษ์",
    description:
      "นครกำแพงเหล็กดำที่ไม่เคยมีศัตรูสามารถบุกทะลวงเข้ามาได้",
    atmosphere:
      "เสียงค้อนและเครื่องจักรดังก้องตลอดเวลา อากาศเต็มไปด้วยกลิ่นโลหะและถ่าน",
    architecture:
      "กำแพงสามชั้น ป้อมเหล็ก โรงหลอม และสะพานกลไก",
    landmark: "The Triple Iron Wall",
    faction: "House Iron-Bastion",
    accent: "#9ca8b4",
    symbol: "⬢",
    emblem: "/images/houses/iron-bastion.webp",
  },
  {
    slug: "nihil-ruina",
    name: "Nihil Ruina",
    thaiName: "นิฮิล รูอินา",
    ruler: "Erebos Night-Fall",
    position: "northwest",
    title: "แดนว่างเปล่าแห่งหายนะ",
    description:
      "ซากอาณาจักรต้องคำสาป ซึ่งเวลา แสง และความทรงจำไม่อาจดำรงอยู่ได้ตามปกติ",
    atmosphere:
      "ท้องฟ้ามืดสนิท ไม่มีรุ่งอรุณ และเสียงจากระยะไกลอาจดังอยู่ข้างหู",
    architecture:
      "ซากหินออบซิเดียน หอคอยบิดเบี้ยว และช่องว่างซึ่งไม่สะท้อนแสง",
    landmark: "The Obsidian Throne of Night",
    faction: "House Night-Fall",
    accent: "#a178e8",
    symbol: "◉",
    emblem: "/images/houses/night-fall.webp",
  },
];

export type Era = {
  slug: string;
  name: string;
  thaiName: string;
  ruler: string;
  duration: string;
  detail: string;
  description: string;
  events: string[];
  legacy: string;
  accent: string;
  symbol: string;
};

export const eras: Era[] = [
  {
    slug: "era-of-dawn",
    name: "Era of Dawn",
    thaiName: "ศักราชแห่งรุ่งอรุณ",
    ruler: "The First Emperor",
    duration: "250 ปี",
    detail: "การก่อตั้งจักรวรรดิและการถือกำเนิดของ Unity Crown",
    description:
      "ศักราชแรกของ Forcadia เริ่มขึ้นเมื่อเหล่านครรัฐยุติสงครามและรวมอำนาจไว้ภายใต้จักรวรรดิเดียวกัน",
    events: [
      "การรวมตัวของแปดตระกูลผู้พิทักษ์",
      "การสร้างนครหลวง Fourcadir",
      "การถือกำเนิดของ Unity Crown",
      "การบัญญัติกฎแห่งวัฏจักร",
    ],
    legacy:
      "เป็นรากฐานของจักรวรรดิ ระบบการปกครอง และความเชื่อว่าอำนาจต้องถูกส่งต่ออย่างสมดุล",
    accent: "#e7c66f",
    symbol: "☀",
  },
  {
    slug: "era-of-iron",
    name: "Era of Iron",
    thaiName: "ศักราชแห่งเหล็กกล้า",
    ruler: "House Iron-Bastion",
    duration: "250 ปี",
    detail: "ยุคแห่งการป้องกัน ความมั่นคง และกำแพงจักรวรรดิ",
    description:
      "ยุคที่จักรวรรดิต้องเผชิญภัยรุกรานจากภายนอก จึงเกิดการสร้างป้อมปราการและกองทัพถาวร",
    events: [
      "การสร้างกำแพงสามชั้นแห่ง Ferrum Vanguard",
      "การก่อตั้งกองทัพ Iron Wolves",
      "การวางระบบป้องกันนครหลวง",
      "การยุติสงครามชายแดน",
    ],
    legacy:
      "ทำให้ Forcadia กลายเป็นจักรวรรดิที่แทบไม่มีศัตรูภายนอกสามารถบุกทะลวงได้",
    accent: "#9ca8b4",
    symbol: "⬢",
  },
  {
    slug: "era-of-tides",
    name: "Era of Tides",
    thaiName: "ศักราชแห่งเกลียวคลื่น",
    ruler: "House Azure-Song",
    duration: "250 ปี",
    detail: "การขยายอำนาจผ่านมหาสมุทรและเส้นทางใหม่",
    description:
      "การปกครองของวารีนำพาจักรวรรดิออกสำรวจมหาสมุทรและสร้างเครือข่ายการค้าข้ามดินแดน",
    events: [
      "การก่อตั้งกองเรือ Azure Armada",
      "การค้นพบเส้นทางมหาสมุทรใหม่",
      "การสร้างนครใต้น้ำ Thalassara",
      "การเชื่อมการค้าระหว่างนครรัฐ",
    ],
    legacy:
      "ขยายอิทธิพลของ Forcadia และทำให้จักรวรรดิกลายเป็นศูนย์กลางการเดินทาง",
    accent: "#67c8e8",
    symbol: "≋",
  },
  {
    slug: "era-of-stars",
    name: "Era of Stars",
    thaiName: "ศักราชแห่งดวงดาว",
    ruler: "House ParadiseSwan",
    duration: "250 ปี",
    detail: "ยุคทองแห่งความรู้ ดาราศาสตร์ และเวทจักรวาล",
    description:
      "ศักราชแห่งการค้นคว้า เมื่อศาสตร์แห่งดวงดาว มิติ และกาลเวลาถูกพัฒนาถึงจุดสูงสุด",
    events: [
      "การก่อตั้ง Fourcadir Imperial Academy",
      "การสร้างสถานีขนส่งมิติ",
      "การพัฒนาเวทแรงโน้มถ่วง",
      "การบันทึกเส้นทางแห่งอนาคต",
    ],
    legacy:
      "วางรากฐานด้านการศึกษาและเวทมนตร์ขั้นสูงของจักรวรรดิ",
    accent: "#8ea1ff",
    symbol: "✦",
  },
  {
    slug: "era-of-chance",
    name: "Era of Chance",
    thaiName: "ศักราชแห่งความเป็นไปได้",
    ruler: "House Royal-Flush",
    duration: "250 ปี",
    detail: "ความรุ่งเรือง การค้า และความเสี่ยงที่สะสม",
    description:
      "ยุคแห่งเศรษฐกิจและการซื้อขายความเป็นไปได้ ซึ่งนำมาทั้งความมั่งคั่งและความเหลื่อมล้ำ",
    events: [
      "การก่อตั้ง Aurea Fortuna",
      "การสร้างตลาดความน่าจะเป็น",
      "การขยายระบบธนาคารจักรวรรดิ",
      "การเกิดฟองสบู่เศรษฐกิจครั้งใหญ่",
    ],
    legacy:
      "ทำให้จักรวรรดิร่ำรวย แต่ทิ้งปัญหาหนี้สินและอำนาจทุนไว้เบื้องหลัง",
    accent: "#f1a9d4",
    symbol: "◆",
  },
  {
    slug: "era-of-veil",
    name: "Era of Veil",
    thaiName: "ศักราชแห่งม่านพิษ",
    ruler: "House Venom-Veil",
    duration: "250 ปี",
    detail: "ยุคแห่งศีลธรรมสีเทา ความลับ และการทดลอง",
    description:
      "การแพทย์และชีวเวทก้าวหน้าอย่างรวดเร็ว แต่ถูกแลกมาด้วยการทดลองที่ไม่อาจเปิดเผย",
    events: [
      "การพัฒนายารักษาโรคระดับจักรวรรดิ",
      "การสร้างสายพันธุ์พืชเวทใหม่",
      "การก่อตั้งหน่วย Viper Shades",
      "เหตุการณ์ทดลองต้องห้าม Floraven",
    ],
    legacy:
      "สร้างความก้าวหน้าด้านชีวเวท พร้อมทิ้งคำถามเรื่องศีลธรรมไว้แก่คนรุ่นหลัง",
    accent: "#77d58b",
    symbol: "♢",
  },
  {
    slug: "era-of-requiem",
    name: "Era of Requiem",
    thaiName: "ศักราชแห่งบทเพลงอวสาน",
    ruler: "House Void-Requiem",
    duration: "250 ปี",
    detail: "การชำระล้าง การเสื่อมสลาย และความเงียบ",
    description:
      "ยุคแห่งการกำจัดสิ่งเสื่อมโทรมและการฟื้นฟูสมดุล แต่หลายสิ่งถูกลบหายไปพร้อมกัน",
    events: [
      "การชำระล้างคลังเวทต้องห้าม",
      "การก่อตั้ง Silentharrow",
      "การลบชื่อองค์กรกบฏจากประวัติศาสตร์",
      "การเตรียมคืนอำนาจสู่ Unity Crown",
    ],
    legacy:
      "ทำให้จักรวรรดิกลับสู่ความสงบ แต่ประวัติศาสตร์หลายส่วนถูกทำให้หายไป",
    accent: "#b5b2c7",
    symbol: "⌛",
  },
  {
    slug: "era-of-the-shattered-ring",
    name: "Era of the Shattered Ring",
    thaiName: "ศักราชแห่งวงแหวนแตกสลาย",
    ruler: "Undetermined",
    duration: "กำลังดำเนินอยู่",
    detail: "วงแหวนแตก วัฏจักรถูกท้าทาย และสงครามตระกูลเริ่มต้น",
    description:
      "ศักราชที่เริ่มต้นเมื่อ Erebos ปฏิเสธการคืนอำนาจ และ Unity Crown เกิดรอยร้าวเป็นครั้งแรก",
    events: [
      "บัลลังก์แห่งรัตติกาลว่างเปล่า",
      "Erebos ปฏิเสธกฎวัฏจักร",
      "Unity Crown เกิดรอยร้าว",
      "ความขัดแย้งระหว่างแปดตระกูลเริ่มรุนแรง",
    ],
    legacy:
      "ยังไม่มีผู้ใดรู้ว่าศักราชนี้จะจบลงด้วยการฟื้นคืนของจักรวรรดิ หรือการล่มสลายอย่างถาวร",
    accent: "#a178e8",
    symbol: "◉",
  },
];

export type LoreEntry = {
  slug: string;
  term: string;
  thaiName: string;
  category: string;
  meaning: string;
  description: string;
  origin: string;
  significance: string;
  related: string[];
  symbol: string;
};

export const lore: LoreEntry[] = [
  {
    slug: "unity-crown",
    term: "Unity Crown",
    thaiName: "มงกุฎเอกภาพ",
    category: "Imperial Artifact",
    meaning:
      "มงกุฎศูนย์กลางที่รับและถ่ายโอนอำนาจของจักรวรรดิทุก 250 ปี",
    description:
      "Unity Crown เป็นศูนย์รวมพลังของผู้ปกครองทั้งแปด และเป็นกลไกสำคัญในการรักษาวัฏจักรแห่งอำนาจ",
    origin:
      "สร้างขึ้นใน Era of Dawn โดยปฐมจักรพรรดิ เพื่อป้องกันมิให้ตระกูลใดครอบครองจักรวรรดิตลอดกาล",
    significance:
      "หาก Unity Crown ถูกทำลาย วัฏจักรการส่งต่ออำนาจและโครงสร้างจักรวรรดิอาจล่มสลายทั้งหมด",
    related: ["The Law of the Ring", "Sovereign Key", "Sacred Council of Eight"],
    symbol: "♛",
  },
  {
    slug: "sovereign-key",
    term: "Sovereign Key",
    thaiName: "กุญแจราชันย์",
    category: "Divine Artifact",
    meaning:
      "หนึ่งในแปดกุญแจราชันย์ซึ่งเป็นเศษอำนาจของปฐมจักรพรรดิ",
    description:
      "กุญแจแต่ละดอกถือครองอำนาจคนละด้าน และผูกพันกับสายเลือดของตระกูลผู้พิทักษ์",
    origin:
      "เกิดจากการแบ่งอำนาจของปฐมจักรพรรดิออกเป็นแปดส่วน ก่อนมอบให้ตระกูลผู้ก่อตั้ง",
    significance:
      "ผู้ที่รวบรวมกุญแจครบแปดดอก เชื่อว่าจะสามารถเปิดเส้นทางสู่ The Throne of God",
    related: ["Unity Crown", "The Throne of God", "The Eight Imperial Houses"],
    symbol: "⚿",
  },
  {
    slug: "law-of-the-ring",
    term: "The Law of the Ring",
    thaiName: "กฎแห่งวงแหวน",
    category: "Imperial Law",
    meaning:
      "กฎสูงสุดที่ห้ามผู้ปกครองยึดบัลลังก์ตลอดกาล",
    description:
      "กฎนี้กำหนดว่าทุกสองร้อยห้าสิบปี ผู้ปกครองต้องคืนอำนาจให้ Unity Crown",
    origin:
      "บัญญัติขึ้นพร้อมการก่อตั้งจักรวรรดิ เพื่อยุติสงครามแย่งชิงอำนาจ",
    significance:
      "การฝ่าฝืนกฎจะทำให้บุคคลนั้นถูกนับเป็นศัตรูของ Forcadia ทั้งปวง",
    related: ["Unity Crown", "Era", "Erebos Night-Fall"],
    symbol: "◯",
  },
  {
    slug: "sacred-council-of-eight",
    term: "Sacred Council of Eight",
    thaiName: "สภาศักดิ์สิทธิ์ทั้งแปด",
    category: "Imperial Institution",
    meaning:
      "สภาสูงสุดของผู้ปกครองทั้งแปดตระกูล",
    description:
      "สภามีหน้าที่กำหนดนโยบาย ดูแล Unity Crown และตัดสินข้อพิพาทระหว่างตระกูล",
    origin:
      "ก่อตั้งขึ้นใน Era of Dawn ภายในมหาปราสาทสัตตราชันย์",
    significance:
      "เป็นองค์กรเดียวที่มีอำนาจประกาศให้ผู้ปกครองคนหนึ่งเป็นศัตรูของจักรวรรดิ",
    related: ["The Eight Imperial Houses", "Unity Crown", "Central Capital"],
    symbol: "✦",
  },
  {
    slug: "domain",
    term: "Domain",
    thaiName: "เขตแดนอาคม",
    category: "High Magic",
    meaning:
      "เขตแดนอาคมที่เปลี่ยนกฎของพื้นที่ตามอำนาจของผู้ใช้",
    description:
      "เมื่อเปิดใช้ Domain สภาพแวดล้อมและกฎธรรมชาติในพื้นที่จะถูกแทนที่ด้วยอำนาจของผู้ครอบครอง",
    origin:
      "เป็นศาสตร์ขั้นสูงที่ถือกำเนิดจากการผสานพลังของเนตรราชันย์กับกุญแจราชันย์",
    significance:
      "การต่อสู้ระหว่างผู้ใช้ Domain มักถูกตัดสินจากผู้ที่สามารถรักษาเขตแดนของตนไว้ได้นานกว่า",
    related: ["Sovereign Key", "Royal Eye", "Half-God Power"],
    symbol: "◇",
  },
  {
    slug: "throne-of-god",
    term: "The Throne of God",
    thaiName: "บัลลังก์แห่งพระเจ้า",
    category: "Forbidden Mystery",
    meaning:
      "บัลลังก์ปริศนาที่เชื่อว่าสามารถเข้าถึงได้เมื่อรวบรวมกุญแจครบแปดดอก",
    description:
      "ไม่มีผู้ใดยืนยันว่าบัลลังก์นี้มีอยู่จริง หรือเป็นเพียงตำนานที่ปฐมจักรพรรดิสร้างไว้",
    origin:
      "ปรากฏครั้งแรกในบันทึกลับซึ่งถูกเก็บไว้ใต้พระราชวังกลาง",
    significance:
      "ผู้ที่ขึ้นนั่งบนบัลลังก์อาจสามารถควบคุมอำนาจของทั้งแปดตระกูล หรือทำลายวัฏจักรได้อย่างถาวร",
    related: ["Sovereign Key", "Unity Crown", "The First Emperor"],
    symbol: "♜",
  },
];
