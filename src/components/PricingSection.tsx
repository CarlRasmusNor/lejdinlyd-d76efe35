import { motion } from "framer-motion";
import { CalendarDays, PartyPopper, Music, ShieldCheck, Banknote, Clock } from "lucide-react";

const plans = [
  {
    icon: CalendarDays,
    label: "Hverdage",
    sublabel: "Søndag – Torsdag",
    price: "150",
    note: "Inkl. transport i Aalborg",
    cta: "Book nu",
    href: "#booking",
  },
  {
    icon: PartyPopper,
    label: "Weekend",
    sublabel: "Fredag – Lørdag",
    price: "300",
    note: "Inkl. transport i Aalborg",
    cta: "Book nu",
    href: "#booking",
    featured: true,
    badge: "Mest populær",
  },
  {
    icon: Music,
    label: "Festival & Event",
    sublabel: "Festivaler & større events",
    price: null,
    note: "Skræddersyet tilbud til din begivenhed",
    cta: "Kontakt os",
    href: "#kontakt",
  },
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

        <div className="grid md:grid-cols-3 gap-6 items-stretch">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.label}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 + i * 0.1 }}
              className={`relative rounded-2xl flex flex-col ${
                plan.featured ? "md:-mt-4 md:mb-4" : ""
              }`}
            >
              {plan.featured && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 z-10">
                  <span className="bg-primary text-primary-foreground text-xs font-heading font-bold uppercase tracking-widest px-4 py-1.5 rounded-full shadow-lg">
                    {plan.badge}
                  </span>
                </div>
              )}

              <motion.div
                whileHover={{ y: -6, transition: { duration: 0.25 } }}
                className={`rounded-2xl border bg-card p-8 text-center cursor-pointer h-full flex flex-col items-center relative overflow-hidden transition-all duration-300 ${
                  plan.featured
                    ? "border-primary/50 shadow-[0_0_40px_-8px_hsl(var(--primary)/0.35)] hover:shadow-[0_0_56px_-8px_hsl(var(--primary)/0.5)] hover:border-primary"
                    : "border-border hover:border-primary/40 hover:shadow-md"
                }`}
              >
                {plan.featured && (
                  <>
                    <div className="absolute inset-0 bg-primary/5 pointer-events-none" />
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/10 to-transparent skew-x-12 pointer-events-none"
                      animate={{ x: ["-100%", "200%"] }}
                      transition={{ duration: 3, repeat: Infinity, repeatDelay: 2, ease: "easeInOut" }}
                    />
                  </>
                )}

                <div className="relative flex flex-col items-center flex-1 w-full">
                  <motion.div
                    whileHover={{ rotate: 12 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <plan.icon
                      className={`w-10 h-10 mx-auto mb-4 ${plan.featured ? "text-primary" : "text-muted-foreground"}`}
                    />
                  </motion.div>

                  <p className={`text-xs uppercase tracking-widest font-heading mb-1 ${plan.featured ? "text-primary" : "text-muted-foreground"}`}>
                    {plan.sublabel}
                  </p>
                  <p className="font-heading text-lg font-bold mb-4 text-foreground">
                    {plan.label}
                  </p>

                  {plan.price ? (
                    <div className="mb-2">
                      <p className="font-heading text-5xl font-bold text-foreground leading-none">
                        {plan.price}
                        <span className="text-xl font-normal text-muted-foreground ml-1">DKK</span>
                      </p>
                      <p className="text-muted-foreground text-sm mt-1">pr. dag</p>
                    </div>
                  ) : (
                    <div className="mb-2">
                      <p className="font-heading text-2xl font-bold text-foreground leading-none">Specialpris</p>
                    </div>
                  )}

                  <p className="text-muted-foreground text-xs mt-1 mb-6">{plan.note}</p>

                  <div className="mt-auto w-full">
                    <a
                      href={plan.href}
                      className={`block w-full py-3 rounded-xl font-heading font-semibold text-sm transition-all duration-200 text-center ${
                        plan.featured
                          ? "bg-primary text-primary-foreground hover:opacity-90 shadow-md"
                          : "bg-primary/10 text-primary hover:bg-primary/20 border border-primary/20"
                      }`}
                    >
                      {plan.cta}
                    </a>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* Trust badges */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.35 }}
          className="mt-12 flex flex-wrap justify-center gap-4"
        >
          {[
            { icon: ShieldCheck, text: "Intet depositum", sub: "Ingen forudbetaling krævet" },
            { icon: Banknote, text: "Betal ved overlevering", sub: "Kontant eller MobilePay" },
            { icon: Clock, text: "Fleksibel afhentning", sub: "Tilpasses din tidsplan" },
          ].map((badge) => (
            <div
              key={badge.text}
              className="flex items-center gap-3 rounded-2xl border border-primary/20 bg-primary/5 px-5 py-3 min-w-[200px]"
            >
              <div className="flex-shrink-0 w-9 h-9 rounded-full bg-primary/15 flex items-center justify-center">
                <badge.icon className="w-4 h-4 text-primary" />
              </div>
              <div>
                <p className="text-sm font-heading font-semibold text-foreground leading-tight">{badge.text}</p>
                <p className="text-xs text-muted-foreground leading-tight">{badge.sub}</p>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default PricingSection;
