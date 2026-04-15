import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useEffect, useRef } from "react";
import { ArrowRight, ShieldCheck } from "lucide-react";
import heroBg from "@/assets/hero-bg.jpg";
import soundboksFront from "@/assets/soundboks-front.png";

const scrollTo = (id: string) => document.querySelector(id)?.scrollIntoView({ behavior: "smooth" });

// Orbit ring configs: [size in rem, border style, border opacity]
const ORBIT_RINGS = [
  { size: 18, solid: false, opacity: 0.2, speed: 8 },
  { size: 22, solid: false, opacity: 0.12, speed: -12 },
  { size: 26, solid: true,  opacity: 0.08, speed: 16 },
  { size: 30, solid: false, opacity: 0.05, speed: -22 },
];

const HeroSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const springX = useSpring(mx, { stiffness: 55, damping: 14 });
  const springY = useSpring(my, { stiffness: 55, damping: 14 });
  const rotateX = useTransform(springY, [-0.5, 0.5], [8, -8]);
  const rotateY = useTransform(springX, [-0.5, 0.5], [-10, 10]);
  const translateX = useTransform(springX, [-0.5, 0.5], [-26, 26]);
  const translateY = useTransform(springY, [-0.5, 0.5], [-20, 20]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      mx.set((e.clientX - rect.left) / rect.width - 0.5);
      my.set((e.clientY - rect.top) / rect.height - 0.5);
    };
    const onLeave = () => { mx.set(0); my.set(0); };
    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", onLeave);
    return () => { el.removeEventListener("mousemove", onMove); el.removeEventListener("mouseleave", onLeave); };
  }, [mx, my]);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0">
        <img
          src={heroBg}
          alt="Hyggeligt udendørs arrangement"
          className="w-full h-full object-cover"
          width={1920}
          height={1080}
        />
        <div className="absolute inset-0 bg-background/75" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
      </div>

      {/* Glow orbs */}
      <motion.div
        className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-primary/10 blur-[120px] pointer-events-none"
        animate={{ scale: [1, 1.08, 1] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute -bottom-40 -left-40 w-80 h-80 rounded-full bg-primary/8 blur-[100px] pointer-events-none"
        animate={{ scale: [1, 1.12, 1] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 2 }}
      />

      {/* Content */}
      <div
        ref={containerRef}
        className="relative z-10 container mx-auto px-6 flex flex-col lg:flex-row items-center gap-12 pt-20"
      >
        {/* Left — text */}
        <div className="flex-1 text-center lg:text-left">
          <motion.p
            className="text-primary font-heading font-medium tracking-widest uppercase text-sm mb-6"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Soundboks udlejning i Aalborg
          </motion.p>

          <motion.h1
            className="font-heading text-4xl md:text-6xl lg:text-7xl font-bold leading-tight max-w-2xl mb-6"
            initial={{ opacity: 0, filter: "blur(8px)", y: 20 }}
            animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
            transition={{ duration: 0.65, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          >
            Lej en Soundboks Go<br />
            <span className="text-primary">i Aalborg &amp; omegn</span>
          </motion.h1>

          <motion.p
            className="text-muted-foreground text-lg md:text-xl max-w-xl mb-10 lg:mx-0 mx-auto"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.26 }}
          >
            Billig højtaler udlejning fra 150 kr/dag – perfekt til fest, events og forsamlinger i Aalborg
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.36 }}
          >
            <a
              href="#booking"
              onClick={(e) => { e.preventDefault(); scrollTo("#booking"); }}
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-lg bg-primary text-primary-foreground font-heading font-semibold text-lg hover:opacity-90 transition-all hover:shadow-[0_0_32px_hsl(24_95%_56%_/_0.4)] active:scale-95"
            >
              Book nu
              <ArrowRight className="h-4 w-4" />
            </a>
            <a
              href="#priser"
              onClick={(e) => { e.preventDefault(); scrollTo("#priser"); }}
              className="inline-flex items-center justify-center px-8 py-4 rounded-lg border border-border text-foreground font-heading font-semibold text-lg hover:bg-secondary transition-all active:scale-95"
            >
              Se priser
            </a>
          </motion.div>

          {/* Trust badges */}
          <motion.div
            className="mt-8 flex flex-wrap gap-3 justify-center lg:justify-start"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            {[
              { label: "Fra 150 kr/dag" },
              { label: "Ingen depositum" },
              { label: "Levering i Aalborg" },
            ].map((badge) => (
              <div
                key={badge.label}
                className="flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-2"
              >
                <ShieldCheck className="h-3.5 w-3.5 text-primary" />
                <span className="text-sm font-medium text-foreground">{badge.label}</span>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Right — product with orbit rings */}
        <motion.div
          className="flex-1 flex justify-center relative"
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Glow behind image */}
          <motion.div
            className="absolute inset-0 flex items-center justify-center pointer-events-none"
            animate={{ scale: [1, 1.15, 1] }}
            transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
          >
            <div className="w-64 h-64 md:w-72 md:h-72 rounded-full bg-primary/20 blur-[80px]" />
          </motion.div>

          {/* Orbit rings */}
          {ORBIT_RINGS.map((ring, i) => (
            <motion.div
              key={i}
              className="absolute inset-0 flex items-center justify-center pointer-events-none"
              animate={{ rotate: 360 }}
              transition={{ duration: Math.abs(ring.speed), repeat: Infinity, ease: "linear", direction: ring.speed < 0 ? "reverse" : "normal" }}
            >
              <div
                className="rounded-full"
                style={{
                  width: `${ring.size}rem`,
                  height: `${ring.size}rem`,
                  border: ring.solid
                    ? `1px solid hsl(24 95% 56% / ${ring.opacity})`
                    : `2px solid hsl(24 95% 56% / ${ring.opacity})`,
                  borderStyle: ring.solid ? "dashed" : "solid",
                  borderTopColor: `hsl(24 95% 56% / ${ring.opacity * 4})`,
                }}
              />
            </motion.div>
          ))}

          {/* Floating product image */}
          <motion.img
            src={soundboksFront}
            alt="Soundboks Go"
            className="max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl drop-shadow-[0_0_80px_hsl(24_95%_53%/0.35)] relative z-10"
            style={{ x: translateX, y: translateY, rotateX, rotateY }}
            animate={{ y: [0, -38, 6, -30, 0], scale: [1, 1.05, 0.97, 1.03, 1], rotate: [0, 2.5, -1, 1.5, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.6 }}
      >
        <div className="w-6 h-10 rounded-full border-2 border-muted-foreground/30 flex justify-center pt-2">
          <motion.div
            className="w-1 h-2 rounded-full bg-primary"
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
