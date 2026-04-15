import { motion } from "framer-motion";
import { Battery, Bluetooth, Volume2 } from "lucide-react";
import soundboksAngle from "@/assets/soundboks-angle.png";
import soundboksFront from "@/assets/soundboks-front.png";
import soundboksSide from "@/assets/soundboks-side.png";

const scrollTo = (id: string) => document.querySelector(id)?.scrollIntoView({ behavior: "smooth" });

const featurePills = [
  { icon: Volume2, label: "Massiv lyd", detail: "Op til 121 dB" },
  { icon: Battery, label: "Lang batteritid", detail: "Op til 40 timer" },
  { icon: Bluetooth, label: "Trådløs", detail: "Bluetooth 5.0" },
];

const ProductShowcase = () => {
  return (
    <section id="kvalitet" className="relative py-32 md:py-44 px-6 overflow-hidden bg-secondary/30">
      {/* Background glow */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-primary/8 blur-[150px]" />
      </motion.div>

      <div className="container mx-auto max-w-6xl relative z-10">

        {/* Header */}
        <motion.div
          className="text-center mb-6"
          initial={{ opacity: 0, filter: "blur(10px)", y: 30 }}
          whileInView={{ opacity: 1, filter: "blur(0px)", y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-primary font-heading font-medium tracking-widest uppercase text-sm mb-4">
            Oplev kvaliteten
          </p>
          <h2 className="font-heading text-4xl md:text-6xl font-bold mb-4">
            Soundboks <span className="text-primary">Go</span>
          </h2>
          <p className="text-muted-foreground text-lg md:text-xl max-w-md mx-auto">
            Kompakt, kraftig og klar til fest
          </p>
        </motion.div>

        {/* Feature pills */}
        <motion.div
          className="flex flex-wrap justify-center gap-4 mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          {featurePills.map((pill, i) => (
            <motion.div
              key={pill.label}
              className="flex items-center gap-2.5 rounded-full border border-border bg-card px-5 py-2.5"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.15 + i * 0.08 }}
            >
              <pill.icon className="w-4 h-4 text-primary" />
              <span className="text-foreground text-sm font-medium">{pill.label}</span>
              <span className="text-muted-foreground text-xs">· {pill.detail}</span>
            </motion.div>
          ))}
        </motion.div>

        {/* Three product image cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 items-center">

          {/* Side image */}
          <motion.a
            href="#priser"
            onClick={(e) => { e.preventDefault(); scrollTo("#priser"); }}
            className="flex items-center justify-center rounded-2xl border border-border bg-card cursor-pointer hover:border-primary/30 transition-colors p-8 group"
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0 }}
            whileHover={{ y: -6 }}
          >
            <img
              src={soundboksSide}
              alt="Soundboks Go side"
              loading="lazy"
              className="w-auto object-contain max-h-56 transition-transform duration-500 group-hover:scale-105"
            />
          </motion.a>

          {/* Front image — featured center */}
          <motion.a
            href="#priser"
            onClick={(e) => { e.preventDefault(); scrollTo("#priser"); }}
            className="flex items-center justify-center rounded-2xl border border-border bg-card cursor-pointer hover:border-primary/30 transition-colors p-10 sm:-my-4 sm:scale-105 z-10 relative group"
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            whileInView={{ opacity: 1, y: 0, scale: 1.05 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.12 }}
            whileHover={{ y: -6 }}
          >
            {/* Glow behind featured */}
            <div className="absolute inset-0 rounded-2xl bg-primary/5" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 rounded-full bg-primary/15 blur-[60px] pointer-events-none" />
            <img
              src={soundboksFront}
              alt="Soundboks Go forfra"
              loading="lazy"
              className="w-auto object-contain max-h-80 relative z-10 transition-transform duration-500 group-hover:scale-105 drop-shadow-[0_0_40px_hsl(24_95%_56%_/_0.25)]"
            />
          </motion.a>

          {/* Angle image */}
          <motion.a
            href="#priser"
            onClick={(e) => { e.preventDefault(); scrollTo("#priser"); }}
            className="flex items-center justify-center rounded-2xl border border-border bg-card cursor-pointer hover:border-primary/30 transition-colors p-8 group"
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.24 }}
            whileHover={{ y: -6 }}
          >
            <img
              src={soundboksAngle}
              alt="Soundboks Go vinkel"
              loading="lazy"
              className="w-auto object-contain max-h-56 transition-transform duration-500 group-hover:scale-105"
            />
          </motion.a>
        </div>

        {/* Bottom CTA link */}
        <motion.div
          className="flex justify-center mt-16"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <a
            href="#priser"
            onClick={(e) => { e.preventDefault(); scrollTo("#priser"); }}
            className="flex flex-col items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
          >
            <span className="text-sm font-heading tracking-wide">Se priser</span>
            <motion.svg
              width="20" height="20" viewBox="0 0 20 20" fill="none"
              className="stroke-current"
              animate={{ y: [0, 4, 0] }}
              transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
            >
              <path d="M5 8L10 13L15 8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </motion.svg>
          </a>
        </motion.div>

      </div>
    </section>
  );
};

export default ProductShowcase;
