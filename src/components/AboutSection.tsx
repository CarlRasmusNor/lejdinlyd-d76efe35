import { motion } from "framer-motion";
import { BadgeDollarSign, MessageCircle, Volume2, Zap } from "lucide-react";

const features = [
  { icon: Zap, title: "Nem udlejning", desc: "Book hurtigt og nemt – vi klarer resten.", href: "#booking" },
  { icon: BadgeDollarSign, title: "Billige priser", desc: "Kvalitetslyd uden at sprænge budgettet.", href: "#priser" },
  { icon: Volume2, title: "Fantastisk lyd", desc: "Soundboks Go leverer kraftig, klar lyd til enhver lejlighed.", href: "#kvalitet" },
  { icon: MessageCircle, title: "Hurtig kontakt", desc: "Vi svarer hurtigt og booker dig ind på ingen tid.", href: "#kontakt" },
];

const scrollTo = (id: string) => document.querySelector(id)?.scrollIntoView({ behavior: "smooth" });

const AboutSection = () => {
  return (
    <section id="om-os" className="py-24 px-6 bg-secondary/30 overflow-hidden">
      <div className="container mx-auto max-w-5xl">

        {/* Header */}
        <motion.div
          className="text-center mb-20 max-w-2xl mx-auto"
          initial={{ opacity: 0, filter: "blur(10px)", y: 30 }}
          whileInView={{ opacity: 1, filter: "blur(0px)", y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-primary font-heading font-medium tracking-widest uppercase text-sm mb-4">
            Historien bag
          </p>
          <h2 className="font-heading text-3xl md:text-5xl font-bold mb-6">
            Om <span className="text-primary">LejDinLyd</span>
          </h2>
          <div className="space-y-4 text-muted-foreground text-base md:text-lg leading-relaxed">
            {[
              <>Det hele startede med en simpel frustration: <span className="text-foreground font-medium">hvorfor skal det koste en formue at få god lyd til en fest?</span></>,
              <>Som ung nordjysk iværksætter oplevede jeg gang på gang, at vennerne og jeg stod uden ordentlig lyd til vores fester og sammenkomster – enten var det for dyrt at leje, eller også var kvaliteten skuffende. Så jeg tænkte: <span className="text-foreground font-medium">det må kunne gøres bedre.</span></>,
              <>Derfor grundlagde jeg LejDinLyd – en service hvor alle kan leje en <span className="text-primary font-medium">Soundboks Go</span> til en fair pris, uden bøvl. Ingen komplicerede kontrakter, ingen skjulte gebyrer. Bare fed lyd leveret til døren, klar til at tænde op for stemningen.</>,
              <>Heroppe i Nordjylland handler vi på tillid og et håndtryk. Det er den måde jeg driver LejDinLyd på – <span className="text-foreground font-medium">tillidsbaseret og ukompliceret.</span> Du får højtaleren, nyder din fest, og leverer den tilbage. Simpelt som det.</>,
              <span className="text-foreground font-medium">Min mission er enkel: god lyd skal være tilgængelig for alle – uanset budget.</span>,
            ].map((text, i) => (
              <motion.p
                key={i}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
              >
                {text}
              </motion.p>
            ))}
          </div>
        </motion.div>

        {/* Divider */}
        <motion.div
          className="h-px bg-border mb-20 mx-auto max-w-xs"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        />

        {/* Why us */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, filter: "blur(10px)", y: 30 }}
          whileInView={{ opacity: 1, filter: "blur(0px)", y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h3 className="font-heading text-2xl md:text-3xl font-bold">
            Hvorfor vælge <span className="text-primary">os</span>?
          </h3>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 40, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              className="rounded-2xl border border-border bg-card p-6 text-center group cursor-pointer hover:border-primary/30 transition-colors"
              onClick={() => scrollTo(feature.href)}
            >
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <feature.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-heading font-semibold text-lg mb-2">{feature.title}</h3>
              <p className="text-muted-foreground text-sm mb-4">{feature.desc}</p>
              <span className="inline-flex items-center text-primary text-sm font-medium group-hover:underline">
                Gå til →
              </span>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default AboutSection;
