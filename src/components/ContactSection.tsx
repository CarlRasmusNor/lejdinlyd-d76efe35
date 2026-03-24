import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Send } from "lucide-react";

const ContactSection = () => {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const inputClass = "w-full rounded-lg border border-border bg-secondary px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition font-body";

  return (
    <section id="kontakt" className="py-24 px-6 overflow-hidden">
      <div className="container mx-auto max-w-2xl">
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
          <p className="text-muted-foreground text-lg">Vi er klar til at hjælpe dig.</p>
        </motion.div>

        {/* Contact form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-10"
        >
          {submitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="rounded-2xl border border-primary/30 bg-card p-10 text-center"
            >
              <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-5">
                <Send className="w-7 h-7 text-primary" />
              </div>
              <h3 className="font-heading text-xl font-bold mb-2">Tak for din besked!</h3>
              <p className="text-muted-foreground">Vi vender tilbage hurtigst muligt.</p>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="rounded-2xl border border-border bg-card p-8 space-y-5">
              <div className="grid sm:grid-cols-2 gap-5">
                <input type="text" placeholder="Navn" required className={inputClass} value={formData.name} onChange={e => setFormData(p => ({ ...p, name: e.target.value }))} />
                <input type="email" placeholder="Email" required className={inputClass} value={formData.email} onChange={e => setFormData(p => ({ ...p, email: e.target.value }))} />
              </div>
              <textarea placeholder="Skriv din besked her..." rows={4} required className={inputClass} value={formData.message} onChange={e => setFormData(p => ({ ...p, message: e.target.value }))} />
              <button
                type="submit"
                className="w-full rounded-lg bg-primary text-primary-foreground font-heading font-semibold py-4 text-lg hover:opacity-90 transition-all"
              >
                Send besked
              </button>
            </form>
          )}
        </motion.div>

        {/* Contact info */}
        <div className="flex flex-col sm:flex-row gap-6 justify-center flex-wrap">
          {[
            { href: "mailto:rasmuscarl@hotmail.com", icon: Mail, text: "rasmuscarl@hotmail.com" },
            { href: "tel:+4553540096", icon: Phone, text: "+45 53 54 00 96" },
          ].map((c, i) => (
            <motion.a
              key={c.href}
              href={c.href}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 + i * 0.1 }}
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
          transition={{ duration: 0.5, delay: 0.4 }}
          whileHover={{ y: -4, transition: { duration: 0.2 } }}
          className="mt-6 rounded-xl border border-border bg-card px-6 py-5 inline-flex items-center gap-3 mx-auto w-full sm:w-auto justify-center hover:border-primary/30 transition-colors"
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
