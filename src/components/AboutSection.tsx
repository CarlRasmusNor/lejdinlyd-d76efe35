import { motion } from "framer-motion";
import { Zap, BadgeDollarSign, Volume2, MessageCircle } from "lucide-react";

const features = [
  { icon: Zap, title: "Nem udlejning", desc: "Book hurtigt og nemt – vi klarer resten.", href: "#booking" },
  { icon: BadgeDollarSign, title: "Billige priser", desc: "Kvalitetslyd uden at sprænge budgettet.", href: "#priser" },
  { icon: Volume2, title: "Fantastisk lyd", desc: "Soundboks Go leverer kraftig, klar lyd til enhver lejlighed.", href: "#kvalitet" },
  { icon: MessageCircle, title: "Hurtig kontakt", desc: "Vi svarer hurtigt og booker dig ind på ingen tid.", href: "#kontakt" },
];

const AboutSection = () => {
  return (
    <section id="om-os" className="py-24 px-6 bg-secondary/30 overflow-hidden">
      <div className="container mx-auto max-w-5xl">

        {/* Story section */}
        <div className="grid md:grid-cols-2 gap-12 items-start mb-20">
          {/* Left: heading + pull quote */}
          <motion.div
            initial={{ opacity: 0, x: -30, filter: "blur(8px)" }}
            whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <p className="text-primary font-heading font-medium tracking-widest uppercase text-sm mb-4">
              Historien bag
            </p>
            <h2 className="font-heading text-3xl md:text-5xl font-bold mb-8">
              Om <span className="text-primary">LejDinLyd</span>
            </h2>
            {/* Pull quote */}
            <blockquote className="border-l-4 border-primary pl-5 py-2 mb-6">
              <p className="text-foreground font-heading text-xl font-semibold leading-snug">
                "God lyd skal være tilgængelig for alle – uanset budget."
              </p>
            </blockquote>
            <p className="text-muted-foreground text-sm leading-relaxed">
              – Grundlægger af LejDinLyd
            </p>
          </motion.div>

          {/* Right: story paragraphs */}
          <motion.div
            initial={{ opacity: 0, x: 30, filter: "blur(8px)" }}
            whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="space-y-4 text-muted-foreground text-base leading-relaxed"
          >
            <p>
              Det hele startede med en simpel frustration:{" "}
              <span className="text-foreground font-medium">
                hvorfor skal det koste en formue at få god lyd til en fest?
              </span>
            </p>
            <p>
              Som ung nordjysk iværksætter oplevede jeg gang på gang, at vennerne og jeg stod uden
              ordentlig lyd til vores fester og sammenkomster – enten var det for dyrt at leje, eller
              også var kvaliteten skuffende. Så jeg tænkte:{" "}
              <span className="text-foreground font-medium">det må kunne gøres bedre.</span>
            </p>
            <p>
              Derfor grundlagde jeg LejDinLyd – en service hvor alle kan leje en{" "}
              <span className="text-primary font-medium">Soundboks Go</span> til en fair pris, uden
              bøvl. Ingen komplicerede kontrakter, ingen skjulte gebyrer. Bare fed lyd leveret til
              døren, klar til at tænde op for stemningen.
            </p>
            <p>
              Heroppe i Nordjylland handler vi på tillid og et håndtryk. Det er den måde jeg driver
              LejDinLyd på –{" "}
              <span className="text-foreground font-medium">tillidsbaseret og ukompliceret.</span> Du
              får højtaleren, nyder din fest, og leverer den tilbage. Simpelt som det.
            </p>
          </motion.div>
        </div>

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

        {/* Feature cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 40, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1, ease: "easeOut" }}
              whileHover={{ scale: 1.04, y: -4, transition: { duration: 0.2 } }}
              className="rounded-2xl border border-border bg-card p-6 text-center group cursor-pointer hover:border-primary/40 transition-colors"
              onClick={() => document.querySelector(f.href)?.scrollIntoView({ behavior: "smooth" })}
            >
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <f.icon className="w-6 h-6 text-primary" />
              </div>
              <h4 className="font-heading font-semibold text-lg mb-2">{f.title}</h4>
              <p className="text-muted-foreground text-sm mb-4">{f.desc}</p>
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
