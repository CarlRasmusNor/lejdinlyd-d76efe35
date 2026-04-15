import { motion } from "framer-motion";
import { Mail, Phone, MapPin, ArrowRight } from "lucide-react";

const contacts = [
  { href: "mailto:rasmuscarl@hotmail.com", icon: Mail, label: "Email", text: "rasmuscarl@hotmail.com" },
  { href: "tel:+4553540096", icon: Phone, label: "Telefon", text: "+45 53 54 00 96" },
  { href: "https://maps.google.com/?q=Kjellerupsgade+4,+9000+Aalborg", icon: MapPin, label: "Adresse", text: "Kjellerupsgade 4, 9000 Aalborg", sub: "Afhentning & aflevering efter aftale · Levering i Aalborg og omegn" },
];

const ContactSection = () => {
  return (
    <section id="kontakt" className="py-24 px-6 bg-background overflow-hidden">
      <div className="container mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="font-heading text-3xl md:text-5xl font-bold mb-4">
            Kontakt <span className="text-primary">os</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            Vi svarer hurtigt – typisk inden for få timer
          </p>
        </motion.div>

        {/* Contact cards — 3 in a row on desktop */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-10">
          {contacts.map((c, i) => (
            <motion.a
              key={c.href}
              href={c.href}
              target={c.icon === MapPin ? "_blank" : undefined}
              rel={c.icon === MapPin ? "noopener noreferrer" : undefined}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 + i * 0.1 }}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              className="flex flex-col items-start gap-4 rounded-xl border border-border bg-card px-6 py-6 hover:border-primary/40 hover:shadow-md transition-all"
            >
              <div className="w-11 h-11 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                <c.icon className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground font-medium uppercase tracking-wide mb-1">{c.label}</p>
                <p className="text-foreground font-semibold leading-snug">{c.text}</p>
                {c.sub && <p className="text-muted-foreground text-sm mt-1 leading-snug">{c.sub}</p>}
              </div>
            </motion.a>
          ))}
        </div>

        {/* CTA banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <a
            href="#booking"
            onClick={(e) => {
              e.preventDefault();
              document.querySelector("#booking")?.scrollIntoView({ behavior: "smooth" });
            }}
            className="group flex items-center justify-between gap-4 rounded-2xl bg-primary px-8 py-6 hover:opacity-95 transition-opacity"
          >
            <div>
              <p className="font-heading font-bold text-primary-foreground text-xl md:text-2xl">
                Klar til at booke?
              </p>
              <p className="text-primary-foreground/80 text-sm mt-0.5">
                Book din Soundboks Go direkte her – hurtigt og nemt
              </p>
            </div>
            <ArrowRight className="w-7 h-7 text-primary-foreground flex-shrink-0 group-hover:translate-x-1 transition-transform" />
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactSection;
