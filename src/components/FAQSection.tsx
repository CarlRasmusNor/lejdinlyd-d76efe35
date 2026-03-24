import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  { q: "Hvordan booker jeg?", a: "Du kan booke ved at udfylde formularen her på siden, eller kontakte os direkte via telefon eller email. Vi bekræfter din booking hurtigst muligt." },
  { q: "Hvordan foregår afhentning og levering?", a: "Afhentning sker på Kjellerupsgade 4, 9000 Aalborg. Vi tilbyder også levering inden for Aalborg – kontakt os for at aftale nærmere." },
  { q: "Hvad koster det?", a: "Søndag til torsdag koster det 150 DKK per dag. Fredag og lørdag koster det 300 DKK per dag. Ingen skjulte gebyrer." },
  { q: "Er højttaleren nem at bruge?", a: "Ja! Soundboks Go er super nem at bruge. Du tænder den, forbinder via Bluetooth, og så kører musikken. Vi giver dig en kort intro ved afhentning." },
];

const FAQSection = () => {
  return (
    <section id="faq" className="py-24 px-6 bg-secondary/30">
      <div className="container mx-auto max-w-2xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
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
              <AccordionItem
                key={i}
                value={`item-${i}`}
                className="rounded-xl border border-border bg-card px-6"
              >
                <AccordionTrigger className="font-heading font-semibold text-left hover:no-underline">
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
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
