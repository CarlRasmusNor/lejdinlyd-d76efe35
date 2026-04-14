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
];

const Stars = () => (
  <div className="flex gap-1">
    {[...Array(5)].map((_, index) => (
      <Star key={index} className="h-4 w-4 fill-primary text-primary" />
    ))}
  </div>
);

const TestimonialsSection = () => {
  return (
    <section id="anmeldelser" className="px-6 py-24 md:py-28">
      <div className="mx-auto max-w-6xl">
        <div className="mb-10 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <span className="eyebrow">Rigtige oplevelser</span>
            <h2 className="mt-5 text-4xl font-bold text-foreground md:text-6xl">
              Tilfredse kunder i Aalborg
            </h2>
          </div>
          <p className="max-w-xl text-base leading-8 text-muted-foreground">
            LejDinLyd skal ikke bare se godt ud online. Det skal være let, hurtigt og pålideligt i praksis. Det er
            den oplevelse kunderne beskriver igen og igen.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="section-shell rounded-[2.2rem] p-7 md:p-9">
            <Stars />
            <p className="mt-6 font-heading text-3xl font-semibold leading-tight text-foreground md:text-4xl">
              "{testimonials[0].text}"
            </p>
            <div className="mt-10 flex items-center justify-between border-t border-white/8 pt-5">
              <div>
                <p className="font-semibold text-foreground">{testimonials[0].name}</p>
                <p className="text-sm text-muted-foreground">{testimonials[0].location}</p>
              </div>
              <span className="rounded-full bg-primary/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-primary">
                {testimonials[0].occasion}
              </span>
            </div>
          </div>

          <div className="grid gap-6">
            {testimonials.slice(1).map((testimonial, index) => (
              <motion.div
                key={testimonial.name}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: index * 0.08 }}
                className="section-shell rounded-[2rem] p-6"
              >
                <Stars />
                <p className="mt-5 text-base leading-8 text-foreground">"{testimonial.text}"</p>
                <div className="mt-6 flex items-center justify-between border-t border-white/8 pt-4">
                  <div>
                    <p className="font-semibold text-foreground">{testimonial.name}</p>
                    <p className="text-sm text-muted-foreground">{testimonial.location}</p>
                  </div>
                  <span className="text-xs uppercase tracking-[0.22em] text-primary">{testimonial.occasion}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
