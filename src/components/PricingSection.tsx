import { motion } from "framer-motion";
import { Banknote, CalendarDays, Clock, Music, PartyPopper, ShieldCheck } from "lucide-react";

const scrollTo = (id: string) => document.querySelector(id)?.scrollIntoView({ behavior: "smooth" });

const plans = [
  {
    icon: CalendarDays,
    label: "Søndag – Torsdag",
    price: "150",
    unit: "DKK",
    sub: "per dag",
    featured: false,
    href: "#booking",
  },
  {
    icon: PartyPopper,
    label: "Fredag – Lørdag",
    price: "300",
    unit: "DKK",
    sub: "per dag",
    featured: true,
    href: "#booking",
  },
  {
    icon: Music,
    label: "Festivaler & Events",
    price: null,
    unit: null,
    sub: "Kontakt os for et skræddersyet tilbud",
    featured: false,
    href: "#kontakt",
  },
];

const badges = [
  { icon: ShieldCheck, text: "Intet depositum" },
  { icon: Banknote, text: "Betal ved overlevering" },
  { icon: Clock, text: "Fleksibel afhentning" },
];

const PricingSection = () => {
  return (
    <section id="priser" className="py-24 px-6 overflow-hidden">
      <div className="container mx-auto max-w-5xl">

        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, filter: "blur(10px)", y: 30 }}
          whileInView={{ opacity: 1, filter: "blur(0px)", y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="font-heading text-3xl md:text-5xl font-bold mb-4">
            Simple <span className="text-primary">priser</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            Ingen skjulte gebyrer. Ingen overraskelser.
          </p>
        </motion.div>

        {/* Price cards */}
        <div className="grid md:grid-cols-3 gap-6">
          {plans.map((plan, index) => (
            <motion.a
              key={plan.label}
              href={plan.href}
              onClick={(e) => { e.preventDefault(); scrollTo(plan.href); }}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -6, transition: { duration: 0.2 } }}
              className={`rounded-2xl border bg-card p-8 text-center cursor-pointer h-full flex flex-col items-center justify-center relative overflow-hidden transition-colors ${
                plan.featured
                  ? "border-primary/30 hover:border-primary/60"
                  : "border-border hover:border-primary/40"
              }`}
            >
              {plan.featured && (
                <>
                  <div className="absolute inset-0 bg-primary/5" />
                  <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 rounded-full bg-primary/12 blur-[80px]" />
                  </div>
                </>
              )}

              <div className="relative">
                <plan.icon
                  className={`w-10 h-10 mx-auto mb-4 ${plan.featured ? "text-primary" : "text-muted-foreground"}`}
                />
                <p
                  className={`text-sm uppercase tracking-wider font-heading mb-2 ${
                    plan.featured ? "text-primary" : "text-muted-foreground"
                  }`}
                >
                  {plan.label}
                </p>
                {plan.price ? (
                  <>
                    <p className="font-heading text-5xl font-bold text-foreground mb-1">
                      {plan.price}{" "}
                      <span className="text-xl font-normal text-muted-foreground">{plan.unit}</span>
                    </p>
                    <p className="text-muted-foreground">{plan.sub}</p>
                  </>
                ) : (
                  <>
                    <p className="font-heading text-2xl font-bold text-foreground mb-1">
                      Specialpris
                    </p>
                    <p className="text-muted-foreground text-sm">{plan.sub}</p>
                  </>
                )}
              </div>
            </motion.a>
          ))}
        </div>

        {/* Trust badges */}
        <motion.div
          className="mt-8 flex flex-wrap justify-center gap-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {badges.map((badge) => (
            <div
              key={badge.text}
              className="flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-5 py-2"
            >
              <badge.icon className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-foreground">{badge.text}</span>
            </div>
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div
          className="mt-8 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <a
            href="#booking"
            onClick={(e) => { e.preventDefault(); scrollTo("#booking"); }}
            className="inline-flex items-center justify-center px-10 py-4 rounded-xl bg-primary text-primary-foreground font-heading font-semibold text-lg hover:opacity-90 transition-all hover:shadow-[0_0_32px_hsl(24_95%_56%_/_0.35)] active:scale-95"
          >
            Book nu
          </a>
        </motion.div>

      </div>
    </section>
  );
};

export default PricingSection;
