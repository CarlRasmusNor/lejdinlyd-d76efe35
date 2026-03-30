import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  { q: "Hvordan lejer jeg en Soundboks i Aalborg?", a: "Du booker nemt via formularen her på siden eller kontakter os på telefon/email. Vi bekræfter din booking hurtigst muligt, og du kan hente højttaleren på Kjellerupsgade 4 i Aalborg." },
  { q: "Leverer I Soundboks i hele Aalborg?", a: "Ja, vi tilbyder levering inden for Aalborg og nærområdet. Bor du uden for Aalborg-området, kan du afhente højttaleren på vores adresse: Kjellerupsgade 4, 9000 Aalborg." },
  { q: "Hvad koster det at leje en Soundboks Go i Aalborg?", a: "Søndag til torsdag koster det kun 150 kr per dag. Fredag og lørdag koster det 300 kr per dag. Ingen depositum eller skjulte gebyrer – du betaler kun for de dage du lejer." },
  { q: "Kan jeg leje en højtaler til fest i Aalborg?", a: "Absolut! Soundboks Go er perfekt til fester, havefester, konfirmationer, bryllupper og events i Aalborg og omegn. Den spiller højt, har lang batteritid og forbindes nemt via Bluetooth." },
  { q: "Hvornår kan jeg afhente og aflevere højttaleren?", a: "Afhentning og aflevering sker efter aftale på Kjellerupsgade 4, 9000 Aalborg. Vi er fleksible og finder altid et tidspunkt der passer dig." },
];

const FAQSection = () => {
  return (
    <section id="faq" className="py-24 px-6 bg-secondary/30 overflow-hidden">
      <div className="container mx-auto max-w-2xl">
        <motion.div
          initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="font-heading text-3xl md:text-5xl font-bold mb-4">
            Ofte stillede <span className="text-primary">spørgsmål</span>
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
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
        </motion.div>
      </div>
    </section>
  );
};

export default FAQSection;
