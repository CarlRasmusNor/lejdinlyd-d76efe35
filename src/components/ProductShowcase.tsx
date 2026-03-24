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
    <section className="py-24 px-6 bg-secondary/30">
      <div className="container mx-auto max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
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
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              className="flex items-center justify-center rounded-2xl border border-border bg-card p-8"
            >
              <img
                src={img.src}
                alt={img.alt}
                loading="lazy"
                className="max-h-64 w-auto object-contain"
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductShowcase;
