import { motion } from "framer-motion";
import { BadgeDollarSign, MessageCircle, Volume2, Zap } from "lucide-react";

const features = [
  { icon: Zap, title: "Nem udlejning", desc: "Book hurtigt og få svar uden unødigt bøvl." },
  { icon: BadgeDollarSign, title: "Fair priser", desc: "God lyd skal ikke koste en formue at få fat i." },
  { icon: Volume2, title: "Lyd der kan mærkes", desc: "Lille nok til at håndtere, stor nok til at bære festen." },
  { icon: MessageCircle, title: "Lokal og hurtig kontakt", desc: "Du får en rigtig person, ikke en tung proces." },
];

const AboutSection = () => {
  return (
    <section id="om-os" className="px-6 py-20 md:py-28">
      <div className="mx-auto max-w-7xl">

        {/* Pull quote banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
          className="mb-8 overflow-hidden rounded-[2rem] border border-primary/20 bg-primary/[0.06] px-8 py-7 md:px-12"
        >
          <p
            className="font-heading font-bold leading-[1.1] tracking-[-0.03em] text-foreground"
            style={{ fontSize: "clamp(1.6rem, 3.5vw, 2.8rem)" }}
          >
            "God lyd skal være{" "}
            <span className="text-primary">tilgængeligt for alle</span>
            {" "}— også når budgettet skal give mening."
          </p>
          <p className="mt-4 text-sm text-muted-foreground">
            — Carl, grundlægger af LejDinLyd
          </p>
        </motion.div>

        <div className="grid gap-6 lg:grid-cols-[1fr_0.92fr]">

          {/* Story card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="section-shell rounded-[2.2rem] p-7 md:p-10"
          >
            <span className="eyebrow">Historien bag</span>
            <h2 className="mt-5 font-heading text-4xl font-bold leading-[1.05] text-foreground md:text-5xl">
              Om LejDinLyd
            </h2>
            <div className="mt-8 space-y-5 text-base leading-8 text-muted-foreground">
              <p>
                Det hele startede med en simpel frustration:{" "}
                <span className="font-semibold text-foreground">
                  hvorfor skal det koste en formue at få god lyd til en fest?
                </span>
              </p>
              <p>
                Som ung nordjysk iværksætter oplevede jeg igen og igen, at gode arrangementer
                blev holdt tilbage af dårlig lyd, urimelige priser eller unødigt bøvl. Derfor
                blev LejDinLyd bygget som et mere direkte alternativ.
              </p>
              <p>
                Her kan du leje en{" "}
                <span className="font-semibold text-primary">Soundboks Go</span> til en fair
                pris, få hurtig respons og vælge den løsning der passer til festen. Ingen
                komplicerede kontrakter. Ingen skjulte gebyrer.
              </p>
              <p className="font-medium text-foreground">
                Bare fed lyd, når du har brug for den.
              </p>
            </div>
          </motion.div>

          {/* Feature grid */}
          <div className="flex flex-col gap-5">
            {/* Tagline card */}
            <div className="section-shell rounded-[2.2rem] p-7">
              <p className="text-[0.62rem] uppercase tracking-[0.32em] text-primary">
                Filosofien
              </p>
              <p className="mt-4 font-heading text-2xl font-bold leading-[1.2] text-foreground md:text-3xl">
                Tillidsbaseret, ukompliceret og bygget til lokale fester.
              </p>
              <p className="mt-3 text-sm leading-7 text-muted-foreground">
                Lige så let at hente en Soundboks, som det er at blive enig om at holde festen.
              </p>
            </div>

            {/* Feature cards */}
            <div className="grid gap-4 sm:grid-cols-2">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.42, delay: index * 0.08 }}
                  className="section-shell rounded-[1.7rem] p-5"
                >
                  <div className="mb-3.5 flex h-11 w-11 items-center justify-center rounded-[1rem] bg-primary/14">
                    <feature.icon className="h-4.5 w-4.5 text-primary" style={{ width: "1.1rem", height: "1.1rem" }} />
                  </div>
                  <h3 className="font-heading text-lg font-semibold text-foreground">
                    {feature.title}
                  </h3>
                  <p className="mt-1.5 text-sm leading-6 text-muted-foreground">
                    {feature.desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default AboutSection;
