import { motion } from "framer-motion";
import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Christian M.",
    location: "Aalborg",
    text: "Brugte LejDinLyd til min havefest. Super nem booking, hurtig levering og højttaleren lød præcis så stort som vi håbede.",
    occasion: "Havefest",
  },
  {
    name: "Mathias R.",
    location: "Aalborg Øst",
    text: "Prisen var helt i orden, og det var nemt at aftale afhentning. Det føltes mere som en lokal, god service end som en tung udlejning.",
    occasion: "Konfirmation",
  },
  {
    name: "Mads K.",
    location: "Nørresundby",
    text: "Har lejet to gange nu. Hurtig respons, fair priser og ingen bøvl. Præcis den type udlejning man håber på.",
    occasion: "Fødselsdagsfest",
  },
  {
    name: "Jens P.",
    location: "Aalborg",
    text: "Bestilte fredag morgen og fik leveret samme eftermiddag. Lyden var fantastisk til vores udendørs arrangement. Kan klart anbefales!",
    occasion: "Udendørs event",
  },
];

const Stars = () => (
  <div className="flex gap-0.5">
    {[...Array(5)].map((_, i) => (
      <Star key={i} className="w-4 h-4 fill-primary text-primary" />
    ))}
  </div>
);

const TestimonialsSection = () => {
  return (
    <section id="anmeldelser" className="py-24 px-6 overflow-hidden">
      <div className="container mx-auto max-w-5xl">

        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, filter: "blur(10px)", y: 30 }}
          whileInView={{ opacity: 1, filter: "blur(0px)", y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-primary font-heading font-medium tracking-widest uppercase text-sm mb-4">
            Hvad kunderne siger
          </p>
          <h2 className="font-heading text-3xl md:text-5xl font-bold mb-4">
            Tilfredse kunder i <span className="text-primary">Aalborg</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            Hundredvis af fester i Aalborg og omegn – her er hvad nogle af vores kunder siger.
          </p>
        </motion.div>

        {/* Testimonials grid */}
        <div className="grid sm:grid-cols-2 gap-6">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              className="rounded-2xl border border-border bg-card p-7 flex flex-col gap-3 hover:border-primary/20 transition-colors"
            >
              <div className="flex items-center justify-between gap-3 mb-1">
                <Stars />
                <span className="text-[0.6rem] uppercase tracking-[0.22em] text-primary">
                  {testimonial.occasion}
                </span>
              </div>
              <p className="text-base leading-7 text-foreground flex-1">
                "{testimonial.text}"
              </p>
              <div className="flex items-center gap-3 border-t border-white/8 pt-4 mt-2">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/14 shrink-0">
                  <span className="font-heading text-sm font-bold text-primary">
                    {testimonial.name.charAt(0)}
                  </span>
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground">{testimonial.name}</p>
                  <p className="text-xs text-muted-foreground">{testimonial.location}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default TestimonialsSection;
