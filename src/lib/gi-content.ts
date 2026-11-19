/**
 * Client-Editable Content File: Mithila Makhana Geographical Indication (GI) Identity
 * 
 * Management and legal counsel can review and update all statements here.
 * Any edits in this file are automatically reflected across the website.
 */

export interface GIDistrict {
  name: string;
  role: string;
  description: string;
  coordinates: { x: number; y: number }; // Relative percentage coordinates for the interactive map
}

export interface GIPillar {
  title: string;
  tagline: string;
  content: string[];
}

export interface MithilaGIContent {
  sectionTitle: string;
  sectionEyebrow: string;
  leadParagraph: string;
  supportingParagraph: string;
  districts: GIDistrict[];
  pillars: GIPillar[];
  preservationStatement: string;
  legalNotice: {
    heading: string;
    body: string;
    compliancePoints: string[];
    reviewStatus: string;
  };
}

export const MITHILA_GI_CONTENT: MithilaGIContent = {
  sectionEyebrow: "Geographical Indication · Terroir & Provenance",
  sectionTitle: "Mithila Makhana – A Heritage Rooted in Bihar",
  leadParagraph:
    "Mithila Makhana is not just an agricultural crop; it is an irreplaceable cultural, ecological, and nutritional heritage intrinsic to the freshwater wetland ecosystems of North Bihar. In recognition of its singular geographical origin, distinct morphology, and centuries of traditional harvesting craft, it has been accorded formal protection as a Geographical Indication (GI).",
  supportingParagraph:
    "Across the sacred aquatic floodplains of the Kosi, Kamla, and Bagmati river basins, generations of harvesting families have cultivated Euryale ferox in harmony with nature. Preserving the authenticity, traceability, and terroir of Mithila Makhana is paramount to safeguarding both farmer livelihoods and genuine consumer trust worldwide.",
  
  districts: [
    {
      name: "Darbhanga & Madhubani",
      role: "Historic Mithila Heartland",
      description: "Center of traditional pond cultivation, cultural folklore, and historical breeding lines of aquatic gorgon nut.",
      coordinates: { x: 38, y: 35 },
    },
    {
      name: "Purnia (AVRELLE Headquarters)",
      role: "Aggregation & Modern Sortex Hub",
      description: "Primary commercial trading center connecting eastern wetland harvesters with national and global supply chains.",
      coordinates: { x: 72, y: 45 },
    },
    {
      name: "Katihar & Araria",
      role: "Kosi & Mahananda Basin",
      description: "Perennial oxbow lakes and alluvial marshes renowned for yielding nutrient-dense, high-density black seeds.",
      coordinates: { x: 78, y: 55 },
    },
    {
      name: "Saharsa & Supaul",
      role: "Riverine Floodplain Belts",
      description: "Natural wetlands enriched by seasonal silt, giving harvested nuts high natural potassium and magnesium.",
      coordinates: { x: 55, y: 40 },
    },
    {
      name: "Sitamarhi & Muzaffarpur",
      role: "Western Mithila Corridors",
      description: "Extensive agricultural ponds contributing to early-season harvest aggregation.",
      coordinates: { x: 25, y: 38 },
    },
  ],

  pillars: [
    {
      title: "1. Regional Identity & Terroir",
      tagline: "Shaped by Subtropical Wetland Ecology",
      content: [
        "Mithila Makhana is cultivated in natural freshwater bodies locally designated as pokhar, chaur, and maun across North Bihar.",
        "The region's unique subtropical humidity, stagnant organic-rich silt, and sub-surface water minerals nurture wild and cultivated gorgon nut lilies that cannot be replicated in arid or mechanical commercial farms.",
        "The resulting puffed nut is characterized by superior tenderness, pure white inner endosperm, and light, airy crunch upon natural popping.",
      ],
    },
    {
      title: "2. Cultural & Agronomic Significance",
      tagline: "Sacred Symbol of Purity & Prosperity",
      content: [
        "In Mithila culture, makhana is consecrated as an emblem of auspiciousness, integral to every sacred ritual, marriage ceremony, and Kojagari Purnima celebration.",
        "Traditional harvesting is an extraordinary human art practiced by the indigenous Mallah and Sahni communities, who dive into murky pond depths with bamboo Kaara nets to collect sunken seed pods.",
        "Unlike commercial monocultures, wetland makhana farming preserves aquatic biodiversity, acting as a refuge for waterfowl and natural aquatic fauna.",
      ],
    },
    {
      title: "3. Preserving Authenticity & Combating Adulteration",
      tagline: "Why Origin Integrity Matters",
      content: [
        "With surging international demand, generic fox nuts from undocumented origins are frequently commingled with authentic Mithila stock or subjected to chemical whitening agents.",
        "Preserving the Geographical Indication identity ensures that only nuts naturally harvested, clay-oven roasted, and mechanically sorted within the certified geographic boundary carry the proud heritage of Mithila.",
        "AVRELLE AGRO advocates for transparent batch logging from primary farm aggregation to final dispatch, preventing geographic misrepresentation.",
      ],
    },
  ],

  preservationStatement:
    "Protecting the GI identity of Mithila Makhana is an obligation to the wetland harvesters whose generational craft created this superfood. Safeguarding origin integrity protects the fair economic value of Bihar's soil and guarantees genuine purity for discerning consumers across the globe.",

  legalNotice: {
    heading: "Statutory Governance & Geographical Indication Notice",
    body:
      "A Geographical Indication (GI) is a statutory designation of goods originating from a specific geographic territory possessing qualities or reputation attributable to that origin, protected under the Geographical Indications of Goods (Registration and Protection) Act, 1999. It identifies the agricultural produce of the certified region and does not automatically confer GI-certified status upon every commercial enterprise dealing in that commodity.",
    compliancePoints: [
      "AVRELLE AGRO PVT LTD operates as an agro-processing and trading enterprise based in Purnia, Bihar, within the recognized makhana agricultural belt.",
      "Primary raw material is procured through grower aggregation networks in Purnia and contiguous Mithila wetland districts.",
      "The use of official GI certification emblems, registered authorized-user titles, or specific product endorsements is governed by statutory statutory entitlements and formal verification.",
      "We do not claim universal GI certification across all commercial product lines; specific batch origin eligibility is maintained in internal procurement logs.",
      "No official Government GI marks or logos are displayed on this website without explicit authorization.",
    ],
    reviewStatus: "Subject to ongoing review and formal authorization by AVRELLE AGRO PVT LTD Corporate Legal Desk.",
  },
};

