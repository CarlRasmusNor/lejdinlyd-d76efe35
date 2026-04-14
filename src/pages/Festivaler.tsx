import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { MapPin, Calendar, ArrowLeft, Music, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FestivalBookingSection from "@/components/FestivalBookingSection";

const festivals = [
  {
    name: "Roskilde Festival",
    slug: "roskilde",
    location: "Roskilde",
    dates: "27. juni – 4. juli 2026",
    dateFrom: "2026-06-27",
    dateTo: "2026-07-04",
    days: 8,
    price: 1999,
    competitorPrice: 2399,
    description: "Danmarks største festival. Lej en Soundboks Go til Roskilde Festival og sæt stemningen i campen hele ugen.",
    highlight: "Mest populære",
    color: "border-primary/40",
  },
  {
    name: "Smukfest",
    slug: "smukfest",
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
  "Soundboks Go højtaler",
  "Oplader medfølger",
  "Bluetooth 5.0 – op til 121 dB",
  "Op til 10 timers batteritid",
  "Intet depositum",
  "Betaling ved overlevering",
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

      {/* Hero */}
      <section className="pt-8 pb-20 px-6 bg-gradient-to-b from-background to-secondary/20">
        <div className="container mx-auto max-w-5xl text-center">
          <motion.p
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
            className="text-primary font-heading font-medium tracking-widest uppercase text-sm mb-6"
          >
            Soundboks udlejning til festival
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }}
            className="font-heading text-4xl md:text-6xl font-bold leading-tight mb-6"
          >
            Lej Soundboks til<br />
            <span className="text-primary">festival 2026</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }}
            className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto mb-10"
          >
            Billig Soundboks Go udlejning til Roskilde, Smukfest, Nibe og alle andre store festivaler i Danmark. Afhentning i Aalborg – ingen depositum.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <a
              href="#booking"
              onClick={(e) => { e.preventDefault(); document.querySelector("#booking")?.scrollIntoView({ behavior: "smooth" }); }}
              className="inline-flex items-center justify-center px-8 py-4 rounded-xl bg-primary text-primary-foreground font-heading font-semibold text-lg hover:opacity-90 transition-all"
            >
              Book din festival-lyd
            </a>
            <a
              href="#festivaler"
              onClick={(e) => { e.preventDefault(); document.querySelector("#festivaler")?.scrollIntoView({ behavior: "smooth" }); }}
              className="inline-flex items-center justify-center px-8 py-4 rounded-xl border border-border text-foreground font-heading font-semibold text-lg hover:bg-secondary transition-all"
            >
              Se alle festivaler
            </a>
          </motion.div>
        </div>
      </section>

      {/* What's included */}
      <section className="py-16 px-6 bg-secondary/30">
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
                key={item}
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="flex items-center gap-3 rounded-xl border border-border bg-card px-5 py-4"
              >
                <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
                <span className="text-foreground text-sm font-medium">{item}</span>
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
            {festivals.map((f, i) => (
              <motion.div
                key={f.slug}
                initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                whileHover={{ y: -6, transition: { duration: 0.25 } }}
                className={`rounded-2xl border ${f.color} bg-card p-6 flex flex-col relative overflow-hidden hover:border-primary/40 transition-colors`}
              >
                {f.highlight && (
                  <span className="absolute top-4 right-4 text-xs px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary font-semibold">
                    {f.highlight}
                  </span>
                )}
                <div className="flex items-center gap-2 mb-1">
                  <Music className="w-4 h-4 text-primary" />
                  <p className="text-primary font-heading font-semibold text-sm">{f.name}</p>
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
                      <p className="text-muted-foreground line-through text-sm">fra {f.competitorPrice.toLocaleString("da-DK")} DKK</p>
                    </div>
                  </div>
                  <button
                    onClick={() => handleBook(f)}
                    className="block w-full text-center py-3 rounded-xl bg-primary text-primary-foreground font-heading font-semibold text-sm hover:opacity-90 transition-all"
                  >
                    Book til {f.name.split(" ")[0]}
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pickup info */}
      <section className="py-16 px-6 bg-secondary/30">
        <div className="container mx-auto max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="rounded-2xl border border-border bg-card p-8 text-center"
          >
            <MapPin className="w-8 h-8 text-primary mx-auto mb-4" />
            <h3 className="font-heading text-xl font-bold mb-3">Afhentning & levering</h3>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Højttaleren afhentes på <strong className="text-foreground">Kjellerupsgade 4, 9000 Aalborg</strong> inden din festival.
              Vi aftaler et tidspunkt der passer dig.
            </p>
            <p className="text-muted-foreground text-sm">
              Til <strong className="text-foreground">Nibe Festival</strong> kan vi tilbyde levering direkte til festivalpladsen – kontakt os for aftale.
            </p>
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
