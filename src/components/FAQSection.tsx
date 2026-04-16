import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  { q: "Hvordan lejer jeg en Soundboks i Aalborg?", a: "Du booker via formularen her på siden eller kontakter os direkte. Vi bekræfter din booking hurtigst muligt og aftaler derefter levering eller afhentning." },
  { q: "Leverer I Soundboks i hele Aalborg?", a: "Ja, vi tilbyder levering i Aalborg og nærområdet. Bor du uden for Aalborg – f.eks. i Nørresundby eller andre dele af Nordjylland – kan du nemt afhente højttaleren på Kjellerupsgade 4, 9000 Aalborg." },
  { q: "Hvad koster det at leje en Soundboks Go i Aalborg?", a: "Søndag til torsdag koster det 150 kr per dag. Fredag og lørdag koster det 300 kr per dag. Ingen depositum og ingen skjulte gebyrer." },
  { q: "Kan jeg leje en højtaler til fest i Aalborg?", a: "Ja. Soundboks Go passer godt til havefester, konfirmationer, fødselsdage, sommerarrangementer og mindre events i Aalborg og omegn." },
  { q: "Hvornår kan jeg afhente og aflevere højttaleren?", a: "Afhentning og aflevering sker efter aftale. Vi er fleksible og finder et tidspunkt der passer til dit arrangement." },
];

const FAQSection = () => {
  return (
    <section id="faq" className="px-6 py-24 md:py-28">
      <div className="mx-auto max-w-6xl">
        <div className="mb-10 max-w-2xl">
          <span className="eyebrow">Ofte stillede spørgsmål</span>
          <h2 className="mt-5 text-4xl font-bold text-foreground md:text-5xl">
            Alt det praktiske samlet ét sted.
          </h2>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45 }}
          className="section-shell rounded-[2.2rem] p-4 md:p-6"
        >
          <Accordion type="single" collapsible className="space-y-3">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={faq.q}
                value={`item-${index}`}
                className="rounded-[1.5rem] border border-white/8 bg-background/45 px-5"
              >
                <AccordionTrigger className="font-heading text-left text-lg font-semibold text-foreground hover:no-underline">
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent className="text-sm leading-7 text-muted-foreground">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
};

export default FAQSection;
