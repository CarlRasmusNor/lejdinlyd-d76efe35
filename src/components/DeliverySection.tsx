import { motion } from "framer-motion";
import { MapPin, Truck } from "lucide-react";

const DeliverySection = () => {
  return (
    <section id="levering" className="px-6 py-24 md:py-28">
      <div className="mx-auto max-w-6xl">
        <div className="section-shell grid gap-6 rounded-[2.4rem] p-7 md:grid-cols-[0.8fr_1.2fr] md:p-10">
          <div>
            <span className="eyebrow">Levering & afhentning</span>
            <h2 className="mt-5 text-4xl font-bold text-foreground md:text-5xl">
              Praktikken skal være lige så enkel som bookingflowet.
            </h2>
            <p className="mt-4 text-base leading-8 text-muted-foreground">
              Vi holder logistikken enkel, så du hurtigt kan vælge den løsning der passer bedst til din fest.
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45 }}
              className="rounded-[1.8rem] border border-white/8 bg-background/45 p-6"
            >
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-[1rem] bg-primary/12">
                <Truck className="h-5 w-5 text-primary" />
              </div>
              <h3 className="font-heading text-2xl font-semibold text-foreground">Levering i Aalborg & omegn</h3>
              <p className="mt-3 text-sm leading-7 text-muted-foreground">
                Bor du i Aalborg eller nærområdet, kan vi levere din Soundboks Go direkte til adressen. Vi aftaler det
                praktiske hurtigt og fleksibelt.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: 0.08 }}
              className="rounded-[1.8rem] border border-white/8 bg-background/45 p-6"
            >
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-[1rem] bg-primary/12">
                <MapPin className="h-5 w-5 text-primary" />
              </div>
              <h3 className="font-heading text-2xl font-semibold text-foreground">Afhentning uden for området</h3>
              <p className="mt-3 text-sm leading-7 text-muted-foreground">
                Bor du uden for Aalborg, kan du afhente højttaleren på <span className="font-semibold text-foreground">Kjellerupsgade 4, 9000 Aalborg</span>. Vi finder et tidspunkt der passer dig.
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DeliverySection;
