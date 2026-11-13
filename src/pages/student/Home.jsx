import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Sparkles,
  Headphones,
  Image as ImageIcon,
  ClipboardCheck,
  ArrowRight,
  PlayCircle,
  Layers,
  Clock,
  GraduationCap,
} from "lucide-react";
import StudentNavbar from "../../components/StudentNavbar";
import MobileTabBar from "../../components/MobileTabBar";
import Footer from "../../components/Footer";
import Button from "../../components/Button";
import { useData } from "../../context/DataContext";

const features = [
  {
    icon: Headphones,
    title: "Écoute la prononciation",
    text: "Chaque mot peut être écouté pour apprendre la bonne prononciation française.",
    accent: "from-bright to-lavender",
  },
  {
    icon: ImageIcon,
    title: "Apprends par l'image",
    text: "Chaque scène illustre le vocabulaire pour mieux mémoriser les mots nouveaux.",
    accent: "from-lavender to-pinkpurple",
  },
  {
    icon: ClipboardCheck,
    title: "Teste tes connaissances",
    text: "Un quiz à la fin de chaque conte pour vérifier ce que tu as retenu.",
    accent: "from-gold to-terracotta",
  },
];

const steps = [
  { n: "01", title: "Choisis ton conte", text: "Sélectionne une histoire adaptée à ton niveau." },
  { n: "02", title: "Vis chaque scène", text: "Explore le décor, écoute et découvre le vocabulaire." },
  { n: "03", title: "Teste-toi", text: "Réponds au quiz et suis tes progrès dans ton profil." },
];

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.12, ease: "easeOut" },
  }),
};

export default function Home() {
  const { stories } = useData();
  const featuredStory = stories.find((s) => s.scenes.length > 0) || stories[0];
  const wordsCount = featuredStory.scenes.reduce((n, s) => n + s.words.length, 0);
  const galleryScenes = [...featuredStory.scenes, ...featuredStory.scenes];

  return (
    <div className="min-h-screen bg-paper-gradient text-navy font-body flex flex-col overflow-x-hidden">
      <StudentNavbar />

      <main className="flex-1 pb-20 md:pb-0">
        {/* Hero */}
        <section className="relative overflow-hidden">
          <motion.div
            className="absolute -top-24 -left-24 w-72 h-72 rounded-full bg-royal/10 blur-3xl"
            animate={{ scale: [1, 1.15, 1], opacity: [0.6, 0.9, 0.6] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute top-10 -right-20 w-80 h-80 rounded-full bg-pinkpurple/15 blur-3xl"
            animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.8, 0.5] }}
            transition={{ duration: 9, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          />
          <motion.div
            className="absolute bottom-0 left-1/3 w-64 h-64 rounded-full bg-gold/15 blur-3xl"
            animate={{ scale: [1, 1.1, 1], opacity: [0.4, 0.7, 0.4] }}
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
          />
          {[...Array(10)].map((_, i) => (
            <motion.span
              key={i}
              className="absolute w-1.5 h-1.5 rounded-full bg-gold/80"
              style={{ top: `${10 + ((i * 37) % 80)}%`, left: `${5 + ((i * 53) % 90)}%` }}
              animate={{ opacity: [0.2, 1, 0.2], scale: [0.8, 1.4, 0.8] }}
              transition={{ duration: 2.5 + (i % 4), repeat: Infinity, delay: i * 0.3 }}
            />
          ))}

          <div className="relative max-w-6xl mx-auto px-5 pt-14 pb-10 md:pt-20 md:pb-16 grid md:grid-cols-2 gap-10 items-center">
            <div>
              <motion.span
                variants={fadeUp}
                initial="hidden"
                animate="show"
                custom={0}
                className="inline-flex items-center gap-2 text-xs font-mono tracking-wider uppercase text-terracotta bg-white border border-gold/30 shadow-soft rounded-full px-3 py-1.5 mb-5"
              >
                <Sparkles size={14} /> Apprentissage du FLE en réalité virtuelle
              </motion.span>

              <motion.h1
                variants={fadeUp}
                initial="hidden"
                animate="show"
                custom={1}
                className="font-display text-4xl md:text-6xl leading-[1.05] text-navy mb-5"
              >
                Apprends le français en{" "}
                <span className="relative inline-block">
                  <span className="relative z-10 bg-gradient-to-r from-terracotta via-gold to-lavender bg-clip-text text-transparent">
                    vivant un conte
                  </span>
                  <motion.span
                    className="absolute left-0 right-0 bottom-1 h-3 bg-gold/25 -z-0 rounded-full"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                    style={{ transformOrigin: "left" }}
                  />
                </span>
                , pas en le lisant.
              </motion.h1>

              <motion.p
                variants={fadeUp}
                initial="hidden"
                animate="show"
                custom={2}
                className="text-navy/70 text-base md:text-lg leading-relaxed mb-7 max-w-xl"
              >
                La plateforme ConteVR facilite l'apprentissage du vocabulaire français chez les
                élèves de deuxième année moyenne grâce à une expérience immersive en réalité
                virtuelle, basée sur le conte{" "}
                <em className="text-pinkpurple not-italic font-semibold">
                  Le petit garçon et la sorcière
                </em>
                . Motivation, mémorisation et engagement à travers des activités interactives.
              </motion.p>

              <motion.div variants={fadeUp} initial="hidden" animate="show" custom={3} className="flex flex-wrap gap-4 mb-8">
                <Button as={Link} to="/connexion" variant="primary">
                  Commencer l'apprentissage <ArrowRight size={16} />
                </Button>
                <Button as={Link} to="#histoire" variant="outline">
                  <PlayCircle size={16} /> Découvrir le conte
                </Button>
              </motion.div>

              <motion.div
                variants={fadeUp}
                initial="hidden"
                animate="show"
                custom={4}
                className="flex flex-wrap gap-6"
              >
                {[
                  { icon: Layers, value: featuredStory.scenes.length, label: "scènes immersives" },
                  { icon: Sparkles, value: wordsCount, label: "mots de vocabulaire" },
                  { icon: Clock, value: featuredStory.duration, label: "durée moyenne" },
                ].map(({ icon: Icon, value, label }) => (
                  <div key={label} className="flex items-center gap-2.5">
                    <span className="w-9 h-9 rounded-full bg-white border border-bright/20 shadow-soft flex items-center justify-center shrink-0">
                      <Icon size={15} className="text-royal" />
                    </span>
                    <div className="leading-tight">
                      <p className="font-display text-lg text-navy">{value}</p>
                      <p className="text-[11px] text-navy/50">{label}</p>
                    </div>
                  </div>
                ))}
              </motion.div>
            </div>

            {/* Floating story-image mockup */}
            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3, ease: "easeOut" }}
              className="relative"
            >
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                className="relative rounded-[2rem] overflow-hidden border border-bright/20 shadow-soft bg-white"
              >
                {featuredStory.scenes[0]?.image ? (
                  <img
                    src={featuredStory.scenes[0].image}
                    alt={featuredStory.title}
                    className="w-full h-72 md:h-80 object-cover"
                  />
                ) : (
                  <div className="w-full h-72 md:h-80 flex items-center justify-center text-8xl bg-gradient-to-br from-royal/10 to-lavender/10">
                    {featuredStory.cover}
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-navy/70 via-navy/0 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                  <div>
                    <p className="text-cream/70 text-[11px] uppercase tracking-wider font-mono">
                      {featuredStory.level}
                    </p>
                    <p className="text-cream font-display text-lg">{featuredStory.title}</p>
                  </div>
                  <Link
                    to="/connexion"
                    className="w-11 h-11 rounded-full bg-gradient-to-r from-terracotta to-gold flex items-center justify-center shadow-glow shrink-0"
                    aria-label="Commencer"
                  >
                    <PlayCircle size={20} className="text-navy" />
                  </Link>
                </div>
              </motion.div>

              {/* floating badge */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0, y: [0, -6, 0] }}
                transition={{ opacity: { delay: 0.8 }, x: { delay: 0.8 }, y: { duration: 4, repeat: Infinity } }}
                className="absolute -bottom-6 -left-6 bg-white rounded-2xl border border-bright/15 shadow-soft px-4 py-3 flex items-center gap-3"
              >
                <span className="w-9 h-9 rounded-xl bg-gradient-to-br from-bright to-lavender flex items-center justify-center shrink-0">
                  <GraduationCap size={17} className="text-navy" />
                </span>
                <div className="leading-tight">
                  <p className="text-sm font-semibold text-navy">2ème année</p>
                  <p className="text-[11px] text-navy/50">moyenne</p>
                </div>
              </motion.div>
              <motion.div
                className="absolute -top-5 -right-5 w-16 h-16 rounded-2xl bg-terracotta/20 blur-2xl"
                animate={{ opacity: [0.4, 0.9, 0.4] }}
                transition={{ duration: 4, repeat: Infinity }}
              />
            </motion.div>
          </div>
        </section>

        {/* Scene gallery marquee */}
        <section className="py-8 md:py-10 border-y border-bright/10 bg-white/60">
          <div className="overflow-hidden">
            <div className="flex gap-4 w-max animate-marquee">
              {galleryScenes.map((scene, i) => (
                <div
                  key={`${scene.id}-${i}`}
                  className="w-40 md:w-48 shrink-0 rounded-2xl overflow-hidden border border-bright/15 bg-white shadow-soft"
                >
                  {scene.image ? (
                    <img src={scene.image} alt={scene.nameFr} className="w-full h-28 md:h-32 object-cover" />
                  ) : (
                    <div className="w-full h-28 md:h-32 flex items-center justify-center text-4xl bg-royal/6">
                      {scene.emoji}
                    </div>
                  )}
                  <p className="text-xs text-navy/70 px-3 py-2 truncate">{scene.nameFr}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* How it works */}
        <section className="max-w-6xl mx-auto px-5 py-14 md:py-20">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="font-display text-2xl md:text-3xl text-center text-navy mb-2"
          >
            Comment ça marche
          </motion.h2>
          <p className="text-center text-navy/55 mb-10 max-w-lg mx-auto">
            Trois étapes simples entre toi et ta première aventure en français.
          </p>
          <div className="grid md:grid-cols-3 gap-6 relative">
            <div className="hidden md:block absolute top-7 left-[16.5%] right-[16.5%] h-0.5 bg-gradient-to-r from-bright via-lavender to-terracotta opacity-30" />
            {steps.map((step, i) => (
              <motion.div
                key={step.n}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, delay: i * 0.15 }}
                className="relative bg-white rounded-2xl border border-bright/15 shadow-soft p-6 text-center"
              >
                <span className="w-14 h-14 mx-auto rounded-2xl bg-gradient-to-br from-royal to-lavender flex items-center justify-center font-display text-lg text-cream mb-4 shadow-soft">
                  {step.n}
                </span>
                <h3 className="font-display text-lg text-navy mb-1.5">{step.title}</h3>
                <p className="text-sm text-navy/60 leading-relaxed">{step.text}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Features */}
        <section className="max-w-6xl mx-auto px-5 py-8 md:py-14">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="font-display text-2xl md:text-3xl text-center text-navy mb-10"
          >
            Une façon différente d'apprendre le vocabulaire
          </motion.h2>
          <div className="grid md:grid-cols-3 gap-5">
            {features.map(({ icon: Icon, title, text, accent }, i) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                whileHover={{ y: -6 }}
                className="rounded-2xl bg-white border border-bright/15 shadow-soft p-6 hover:border-gold/40 transition-colors duration-200"
              >
                <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${accent} flex items-center justify-center mb-4`}>
                  <Icon size={20} className="text-navy" />
                </div>
                <h3 className="font-display text-lg text-navy mb-2">{title}</h3>
                <p className="text-sm text-navy/60 leading-relaxed">{text}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Story showcase */}
        <motion.section
          id="histoire"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="max-w-6xl mx-auto px-5 py-12 md:py-16"
        >
          <div className="rounded-3xl bg-gradient-to-br from-royal/8 to-lavender/8 border border-bright/15 p-6 md:p-10 grid md:grid-cols-[auto_1fr] gap-8 items-center">
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="text-7xl md:text-8xl text-center"
            >
              {featuredStory.cover}
            </motion.div>
            <div>
              <span className="text-xs uppercase tracking-wider text-bright font-mono">
                {featuredStory.level}
              </span>
              <h2 className="font-display text-2xl md:text-3xl text-navy mt-1 mb-3">
                {featuredStory.title}
              </h2>
              <p className="text-navy/70 leading-relaxed mb-5">{featuredStory.summary}</p>
              <Button as={Link} to="/connexion" variant="secondary">
                Voir la fiche de l'histoire <ArrowRight size={16} />
              </Button>
            </div>
          </div>
        </motion.section>

        {/* Final CTA */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-5xl mx-auto px-5 py-12 md:py-16"
        >
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-navy via-royal to-indigo px-6 py-14 md:py-20 text-center shadow-soft">
            <div className="absolute inset-0 bg-stars opacity-30" />
            <div className="relative">
              <h2 className="font-display text-2xl md:text-4xl text-cream mb-4">
                Prêt à entrer dans le conte ?
              </h2>
              <p className="text-cream/70 mb-8 max-w-md mx-auto">
                Connecte-toi pour commencer l'aventure d'Esteban et apprendre tes premiers mots de
                français.
              </p>
              <Button as={Link} to="/connexion" variant="primary">
                Commencer l'apprentissage <ArrowRight size={16} />
              </Button>
            </div>
          </div>
        </motion.section>
      </main>

      <Footer />
      <MobileTabBar />
    </div>
  );
}
