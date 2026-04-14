import { motion } from "framer-motion";
import { ArrowRight, MapPin, ShieldCheck, Zap } from "lucide-react";
import heroBg from "@/assets/hero-bg.jpg";
import soundboksFront from "@/assets/soundboks-front.png";

const trustPoints = [
  { icon: Zap, label: "Fra 150 kr/dag" },
  { icon: ShieldCheck, label: "Ingen depositum" },
  { icon: MapPin, label: "Levering i Aalborg" },
];

const scrollTo = (id: string) => document.querySelector(id)?.scrollIntoView({ behavior: "smooth" });

const HeroSection = () => {
  return (
    <section className="relative isolate overflow-hidden px-6 pb-20 pt-32 md:pb-28 md:pt-36">
      <div className="absolute inset-0">
        <img src={heroBg} alt="Hyggeligt udendørs arrangement" className="h-full w-full object-cover opacity-20" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,hsl(220_30%_7%_/_0.3),hsl(220_30%_7%_/_0.94)_36%,hsl(220_30%_7%)_100%)]" />
      </div>
      <div className="absolute left-1/2 top-0 h-[32rem] w-[32rem] -translate-x-1/2 rounded-full bg-primary/15 blur-[140px]" />

      <div className="relative mx-auto grid max-w-6xl gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, ease: "easeOut" }}
          className="space-y-8"
        >
          <div className="space-y-5">
            <span className="eyebrow">Soundboks udlejning i Aalborg</span>
            <div className="max-w-3xl space-y-5">
              <h1 className="max-w-3xl text-5xl font-extrabold leading-[0.92] text-foreground md:text-7xl">
                Lej en Soundboks Go
                <span className="block text-primary">til fester, gårdhaver og weekender der skal kunne mærkes</span>
              </h1>
              <p className="max-w-2xl text-lg leading-8 text-muted-foreground md:text-xl">
                Billig højtaler udlejning fra 150 kr/dag. Hurtig booking, levering i Aalborg og en enkel proces der
                føles lige så nem som den burde.
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-4 sm:flex-row">
            <a
              href="#booking"
              onClick={(e) => {
                e.preventDefault();
                scrollTo("#booking");
              }}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-8 py-4 font-heading text-base font-semibold text-primary-foreground transition-transform hover:scale-[1.02]"
            >
              Book nu
              <ArrowRight className="h-4 w-4" />
            </a>
            <a
              href="#priser"
              onClick={(e) => {
                e.preventDefault();
                scrollTo("#priser");
              }}
              className="inline-flex items-center justify-center rounded-full border border-white/12 bg-white/5 px-8 py-4 font-heading text-base font-semibold text-foreground transition-colors hover:border-primary/30 hover:bg-primary/10"
            >
              Se priser
            </a>
          </div>

          <div className="grid gap-3 md:grid-cols-3">
            {trustPoints.map((point) => (
              <div
                key={point.label}
                className="section-shell flex items-center gap-3 px-4 py-4"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary/12">
                  <point.icon className="h-5 w-5 text-primary" />
                </div>
                <p className="text-sm font-semibold text-foreground">{point.label}</p>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.75, ease: "easeOut", delay: 0.1 }}
          className="relative"
        >
          <div className="section-shell relative overflow-hidden rounded-[2rem] p-6 md:p-8">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,hsl(24_95%_56%_/_0.18),transparent_35%)]" />
            <div className="relative flex min-h-[28rem] flex-col justify-between gap-8">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-xs uppercase tracking-[0.32em] text-primary">Weekend ready</p>
                  <p className="mt-3 max-w-xs text-sm leading-6 text-muted-foreground">
                    Soundboks Go med kraftig lyd, lang batteritid og en bookingproces uden bøvl.
                  </p>
                </div>
                <div className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs uppercase tracking-[0.3em] text-foreground/80">
                  Bluetooth 5.0
                </div>
              </div>

              <div className="relative flex flex-1 items-center justify-center py-6">
                <div className="absolute h-64 w-64 rounded-full bg-primary/18 blur-[110px]" />
                <div className="absolute inset-x-10 bottom-10 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
                <motion.img
                  src={soundboksFront}
                  alt="Soundboks Go"
                  className="relative z-10 max-h-[26rem] w-auto drop-shadow-[0_32px_120px_hsl(24_95%_56%_/_0.22)]"
                  animate={{ y: [0, -10, 0], rotate: [0, 1.5, 0] }}
                  transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}
                />
              </div>

              <div className="grid gap-3 sm:grid-cols-3">
                <div className="rounded-[1.4rem] border border-white/8 bg-background/55 px-4 py-4">
                  <p className="text-xs uppercase tracking-[0.24em] text-muted-foreground">Output</p>
                  <p className="mt-2 font-heading text-3xl font-bold text-foreground">121 dB</p>
                </div>
                <div className="rounded-[1.4rem] border border-white/8 bg-background/55 px-4 py-4">
                  <p className="text-xs uppercase tracking-[0.24em] text-muted-foreground">Batteri</p>
                  <p className="mt-2 font-heading text-3xl font-bold text-foreground">40 t</p>
                </div>
                <div className="rounded-[1.4rem] border border-white/8 bg-background/55 px-4 py-4">
                  <p className="text-xs uppercase tracking-[0.24em] text-muted-foreground">Afhentning</p>
                  <p className="mt-2 font-heading text-3xl font-bold text-foreground">Fleksibel</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
