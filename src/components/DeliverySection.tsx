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
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="rounded-2xl border border-border bg-card p-8"
          >
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
              <Truck className="w-6 h-6 text-primary" />
            </div>
            <h3 className="font-heading text-xl font-bold mb-3">Levering i Aalborg &amp; omegn</h3>
            <p className="text-muted-foreground leading-relaxed">
              Bor du i Aalborg eller nærområdet? Så kan vi levere din Soundboks Go direkte til din adresse. 
              Kontakt os for at aftale levering – det er nemt og fleksibelt.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="rounded-2xl border border-border bg-card p-8"
          >
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
              <MapPin className="w-6 h-6 text-primary" />
            </div>
            <h3 className="font-heading text-xl font-bold mb-3">Afhentning uden for området</h3>
            <p className="text-muted-foreground leading-relaxed">
              Bor du uden for Aalborg og nærområdet? Ingen problem – du kan afhente højttaleren på vores adresse: 
              <strong className="text-foreground"> Kjellerupsgade 4, 9000 Aalborg</strong>. 
              Vi aftaler et tidspunkt der passer dig.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default DeliverySection;
