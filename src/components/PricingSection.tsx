import { motion } from "framer-motion";
import { Banknote, CalendarDays, Clock, Music, PartyPopper, ShieldCheck } from "lucide-react";

const plans = [
  { icon: CalendarDays, label: "Søndag - torsdag", price: "150", detail: "Perfekt til de rolige hverdagsbookinger." },
  { icon: PartyPopper, label: "Fredag - lørdag", price: "300", detail: "Den mest populære weekendløsning.", featured: true },
  { icon: Music, label: "Festivaler & events", price: null, detail: "Få et skræddersyet tilbud til større behov." },
];

const PricingSection = () => {
  return (
    <section id="priser" className="px-6 py-24 md:py-28">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-8 lg:grid-cols-[0.72fr_1.28fr] lg:items-start">
          <div className="lg:sticky lg:top-28">
            <span className="eyebrow">Priser der er til at forstå</span>
            <h2 className="mt-5 text-4xl font-bold text-foreground md:text-6xl">
              Simple priser. Stærk lyd. Ingen skjulte gebyrer.
            </h2>
            <p className="mt-4 max-w-xl text-lg leading-8 text-muted-foreground">
              Du skal kunne forstå prisen med det samme. Derfor er modellen enkel: hverdage, weekender og specialtilbud
              til events, uden depositum og uden overraskelser.
            </p>
            <div className="mt-8 grid gap-3">
              {[
                { icon: ShieldCheck, text: "Intet depositum" },
                { icon: Banknote, text: "Betal ved overlevering" },
                { icon: Clock, text: "Fleksibel afhentning" },
              ].map((badge) => (
                <div key={badge.text} className="section-shell flex items-center gap-3 px-4 py-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-primary/12">
                    <badge.icon className="h-5 w-5 text-primary" />
                  </div>
                  <span className="text-sm font-semibold text-foreground">{badge.text}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="grid gap-5 md:grid-cols-3">
            {plans.map((plan, index) => (
              <motion.a
                key={plan.label}
                href={plan.price ? "#booking" : "#kontakt"}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: index * 0.08 }}
                whileHover={{ y: -6 }}
                className={`section-shell group relative flex min-h-[25rem] flex-col overflow-hidden rounded-[2rem] p-6 ${
                  plan.featured ? "border-primary/40 bg-primary/[0.08]" : ""
                }`}
              >
                {plan.featured && (
                  <div className="absolute inset-0 bg-[linear-gradient(135deg,hsl(24_95%_56%_/_0.12),transparent_45%)]" />
                )}
                <div className="relative flex h-full flex-col">
                  <div className="mb-8 flex h-14 w-14 items-center justify-center rounded-[1.25rem] bg-white/6">
                    <plan.icon className={`h-6 w-6 ${plan.featured ? "text-primary" : "text-muted-foreground"}`} />
                  </div>
                  <p className={`text-xs uppercase tracking-[0.28em] ${plan.featured ? "text-primary" : "text-muted-foreground"}`}>
                    {plan.label}
                  </p>
                  <div className="mt-6">
                    {plan.price ? (
                      <p className="font-heading text-6xl font-bold text-foreground">
                        {plan.price}
                        <span className="ml-2 text-lg font-medium text-muted-foreground">DKK</span>
                      </p>
                    ) : (
                      <p className="font-heading text-4xl font-bold text-foreground">Specialpris</p>
                    )}
                    <p className="mt-3 text-sm leading-7 text-muted-foreground">{plan.detail}</p>
                  </div>
                  <div className="mt-auto pt-10 text-sm font-semibold text-primary">
                    {plan.price ? "Gå til booking" : "Kontakt os for pris"}
                  </div>
                </div>
              </motion.a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
