import { useEffect } from "react";
import { motion } from "framer-motion";
import { MapPin, Truck, Volume2, Bluetooth, Battery, PartyPopper, Calendar, BadgeDollarSign, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BookingSection from "@/components/BookingSection";
import ContactSection from "@/components/ContactSection";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    q: "Hvordan lejer jeg en Soundboks i Aalborg?",
    a: "Det er nemt at leje en Soundboks Go i Aalborg hos LejDinLyd. Du booker via formularen herunder eller kontakter os på telefon eller email. Vi bekræfter din booking hurtigt, og du kan enten få levering i Aalborg-området eller afhente højttaleren på Kjellerupsgade 4, 9000 Aalborg.",
  },
  {
    q: "Hvad koster Soundboks udlejning i Aalborg?",
    a: "Priserne for at leje en Soundboks Go i Aalborg er simple og gennemsigtige. Søndag til torsdag koster det kun 150 kr per dag. Fredag og lørdag koster det 300 kr per dag. Der er ingen depositum eller skjulte gebyrer – du betaler kun for de dage du lejer.",
  },
  {
    q: "Leverer I Soundboks til fest i hele Aalborg?",
    a: "Ja, vi tilbyder levering af Soundboks Go inden for Aalborg og nærområdet. Bor du uden for Aalborg-området, kan du afhente højttaleren på vores adresse: Kjellerupsgade 4, 9000 Aalborg. Vi er fleksible med tidspunkter for både afhentning og aflevering.",
  },
  {
    q: "Kan jeg leje en højtaler til fest, konfirmation eller bryllup i Aalborg?",
    a: "Absolut! Soundboks Go er det perfekte valg til fester, havefester, konfirmationer, bryllupper, firmaarrangementer og alle slags events i Aalborg. Den spiller op til 121 dB, har lang batteritid og forbindes nemt via Bluetooth – så du kan fokusere på at nyde festen.",
  },
  {
    q: "Hvordan virker Soundboks Go – er den nem at bruge?",
    a: "Ja, Soundboks Go er utrolig nem at bruge. Du tænder den med én knap, forbinder din telefon via Bluetooth, og så kører musikken. Batteriet holder op til 10 timer, så du slipper for at tænke på strøm. Vi giver en kort intro ved afhentning, så du er klar fra start.",
  },
];

const features = [
  { icon: Volume2, title: "Op til 121 dB", desc: "Kraftig lyd der fylder hele festen – indendørs og udendørs i Aalborg" },
  { icon: Battery, title: "10 timers batteri", desc: "Spiller hele aftenen uden opladning" },
  { icon: Bluetooth, title: "Bluetooth forbindelse", desc: "Forbind din telefon på sekunder" },
  { icon: PartyPopper, title: "Perfekt til fest", desc: "Ideel til fester, events og sammenkomster i Aalborg" },
];

const LejSoundboksAalborg = () => {
  useEffect(() => {
    document.title = "Lej Soundboks i Aalborg – Nem udlejning fra 150 kr/dag | LejDinLyd";
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) metaDesc.setAttribute("content", "Lej en Soundboks Go i Aalborg fra kun 150 kr/dag. Nem online booking, ingen depositum og levering i hele Aalborg og omegn. Perfekt til fest, konfirmation og bryllup.");
    const canonical = document.querySelector('link[rel="canonical"]');
    if (canonical) canonical.setAttribute("href", "https://lej-din-lyd.dk/lej-soundboks-aalborg");
    return () => {
      if (canonical) canonical.setAttribute("href", "https://lej-din-lyd.dk");
    };
  }, []);

  return (
    <>
      <Navbar />

      {/* Breadcrumb */}
      <div className="pt-20 px-6">
        <div className="container mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
          >
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors text-sm"
            >
              <ArrowLeft className="w-4 h-4" /> Tilbage til forsiden
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Hero */}
      <section className="pt-8 pb-20 px-6 bg-gradient-to-b from-background to-secondary/20">
        <div className="container mx-auto max-w-4xl text-center">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-primary font-heading font-medium tracking-widest uppercase text-sm mb-6"
          >
            Soundboks udlejning i Aalborg
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-heading text-4xl md:text-6xl font-bold leading-tight mb-6"
          >
            Lej en Soundboks Go i Aalborg
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto mb-10"
          >
            Billig og nem højtaler udlejning i Aalborg og omegn. Fra kun 150 kr/dag – perfekt til fest, events, konfirmation og bryllup.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <a
              href="#booking"
              onClick={(e) => { e.preventDefault(); document.querySelector("#booking")?.scrollIntoView({ behavior: "smooth" }); }}
              className="inline-flex items-center justify-center px-8 py-4 rounded-lg bg-primary text-primary-foreground font-heading font-semibold text-lg hover:opacity-90 transition-all active:scale-95"
            >
              Book nu
            </a>
            <a
              href="#kontakt"
              onClick={(e) => { e.preventDefault(); document.querySelector("#kontakt")?.scrollIntoView({ behavior: "smooth" }); }}
              className="inline-flex items-center justify-center px-8 py-4 rounded-lg border border-border text-foreground font-heading font-semibold text-lg hover:bg-secondary transition-all active:scale-95"
            >
              Kontakt os
            </a>
          </motion.div>
        </div>
      </section>

      {/* Intro text – unique content */}
      <section className="py-20 px-6">
        <div className="container mx-auto max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="prose prose-lg max-w-none text-muted-foreground"
          >
            <h2 className="font-heading text-2xl md:text-3xl font-bold text-foreground mb-6">
              Lej en højtaler i Aalborg – nemt, billigt og hurtigt
            </h2>
            <p>
              Planlægger du en fest, konfirmation, havefest eller et firmaevent i Aalborg? Så er en Soundboks Go det perfekte valg. 
              Hos LejDinLyd tilbyder vi billig Soundboks udlejning i Aalborg og nærområdet, så du kan få professionel lyd uden at købe dyrt udstyr.
            </p>
            <p>
              Soundboks Go er bygget til at levere kraftig, klar lyd med op til 121 dB – nok til at fylde en stor have, et festlokale eller et udendørs arrangement. 
              Med Bluetooth-forbindelse og op til 10 timers batteritid slipper du for ledninger og strømbekymringer. Du forbinder simpelthen din telefon og trykker play.
            </p>
            <p>
              Vi gør det nemt at leje en højtaler i Aalborg. Book via vores formular, og vi bekræfter din reservation hurtigt. 
              Bor du i Aalborg eller nærområdet, kan vi levere direkte til din adresse. Bor du uden for området, er du velkommen til at afhente højttaleren på 
              <strong> Kjellerupsgade 4, 9000 Aalborg</strong>.
            </p>
            <p>
              Vores priser er simple og fair: 150 kr per dag søndag til torsdag og 300 kr per dag fredag og lørdag. 
              Ingen depositum, ingen skjulte gebyrer – bare fantastisk lyd til din næste begivenhed i Aalborg.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 px-6 bg-secondary/30">
        <div className="container mx-auto max-w-4xl">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-heading text-3xl md:text-4xl font-bold text-center mb-12"
          >
            Derfor vælger Aalborg <span className="text-primary">LejDinLyd</span>
          </motion.h2>
          <div className="grid sm:grid-cols-2 gap-6">
            {features.map((f, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="rounded-2xl border border-border bg-card p-6 flex gap-4 items-start"
              >
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                  <f.icon className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-heading font-bold mb-1">{f.title}</h3>
                  <p className="text-muted-foreground text-sm">{f.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Delivery info */}
      <section className="py-20 px-6">
        <div className="container mx-auto max-w-4xl">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-heading text-3xl md:text-4xl font-bold text-center mb-12"
          >
            Levering &amp; <span className="text-primary">afhentning</span> i Aalborg
          </motion.h2>
          <div className="grid md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="rounded-2xl border border-border bg-card p-8"
            >
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                <Truck className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-heading text-xl font-bold mb-3">Levering i Aalborg &amp; omegn</h3>
              <p className="text-muted-foreground leading-relaxed">
                Bor du i Aalborg eller nærområdet? Vi leverer din Soundboks Go direkte til din adresse. 
                Kontakt os for at aftale tidspunkt – det er nemt og fleksibelt.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="rounded-2xl border border-border bg-card p-8"
            >
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                <MapPin className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-heading text-xl font-bold mb-3">Afhentning uden for området</h3>
              <p className="text-muted-foreground leading-relaxed">
                Bor du uden for Aalborg-området? Du kan afhente højttaleren på vores adresse: 
                <strong className="text-foreground"> Kjellerupsgade 4, 9000 Aalborg</strong>. 
                Vi aftaler et tidspunkt der passer dig.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Pricing quick */}
      <section className="py-20 px-6 bg-secondary/30">
        <div className="container mx-auto max-w-3xl text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-heading text-3xl md:text-4xl font-bold mb-8"
          >
            Priser på Soundboks udlejning i <span className="text-primary">Aalborg</span>
          </motion.h2>
          <div className="grid sm:grid-cols-2 gap-6 max-w-lg mx-auto mb-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="rounded-2xl border border-border bg-card p-6 text-center"
            >
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mx-auto mb-3">
                <Calendar className="w-5 h-5 text-primary" />
              </div>
              <p className="text-muted-foreground text-sm mb-1">Søndag – Torsdag</p>
              <p className="font-heading text-3xl font-bold">150 <span className="text-lg text-muted-foreground">kr/dag</span></p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="rounded-2xl border border-primary/30 bg-card p-6 text-center"
            >
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mx-auto mb-3">
                <BadgeDollarSign className="w-5 h-5 text-primary" />
              </div>
              <p className="text-muted-foreground text-sm mb-1">Fredag – Lørdag</p>
              <p className="font-heading text-3xl font-bold">300 <span className="text-lg text-muted-foreground">kr/dag</span></p>
            </motion.div>
          </div>
          <p className="text-muted-foreground">Ingen depositum · Ingen skjulte gebyrer</p>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 px-6">
        <div className="container mx-auto max-w-2xl">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-heading text-3xl md:text-4xl font-bold text-center mb-12"
          >
            Spørgsmål om Soundboks leje i <span className="text-primary">Aalborg</span>
          </motion.h2>
          <Accordion type="single" collapsible className="space-y-3">
            {faqs.map((faq, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
              >
                <AccordionItem
                  value={`item-${i}`}
                  className="rounded-xl border border-border bg-card px-6 hover:border-primary/20 transition-colors"
                >
                  <AccordionTrigger className="font-heading font-semibold text-left hover:no-underline">
                    {faq.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    {faq.a}
                  </AccordionContent>
                </AccordionItem>
              </motion.div>
            ))}
          </Accordion>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6 bg-secondary/30">
        <div className="container mx-auto max-w-2xl text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-heading text-3xl md:text-4xl font-bold mb-4"
          >
            Klar til at leje en Soundboks i <span className="text-primary">Aalborg</span>?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-muted-foreground text-lg mb-8"
          >
            Book din Soundboks Go nu – vi bekræfter hurtigt og gør det nemt for dig.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <a
              href="#booking"
              onClick={(e) => { e.preventDefault(); document.querySelector("#booking")?.scrollIntoView({ behavior: "smooth" }); }}
              className="inline-flex items-center justify-center px-8 py-4 rounded-lg bg-primary text-primary-foreground font-heading font-semibold text-lg hover:opacity-90 transition-all active:scale-95"
            >
              Book nu
            </a>
            <a
              href="#kontakt"
              onClick={(e) => { e.preventDefault(); document.querySelector("#kontakt")?.scrollIntoView({ behavior: "smooth" }); }}
              className="inline-flex items-center justify-center px-8 py-4 rounded-lg border border-border text-foreground font-heading font-semibold text-lg hover:bg-secondary transition-all active:scale-95"
            >
              Kontakt os
            </a>
          </motion.div>
        </div>
      </section>

      <BookingSection />
      <ContactSection />
      <Footer />
    </>
  );
};

export default LejSoundboksAalborg;
