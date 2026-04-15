import { motion } from "framer-motion";
import { ArrowRight, MapPin, Truck } from "lucide-react";

const scrollTo = (id: string) => document.querySelector(id)?.scrollIntoView({ behavior: "smooth" });

const DeliverySection = () => {
  return (
    <section id="levering" className="px-6 py-20 md:py-28">
      <div className="mx-auto max-w-7xl">

        {/* Full-width container card */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
          className="section-shell relative overflow-hidden rounded-[2.4rem] p-8 md:p-12"
        >
          {/* Background accent */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,hsl(24_95%_56%_/_0.1),transparent_50%)]" />

          <div className="relative grid gap-8 md:grid-cols-[0.75fr_1.25fr] md:items-center">

            {/* Left — intro */}
            <div>
              <span className="eyebrow">Levering & afhentning</span>
              <h2 className="mt-5 font-heading text-3xl font-bold leading-[1.1] text-foreground md:text-4xl lg:text-5xl">
                Praktikken skal være<br />
                <span className="text-foreground/60">lige så enkel</span><br />
                som bookingflowet.
              </h2>
              <p className="mt-4 text-sm leading-7 text-muted-foreground">
                Vi holder logistikken enkel, så du hurtigt kan vælge den løsning der passer til din fest.
              </p>
              <a
                href="#booking"
                onClick={(e) => { e.preventDefault(); scrollTo("#booking"); }}
                className="group mt-7 inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3.5 font-heading text-sm font-semibold text-primary-foreground transition-all hover:scale-[1.03] hover:shadow-[0_0_28px_hsl(24_95%_56%_/_0.4)]"
              >
                Book nu
                <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
              </a>
            </div>

            {/* Right — delivery cards */}
            <div className="grid gap-4 sm:grid-cols-2">
              <motion.div
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45 }}
                className="rounded-[1.8rem] border border-primary/18 bg-primary/[0.05] p-6"
              >
                <div className="mb-5 flex items-center justify-between">
                  <div className="flex h-11 w-11 items-center justify-center rounded-[1rem] bg-primary/14">
                    <Truck className="h-5 w-5 text-primary" />
                  </div>
                  <span className="rounded-full bg-primary/12 px-3 py-1 text-[0.58rem] font-bold uppercase tracking-[0.24em] text-primary">
                    Gratis
                  </span>
                </div>
                <h3 className="font-heading text-xl font-semibold text-foreground">
                  Levering i Aalborg
                </h3>
                <p className="mt-2.5 text-sm leading-6 text-muted-foreground">
                  Bor du i Aalborg eller nærområdet, leverer vi din Soundboks Go direkte til adressen. Vi aftaler tidspunkt hurtigt og fleksibelt.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: 0.1 }}
                className="rounded-[1.8rem] border border-white/8 bg-background/45 p-6"
              >
                <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-[1rem] bg-primary/14">
                  <MapPin className="h-5 w-5 text-primary" />
                </div>
                <h3 className="font-heading text-xl font-semibold text-foreground">
                  Afhentning
                </h3>
                <p className="mt-2.5 text-sm leading-6 text-muted-foreground">
                  Bor du uden for Aalborg? Afhent højttaleren på{" "}
                  <span className="font-semibold text-foreground">
                    Kjellerupsgade 4, 9000 Aalborg
                  </span>
                  . Vi finder et tidspunkt der passer.
                </p>
              </motion.div>
            </div>

          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default DeliverySection;
