import { motion } from "framer-motion";
import { CalendarDays, PartyPopper, Music } from "lucide-react";

const plans = [
  { icon: CalendarDays, label: "Søndag – Torsdag", price: "150", href: "#booking" },
  { icon: PartyPopper, label: "Fredag – Lørdag", price: "300", href: "#booking", featured: true },
  { icon: Music, label: "Festivaler & Events", price: null, href: "#kontakt" },
];

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
          {plans.map((plan, i) => (
            <a href={plan.href} key={plan.label}>
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 + i * 0.1 }}
                whileHover={{ y: -8, transition: { duration: 0.25 } }}
                className={`rounded-2xl border bg-card p-8 text-center cursor-pointer transition-colors h-full flex flex-col items-center justify-center relative overflow-hidden ${
                  plan.featured
                    ? "border-primary/30 hover:border-primary/60"
                    : "border-border hover:border-primary/40"
                }`}
              >
                {plan.featured && (
                  <>
                    <div className="absolute inset-0 bg-primary/5" />
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/5 to-transparent skew-x-12"
                      animate={{ x: ["-100%", "200%"] }}
                      transition={{ duration: 3, repeat: Infinity, repeatDelay: 2, ease: "easeInOut" }}
                    />
                  </>
                )}
                <div className="relative">
                  <motion.div
                    whileHover={{ rotate: 12 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <plan.icon className={`w-10 h-10 mx-auto mb-4 ${plan.featured ? "text-primary" : "text-muted-foreground"}`} />
                  </motion.div>
                  <p className={`text-sm uppercase tracking-wider font-heading mb-2 ${plan.featured ? "text-primary" : "text-muted-foreground"}`}>
                    {plan.label}
                  </p>
                  {plan.price ? (
                    <>
                      <p className="font-heading text-5xl font-bold text-foreground mb-1">
                        {plan.price} <span className="text-xl font-normal text-muted-foreground">DKK</span>
                      </p>
                      <p className="text-muted-foreground">per dag</p>
                    </>
                  ) : (
                    <>
                      <p className="font-heading text-2xl font-bold text-foreground mb-1">Specialpris</p>
                      <p className="text-muted-foreground text-sm">Kontakt os for et skræddersyet tilbud</p>
                    </>
                  )}
                </div>
              </motion.div>
            </a>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-10 text-center"
        >
          <motion.a
            href="#booking"
            className="inline-flex items-center justify-center px-10 py-4 rounded-xl bg-primary text-primary-foreground font-heading font-semibold text-lg hover:opacity-90 transition-all"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
          >
            Book nu
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};

export default PricingSection;
