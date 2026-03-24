import { motion } from "framer-motion";
import heroImage from "@/assets/hero-speaker.jpg";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0">
        <img
          src={heroImage}
          alt="Soundboks Go højttaler til fest"
          className="w-full h-full object-cover"
          width={1920}
          height={1080}
        />
        <div className="absolute inset-0 bg-background/70" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
      </div>

      <div className="relative z-10 container mx-auto px-6 text-center">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-primary font-heading font-medium tracking-widest uppercase text-sm mb-6"
        >
          LejDinLyd
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="font-heading text-4xl md:text-6xl lg:text-7xl font-bold leading-tight max-w-4xl mx-auto mb-6"
        >
          Lej en Soundboks Go{" "}
          <span className="text-primary">nemt og hurtigt</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.25 }}
          className="text-muted-foreground text-lg md:text-xl max-w-xl mx-auto mb-10"
        >
          Perfekt til fest, forsamling og events
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <a
            href="#booking"
            className="inline-flex items-center justify-center px-8 py-4 rounded-lg bg-primary text-primary-foreground font-heading font-semibold text-lg hover:opacity-90 transition-all animate-glow-pulse"
          >
            Book nu
          </a>
          <a
            href="#priser"
            className="inline-flex items-center justify-center px-8 py-4 rounded-lg border border-border text-foreground font-heading font-semibold text-lg hover:bg-secondary transition-all"
          >
            Se priser
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
