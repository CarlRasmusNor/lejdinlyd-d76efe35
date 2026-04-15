import { motion } from "framer-motion";
import { MapPin, Truck } from "lucide-react";

const DeliverySection = () => {
  return (
    <section id="levering" className="py-24 px-6 bg-secondary/30 overflow-hidden">
      <div className="container mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="font-heading text-3xl md:text-5xl font-bold mb-4">
            Levering &amp; <span className="text-primary">afhentning</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Vi gør det nemt at leje en Soundboks i Aalborg – uanset hvor du befinder dig
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Delivery card */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
            className="rounded-2xl border border-border bg-card p-8 flex flex-col gap-4"
          >
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
              <Truck className="w-6 h-6 text-primary" />
            </div>
            <div>
              <div className="flex items-center gap-3 mb-3">
                <h3 className="font-heading text-xl font-bold">Levering i Aalborg &amp; omegn</h3>
                <span className="inline-block bg-primary text-primary-foreground text-xs font-bold px-2.5 py-1 rounded-full uppercase tracking-wide">
                  Gratis
                </span>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                Bor du i Aalborg eller nærområdet? Vi leverer din Soundboks Go direkte til din adresse –{" "}
                <span className="text-foreground font-medium">helt gratis</span>. Kontakt os for at aftale
                levering. Det er nemt og fleksibelt.
              </p>
            </div>
            <button
              onClick={() => document.querySelector("#booking")?.scrollIntoView({ behavior: "smooth" })}
              className="mt-auto w-full rounded-xl bg-primary text-primary-foreground font-heading font-semibold py-3 hover:opacity-90 transition-opacity"
            >
              Book nu
            </button>
          </motion.div>

          {/* Pickup card */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
            className="rounded-2xl border border-border bg-card p-8 flex flex-col gap-4"
          >
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
              <MapPin className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h3 className="font-heading text-xl font-bold mb-3">Afhentning uden for området</h3>
              <p className="text-muted-foreground leading-relaxed">
                Bor du uden for Aalborg og nærområdet? Ingen problem – du kan afhente højttaleren på vores
                adresse:{" "}
                <span className="text-foreground font-medium">Kjellerupsgade 4, 9000 Aalborg</span>. Vi
                aftaler et tidspunkt der passer dig.
              </p>
            </div>
            <button
              onClick={() => document.querySelector("#booking")?.scrollIntoView({ behavior: "smooth" })}
              className="mt-auto w-full rounded-xl border border-primary text-primary font-heading font-semibold py-3 hover:bg-primary/10 transition-colors"
            >
              Book nu
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default DeliverySection;
