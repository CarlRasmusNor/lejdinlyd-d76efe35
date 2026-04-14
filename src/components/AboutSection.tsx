import { motion } from "framer-motion";
import { BadgeDollarSign, MessageCircle, Volume2, Zap } from "lucide-react";

const features = [
  { icon: Zap, title: "Nem udlejning", desc: "Book hurtigt og få svar uden unødigt bøvl." },
  { icon: BadgeDollarSign, title: "Fair priser", desc: "God lyd skal ikke koste en formue at få fat i." },
  { icon: Volume2, title: "Lyd der kan mærkes", desc: "Soundboks Go er lille nok til at håndtere, stor nok til at bære festen." },
  { icon: MessageCircle, title: "Lokal og hurtig kontakt", desc: "Du får en rigtig person, ikke en tung proces." },
];

const AboutSection = () => {
  return (
    <section id="om-os" className="px-6 py-24 md:py-28">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-6 lg:grid-cols-[1fr_0.95fr]">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="section-shell rounded-[2.2rem] p-7 md:p-10"
          >
            <span className="eyebrow">Historien bag</span>
            <h2 className="mt-5 text-4xl font-bold text-foreground md:text-5xl">
              Om LejDinLyd
            </h2>
            <div className="mt-8 space-y-5 text-base leading-8 text-muted-foreground">
              <p>
                Det hele startede med en simpel frustration: <span className="font-semibold text-foreground">hvorfor skal det koste en formue at få god lyd til en fest?</span>
              </p>
              <p>
                Som ung nordjysk iværksætter oplevede jeg igen og igen, at gode arrangementer blev holdt tilbage af
                dårlig lyd, urimelige priser eller unødigt bøvl. Derfor blev LejDinLyd bygget som et mere direkte
                alternativ.
              </p>
              <p>
                Her kan du leje en <span className="font-semibold text-primary">Soundboks Go</span> til en fair pris,
                få hurtig respons og vælge den løsning, der passer til festen. Ingen komplicerede kontrakter. Ingen
                skjulte gebyrer. Bare fed lyd, når du har brug for den.
              </p>
              <p className="font-medium text-foreground">
                Min mission er enkel: god lyd skal være tilgængelig for alle, også når budgettet skal give mening.
              </p>
            </div>
          </motion.div>

          <div className="grid gap-6">
            <div className="section-shell rounded-[2.2rem] p-7 md:p-8">
              <p className="text-xs uppercase tracking-[0.3em] text-primary">Hvordan det føles</p>
              <p className="mt-4 font-heading text-3xl font-bold text-foreground md:text-4xl">
                Tillidsbaseret, ukompliceret og bygget til lokale fester.
              </p>
              <p className="mt-4 text-sm leading-7 text-muted-foreground">
                Det skal være lige så let at hente eller få leveret en Soundboks, som det er at blive enig om at holde
                festen.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.45, delay: index * 0.08 }}
                  className="section-shell rounded-[1.7rem] p-5"
                >
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-[1.1rem] bg-primary/12">
                    <feature.icon className="h-5 w-5 text-primary" />
                  </div>
                  <h3 className="font-heading text-xl font-semibold text-foreground">{feature.title}</h3>
                  <p className="mt-2 text-sm leading-7 text-muted-foreground">{feature.desc}</p>
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
