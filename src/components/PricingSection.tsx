import { motion } from "framer-motion";
import { ArrowRight, Banknote, CalendarDays, Clock, Music, PartyPopper, ShieldCheck } from "lucide-react";

const scrollTo = (id: string) => document.querySelector(id)?.scrollIntoView({ behavior: "smooth" });

const plans = [
  {
    icon: CalendarDays,
    label: "Søndag – torsdag",
    tag: "Hverdagspris",
    price: "150",
    detail: "Perfekt til de rolige hverdagsbookinger.",
    cta: "Gå til booking",
    href: "#booking",
  },
  {
    icon: PartyPopper,
    label: "Fredag – lørdag",
    tag: "Mest populær",
    price: "300",
    detail: "Den mest populære weekendløsning.",
    cta: "Gå til booking",
    href: "#booking",
    featured: true,
  },
  {
    icon: Music,
    label: "Festivaler & events",
    tag: "Specialtilbud",
    price: null,
    detail: "Få et skræddersyet tilbud til større behov.",
    cta: "Kontakt os",
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
    <section id="priser" className="px-6 py-20 md:py-28">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-10 lg:grid-cols-[0.68fr_1.32fr] lg:items-start">

          {/* ── Sticky left column ── */}
          <div className="lg:sticky lg:top-28">
            <span className="eyebrow">Priser der er til at forstå</span>
            <h2 className="mt-5 font-heading text-4xl font-bold leading-[1.05] text-foreground md:text-5xl lg:text-6xl">
              Simple priser.<br />
              <span className="text-foreground/60">Ingen overraskelser.</span>
            </h2>
            <p className="mt-5 max-w-sm text-base leading-7 text-muted-foreground">
              God lyd skal ikke koste en formue. Modellen er enkel: hverdage, weekender og specialtilbud — uden depositum og skjulte gebyrer.
            </p>

            <div className="mt-8 space-y-3">
              {badges.map((badge) => (
                <div
                  key={badge.text}
                  className="section-shell flex items-center gap-3.5 px-4 py-3.5"
                >
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary/14">
                    <badge.icon className="h-4 w-4 text-primary" />
                  </div>
                  <span className="text-sm font-semibold text-foreground">{badge.text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* ── Price cards ── */}
          <div className="grid gap-4 md:grid-cols-3">
            {plans.map((plan, index) => (
              <motion.a
                key={plan.label}
                href={plan.href}
                onClick={(e) => { e.preventDefault(); scrollTo(plan.href); }}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: index * 0.1 }}
                whileHover={{ y: -8, transition: { duration: 0.22 } }}
                className={`group relative flex min-h-[27rem] flex-col overflow-hidden rounded-[2rem] border p-6 transition-shadow ${
                  plan.featured
                    ? "border-primary/45 bg-primary/[0.07] shadow-[0_0_60px_hsl(24_95%_56%_/_0.18)]"
                    : "border-white/10 bg-card/70 backdrop-blur-sm"
                }`}
              >
                {/* Featured gradient overlay */}
                {plan.featured && (
                  <>
                    <div className="absolute inset-0 bg-[linear-gradient(135deg,hsl(24_95%_56%_/_0.14),transparent_50%)]" />
                    <div className="absolute -top-16 -right-16 h-48 w-48 rounded-full bg-primary/20 blur-[80px]" />
                  </>
                )}

                <div className="relative flex h-full flex-col">
                  {/* Tag */}
                  <div className="mb-6 flex items-center justify-between gap-2">
                    <div className="flex h-12 w-12 items-center justify-center rounded-[1.1rem] bg-white/6">
                      <plan.icon
                        className={`h-5 w-5 ${plan.featured ? "text-primary" : "text-muted-foreground"}`}
                      />
                    </div>
                    <span
                      className={`rounded-full px-3 py-1 text-[0.62rem] font-bold uppercase tracking-[0.22em] ${
                        plan.featured
                          ? "bg-primary text-primary-foreground"
                          : "border border-white/12 bg-white/5 text-muted-foreground"
                      }`}
                    >
                      {plan.tag}
                    </span>
                  </div>

                  <p
                    className={`text-[0.65rem] uppercase tracking-[0.3em] ${
                      plan.featured ? "text-primary" : "text-muted-foreground"
                    }`}
                  >
                    {plan.label}
                  </p>

                  {/* Price */}
                  <div className="mt-5">
                    {plan.price ? (
                      <p
                        className="font-heading font-extrabold leading-none tracking-[-0.04em] text-foreground"
                        style={{ fontSize: "clamp(3.5rem, 6vw, 4.5rem)" }}
                      >
                        {plan.price}
                        <span className="ml-1.5 text-base font-medium text-muted-foreground">
                          DKK
                        </span>
                      </p>
                    ) : (
                      <p className="font-heading text-3xl font-bold text-foreground">
                        Specialpris
                      </p>
                    )}
                    <p className="mt-3 text-sm leading-6 text-muted-foreground">
                      {plan.detail}
                    </p>
                  </div>

                  {/* CTA */}
                  <div
                    className={`mt-auto flex items-center gap-2 pt-8 text-sm font-semibold transition-colors ${
                      plan.featured
                        ? "text-primary"
                        : "text-muted-foreground group-hover:text-foreground"
                    }`}
                  >
                    {plan.cta}
                    <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
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
