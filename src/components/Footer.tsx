import { motion } from "framer-motion";
import { Link, useLocation, useNavigate } from "react-router-dom";

const navLinks = [
  { href: "#priser", label: "Priser" },
  { href: "#om-os", label: "Historie" },
  { href: "#levering", label: "Levering" },
  { href: "#booking", label: "Book nu" },
  { href: "#faq", label: "FAQ" },
  { href: "#kontakt", label: "Kontakt" },
];

const Footer = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const isHome = location.pathname === "/";

  const handleAnchorClick = (e: React.MouseEvent, anchor: string) => {
    e.preventDefault();
    if (isHome) {
      document.querySelector(anchor)?.scrollIntoView({ behavior: "smooth" });
      return;
    }

    navigate("/");
    setTimeout(() => {
      document.querySelector(anchor)?.scrollIntoView({ behavior: "smooth" });
    }, 400);
  };

  return (
    <motion.footer
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.45 }}
      className="px-6 pb-12 pt-10"
    >
      <div className="mx-auto max-w-6xl">
        <div className="section-shell rounded-[2.4rem] p-7 md:p-10">
          <div className="grid gap-8 md:grid-cols-[1.15fr_0.85fr_0.85fr]">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-primary">LejDinLyd</p>
              <h2 className="mt-4 font-heading text-3xl font-bold text-foreground">
                Lokal Soundboks udlejning til fester i Aalborg.
              </h2>
              <p className="mt-4 max-w-md text-sm leading-7 text-muted-foreground">
                Billig og enkel udlejning af Soundboks Go i Aalborg og omegn. Hurtig booking, fleksibel afhentning og
                levering når det giver mening.
              </p>
            </div>

            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">Navigation</p>
              <ul className="mt-4 space-y-3">
                {navLinks.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      onClick={(e) => handleAnchorClick(e, link.href)}
                      className="text-sm text-foreground/85 transition-colors hover:text-primary"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">Mere</p>
              <ul className="mt-4 space-y-3 text-sm">
                <li>
                  <Link to="/festivaler" className="text-foreground/85 transition-colors hover:text-primary">
                    Festivaler 2026
                  </Link>
                </li>
                <li>
                  <Link to="/blog" className="text-foreground/85 transition-colors hover:text-primary">
                    Blog
                  </Link>
                </li>
                <li>
                  <Link to="/lej-soundboks-aalborg" className="text-foreground/85 transition-colors hover:text-primary">
                    Lej Soundboks Aalborg
                  </Link>
                </li>
                <li>
                  <a href="mailto:rasmuscarl@hotmail.com" className="text-foreground/85 transition-colors hover:text-primary">
                    rasmuscarl@hotmail.com
                  </a>
                </li>
                <li>
                  <a href="tel:+4553540096" className="text-foreground/85 transition-colors hover:text-primary">
                    +45 53 54 00 96
                  </a>
                </li>
                <li className="text-muted-foreground">Kjellerupsgade 4, 9000 Aalborg</li>
              </ul>
            </div>
          </div>

          <div className="mt-8 border-t border-white/8 pt-5 text-sm text-muted-foreground">
            © {new Date().getFullYear()} LejDinLyd · CVR: 43952919 · Alle rettigheder forbeholdes.
          </div>
        </div>
      </div>
    </motion.footer>
  );
};

export default Footer;
