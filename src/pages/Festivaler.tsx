import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { MapPin, Calendar, ArrowLeft, Music, Volume2, Zap, Clock, ShieldOff, CreditCard, Info } from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FestivalBookingSection from "@/components/FestivalBookingSection";

const festivals = [
  {
    name: "Roskilde Festival",
    slug: "roskilde",
    emoji: "🎸",
    location: "Roskilde",
    dates: "27. juni – 4. juli 2026",
    dateFrom: "2026-06-27",
    dateTo: "2026-07-04",
    days: 8,
    price: 1999,
    competitorPrice: 2399,
    description: "Danmarks største festival. Lej en Soundboks Go til Roskilde Festival og sæt stemningen i campen hele ugen.",
    highlight: "Mest populær",
    color: "border-primary/40",
  },
  {
    name: "Smukfest",
    slug: "smukfest",
    emoji: "🌲",
    location: "Skanderborg",
    dates: "5. – 9. august 2026",
    dateFrom: "2026-08-05",
    dateTo: "2026-08-09",
    days: 5,
    price: 1799,
    competitorPrice: 2199,
    description: "Skovens festival. God lyd i skoven gør Smukfest endnu smukkere – book din Soundboks Go i god tid.",
    highlight: null,
    color: "border-border",
  },
  {
    name: "Nibe Festival",
    slug: "nibe",
    emoji: "🌊",
    location: "Nibe (tæt på Aalborg)",
    dates: "25. – 28. juni 2026",
    dateFrom: "2026-06-25",
    dateTo: "2026-06-28",
    days: 4,
    price: 1499,
    competitorPrice: 1899,
    description: "Nordjyllands hyggefestival – og vi er nærmest. Som Aalborg-baseret udlejning er vi det oplagte valg til Nibe Festival.",
    highlight: "Levering mulig",
    color: "border-border",
  },
  {
    name: "Jelling Festival",
    slug: "jelling",
    emoji: "🏔️",
    location: "Jelling",
    dates: "20. – 24. maj 2026",
    dateFrom: "2026-05-20",
    dateTo: "2026-05-24",
    days: 5,
    price: 1499,
    competitorPrice: 1899,
    description: "En af Danmarks ældste festivaler. Tag god lyd med til Jelling og nyd musikken fra morgen til midnat.",
    highlight: null,
    color: "border-border",
  },
  {
    name: "Tinderbox",
    slug: "tinderbox",
    emoji: "🔥",
    location: "Odense",
    dates: "25. – 27. juni 2026",
    dateFrom: "2026-06-25",
    dateTo: "2026-06-27",
    days: 3,
    price: 1299,
    competitorPrice: 1599,
    description: "Tre dage fyldt med musik i Odense. En Soundboks Go sørger for at festen fortsætter tilbage på campen.",
    highlight: null,
    color: "border-border",
  },
  {
    name: "NorthSide",
    slug: "northside",
    emoji: "🏙️",
    location: "Aarhus",
    dates: "4. – 6. juni 2026",
    dateFrom: "2026-06-04",
    dateTo: "2026-06-06",
    days: 3,
    price: 1299,
    competitorPrice: 1499,
    description: "Aarhus' urban festival. Kompakt og kraftfuld lyd til en weekend fyldt med oplevelser.",
    highlight: null,
    color: "border-border",
  },
  {
    name: "Copenhell",
    slug: "copenhell",
    emoji: "🤘",
    location: "København",
    dates: "11. – 14. juni 2026",
    dateFrom: "2026-06-11",
    dateTo: "2026-06-14",
    days: 4,
    price: 1399,
    competitorPrice: 1699,
    description: "Danmarks hvideste metalfestival. Soundboks Go leverer lyden inden koncerterne starter.",
    highlight: null,
    color: "border-border",
  },
  {
    name: "Grøn Koncert",
    slug: "gron-koncert",
    emoji: "🌿",
    location: "Flere byer i Danmark",
    dates: "Juli – august 2026",
    dateFrom: "2026-07-01",
    dateTo: undefined,
    days: 1,
    price: 299,
    competitorPrice: 399,
    description: "Grøn Koncert turnerer rundt i Danmark. Lej en Soundboks Go til dagen og gør oplevelsen komplet.",
    highlight: null,
    color: "border-border",
  },
];

const included = [
  { text: "Soundboks Go højtaler", icon: Volume2 },
  { text: "Oplader medfølger", icon: Zap },
  { text: "Bluetooth 5.0 – op til 121 dB", icon: Music },
  { text: "Op til 10 timers batteritid", icon: Clock },
  { text: "Intet depositum", icon: ShieldOff },
  { text: "Betaling ved overlevering", icon: CreditCard },
];

const Festivaler = () => {
  const [selectedFestival, setSelectedFestival] = useState<typeof festivals[0] | null>(null);

  const handleBook = (festival: typeof festivals[0]) => {
    setSelectedFestival(festival);
    setTimeout(() => {
      document.querySelector("#booking")?.scrollIntoView({ behavior: "smooth" });
    }, 50);
  };

  useEffect(() => {
    document.title = "Lej Soundboks til Festival 2026 – Roskilde, Smukfest, Nibe | LejDinLyd";
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) metaDesc.setAttribute("content", "Lej en Soundboks Go til festival i Danmark. Billige priser til Roskilde, Smukfest, Nibe, Jelling, Tinderbox og flere. Afhentning i Aalborg.");
    const canonical = document.querySelector('link[rel="canonical"]');
    if (canonical) canonical.setAttribute("href", "https://lej-din-lyd.dk/festivaler");
    return () => {
      if (canonical) canonical.setAttribute("href", "https://lej-din-lyd.dk");
    };
  }, []);

  return (
    <>
      <Navbar />

      {/* Breadcrumb */}
      <div className="pt-20 px-6">
        <div className="container mx-auto max-w-5xl">
          <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.4 }}>
            <Link to="/" className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors text-sm">
              <ArrowLeft className="w-4 h-4" /> Tilbage til forsiden
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Hero — festival-vibrant gradient */}
      <section className="relative pt-10 pb-24 px-6 overflow-hidden">
        {/* Layered gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-primary/10 pointer-events-none" />
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/4 w-[600px] h-[400px] rounded-full bg-primary/8 blur-[120px]" />
          <div className="absolute bottom-0 right-1/4 w-[400px] h-[300px] rounded-full bg-orange-600/6 blur-[100px]" />
        </div>
        {/* Decorative dots pattern */}
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.03]"
          style={{
            backgroundImage: "radial-gradient(circle, hsl(24 95% 53%) 1px, transparent 1px)",
            backgroundSize: "32px 32px",
          }}
        />

        <div className="relative container mx-auto max-w-5xl text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/30 bg-primary/10 mb-6"
          >
            <Music className="w-4 h-4 text-primary" />
            <span className="text-primary font-heading font-semibold tracking-wide uppercase text-xs">Soundboks udlejning til festival 2026</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }}
            className="font-heading text-4xl md:text-6xl lg:text-7xl font-bold leading-[1.05] mb-6"
          >
            Sæt <span className="text-primary">lydbarren</span> højt<br />
            til sommer 2026
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }}
            className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto mb-10"
          >
            Lej Soundboks Go til Roskilde, Smukfest, Nibe og alle andre store festivaler. Afhentning i Aalborg – ingen depositum, betaling ved overlevering.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-wrap gap-3 justify-center"
          >
            <a
              href="#festivaler"
              onClick={(e) => { e.preventDefault(); document.querySelector("#festivaler")?.scrollIntoView({ behavior: "smooth" }); }}
              className="inline-flex items-center justify-center px-8 py-4 rounded-xl bg-primary text-primary-foreground font-heading font-semibold text-lg hover:opacity-90 active:scale-95 transition-all"
            >
              Se alle festivaler
            </a>
            <a
              href="#hvad-er-inkluderet"
              onClick={(e) => { e.preventDefault(); document.querySelector("#hvad-er-inkluderet")?.scrollIntoView({ behavior: "smooth" }); }}
              className="inline-flex items-center justify-center px-8 py-4 rounded-xl border border-border bg-card text-foreground font-heading font-semibold text-lg hover:border-primary/40 transition-all"
            >
              Hvad er inkluderet?
            </a>
          </motion.div>
        </div>
      </section>

      {/* What's included */}
      <section id="hvad-er-inkluderet" className="py-16 px-6 bg-secondary/30">
        <div className="container mx-auto max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="text-center mb-10"
          >
            <h2 className="font-heading text-2xl md:text-3xl font-bold mb-2">
              Hvad er <span className="text-primary">inkluderet</span>?
            </h2>
            <p className="text-muted-foreground">Alt hvad du behøver til en god festival-oplevelse</p>
          </motion.div>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
            {included.map((item, i) => (
              <motion.div
                key={item.text}
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="flex items-center gap-4 rounded-xl border border-border bg-card px-5 py-4 hover:border-primary/30 transition-colors"
              >
                <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <item.icon className="w-4 h-4 text-primary" />
                </div>
                <span className="text-foreground text-sm font-medium">{item.text}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Festival cards */}
      <section id="festivaler" className="py-24 px-6">
        <div className="container mx-auto max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="font-heading text-3xl md:text-5xl font-bold mb-4">
              Priser per <span className="text-primary">festival</span>
            </h2>
            <p className="text-muted-foreground text-lg">Vi ligger konsekvent under markedsprisen – ingen skjulte gebyrer</p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {festivals.map((f, i) => {
              const isSelected = selectedFestival?.slug === f.slug;
              return (
                <motion.div
                  key={f.slug}
                  initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.08 }}
                  whileHover={{ y: -4, transition: { duration: 0.2 } }}
                  className={[
                    "rounded-2xl border bg-card p-6 flex flex-col relative overflow-hidden transition-all duration-200",
                    isSelected
                      ? "border-primary bg-primary/5 ring-2 ring-primary/30 shadow-[0_0_30px_hsl(24_95%_53%/0.12)]"
                      : "border-border hover:border-primary/40",
                  ].join(" ")}
                >
                  {/* Festival emoji accent */}
                  <div className="absolute top-4 left-4 text-2xl leading-none select-none opacity-20 pointer-events-none">
                    {f.emoji}
                  </div>

                  {f.highlight && (
                    <span className="absolute top-4 right-4 text-xs px-3 py-1 rounded-full bg-primary text-primary-foreground font-heading font-bold">
                      {f.highlight}
                    </span>
                  )}

                  <div className="flex items-center gap-2 mb-1 mt-1">
                    <span className="text-lg">{f.emoji}</span>
                    <p className="font-heading font-bold text-foreground">{f.name}</p>
                    {isSelected && (
                      <span className="ml-auto text-xs text-primary font-semibold">Valgt ✓</span>
                    )}
                  </div>
                  <div className="flex items-center gap-1 text-muted-foreground text-xs mb-1">
                    <MapPin className="w-3 h-3" /> {f.location}
                  </div>
                  <div className="flex items-center gap-1 text-muted-foreground text-xs mb-5">
                    <Calendar className="w-3 h-3" /> {f.dates} · {f.days} dage
                  </div>

                  <p className="text-muted-foreground text-sm leading-relaxed mb-6 flex-1">{f.description}</p>

                  <div className="border-t border-border pt-4">
                    <div className="flex items-end justify-between mb-4">
                      <div>
                        <p className="text-xs text-muted-foreground mb-1">Vores pris</p>
                        <p className="font-heading text-3xl font-bold text-foreground">
                          {f.price.toLocaleString("da-DK")} <span className="text-base font-normal text-muted-foreground">DKK</span>
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-xs text-muted-foreground mb-1">Konkurrenter</p>
                        <p className="text-muted-foreground/60 line-through text-xs">fra {f.competitorPrice.toLocaleString("da-DK")} DKK</p>
                      </div>
                    </div>
                    <button
                      onClick={() => handleBook(f)}
                      className={[
                        "block w-full text-center py-3 rounded-xl font-heading font-semibold text-sm transition-all active:scale-95",
                        isSelected
                          ? "bg-primary text-primary-foreground opacity-90"
                          : "bg-primary text-primary-foreground hover:opacity-90",
                      ].join(" ")}
                    >
                      {isSelected ? `Valgt – rul ned for at booke` : `Book til ${f.name.split(" ")[0]}`}
                    </button>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Pickup info */}
      <section className="py-16 px-6 bg-secondary/30">
        <div className="container mx-auto max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="rounded-2xl border border-primary/20 bg-card p-8"
          >
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                <Info className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h3 className="font-heading text-xl font-bold mb-2">Afhentning & levering</h3>
                <p className="text-muted-foreground leading-relaxed mb-3">
                  Højttaleren afhentes på <strong className="text-foreground">Kjellerupsgade 4, 9000 Aalborg</strong> inden din festival.
                  Vi aftaler et tidspunkt der passer dig.
                </p>
                <div className="inline-flex items-center gap-2 text-sm bg-primary/10 border border-primary/20 rounded-lg px-4 py-2">
                  <MapPin className="w-4 h-4 text-primary flex-shrink-0" />
                  <span className="text-foreground">
                    Til <strong>Nibe Festival</strong> kan vi tilbyde levering direkte til festivalpladsen – kontakt os for aftale.
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Booking */}
      <FestivalBookingSection festival={selectedFestival} />

      <Footer />
    </>
  );
};

export default Festivaler;
