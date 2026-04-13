import { motion } from "framer-motion";
import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Christian M.",
    location: "Aalborg",
    text: "Brugte LejDinLyd til min havefest – super nem booking og højttaleren lød fantastisk. Levering direkte til døren. Kan klart anbefales!",
    occasion: "Havefest",
  },
  {
    name: "Mathias R.",
    location: "Aalborg Øst",
    text: "Lej en Soundboks Go til vores konfirmation. Prisen var helt i orden, og det var nemt at aftale afhentning. Gæsterne var vilde med lyden.",
    occasion: "Konfirmation",
  },
  {
    name: "Mads K.",
    location: "Nørresundby",
    text: "Har lejet to gange nu. Hurtig respons, fair priser og ingen bøvl. Præcis den service man har brug for til en fest.",
    occasion: "Fødselsdagsfest",
  },
  {
    name: "Emilie V.",
    location: "Aalborg",
    text: "Rigtig god oplevelse fra start til slut. Betalte ved overlevering, ingen deposita – tillidsbaseret og professionelt.",
    occasion: "Sommerfest",
  },
];

const Stars = () => (
  <div className="flex gap-0.5 mb-3">
    {[...Array(5)].map((_, i) => (
      <Star key={i} className="w-4 h-4 fill-primary text-primary" />
    ))}
  </div>
);

const TestimonialsSection = () => {
  return (
    <section id="anmeldelser" className="py-24 px-6 overflow-hidden">
      <div className="container mx-auto max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
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

        <div className="grid sm:grid-cols-2 gap-6">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="rounded-2xl border border-border bg-card p-7 flex flex-col gap-3 hover:border-primary/20 transition-colors"
            >
              <Stars />
              <p className="text-foreground leading-relaxed">"{t.text}"</p>
              <div className="flex items-center justify-between mt-auto pt-4 border-t border-border">
                <div>
                  <p className="font-heading font-semibold text-sm text-foreground">{t.name}</p>
                  <p className="text-muted-foreground text-xs">{t.location}</p>
                </div>
                <span className="text-xs px-3 py-1 rounded-full bg-primary/10 text-primary font-medium">
                  {t.occasion}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
