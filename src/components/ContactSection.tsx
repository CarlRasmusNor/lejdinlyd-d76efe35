import { motion } from "framer-motion";
import { Mail, Phone, MapPin } from "lucide-react";

const contactCards = [
  { href: "mailto:rasmuscarl@hotmail.com", icon: Mail, text: "rasmuscarl@hotmail.com" },
  { href: "tel:+4553540096", icon: Phone, text: "+45 53 54 00 96" },
];

const ContactSection = () => {
  return (
    <section id="kontakt" className="py-24 px-6 overflow-hidden">
      <div className="container mx-auto max-w-2xl text-center">
        <motion.div
          initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="font-heading text-3xl md:text-5xl font-bold mb-4">
            Kontakt <span className="text-primary">os</span>
          </h2>
          <p className="text-muted-foreground text-lg mb-10">Vi er klar til at hjælpe dig.</p>
        </motion.div>

        <div className="flex flex-col sm:flex-row gap-6 justify-center flex-wrap">
          {contactCards.map((c, i) => (
            <motion.a
              key={c.href}
              href={c.href}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 + i * 0.1 }}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              className="flex items-center gap-3 rounded-xl border border-border bg-card px-6 py-4 hover:border-primary/40 transition-colors"
            >
              <c.icon className="w-5 h-5 text-primary" />
              <span className="text-foreground">{c.text}</span>
            </motion.a>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          whileHover={{ y: -4, transition: { duration: 0.2 } }}
          className="mt-8 rounded-xl border border-border bg-card px-6 py-5 inline-flex items-center gap-3 mx-auto hover:border-primary/30 transition-colors"
        >
          <MapPin className="w-5 h-5 text-primary flex-shrink-0" />
          <div className="text-left">
            <p className="text-foreground font-medium">Afhentning & aflevering</p>
            <p className="text-muted-foreground text-sm">Kjellerupsgade 4, 9000 Aalborg</p>
            <p className="text-muted-foreground text-sm">Levering kun i Aalborg – kontakt os for aftale</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactSection;
