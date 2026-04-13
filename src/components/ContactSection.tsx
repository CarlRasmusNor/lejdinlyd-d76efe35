import { motion } from "framer-motion";
import { Mail, Phone, MapPin, ArrowRight } from "lucide-react";

const ContactSection = () => {
  return (
    <section id="kontakt" className="py-24 px-6 overflow-hidden">
      <div className="container mx-auto max-w-2xl">
        <motion.div
          initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-4"
        >
          <h2 className="font-heading text-3xl md:text-5xl font-bold mb-4">
            Kontakt <span className="text-primary">os</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            Ring, skriv eller book direkte – vi svarer hurtigt.
          </p>
        </motion.div>

        {/* CTA to booking */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex justify-center mb-10 mt-8"
        >
          <a
            href="#booking"
            onClick={(e) => { e.preventDefault(); document.querySelector("#booking")?.scrollIntoView({ behavior: "smooth" }); }}
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-primary text-primary-foreground font-heading font-semibold text-lg hover:opacity-90 transition-all"
          >
            Book din højtaler nu <ArrowRight className="w-5 h-5" />
          </a>
        </motion.div>

        {/* Contact info */}
        <div className="grid sm:grid-cols-2 gap-5">
          {[
            { href: "mailto:rasmuscarl@hotmail.com", icon: Mail, label: "Email", text: "rasmuscarl@hotmail.com" },
            { href: "tel:+4553540096", icon: Phone, label: "Telefon", text: "+45 53 54 00 96" },
          ].map((c, i) => (
            <motion.a
              key={c.href}
              href={c.href}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 + i * 0.1 }}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              className="flex items-center gap-4 rounded-xl border border-border bg-card px-6 py-5 hover:border-primary/40 transition-colors"
            >
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                <c.icon className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground font-medium uppercase tracking-wide mb-0.5">{c.label}</p>
                <p className="text-foreground font-medium">{c.text}</p>
              </div>
            </motion.a>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-5 rounded-xl border border-border bg-card px-6 py-5 flex items-center gap-4"
        >
          <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
            <MapPin className="w-5 h-5 text-primary" />
          </div>
          <div>
            <p className="text-xs text-muted-foreground font-medium uppercase tracking-wide mb-0.5">Adresse</p>
            <p className="text-foreground font-medium">Kjellerupsgade 4, 9000 Aalborg</p>
            <p className="text-muted-foreground text-sm">Afhentning & aflevering efter aftale · Levering i Aalborg og omegn</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactSection;
