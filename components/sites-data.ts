import type { StaticImport } from "next/dist/shared/lib/get-img-props"

export type Site = {
  name: string
  position: [number, number]
  image: string | StaticImport
  info: string
  speciality: string
  festival: string
  // Optional UI fields for richer details views
  location?: string
  century?: string
  rating?: number
  visitors?: string
  festivals?: string[]
}

// Images imported from the project's `home_photo` directory
// These imports resolve to static URLs at build time
// Note: One or two sites may not have exact matches and will fall back to placeholders in the UI
import Rumtek_Monastery from "../home_photo/Rumtek_Monastery.jpg"
import Tashiding_Monastery from "../home_photo/Tashiding Monastery.jpg"
import Pemayangtse_Monastery from "../home_photo/Pemayangtse Monastery.jpg"
import Enchey_Monastery from "../home_photo/Enchey_Monastery.jpg"
import Phodong_Monastery from "../home_photo/Phodong_Monastery.jpg"
import Ralong_Monastery from "../home_photo/Ralong_Monastery.jpg"
import Lingdum_Ranka_Monastery from "../home_photo/Lingdum (Ranka) Monastery.jpeg"
import Phensang_Monastery from "../home_photo/Phensang_Monastery.avif"
// No Tsuklakhang image available in home_photo; UI will show placeholder
import Khecheopalri_Lake from "../home_photo/Khecheopalri Lake (Sacred Lake).jpg"
import Gurudongmar_Lake from "../home_photo/gurudongmar_lake.jpeg"
import Rabdentse_Ruins from "../home_photo/Rabdentse Ruins.jpg"
import Yuksom_Norbugang from "../home_photo/Yuksom (Norbugang Coronation Throne).webp"
import Rumtek_Old from "../home_photo/Rumtek_Old_Monastery.webp"
import Zang_Dhok_Palri from "../home_photo/Zang Dhok Palri (Ralang Palchen) Monastery.jpg"
import Do_Drul_Chorten from "../home_photo/Do-drul_Chorten.jpg"
import Namchi_Char_Dham from "../home_photo/Namchi Char Dham (Siddhesvara Dham).jpg"
import Samdruptse_Guru from "../home_photo/Samdruptse (Guru Statue).jpg"
import Sanga_Choeling from "../home_photo/Sanga Choeling Monastery.webp"
import Dubdi_Yuksom from "../home_photo/Dubdi (Yuksom) Monastery.jpg"
import Tsechu_Bermoik from "../home_photo/Tsechu Bermoik Monastery.webp"
import Kabi_Longstok from "../home_photo/Kabi_Longstok.jpg"
import Rinchenpong_Monastery from "../home_photo/Rinchenpong Monastery.jpg"
import Hee_Bermiok_Chaya from "../home_photo/Hee Bermiok Chaya Monastery.jpg"
import Kunzang_Dechen_Odsal_Ling from "../home_photo/Kunzang Dechen Odsal Ling Monastery.jpeg"
import Lachen_Monastery from "../home_photo/Lachen_Monastery.jpeg"
import Lachung_Monastery from "../home_photo/Lachung_Monastery.jpg"
import Ralang_Hot_Springs from "../home_photo/Ralang Hot Springs (Religious site).jpg"
import Namgyal_Institute from "../home_photo/Namgyal Institute of Tibetology.webp"
import Buddha_Park from "../home_photo/Buddha Park (Tathagata Tsal).webp"

export const SITES: Site[] = [
  { name: "Rumtek Monastery", position: [27.338, 88.555], image: Rumtek_Monastery, info: "One of Sikkim’s largest monasteries, seat of the Karmapa Lama.", speciality: "Kagyupa sect architecture", festival: "Losar" },
  { name: "Tashiding Monastery", position: [27.319, 88.411], image: Tashiding_Monastery, info: "Built in the 17th century, considered one of the holiest monasteries.", speciality: "Sacred chorten", festival: "Bumchu Festival" },
  { name: "Pemayangtse Monastery", position: [27.287, 88.255], image: Pemayangtse_Monastery, info: "Famous for its wooden sculptures and close to Rabdentse ruins.", speciality: "Three-storey wooden architecture", festival: "Cham Dance" },
  { name: "Enchey Monastery", position: [27.341, 88.613], image: Enchey_Monastery, info: "18th-century monastery dedicated to Guru Padmasambhava.", speciality: "Gompa with murals", festival: "Detor Cham" },
  { name: "Phodong Monastery", position: [27.444, 88.606], image: Phodong_Monastery, info: "Important Kagyu monastery, rebuilt in the 18th century.", speciality: "Rich murals", festival: "Phodong Cham" },
  { name: "Ralong Monastery", position: [27.287, 88.454], image: Ralong_Monastery, info: "Monastery known for its annual Pang Lhabsol and religious dances.", speciality: "Kagyupa lineage rituals", festival: "Pang Lhabsol" },
  { name: "Lingdum (Ranka) Monastery", position: [27.285, 88.692], image: Lingdum_Ranka_Monastery, info: "Modern monastery with expansive courtyard near Gangtok.", speciality: "Contemporary monastic campus", festival: "Cham Dance" },
  { name: "Phensang Monastery", position: [27.382, 88.613], image: Phensang_Monastery, info: "Historic Nyingma monastery overlooking forested hills.", speciality: "Nyingma traditions", festival: "Phensang Tsehchu" },
  { name: "Tsuklakhang Palace Monastery", position: [27.332, 88.612], image: "/placeholder.jpg", info: "Royal chapel of the former Chogyals inside the palace complex.", speciality: "Royal rituals and relics", festival: "Losoong & Namsoong" },
  { name: "Khecheopalri Lake (Sacred Lake)", position: [27.362, 88.240], image: Khecheopalri_Lake, info: "Revered wish-fulfilling lake surrounded by forests.", speciality: "Pilgrimage lake, birds said to keep it clean", festival: "Maghe Purne" },
  { name: "Gurudongmar Lake (Sacred Lake)", position: [28.025, 88.711], image: Gurudongmar_Lake, info: "High-altitude sacred lake associated with Guru Padmasambhava.", speciality: "Turquoise glacial waters", festival: "Local offerings" },
  { name: "Rabdentse Ruins", position: [27.289, 88.232], image: Rabdentse_Ruins, info: "Archaeological remains of the second capital of Sikkim.", speciality: "Historic chortens and palace base", festival: "Heritage walks" },
  { name: "Yuksom (Norbugang Coronation Throne)", position: [27.374, 88.220], image: Yuksom_Norbugang, info: "Site where the first Chogyal was crowned by three lamas.", speciality: "Stone throne & chorten", festival: "Historical commemorations" },
  { name: "Rumtek Old Monastery (Lingshi)", position: [27.332, 88.555], image: Rumtek_Old, info: "Original Rumtek complex close to the newer monastery.", speciality: "Antique murals", festival: "Losar" },
  { name: "Zang Dhok Palri (Ralang Palchen) Monastery", position: [27.290, 88.458], image: Zang_Dhok_Palri, info: "Seat of the 12th Gyaltsab Rinpoche near Ralang.", speciality: "Kagyud seat", festival: "Cham Festival" },
  { name: "Do-drul Chorten", position: [27.320, 88.612], image: Do_Drul_Chorten, info: "Prominent stupa with 108 prayer wheels in Gangtok.", speciality: "Chorten complex", festival: "Circumambulation rituals" },
  { name: "Namchi Char Dham (Siddhesvara Dham)", position: [27.159, 88.355], image: Namchi_Char_Dham, info: "Pilgrimage complex with replicas of four Hindu Dhams.", speciality: "Syncretic pilgrimage site", festival: "Festive fairs" },
  { name: "Samdruptse (Guru Statue)", position: [27.175, 88.365], image: Samdruptse_Guru, info: "Gigantic statue of Guru Padmasambhava near Namchi.", speciality: "Hilltop statue", festival: "Offerings & prayers" },
  { name: "Sanga Choeling Monastery", position: [27.312, 88.245], image: Sanga_Choeling, info: "One of the oldest monasteries, above Pelling ridge.", speciality: "Ancient Nyingma architecture", festival: "Losar & Cham" },
  { name: "Dubdi (Yuksom) Monastery", position: [27.375, 88.213], image: Dubdi_Yuksom, info: "First monastery of Sikkim established in 1701.", speciality: "Historic Nyingma seat", festival: "Religious ceremonies" },
  { name: "Tsechu Bermoik Monastery", position: [27.241, 88.450], image: Tsechu_Bermoik, info: "Small but serene monastery in South Sikkim.", speciality: "Local traditions", festival: "Annual Tsechu" },
  { name: "Kabi Longstok (Sacred Treaty Site)", position: [27.425, 88.592], image: Kabi_Longstok, info: "Site commemorating the blood brotherhood treaty.", speciality: "Historical significance", festival: "Cultural programs" },
  { name: "Rinchenpong Monastery", position: [27.315, 88.157], image: Rinchenpong_Monastery, info: "Monastery known for its unique reclining Buddha.", speciality: "Reclining Buddha statue", festival: "Local Cham" },
  { name: "Hee Bermiok Chaya Monastery", position: [27.316, 88.168], image: Hee_Bermiok_Chaya, info: "Quiet monastery overlooking terraced hills.", speciality: "Countryside gompa", festival: "Community rituals" },
  { name: "Kunzang Dechen Odsal Ling Monastery (K.D.O.L.)", position: [27.239, 88.610], image: Kunzang_Dechen_Odsal_Ling, info: "Monastery on Rumtek-Gangtok road dedicated to Nyingma lineage.", speciality: "Prayer wheel corridor", festival: "Nyingma ceremonies" },
  { name: "Lachen Monastery", position: [27.723, 88.557], image: Lachen_Monastery, info: "Gompa serving the northern village of Lachen.", speciality: "Colorful murals", festival: "Local Cham" },
  { name: "Lachung Monastery", position: [27.693, 88.743], image: Lachung_Monastery, info: "Monastery amidst apple orchards and high valleys.", speciality: "Himalayan setting", festival: "Saga Dawa" },
  { name: "Ralang Hot Springs (Religious site)", position: [27.212, 88.406], image: Ralang_Hot_Springs, info: "Pilgrim-frequented hot springs near Ralang.", speciality: "Thermal springs", festival: "Seasonal fairs" },
  { name: "Namgyal Institute of Tibetology", position: [27.317, 88.613], image: Namgyal_Institute, info: "Museum and research center preserving Tibetan-Buddhist heritage.", speciality: "Rare manuscripts & thangkas", festival: "Cultural exhibitions" },
  { name: "Buddha Park (Tathagata Tsal)", position: [27.186, 88.372], image: Buddha_Park, info: "Park featuring a towering statue of Buddha at Ravangla.", speciality: "Pilgrimage and panoramic views", festival: "Buddha Jayanti" },
]



