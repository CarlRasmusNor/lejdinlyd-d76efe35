import { motion } from "framer-motion";
import heroBg from "@/assets/hero-bg.jpg";
import soundboksFront from "@/assets/soundboks-front.png";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background image with subtle zoom */}
      <motion.div
        className="absolute inset-0"
        initial={{ scale: 1.1 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1.8, ease: "easeOut" }}
      >
        <img
          src={heroBg}
          alt="Hyggeligt udendørs arrangement"
          className="w-full h-full object-cover"
          width={1920}
          height={1080}
        />
        <div className="absolute inset-0 bg-background/75" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
      </motion.div>

      {/* Ambient glow orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-primary/10 blur-[120px]"
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute -bottom-40 -left-40 w-80 h-80 rounded-full bg-primary/8 blur-[100px]"
          animate={{ scale: [1.2, 1, 1.2], opacity: [0.2, 0.4, 0.2] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <div className="relative z-10 container mx-auto px-6 flex flex-col lg:flex-row items-center gap-12 pt-20">
        <div className="flex-1 text-center lg:text-left">
          <motion.p
            initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.6 }}
            className="text-primary font-heading font-medium tracking-widest uppercase text-sm mb-6"
          >
            Soundboks udlejning i Aalborg
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="font-heading text-4xl md:text-6xl lg:text-7xl font-bold leading-tight max-w-2xl mb-6"
          >
            Lej en Soundboks Go
            <br />
            <span className="text-primary">i Aalborg &amp; omegn</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="text-muted-foreground text-lg md:text-xl max-w-xl mb-10 lg:mx-0 mx-auto"
          >
            Billig højtaler udlejning fra 150 kr/dag – perfekt til fest, events og forsamlinger i Aalborg
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
          >
            <a
              href="#booking"
              onClick={(e) => { e.preventDefault(); document.querySelector("#booking")?.scrollIntoView({ behavior: "smooth" }); }}
              className="inline-flex items-center justify-center px-8 py-4 rounded-lg bg-primary text-primary-foreground font-heading font-semibold text-lg hover:opacity-90 transition-all animate-glow-pulse active:scale-95"
            >
              Book nu
            </a>
            <a
              href="#priser"
              onClick={(e) => { e.preventDefault(); document.querySelector("#priser")?.scrollIntoView({ behavior: "smooth" }); }}
              className="inline-flex items-center justify-center px-8 py-4 rounded-lg border border-border text-foreground font-heading font-semibold text-lg hover:bg-secondary transition-all active:scale-95"
            >
              Se priser
            </a>
          </motion.div>
        </div>

        {/* Floating speaker animation */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
          className="flex-1 flex justify-center relative"
        >
          {/* Pulsing glow behind speaker */}
          <motion.div
            className="absolute inset-0 flex items-center justify-center"
            animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0.7, 0.3] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            <div className="w-64 h-64 md:w-72 md:h-72 rounded-full bg-primary/20 blur-[80px]" />
          </motion.div>

          {/* Spinning ring 1 */}
          <motion.div
            className="absolute inset-0 flex items-center justify-center"
            animate={{ rotate: 360 }}
            transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
          >
            <div className="w-72 h-72 md:w-80 md:h-80 rounded-full border-2 border-primary/20 border-t-primary/60" />
          </motion.div>

          {/* Spinning ring 2 */}
          <motion.div
            className="absolute inset-0 flex items-center justify-center"
            animate={{ rotate: -360 }}
            transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
          >
            <div className="w-96 h-96 md:w-[26rem] md:h-[26rem] rounded-full border border-primary/10 border-dashed border-b-primary/40" />
          </motion.div>

          {/* Sound wave rings */}
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="absolute inset-0 flex items-center justify-center"
              animate={{ scale: [1, 2.5], opacity: [0.4, 0] }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
                ease: "easeOut",
                delay: i * 0.8,
              }}
            >
              <div className="w-48 h-48 rounded-full border border-primary/30" />
            </motion.div>
          ))}

          {/* Floating speaker – party bounce */}
          <motion.img
            src={soundboksFront}
            alt="Soundboks Go"
            className="max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl drop-shadow-[0_0_80px_hsl(24_95%_53%/0.35)] relative z-10"
            animate={{
              y: [0, -35, 10, -25, 15, -30, 0],
              x: [0, 25, -20, 30, -25, 15, 0],
              rotate: [0, 6, -8, 5, -6, 4, 0],
              scale: [1, 1.07, 0.95, 1.06, 0.97, 1.04, 1],
            }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
      >
        <motion.div
          className="w-6 h-10 rounded-full border-2 border-muted-foreground/30 flex justify-center pt-2"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <motion.div
            className="w-1 h-2 rounded-full bg-primary"
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
