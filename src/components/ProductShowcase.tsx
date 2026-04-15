import { motion } from "framer-motion";
import { Battery, Bluetooth, Volume2 } from "lucide-react";
import soundboksAngle from "@/assets/soundboks-angle.png";
import soundboksFront from "@/assets/soundboks-front.png";
import soundboksSide from "@/assets/soundboks-side.png";

const scrollTo = (id: string) => document.querySelector(id)?.scrollIntoView({ behavior: "smooth" });

const features = [
  { icon: Volume2, title: "Klar festlyd", text: "Op til 121 dB med en størrelse der stadig er let at håndtere." },
  { icon: Battery, title: "Lang batteritid", text: "40 timers batteri — hele dagen, aftenen og dagen derpå." },
  { icon: Bluetooth, title: "Trådløs frihed", text: "Forbind nemt via Bluetooth 5.0 og slip for bøvl med kabler." },
];

const stats = [
  { value: "121", unit: "dB", label: "Maksimal lydstyrke" },
  { value: "40", unit: "t", label: "Batteritid" },
  { value: "150", unit: "kr", label: "Fra per dag" },
];

const ProductShowcase = () => {
  return (
    <section id="kvalitet" className="px-6 py-20 md:py-28">
      <div className="mx-auto max-w-7xl">

        {/* Editorial stats bar */}
        <motion.div
          className="mb-14 grid grid-cols-3 border-y border-white/8 py-7"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="flex flex-col items-center gap-1 text-center"
            >
              <p
                className="font-heading font-extrabold leading-none tracking-[-0.04em] text-foreground"
                style={{ fontSize: "clamp(2.4rem, 6vw, 4.5rem)" }}
              >
                {stat.value}
                <span className="text-primary">{stat.unit}</span>
              </p>
              <p className="text-[0.68rem] uppercase tracking-[0.28em] text-muted-foreground">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* Section header */}
        <div className="mb-10 max-w-2xl">
          <span className="eyebrow">Soundboks Go</span>
          <h2 className="mt-5 font-heading text-4xl font-bold leading-[1.05] text-foreground md:text-6xl">
            Produktet skal føles<br />
            <em className="not-italic text-foreground/70">lige så stærkt</em> som lyden.
          </h2>
          <p className="mt-4 text-lg leading-8 text-muted-foreground">
            Kompakt uden at føles lille. Høj nok til arrangementet, enkel nok at bruge.
          </p>
        </div>

        {/* Main grid */}
        <div className="grid gap-5 lg:grid-cols-[0.9fr_1.1fr_0.7fr]">

          {/* Features column */}
          <div className="section-shell flex flex-col justify-between gap-5 p-6">
            <div>
              <p className="text-[0.65rem] uppercase tracking-[0.32em] text-primary">
                Udvalgte detaljer
              </p>
              <p className="mt-3 text-sm leading-7 text-muted-foreground">
                En kompakt speaker med det output, der gør en gårdfest, havefest eller fredagsbar til noget der rigtigt føles.
              </p>
            </div>
            <div className="space-y-3.5">
              {features.map((feature, i) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, x: -16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.45, delay: i * 0.08 }}
                  className="rounded-[1.5rem] border border-white/8 bg-background/45 p-4"
                >
                  <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-2xl bg-primary/14">
                    <feature.icon className="h-4.5 w-4.5 text-primary" style={{ width: "1.1rem", height: "1.1rem" }} />
                  </div>
                  <h3 className="font-heading text-lg font-semibold text-foreground">
                    {feature.title}
                  </h3>
                  <p className="mt-1.5 text-sm leading-6 text-muted-foreground">
                    {feature.text}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Hero product card */}
          <motion.div
            whileHover={{ y: -5 }}
            transition={{ duration: 0.25 }}
            className="section-shell relative overflow-hidden rounded-[2.2rem] p-6 md:p-8"
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,hsl(24_95%_56%_/_0.18),transparent_35%)]" />
            <div className="relative flex h-full flex-col justify-between gap-6">
              {/* Top */}
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <p className="text-[0.62rem] uppercase tracking-[0.32em] text-primary">
                    Hero product shot
                  </p>
                  <p className="mt-2.5 max-w-[13rem] text-sm leading-6 text-muted-foreground">
                    Hent, levér og brug den uden ekstra forklaring eller komplicerede opsætninger.
                  </p>
                </div>
                <a
                  href="#priser"
                  onClick={(e) => { e.preventDefault(); scrollTo("#priser"); }}
                  className="rounded-full border border-primary/22 bg-primary/10 px-4 py-2 text-xs font-semibold text-primary transition-colors hover:bg-primary/18"
                >
                  Se priser →
                </a>
              </div>

              {/* Product image */}
              <div className="relative flex min-h-[22rem] items-center justify-center">
                <div className="absolute h-64 w-64 rounded-full bg-primary/20 blur-[130px]" />
                <div className="absolute inset-x-12 bottom-0 h-px bg-gradient-to-r from-transparent via-primary/45 to-transparent" />
                <img
                  src={soundboksFront}
                  alt="Soundboks Go forfra"
                  className="relative z-10 max-h-[22rem] w-auto drop-shadow-[0_28px_100px_hsl(24_95%_56%_/_0.28)]"
                />
              </div>

              {/* Bottom info */}
              <div className="grid gap-3.5 sm:grid-cols-2">
                <div className="rounded-[1.4rem] border border-white/8 bg-background/45 p-4">
                  <p className="text-[0.6rem] uppercase tracking-[0.28em] text-muted-foreground">
                    Brug den til
                  </p>
                  <p className="mt-1.5 text-sm font-semibold leading-6 text-foreground">
                    Fester, konfirmationer, events og fredage med volume.
                  </p>
                </div>
                <div className="rounded-[1.4rem] border border-white/8 bg-background/45 p-4">
                  <p className="text-[0.6rem] uppercase tracking-[0.28em] text-muted-foreground">
                    Bookingen
                  </p>
                  <p className="mt-1.5 text-sm font-semibold leading-6 text-foreground">
                    Direkte på siden — hurtigt svar bagefter.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Side image column */}
          <div className="grid gap-5">
            {[soundboksSide, soundboksAngle].map((image, index) => (
              <motion.div
                key={image}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.12 }}
                className="section-shell flex min-h-[14rem] items-center justify-center p-5"
              >
                <img
                  src={image}
                  alt={index === 0 ? "Soundboks Go side" : "Soundboks Go vinkel"}
                  className="max-h-52 w-auto object-contain opacity-90 transition-opacity hover:opacity-100"
                />
              </motion.div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
};

export default ProductShowcase;
