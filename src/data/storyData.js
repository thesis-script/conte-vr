// Données de démonstration (seed) pour ConteVR.
// Ces valeurs ne sont utilisées que lors du tout premier chargement :
// ensuite, tout est lu/écrit depuis localStorage via DataContext.

const mainScenes = [
  {
    id: 1,
    nameFr: "Le village d'Esteban",
    emoji: "🏡",
    image: "/1.png",
    text: "Esteban habite un petit village paisible entouré de collines. Chaque matin, il rêve de partir à l'aventure au-delà des montagnes.",
    palette: "from-indigo to-royal",
    words: [
      { fr: "le village", ar: "القرية", hint: "Un groupe de maisons à la campagne." },
      { fr: "paisible", ar: "هادئ", hint: "Calme, tranquille." },
      { fr: "rêver", ar: "يحلم", hint: "Imaginer quelque chose pendant le sommeil ou l'éveil." },
    ],
  },
  {
    id: 2,
    nameFr: "Le désert",
    emoji: "🏜️",
    image: "/2.png",
    text: "Esteban avance seul dans le désert. Le sable brûlant s'étend à perte de vue sous un soleil immense.",
    palette: "from-royal to-bright",
    words: [
      { fr: "le désert", ar: "الصحراء", hint: "Une grande étendue de sable, sans eau." },
      { fr: "le sable", ar: "الرمل", hint: "Petits grains qui couvrent le sol du désert." },
      { fr: "brûlant", ar: "حارق", hint: "Très chaud." },
    ],
  },
  {
    id: 3,
    nameFr: "La rencontre avec Cucaracha",
    emoji: "🪳",
    image: "/3.png",
    text: "Au milieu des dunes, Esteban croise Cucaracha, un insecte curieux et bavard qui connaît tous les secrets du désert.",
    palette: "from-bright to-lavender",
    words: [
      { fr: "rencontrer", ar: "يلتقي", hint: "Voir quelqu'un pour la première fois." },
      { fr: "curieux", ar: "فضولي", hint: "Qui veut tout savoir." },
      { fr: "bavard", ar: "ثرثار", hint: "Qui parle beaucoup." },
    ],
  },
  {
    id: 4,
    nameFr: "Le monde du scorpion",
    emoji: "🦂",
    image: "/4.png",
    text: "Cucaracha conduit Esteban jusqu'au royaume du scorpion, gardien redouté des dunes les plus dangereuses.",
    palette: "from-lavender to-pinkpurple",
    words: [
      { fr: "le scorpion", ar: "العقرب", hint: "Petit animal du désert avec un dard venimeux." },
      { fr: "le gardien", ar: "الحارس", hint: "Celui qui protège un lieu." },
      { fr: "redouté", ar: "مَهيب", hint: "Que l'on craint beaucoup." },
    ],
  },
  {
    id: 5,
    nameFr: "La maison de la sorcière",
    emoji: "🏠",
    image: "/5.png",
    text: "Enfin, Esteban découvre une étrange maison cachée derrière les rochers : celle de la sorcière du désert.",
    palette: "from-pinkpurple to-terracotta",
    words: [
      { fr: "la sorcière", ar: "الساحرة", hint: "Femme qui pratique la magie." },
      { fr: "étrange", ar: "غريب", hint: "Bizarre, inhabituel." },
      { fr: "caché", ar: "مخفي", hint: "Que l'on ne voit pas facilement." },
    ],
  },
  {
    id: 6,
    nameFr: "La forêt enchantée",
    emoji: "🌳",
    image: "/6.png",
    text: "La sorcière ouvre un passage magique vers une forêt enchantée, pleine de lumières et de bruits mystérieux.",
    palette: "from-terracotta to-gold",
    words: [
      { fr: "la forêt", ar: "الغابة", hint: "Un grand espace couvert d'arbres." },
      { fr: "enchanté", ar: "مسحور", hint: "Transformé par la magie." },
      { fr: "mystérieux", ar: "غامض", hint: "Difficile à comprendre ou expliquer." },
    ],
  },
  {
    id: 7,
    nameFr: "La rencontre avec la fée",
    emoji: "🧚",
    image: "/7.png",
    text: "Au cœur de la forêt, Esteban rencontre une fée bienveillante qui l'aide à retrouver son chemin vers la maison.",
    palette: "from-gold to-brown",
    words: [
      { fr: "la fée", ar: "الجنية", hint: "Petit être magique et bienveillant." },
      { fr: "bienveillant", ar: "ودود", hint: "Qui veut du bien aux autres." },
      { fr: "le chemin", ar: "الطريق", hint: "Le trajet à suivre pour aller quelque part." },
    ],
  },
  {
    id: 8,
    nameFr: "Le retour au village",
    emoji: "🏡",
    image: "/8.png",
    text: "Esteban rentre enfin chez lui, transformé par son voyage, prêt à raconter son aventure à tout le village.",
    palette: "from-brown to-navy",
    words: [
      { fr: "le retour", ar: "العودة", hint: "Le fait de revenir à un endroit." },
      { fr: "transformé", ar: "متحول", hint: "Qui a changé profondément." },
      { fr: "raconter", ar: "يحكي", hint: "Dire une histoire à quelqu'un." },
    ],
  },
];

export const seedStories = [
  {
    id: "petit-garcon-sorciere",
    title: "Le petit garçon et la sorcière",
    level: "2ème année moyenne",
    cover: "🌙",
    summary:
      "Esteban quitte son village pour traverser le désert, affronter ses peurs et découvrir la maison d'une mystérieuse sorcière. Une aventure pour apprendre le vocabulaire français pas à pas.",
    duration: "25 min",
    status: "Publié",
    scenes: mainScenes,
  },
  {
    id: "foret-perdue",
    title: "La forêt perdue",
    level: "2ème année moyenne",
    cover: "🌲",
    summary: "Deux enfants explorent une forêt mystérieuse à la recherche d'un trésor caché.",
    duration: "18 min",
    status: "Brouillon",
    scenes: [],
  },
  {
    id: "voyage-etoiles",
    title: "Le voyage des étoiles",
    level: "2ème année moyenne",
    cover: "✨",
    summary: "Une aventure spatiale pour apprendre le vocabulaire de l'astronomie.",
    duration: "20 min",
    status: "Publié",
    scenes: [],
  },
  {
    id: "secret-riviere",
    title: "Le secret de la rivière",
    level: "2ème année moyenne",
    cover: "🌊",
    summary: "Un conte calme autour d'une rivière qui cache un secret ancien.",
    duration: "15 min",
    status: "Brouillon",
    scenes: [],
  },
];

export const seedQuizzes = {
  "petit-garcon-sorciere": [
    {
      id: "q1",
      type: "mcq",
      question: "Où Esteban habite-t-il au début de l'histoire ?",
      options: ["Dans une grande ville", "Dans un petit village", "Sur une île", "Dans la forêt"],
      answer: 1,
    },
    {
      id: "q2",
      type: "mcq",
      question: "Qui Esteban rencontre-t-il en premier dans le désert ?",
      options: ["La sorcière", "La fée", "Cucaracha", "Le scorpion"],
      answer: 2,
    },
    {
      id: "q3",
      type: "mcq",
      question: "Que signifie le mot « bienveillant » ?",
      options: ["Méchant", "Qui veut du bien aux autres", "Rapide", "Fatigué"],
      answer: 1,
    },
    {
      id: "q4",
      type: "match",
      question: "Associe chaque mot à son image",
      pairs: [
        { word: "le désert", emoji: "🏜️" },
        { word: "la sorcière", emoji: "🧙" },
        { word: "la forêt", emoji: "🌳" },
        { word: "la fée", emoji: "🧚" },
      ],
    },
    {
      id: "q5",
      type: "mcq",
      question: "Comment se termine l'histoire d'Esteban ?",
      options: [
        "Il reste dans la forêt enchantée",
        "Il se perd dans le désert",
        "Il rentre transformé au village",
        "Il devient sorcier",
      ],
      answer: 2,
    },
  ],
};

export const seedStudents = [
  { id: 1, nom: "Belkacem", prenom: "Yasmine", classe: "2AM1", genre: "Fille", completion: 100, lastScore: 90, storiesDone: 3 },
  { id: 2, nom: "Haddad", prenom: "Rayan", classe: "2AM1", genre: "Garçon", completion: 75, lastScore: 65, storiesDone: 2 },
  { id: 3, nom: "Cherif", prenom: "Lina", classe: "2AM2", genre: "Fille", completion: 100, lastScore: 85, storiesDone: 4 },
  { id: 4, nom: "Mansouri", prenom: "Yacine", classe: "2AM2", genre: "Garçon", completion: 50, lastScore: 55, storiesDone: 1 },
  { id: 5, nom: "Boudiaf", prenom: "Amira", classe: "2AM1", genre: "Fille", completion: 90, lastScore: 80, storiesDone: 3 },
  { id: 6, nom: "Amrani", prenom: "Sofiane", classe: "2AM3", genre: "Garçon", completion: 30, lastScore: 40, storiesDone: 1 },
  { id: 7, nom: "El Houda", prenom: "Nour", classe: "2AM2", genre: "Fille", completion: 100, lastScore: 95, storiesDone: 4 },
  { id: 8, nom: "Bensaid", prenom: "Ilyes", classe: "2AM3", genre: "Garçon", completion: 60, lastScore: 70, storiesDone: 2 },
];

export const seedTeacherProfile = {
  prenom: "Sarah",
  nom: "Bensaid",
  email: "s.bensaid@ecole-contevr.dz",
  matiere: "Français",
  telephone: "05 55 12 34 56",
  etablissement: "Collège El Amir Abdelkader",
  identifiant: "",
};

