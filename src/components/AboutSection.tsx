import { motion } from "framer-motion";
import { Zap, BadgeDollarSign, Volume2, MessageCircle } from "lucide-react";

const features = [
  { icon: Zap, title: "Nem udlejning", desc: "Book hurtigt og nemt – vi klarer resten." },
  { icon: BadgeDollarSign, title: "Billige priser", desc: "Kvalitetslyd uden at sprænge budgettet." },
  { icon: Volume2, title: "Fantastisk lyd", desc: "Soundboks Go leverer kraftig, klar lyd til enhver lejlighed." },
  { icon: MessageCircle, title: "Hurtig kontakt", desc: "Vi svarer hurtigt og booker dig ind på ingen tid." },
];

const AboutSection = () => {
  return (
    <section id="om-os" className="py-24 px-6 bg-secondary/30 overflow-hidden">
      <div className="container mx-auto max-w-5xl">
        {/* Story section */}
        <motion.div
          initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-20 max-w-2xl mx-auto"
        >
          <p className="text-primary font-heading font-medium tracking-widest uppercase text-sm mb-4">
            Historien bag
          </p>
          <h2 className="font-heading text-3xl md:text-5xl font-bold mb-6">
            Om <span className="text-primary">LydNu</span>
          </h2>
          <div className="space-y-4 text-muted-foreground text-base md:text-lg leading-relaxed">
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Det hele startede med en simpel frustration: <span className="text-foreground font-medium">hvorfor skal det koste en formue at få god lyd til en fest?</span>
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.35 }}
            >
              Som ung nordjysk iværksætter oplevede jeg gang på gang, at vennerne og jeg stod uden ordentlig lyd til vores fester og sammenkomster – enten var det for dyrt at leje, eller også var kvaliteten skuffende. Så jeg tænkte: <span className="text-foreground font-medium">det må kunne gøres bedre.</span>
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              Derfor grundlagde jeg LydNu – en service hvor alle kan leje en <span className="text-primary font-medium">Soundboks Go</span> til en fair pris, uden bøvl. Ingen komplicerede kontrakter, ingen skjulte gebyrer. Bare fed lyd leveret til døren, klar til at tænde op for stemningen.
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.65 }}
            >
              Heroppe i Nordjylland handler vi på tillid og et håndtryk. Det er den måde jeg driver LejDinLyd på – <span className="text-foreground font-medium">tillidsbaseret og ukompliceret.</span> Du får højtaleren, nyder din fest, og leverer den tilbage. Simpelt som det.
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.8 }}
              className="text-foreground font-medium"
            >
              Min mission er enkel: god lyd skal være tilgængelig for alle – uanset budget.
            </motion.p>
          </div>
        </motion.div>

        {/* Divider */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="h-px bg-border mb-20 mx-auto max-w-xs"
        />

        {/* Feature heading */}
        <motion.div
          initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h3 className="font-heading text-2xl md:text-3xl font-bold">
            Hvorfor vælge <span className="text-primary">os</span>?
          </h3>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 40, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1, ease: "easeOut" }}
              whileHover={{ y: -6, transition: { duration: 0.25 } }}
              className="rounded-2xl border border-border bg-card p-6 text-center group cursor-default hover:border-primary/30 transition-colors"
            >
              <motion.div
                className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4"
                whileHover={{ rotate: 12, scale: 1.1 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <f.icon className="w-6 h-6 text-primary" />
              </motion.div>
              <h3 className="font-heading font-semibold text-lg mb-2">{f.title}</h3>
              <p className="text-muted-foreground text-sm">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
