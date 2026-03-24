import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import soundboksFront from "@/assets/soundboks-front.png";
import soundboksAngle from "@/assets/soundboks-angle.png";
import soundboksSide from "@/assets/soundboks-side.png";
import { Volume2, Battery, Bluetooth } from "lucide-react";

const features = [
  { icon: Volume2, label: "Massiv lyd", desc: "Op til 121 dB" },
  { icon: Battery, label: "Lang batteritid", desc: "Op til 40 timer" },
  { icon: Bluetooth, label: "Trådløs", desc: "Bluetooth 5.0" },
];

const images = [
  { src: soundboksSide, alt: "Soundboks Go side" },
  { src: soundboksFront, alt: "Soundboks Go forfra" },
  { src: soundboksAngle, alt: "Soundboks Go vinkel" },
];

const ProductShowcase = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);

  return (
    <section
      ref={sectionRef}
      className="relative py-32 md:py-44 px-6 overflow-hidden bg-secondary/30"
    >
      {/* Ambient background glow */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{ y: bgY }}
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-primary/8 blur-[150px]" />
      </motion.div>

      <div className="container mx-auto max-w-6xl relative z-10">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-6"
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
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-4 mb-16"
        >
          {features.map((f, i) => (
            <motion.div
              key={f.label}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.3 + i * 0.1 }}
              className="flex items-center gap-2.5 rounded-full border border-border bg-card px-5 py-2.5"
            >
              <f.icon className="w-4 h-4 text-primary" />
              <span className="text-foreground text-sm font-medium">{f.label}</span>
              <span className="text-muted-foreground text-xs">· {f.desc}</span>
            </motion.div>
          ))}
        </motion.div>

        {/* Product images – large center, smaller sides */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 items-center">
          {images.map((img, i) => {
            const isCenter = i === 1;
            return (
              <a href="#priser" key={i}>
                <motion.div
                  initial={{ opacity: 0, y: 50, scale: 0.9 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.7,
                    delay: isCenter ? 0.1 : 0.25 + i * 0.1,
                    ease: "easeOut",
                  }}
                  whileHover={{ y: -10, transition: { duration: 0.3 } }}
                  className={`flex items-center justify-center rounded-2xl border border-border bg-card group cursor-pointer hover:border-primary/30 transition-colors ${
                    isCenter ? "p-10 sm:-my-4 sm:scale-105 z-10" : "p-8"
                  }`}
                >
                  <motion.img
                    src={img.src}
                    alt={img.alt}
                    loading="lazy"
                    className={`w-auto object-contain transition-transform duration-500 group-hover:scale-105 ${
                      isCenter ? "max-h-80" : "max-h-56"
                    }`}
                  />
                </motion.div>
              </a>
            );
          })}
        </div>

        {/* Scroll-down arrow into pricing */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8 }}
          className="flex justify-center mt-16"
        >
          <motion.a
            href="#priser"
            className="flex flex-col items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            <span className="text-sm font-heading tracking-wide">Se priser</span>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="stroke-current">
              <path d="M5 8L10 13L15 8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};

export default ProductShowcase;
