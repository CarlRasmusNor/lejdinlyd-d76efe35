import { motion } from "framer-motion";
import { ArrowRight, MapPin, ShieldCheck, Zap } from "lucide-react";
import heroBg from "@/assets/hero-bg.jpg";
import soundboksFront from "@/assets/soundboks-front.png";

// Precomputed EQ bar values — prevents re-render flicker from Math.random()
const EQ_BARS = [
  { dur: 0.75, delay: 0.00, min: 0.08, max: 0.55 },
  { dur: 0.60, delay: 0.04, min: 0.18, max: 0.88 },
  { dur: 0.90, delay: 0.08, min: 0.12, max: 0.48 },
  { dur: 0.65, delay: 0.12, min: 0.28, max: 0.82 },
  { dur: 0.80, delay: 0.16, min: 0.08, max: 0.68 },
  { dur: 0.55, delay: 0.20, min: 0.22, max: 0.94 },
  { dur: 0.70, delay: 0.24, min: 0.16, max: 0.58 },
  { dur: 0.85, delay: 0.28, min: 0.10, max: 0.76 },
  { dur: 0.62, delay: 0.32, min: 0.30, max: 0.72 },
  { dur: 0.78, delay: 0.36, min: 0.08, max: 0.50 },
  { dur: 0.92, delay: 0.40, min: 0.20, max: 0.90 },
  { dur: 0.67, delay: 0.44, min: 0.14, max: 0.62 },
  { dur: 0.83, delay: 0.48, min: 0.24, max: 0.84 },
  { dur: 0.57, delay: 0.52, min: 0.32, max: 0.68 },
  { dur: 0.72, delay: 0.56, min: 0.10, max: 0.92 },
  { dur: 0.88, delay: 0.60, min: 0.18, max: 0.54 },
  { dur: 0.63, delay: 0.64, min: 0.12, max: 0.78 },
  { dur: 0.76, delay: 0.68, min: 0.28, max: 0.58 },
  { dur: 0.91, delay: 0.72, min: 0.08, max: 0.74 },
  { dur: 0.66, delay: 0.76, min: 0.20, max: 0.96 },
  { dur: 0.81, delay: 0.80, min: 0.14, max: 0.60 },
  { dur: 0.58, delay: 0.84, min: 0.26, max: 0.86 },
  { dur: 0.74, delay: 0.88, min: 0.10, max: 0.66 },
  { dur: 0.89, delay: 0.92, min: 0.22, max: 0.44 },
];

const trustPoints = [
  { icon: Zap, label: "Fra 150 kr/dag" },
  { icon: ShieldCheck, label: "Ingen depositum" },
  { icon: MapPin, label: "Levering i Aalborg" },
];

const scrollTo = (id: string) => document.querySelector(id)?.scrollIntoView({ behavior: "smooth" });

const HeroSection = () => {
  return (
    <section className="relative isolate flex min-h-svh items-center overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0">
        <img
          src={heroBg}
          alt=""
          className="h-full w-full object-cover"
          style={{ opacity: 0.10 }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(135deg, hsl(220 30% 7%) 35%, hsl(220 30% 7% / 0.82) 100%)",
          }}
        />
      </div>

      {/* Ambient glow orbs */}
      <div
        className="pointer-events-none absolute -top-48 -left-24 rounded-full bg-primary/18 blur-[180px]"
        style={{ width: "44rem", height: "44rem" }}
      />
      <div
        className="pointer-events-none absolute top-1/2 -right-32 -translate-y-1/2 rounded-full bg-primary/10 blur-[160px]"
        style={{ width: "32rem", height: "32rem" }}
      />

      {/* Animated equalizer bars — decorative bottom accent */}
      <div
        className="pointer-events-none absolute bottom-0 left-0 right-0 flex items-end gap-[2.5px] px-6 md:px-12"
        style={{ height: "6.5rem" }}
      >
        {EQ_BARS.map((bar, i) => (
          <motion.div
            key={i}
            className="flex-1 rounded-t-sm bg-primary"
            animate={{ scaleY: [bar.min, bar.max, bar.min] }}
            transition={{
              duration: bar.dur,
              delay: bar.delay,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            style={{ transformOrigin: "bottom", opacity: 0.22 }}
          />
        ))}
      </div>

      {/* Subtle horizontal rule */}
      <div className="pointer-events-none absolute left-0 right-0 top-[42%] h-px bg-gradient-to-r from-transparent via-white/[0.035] to-transparent" />

      {/* Content */}
      <div className="relative mx-auto w-full max-w-7xl px-6 pb-32 pt-32 md:pb-40 md:pt-44">
        <div className="grid gap-12 lg:grid-cols-[1.2fr_0.8fr] lg:items-center lg:gap-16">

          {/* ── Left column ── */}
          <div>
            <motion.span
              className="eyebrow"
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.05 }}
            >
              Soundboks udlejning · Aalborg
            </motion.span>

            <motion.h1
              className="mt-5 font-heading font-extrabold leading-[0.9] tracking-[-0.04em] text-foreground"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
              style={{ fontSize: "clamp(3.4rem, 7.5vw, 6.2rem)" }}
            >
              <span className="block">Lej en</span>
              <span className="block text-primary drop-shadow-[0_0_48px_hsl(24_95%_56%_/_0.45)]">
                Soundboks
              </span>
              <span className="block text-foreground/85">til din fest</span>
            </motion.h1>

            <motion.p
              className="mt-7 max-w-[30rem] text-lg leading-8 text-muted-foreground"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.55, delay: 0.32 }}
            >
              Fra 150 kr/dag. Hurtig booking, gratis levering i Aalborg og ingen depositum — en proces der er lige så nem som den burde være.
            </motion.p>

            {/* CTA buttons */}
            <motion.div
              className="mt-8 flex flex-col gap-3 sm:flex-row"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.44 }}
            >
              <a
                href="#booking"
                onClick={(e) => {
                  e.preventDefault();
                  scrollTo("#booking");
                }}
                className="group inline-flex items-center justify-center gap-2.5 rounded-full bg-primary px-9 py-4 font-heading text-base font-semibold text-primary-foreground transition-all hover:scale-[1.03] hover:shadow-[0_0_36px_hsl(24_95%_56%_/_0.45)]"
              >
                Book nu
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </a>
              <a
                href="#priser"
                onClick={(e) => {
                  e.preventDefault();
                  scrollTo("#priser");
                }}
                className="inline-flex items-center justify-center rounded-full border border-white/12 bg-white/5 px-9 py-4 font-heading text-base font-semibold text-foreground transition-colors hover:border-primary/30 hover:bg-primary/8"
              >
                Se priser
              </a>
            </motion.div>

            {/* Trust pills */}
            <motion.div
              className="mt-9 flex flex-wrap gap-2.5"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.56 }}
            >
              {trustPoints.map((point) => (
                <div
                  key={point.label}
                  className="flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 backdrop-blur-sm"
                >
                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/18">
                    <point.icon className="h-3 w-3 text-primary" />
                  </div>
                  <span className="text-sm font-semibold text-foreground/90">
                    {point.label}
                  </span>
                </div>
              ))}
            </motion.div>
          </div>

          {/* ── Right column – product card ── */}
          <motion.div
            initial={{ opacity: 0, x: 36, scale: 0.97 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ duration: 0.85, delay: 0.18, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="section-shell relative overflow-hidden rounded-[2.5rem] p-7 md:p-9">
              {/* Radial gradient accent */}
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_0%,hsl(24_95%_56%_/_0.22),transparent_45%)]" />

              <div className="relative flex min-h-[34rem] flex-col justify-between gap-6">
                {/* Top labels */}
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-[0.62rem] font-semibold uppercase tracking-[0.38em] text-primary">
                      Festival klar · Weekend ready
                    </p>
                    <p className="mt-2.5 max-w-[13rem] text-sm leading-6 text-muted-foreground">
                      Kraftig lyd, lang batteritid og en booking uden bøvl.
                    </p>
                  </div>
                  <span className="shrink-0 rounded-full border border-primary/25 bg-primary/8 px-3 py-1.5 text-[0.58rem] font-semibold uppercase tracking-[0.3em] text-primary">
                    Bluetooth 5.0
                  </span>
                </div>

                {/* Floating product image */}
                <div className="relative flex flex-1 items-center justify-center py-2">
                  <div className="absolute h-72 w-72 rounded-full bg-primary/24 blur-[100px]" />
                  <div className="absolute inset-x-10 bottom-0 h-px bg-gradient-to-r from-transparent via-primary/55 to-transparent" />
                  <motion.img
                    src={soundboksFront}
                    alt="Soundboks Go"
                    className="relative z-10 max-h-[20rem] w-auto drop-shadow-[0_32px_110px_hsl(24_95%_56%_/_0.35)]"
                    animate={{ y: [0, -11, 0], rotate: [0, 1.3, 0] }}
                    transition={{ duration: 5.8, repeat: Infinity, ease: "easeInOut" }}
                  />
                </div>

                {/* Spec grid */}
                <div className="grid grid-cols-3 gap-2.5">
                  {[
                    { label: "Output", value: "121 dB" },
                    { label: "Batteri", value: "40 t" },
                    { label: "Afhentning", value: "Flex" },
                  ].map((spec) => (
                    <div
                      key={spec.label}
                      className="rounded-[1.2rem] border border-white/8 bg-background/60 px-3 py-3.5 text-center"
                    >
                      <p className="text-[0.58rem] uppercase tracking-[0.28em] text-muted-foreground">
                        {spec.label}
                      </p>
                      <p className="mt-1.5 font-heading text-lg font-bold text-foreground md:text-xl">
                        {spec.value}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default HeroSection;
