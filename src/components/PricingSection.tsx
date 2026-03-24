import { motion } from "framer-motion";
import { CalendarDays, PartyPopper } from "lucide-react";

const PricingSection = () => {
  return (
    <section id="priser" className="py-24 px-6">
      <div className="container mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="font-heading text-3xl md:text-5xl font-bold mb-4">
            Simple <span className="text-primary">priser</span>
          </h2>
          <p className="text-muted-foreground text-lg">Ingen skjulte gebyrer. Ingen overraskelser.</p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="rounded-2xl border border-border bg-card p-8 text-center"
          >
            <CalendarDays className="w-10 h-10 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground text-sm uppercase tracking-wider font-heading mb-2">Søndag – Torsdag</p>
            <p className="font-heading text-5xl font-bold text-foreground mb-1">150 <span className="text-xl font-normal text-muted-foreground">DKK</span></p>
            <p className="text-muted-foreground">per dag</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="rounded-2xl border border-primary/30 bg-card p-8 text-center relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-primary/5" />
            <div className="relative">
              <PartyPopper className="w-10 h-10 text-primary mx-auto mb-4" />
              <p className="text-primary text-sm uppercase tracking-wider font-heading mb-2">Fredag – Lørdag</p>
              <p className="font-heading text-5xl font-bold text-foreground mb-1">300 <span className="text-xl font-normal text-muted-foreground">DKK</span></p>
              <p className="text-muted-foreground">per dag</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
