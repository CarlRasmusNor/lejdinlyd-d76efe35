import { motion } from "framer-motion";
import { Battery, Bluetooth, Volume2 } from "lucide-react";
import soundboksAngle from "@/assets/soundboks-angle.png";
import soundboksFront from "@/assets/soundboks-front.png";
import soundboksSide from "@/assets/soundboks-side.png";

const scrollTo = (id: string) => document.querySelector(id)?.scrollIntoView({ behavior: "smooth" });

const features = [
  { icon: Volume2, title: "Klar festlyd", text: "Op til 121 dB med en størrelse der stadig er let at håndtere." },
  { icon: Battery, title: "Lang batteritid", text: "Perfekt til hele dagen, hele aftenen og dagen derpå." },
  { icon: Bluetooth, title: "Trådløs frihed", text: "Forbind nemt via Bluetooth og slip for bøvl med kabler." },
];

const ProductShowcase = () => {
  return (
    <section id="kvalitet" className="px-6 py-24 md:py-28">
      <div className="mx-auto max-w-6xl">
        <div className="mb-10 max-w-2xl">
          <span className="eyebrow">Soundboks Go</span>
          <h2 className="mt-5 text-4xl font-bold text-foreground md:text-6xl">
            Produktet skal føles lige så stærkt som lyden.
          </h2>
          <p className="mt-4 text-lg leading-8 text-muted-foreground">
            Derfor viser vi ikke bare højtaleren frem. Vi viser, hvorfor den er den rigtige størrelse, styrke og
            fleksibilitet til fester i Aalborg og omegn.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr_0.7fr]">
          <div className="section-shell flex flex-col justify-between gap-6 p-6">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-primary">Udvalgte detaljer</p>
              <p className="mt-3 text-sm leading-7 text-muted-foreground">
                En kompakt speaker med den slags output, der gør en gårdfest, havefest eller fredagsbar meget lettere
                at få til at føles rigtig.
              </p>
            </div>
            <div className="space-y-4">
              {features.map((feature) => (
                <div key={feature.title} className="rounded-[1.5rem] border border-white/8 bg-background/45 p-4">
                  <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-2xl bg-primary/12">
                    <feature.icon className="h-5 w-5 text-primary" />
                  </div>
                  <h3 className="font-heading text-xl font-semibold text-foreground">{feature.title}</h3>
                  <p className="mt-2 text-sm leading-7 text-muted-foreground">{feature.text}</p>
                </div>
              ))}
            </div>
          </div>

          <motion.div
            whileHover={{ y: -6 }}
            transition={{ duration: 0.25 }}
            className="section-shell relative overflow-hidden rounded-[2.2rem] p-6 md:p-8"
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,hsl(24_95%_56%_/_0.16),transparent_32%)]" />
            <div className="relative flex h-full flex-col justify-between gap-6">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <p className="text-xs uppercase tracking-[0.3em] text-primary">Hero product shot</p>
                  <p className="mt-3 max-w-sm text-sm leading-7 text-muted-foreground">
                    Kompakt uden at føles lille. Høj nok til arrangementet, enkel nok til at hente, levere og bruge uden
                    ekstra forklaring.
                  </p>
                </div>
                <a
                  href="#priser"
                  onClick={(e) => {
                    e.preventDefault();
                    scrollTo("#priser");
                  }}
                  className="rounded-full border border-primary/20 bg-primary/10 px-4 py-2 text-sm font-semibold text-primary transition-colors hover:bg-primary/15"
                >
                  Se priser
                </a>
              </div>
              <div className="relative flex min-h-[24rem] items-center justify-center">
                <div className="absolute h-72 w-72 rounded-full bg-primary/18 blur-[140px]" />
                <img
                  src={soundboksFront}
                  alt="Soundboks Go forfra"
                  className="relative z-10 max-h-[24rem] w-auto drop-shadow-[0_24px_100px_hsl(24_95%_56%_/_0.25)]"
                />
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-[1.4rem] border border-white/8 bg-background/45 p-4">
                  <p className="text-xs uppercase tracking-[0.26em] text-muted-foreground">Brug den til</p>
                  <p className="mt-2 text-base font-semibold text-foreground">Fester, konfirmationer, events og fredage der skal have lidt mere volume.</p>
                </div>
                <div className="rounded-[1.4rem] border border-white/8 bg-background/45 p-4">
                  <p className="text-xs uppercase tracking-[0.26em] text-muted-foreground">Bookingen</p>
                  <p className="mt-2 text-base font-semibold text-foreground">Direkte her på siden og med svar hurtigt bagefter.</p>
                </div>
              </div>
            </div>
          </motion.div>

          <div className="grid gap-6">
            {[soundboksSide, soundboksAngle].map((image, index) => (
              <div key={image} className="section-shell flex min-h-[15rem] items-center justify-center p-5">
                <img
                  src={image}
                  alt={index === 0 ? "Soundboks Go side" : "Soundboks Go vinkel"}
                  className="max-h-56 w-auto object-contain"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductShowcase;
