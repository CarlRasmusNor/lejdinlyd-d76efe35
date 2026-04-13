import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const navLinks = [
  { href: "#priser", label: "Priser" },
  { href: "#om-os", label: "Om os" },
  { href: "#levering", label: "Levering" },
  { href: "#booking", label: "Book nu" },
  { href: "#faq", label: "FAQ" },
  { href: "#kontakt", label: "Kontakt" },
];

const Footer = () => (
  <motion.footer
    initial={{ opacity: 0 }}
    whileInView={{ opacity: 1 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5 }}
    className="border-t border-border py-12 px-6"
  >
    <div className="container mx-auto max-w-5xl">
      <div className="grid sm:grid-cols-3 gap-8 mb-10">
        {/* Brand */}
        <div>
          <p className="font-heading font-bold text-lg text-primary mb-2">LejDinLyd</p>
          <p className="text-muted-foreground text-sm leading-relaxed">
            Billig og nem udlejning af Soundboks Go i Aalborg og omegn. Fra 150 kr/dag.
          </p>
        </div>

        {/* Navigation */}
        <div>
          <p className="font-heading font-semibold text-sm uppercase tracking-wide text-foreground mb-3">Navigation</p>
          <ul className="space-y-2">
            {navLinks.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  onClick={(e) => { e.preventDefault(); document.querySelector(l.href)?.scrollIntoView({ behavior: "smooth" }); }}
                  className="text-muted-foreground hover:text-primary text-sm transition-colors"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Links & contact */}
        <div>
          <p className="font-heading font-semibold text-sm uppercase tracking-wide text-foreground mb-3">Mere</p>
          <ul className="space-y-2">
            <li>
              <Link to="/blog" className="text-muted-foreground hover:text-primary text-sm transition-colors">
                Blog
              </Link>
            </li>
            <li>
              <Link to="/lej-soundboks-aalborg" className="text-muted-foreground hover:text-primary text-sm transition-colors">
                Lej Soundboks Aalborg
              </Link>
            </li>
            <li>
              <a href="mailto:rasmuscarl@hotmail.com" className="text-muted-foreground hover:text-primary text-sm transition-colors">
                rasmuscarl@hotmail.com
              </a>
            </li>
            <li>
              <a href="tel:+4553540096" className="text-muted-foreground hover:text-primary text-sm transition-colors">
                +45 53 54 00 96
              </a>
            </li>
            <li>
              <p className="text-muted-foreground text-sm">Kjellerupsgade 4, 9000 Aalborg</p>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-border pt-6 text-center">
        <p className="text-muted-foreground text-sm">
          © {new Date().getFullYear()} LejDinLyd · CVR: 43952919 · Alle rettigheder forbeholdes.
        </p>
      </div>
    </div>
  </motion.footer>
);

export default Footer;
