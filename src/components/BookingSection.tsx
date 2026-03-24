import { useState } from "react";
import { motion } from "framer-motion";
import { Send } from "lucide-react";

const BookingSection = () => {
  const [formData, setFormData] = useState({ name: "", phone: "", email: "", dates: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const inputClass = "w-full rounded-lg border border-border bg-secondary px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition font-body";

  return (
    <section id="booking" className="py-24 px-6">
      <div className="container mx-auto max-w-2xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="font-heading text-3xl md:text-5xl font-bold mb-4">
            Book din <span className="text-primary">Soundboks Go</span>
          </h2>
          <p className="text-muted-foreground text-lg">Udfyld formularen, så vender vi hurtigt tilbage.</p>
        </motion.div>

        {submitted ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="rounded-2xl border border-primary/30 bg-card p-12 text-center"
          >
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
              <Send className="w-8 h-8 text-primary" />
            </div>
            <h3 className="font-heading text-2xl font-bold mb-2">Tak for din henvendelse!</h3>
            <p className="text-muted-foreground">Vi vender tilbage hurtigst muligt.</p>
          </motion.div>
        ) : (
          <motion.form
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            onSubmit={handleSubmit}
            className="rounded-2xl border border-border bg-card p-8 space-y-5"
          >
            <div className="grid sm:grid-cols-2 gap-5">
              <input type="text" placeholder="Navn" required className={inputClass} value={formData.name} onChange={e => setFormData(p => ({ ...p, name: e.target.value }))} />
              <input type="tel" placeholder="Telefonnummer" required className={inputClass} value={formData.phone} onChange={e => setFormData(p => ({ ...p, phone: e.target.value }))} />
            </div>
            <input type="email" placeholder="Email" required className={inputClass} value={formData.email} onChange={e => setFormData(p => ({ ...p, email: e.target.value }))} />
            <input type="text" placeholder="Ønskede dato(er)" required className={inputClass} value={formData.dates} onChange={e => setFormData(p => ({ ...p, dates: e.target.value }))} />
            <textarea placeholder="Besked (valgfrit)" rows={4} className={inputClass} value={formData.message} onChange={e => setFormData(p => ({ ...p, message: e.target.value }))} />
            <button
              type="submit"
              className="w-full rounded-lg bg-primary text-primary-foreground font-heading font-semibold py-4 text-lg hover:opacity-90 transition-all"
            >
              Send booking-forespørgsel
            </button>
          </motion.form>
        )}
      </div>
    </section>
  );
};

export default BookingSection;
