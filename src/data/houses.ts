export type House = {
  slug: string;
  name: string;
  thaiName: string;
  ruler: string;
  rulerSlug: string;
  city: string;
  citySlug: string;
  emblem: string;
  emblemName: string;
  motto: string;
  accent: string;
  description: string;
  key: string;
  domain: string;
};

export const houses: House[] = [
  {
    slug: "saint-cross",
    name: "House Saint-Cross",
    thaiName: "ตระกูลเซนต์–ครอส",
    ruler: "Michael Fourcadir Saint-Cross",
    rulerSlug: "michael-saint-cross",
    city: "Lux Aeternum",
    citySlug: "lux-aeternum",
    emblem: "/images/crests-transparent/saint-cross.png",
    emblemName: "Shield of Dawn Light",
    motto: "Light judges all.",
    accent: "#e7c66f",
    description:
      "ตระกูลผู้พิทักษ์แสง กฎหมาย และคำปฏิญาณแห่งจักรวรรดิ",
    key: "The Key of Domination",
    domain: "Eternal Daybreak",
  },
  {
    slug: "paradise-swan",
    name: "House ParadiseSwan",
    thaiName: "ตระกูลพาราไดซ์–สวอน",
    ruler: "Astraea Fourcadir ParadiseSwan",
    rulerSlug: "astraea-paradiseswan",
    city: "Astra Caelum",
    citySlug: "astra-caelum",
    emblem: "/images/crests-transparent/paradise-swan.png",
    emblemName: "Cosmic Clock",
    motto: "Beyond time, the stars remember.",
    accent: "#8ea1ff",
    description:
      "ตระกูลแห่งดวงดาว มิติ กาลเวลา และการรังสรรค์เวทใหม่",
    key: "The Key of Chronos & Cosmos",
    domain: "Cosmic Genesis",
  },
  {
    slug: "venom-veil",
    name: "House Venom-Veil",
    thaiName: "ตระกูลเวนอม–เวล",
    ruler: "Abigail Fourcadir Venom-Veil",
    rulerSlug: "abigail-venom-veil",
    city: "Floraven Mortis",
    citySlug: "floraven-mortis",
    emblem: "/images/crests-transparent/venom-veil.png",
    emblemName: "Serpent Mask in the Mist",
    motto: "Every poison has a purpose.",
    accent: "#77d58b",
    description:
      "ตระกูลแห่งพิษ ชีวเวท จิตวิญญาณ และศาสตร์ต้องห้าม",
    key: "The Key of Psyche",
    domain: "Garden of Delirium",
  },
  {
    slug: "void-requiem",
    name: "House Void-Requiem",
    thaiName: "ตระกูลวอยด์–เรเควียม",
    ruler: "Last Fourcadir Void-Requiem",
    rulerSlug: "last-void-requiem",
    city: "Silentharrow",
    citySlug: "silentharrow",
    emblem: "/images/crests-transparent/void-requiem.png",
    emblemName: "Hourglass Tower",
    motto: "All things reach their final hour.",
    accent: "#b5b2c7",
    description:
      "ตระกูลแห่งความสูญสิ้น ความเงียบ และบทเพลงอวสาน",
    key: "The Key of Entropy",
    domain: "The Silent Graveyard",
  },
  {
    slug: "azure-song",
    name: "House Azure-Song",
    thaiName: "ตระกูลอาซัวร์–ซอง",
    ruler: "Remuria Fourcadir Azure-Song",
    rulerSlug: "remuria-azure-song",
    city: "Thalassara",
    citySlug: "thalassara",
    emblem: "/images/crests-transparent/azure-song.png",
    emblemName: "Conch of the Opera",
    motto: "The ocean remembers every song.",
    accent: "#67c8e8",
    description:
      "ตระกูลแห่งวารี ธาตุธรรมชาติ และมหาอุปรากรใต้สมุทร",
    key: "The Key of Elements",
    domain: "Deep Blue Opera",
  },
  {
    slug: "royal-flush",
    name: "House Royal-Flush",
    thaiName: "ตระกูลรอยัล–ฟลัช",
    ruler: "Fortuna Fourcadir Royal-Flush",
    rulerSlug: "fortuna-royal-flush",
    city: "Aurea Fortuna",
    citySlug: "aurea-fortuna",
    emblem: "/images/crests-transparent/royal-flush.png",
    emblemName: "Golden Dice of Fortune",
    motto: "Every miracle has a price.",
    accent: "#f1a9d4",
    description:
      "ตระกูลแห่งโชค ความเป็นไปได้ การค้า และการแลกเปลี่ยนชะตา",
    key: "The Key of Causality",
    domain: "Casino of Destiny",
  },
  {
    slug: "iron-bastion",
    name: "House Iron-Bastion",
    thaiName: "ตระกูลไอรอน–บาสเตียน",
    ruler: "Remus Fourcadir Iron-Bastion",
    rulerSlug: "remus-iron-bastion",
    city: "Ferrum Vanguard",
    citySlug: "ferrum-vanguard",
    emblem: "/images/crests-transparent/iron-bastion.png",
    emblemName: "Triple Iron Wall",
    motto: "We break before the empire does.",
    accent: "#9ca8b4",
    description:
      "ตระกูลแห่งเหล็กกล้า การพิทักษ์ และศาสตราระดับตำนาน",
    key: "The Key of Matter",
    domain: "Unlimited Iron Works",
  },
  {
    slug: "night-fall",
    name: "House Night-Fall",
    thaiName: "ตระกูลไนท์–ฟอล",
    ruler: "Erebos Fourcadir Night-Fall",
    rulerSlug: "erebos-night-fall",
    city: "Nihil Ruina",
    citySlug: "nihil-ruina",
    emblem: "/images/crests-transparent/night-fall.png",
    emblemName: "Nameless Eclipse",
    motto: "Night does not yield.",
    accent: "#a178e8",
    description:
      "ตระกูลที่สาบสูญ ผู้ครอบครองความว่าง ความโกลาหล และรัตติกาล",
    key: "The Key of Chaos",
    domain: "The Horizon of Nihility",
  },
];
