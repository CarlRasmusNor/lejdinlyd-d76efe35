import { motion } from "framer-motion";
import { CalendarDays, PartyPopper, Music } from "lucide-react";

const PricingSection = () => {
  return (
    <section id="priser" className="py-24 px-6 overflow-hidden">
      <div className="container mx-auto max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="font-heading text-3xl md:text-5xl font-bold mb-4">
            Simple <span className="text-primary">priser</span>
          </h2>
          <p className="text-muted-foreground text-lg">Ingen skjulte gebyrer. Ingen overraskelser.</p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          <a href="#booking">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              whileHover={{ y: -8, transition: { duration: 0.25 } }}
              className="rounded-2xl border border-border bg-card p-8 text-center cursor-pointer hover:border-primary/40 transition-colors"
            >
              <motion.div
                whileHover={{ rotate: 12 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <CalendarDays className="w-10 h-10 text-muted-foreground mx-auto mb-4" />
              </motion.div>
              <p className="text-muted-foreground text-sm uppercase tracking-wider font-heading mb-2">Søndag – Torsdag</p>
              <p className="font-heading text-5xl font-bold text-foreground mb-1">150 <span className="text-xl font-normal text-muted-foreground">DKK</span></p>
              <p className="text-muted-foreground">per dag</p>
            </motion.div>
          </a>

          <a href="#booking">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              whileHover={{ y: -8, transition: { duration: 0.25 } }}
              className="rounded-2xl border border-primary/30 bg-card p-8 text-center relative overflow-hidden cursor-pointer hover:border-primary/60 transition-colors"
            >
              <div className="absolute inset-0 bg-primary/5" />
              {/* Animated shimmer */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/5 to-transparent skew-x-12"
                animate={{ x: ["-100%", "200%"] }}
                transition={{ duration: 3, repeat: Infinity, repeatDelay: 2, ease: "easeInOut" }}
              />
              <div className="relative">
                <motion.div
                  whileHover={{ rotate: 12 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <PartyPopper className="w-10 h-10 text-primary mx-auto mb-4" />
                </motion.div>
                <p className="text-primary text-sm uppercase tracking-wider font-heading mb-2">Fredag – Lørdag</p>
                <p className="font-heading text-5xl font-bold text-foreground mb-1">300 <span className="text-xl font-normal text-muted-foreground">DKK</span></p>
                <p className="text-muted-foreground">per dag</p>
              </div>
            </motion.div>
          </a>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            whileHover={{ y: -8, transition: { duration: 0.25 } }}
            className="rounded-2xl border border-border bg-card p-8 text-center flex flex-col justify-between hover:border-primary/30 transition-colors"
          >
            <div>
              <motion.div
                whileHover={{ rotate: 12 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Music className="w-10 h-10 text-muted-foreground mx-auto mb-4" />
              </motion.div>
              <p className="text-muted-foreground text-sm uppercase tracking-wider font-heading mb-2">Festivaler & Events</p>
              <p className="font-heading text-2xl font-bold text-foreground mb-2">Specialpris</p>
              <p className="text-muted-foreground text-sm mb-6">Kontakt os for et skræddersyet tilbud til din festival eller større event.</p>
            </div>
            <motion.a
              href="#kontakt"
              className="inline-flex items-center justify-center px-6 py-3 rounded-lg border border-primary text-primary font-heading font-semibold text-sm hover:bg-primary hover:text-primary-foreground transition-all"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              Kontakt os
            </motion.a>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
