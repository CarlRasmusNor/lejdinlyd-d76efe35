import { motion } from "framer-motion";
import { Mail, Phone } from "lucide-react";

const ContactSection = () => {
  return (
    <section id="kontakt" className="py-24 px-6">
      <div className="container mx-auto max-w-2xl text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="font-heading text-3xl md:text-5xl font-bold mb-4">
            Kontakt <span className="text-primary">os</span>
          </h2>
          <p className="text-muted-foreground text-lg mb-10">Vi er klar til at hjælpe dig.</p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <a
              href="mailto:rasmuscarl@hotmail.com"
              className="flex items-center gap-3 rounded-xl border border-border bg-card px-6 py-4 hover:border-primary/40 transition-colors"
            >
              <Mail className="w-5 h-5 text-primary" />
              <span className="text-foreground">rasmuscarl@hotmail.com</span>
            </a>
            <a
              href="tel:+4553540096"
              className="flex items-center gap-3 rounded-xl border border-border bg-card px-6 py-4 hover:border-primary/40 transition-colors"
            >
              <Phone className="w-5 h-5 text-primary" />
              <span className="text-foreground">+45 53 54 00 96</span>
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactSection;
