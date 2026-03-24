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
        <motion.div
          initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="font-heading text-3xl md:text-5xl font-bold mb-4">
            Hvorfor vælge <span className="text-primary">LejDinLyd</span>?
          </h2>
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
