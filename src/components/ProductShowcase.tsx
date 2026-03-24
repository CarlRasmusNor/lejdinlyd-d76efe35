import { motion } from "framer-motion";
import soundboksFront from "@/assets/soundboks-front.png";
import soundboksAngle from "@/assets/soundboks-angle.png";
import soundboksSide from "@/assets/soundboks-side.png";

const images = [
  { src: soundboksFront, alt: "Soundboks Go forfra" },
  { src: soundboksAngle, alt: "Soundboks Go vinkel" },
  { src: soundboksSide, alt: "Soundboks Go side" },
];

const ProductShowcase = () => {
  return (
    <section className="py-24 px-6 bg-secondary/30 overflow-hidden">
      <div className="container mx-auto max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="font-heading text-3xl md:text-5xl font-bold mb-4">
            Soundboks <span className="text-primary">Go</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-lg mx-auto">
            Kompakt, kraftig og klar til fest – se den fra alle vinkler.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 items-center">
          {images.map((img, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40, rotateY: -15 }}
              whileInView={{ opacity: 1, y: 0, rotateY: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.15, ease: "easeOut" }}
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
              className="flex items-center justify-center rounded-2xl border border-border bg-card p-8 group cursor-pointer hover:border-primary/30 transition-colors"
            >
              <motion.img
                src={img.src}
                alt={img.alt}
                loading="lazy"
                className="max-h-64 w-auto object-contain transition-transform duration-500 group-hover:scale-105"
                whileHover={{ rotate: [0, -2, 2, 0] }}
                transition={{ duration: 0.5 }}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductShowcase;
