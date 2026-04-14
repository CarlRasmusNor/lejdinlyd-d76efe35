import { motion } from "framer-motion";
import { ArrowRight, Mail, MapPin, Phone } from "lucide-react";

const scrollTo = (id: string) => document.querySelector(id)?.scrollIntoView({ behavior: "smooth" });

const contacts = [
  { href: "mailto:rasmuscarl@hotmail.com", icon: Mail, label: "Email", text: "rasmuscarl@hotmail.com" },
  { href: "tel:+4553540096", icon: Phone, label: "Telefon", text: "+45 53 54 00 96" },
];

const ContactSection = () => {
  return (
    <section id="kontakt" className="px-6 py-24 md:py-28">
      <div className="mx-auto max-w-6xl">
        <div className="section-shell grid gap-6 rounded-[2.4rem] p-7 md:grid-cols-[0.9fr_1.1fr] md:p-10">
          <div>
            <span className="eyebrow">Kontakt</span>
            <h2 className="mt-5 text-4xl font-bold text-foreground md:text-5xl">
              Klar til at booke, eller vil du bare spørge først?
            </h2>
            <p className="mt-4 max-w-xl text-base leading-8 text-muted-foreground">
              Ring, skriv eller book direkte. Vi svarer hurtigt og holder processen enkel hele vejen fra første kontakt
              til afhentning eller levering.
            </p>
            <a
              href="#booking"
              onClick={(e) => {
                e.preventDefault();
                scrollTo("#booking");
              }}
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-primary px-7 py-4 font-heading text-base font-semibold text-primary-foreground"
            >
              Book din højtaler nu
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>

          <div className="grid gap-4">
            {contacts.map((contact, index) => (
              <motion.a
                key={contact.href}
                href={contact.href}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: index * 0.08 }}
                className="rounded-[1.7rem] border border-white/8 bg-background/45 p-5"
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-[1rem] bg-primary/12">
                  <contact.icon className="h-5 w-5 text-primary" />
                </div>
                <p className="text-xs uppercase tracking-[0.26em] text-muted-foreground">{contact.label}</p>
                <p className="mt-2 text-lg font-semibold text-foreground">{contact.text}</p>
              </motion.a>
            ))}

            <div className="rounded-[1.7rem] border border-white/8 bg-background/45 p-5">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-[1rem] bg-primary/12">
                <MapPin className="h-5 w-5 text-primary" />
              </div>
              <p className="text-xs uppercase tracking-[0.26em] text-muted-foreground">Adresse</p>
              <p className="mt-2 text-lg font-semibold text-foreground">Kjellerupsgade 4, 9000 Aalborg</p>
              <p className="mt-2 text-sm leading-7 text-muted-foreground">
                Afhentning og aflevering efter aftale. Levering i Aalborg og omegn kan også arrangeres.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
