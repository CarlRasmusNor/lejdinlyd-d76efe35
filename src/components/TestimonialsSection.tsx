import { motion } from "framer-motion";
import { Quote, Star } from "lucide-react";

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
    {[...Array(5)].map((_, i) => (
      <Star key={i} className="h-3.5 w-3.5 fill-primary text-primary" />
    ))}
  </div>
);

const TestimonialsSection = () => {
  return (
    <section id="anmeldelser" className="px-6 py-20 md:py-28">
      <div className="mx-auto max-w-7xl">

        {/* Header */}
        <div className="mb-12 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-xl">
            <span className="eyebrow">Rigtige oplevelser</span>
            <h2 className="mt-5 font-heading text-4xl font-bold leading-[1.05] text-foreground md:text-6xl">
              Tilfredse kunder<br />
              <span className="text-foreground/55">i Aalborg</span>
            </h2>
          </div>
          <p className="max-w-sm text-base leading-7 text-muted-foreground lg:text-right">
            Nem booking, hurtig levering og lyd der gør en forskel. Det er hvad kunderne oplever igen og igen.
          </p>
        </div>

        {/* Testimonials grid */}
        <div className="grid gap-5 lg:grid-cols-[1.1fr_0.9fr]">

          {/* Featured testimonial — large pull-quote */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55 }}
            className="section-shell relative overflow-hidden rounded-[2.2rem] p-8 md:p-10"
          >
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,hsl(24_95%_56%_/_0.1),transparent_55%)]" />
            <div className="relative flex h-full flex-col">
              {/* Decorative quotation mark */}
              <Quote
                className="mb-6 h-12 w-12 text-primary/25"
                strokeWidth={1.5}
              />
              <Stars />
              <p className="mt-5 font-heading text-2xl font-semibold leading-[1.35] text-foreground md:text-3xl">
                "{testimonials[0].text}"
              </p>
              <div className="mt-auto flex items-center justify-between border-t border-white/8 pt-6">
                <div>
                  <p className="font-semibold text-foreground">{testimonials[0].name}</p>
                  <p className="mt-0.5 text-sm text-muted-foreground">{testimonials[0].location}</p>
                </div>
                <span className="rounded-full bg-primary/12 px-4 py-1.5 text-[0.62rem] font-bold uppercase tracking-[0.22em] text-primary">
                  {testimonials[0].occasion}
                </span>
              </div>
            </div>
          </motion.div>

          {/* Secondary testimonials */}
          <div className="flex flex-col gap-5">
            {testimonials.slice(1).map((testimonial, index) => (
              <motion.div
                key={testimonial.name}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: index * 0.1 }}
                className="section-shell flex flex-1 flex-col justify-between rounded-[2rem] p-6"
              >
                <div>
                  <div className="mb-4 flex items-center justify-between gap-3">
                    <Stars />
                    <span className="text-[0.6rem] uppercase tracking-[0.22em] text-primary">
                      {testimonial.occasion}
                    </span>
                  </div>
                  <p className="text-base leading-7 text-foreground">
                    "{testimonial.text}"
                  </p>
                </div>
                <div className="mt-5 flex items-center gap-3 border-t border-white/8 pt-4">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/14">
                    <span className="font-heading text-xs font-bold text-primary">
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
      </div>
    </section>
  );
};

export default TestimonialsSection;
