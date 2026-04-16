import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const links = [
  { href: "#priser", label: "Priser" },
  { href: "#om-os", label: "Historie" },
  { href: "#faq", label: "FAQ" },
  { href: "#kontakt", label: "Kontakt" },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const isHome = location.pathname === "/";

  const handleAnchorClick = (e: React.MouseEvent, anchor: string) => {
    e.preventDefault();
    setOpen(false);

    if (isHome) {
      setTimeout(() => {
        document.querySelector(anchor)?.scrollIntoView({ behavior: "smooth" });
      }, open ? 300 : 0);
      return;
    }

    navigate("/");
    setTimeout(() => {
      document.querySelector(anchor)?.scrollIntoView({ behavior: "smooth" });
    }, 400);
  };

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="fixed inset-x-0 top-0 z-50 px-4 pt-4 md:px-6"
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between rounded-full border border-white/10 bg-background/75 px-4 shadow-[0_20px_80px_hsl(220_50%_2%_/_0.35)] backdrop-blur-xl md:px-6">
        <Link to="/" className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full border border-primary/30 bg-primary/12 font-heading text-sm font-bold text-primary">
            LDL
          </div>
          <div className="leading-none">
            <p className="font-heading text-sm font-bold uppercase tracking-[0.25em] text-foreground">
              LejDinLyd
            </p>
            <p className="text-[0.65rem] uppercase tracking-[0.32em] text-muted-foreground">
              Aalborg Sound System
            </p>
          </div>
        </Link>

        <div className="hidden items-center gap-7 md:flex">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => handleAnchorClick(e, link.href)}
              className="text-sm font-medium text-foreground/80 transition-colors hover:text-primary"
            >
              {link.label}
            </a>
          ))}
          <Link
            to="/festivaler"
            className={`text-sm font-medium transition-colors ${
              location.pathname === "/festivaler" ? "text-primary" : "text-foreground/80 hover:text-primary"
            }`}
          >
            Festivaler
          </Link>
          <Link
            to="/blog"
            className={`text-sm font-medium transition-colors ${
              location.pathname.startsWith("/blog") ? "text-primary" : "text-foreground/80 hover:text-primary"
            }`}
          >
            Blog
          </Link>
          <a
            href="#booking"
            onClick={(e) => handleAnchorClick(e, "#booking")}
            className="inline-flex items-center justify-center rounded-full bg-primary px-5 py-2.5 font-heading text-sm font-semibold text-primary-foreground transition-transform hover:scale-[1.03]"
          >
            Book nu
          </a>
        </div>

        <button
          type="button"
          onClick={() => setOpen((value) => !value)}
          className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-foreground md:hidden"
          aria-label={open ? "Luk menu" : "Åbn menu"}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25 }}
            className="mx-auto mt-3 max-w-6xl rounded-[1.75rem] border border-white/10 bg-background/92 p-5 shadow-[0_24px_80px_hsl(220_50%_2%_/_0.5)] backdrop-blur-xl md:hidden"
          >
            <div className="mb-5 rounded-2xl border border-primary/15 bg-primary/10 p-4">
              <p className="text-xs uppercase tracking-[0.28em] text-primary">LejDinLyd</p>
              <p className="mt-2 max-w-xs text-sm text-foreground">
                Soundboks udlejning i Aalborg med hurtig booking, fleksibel levering og ingen depositum.
              </p>
            </div>
            <div className="space-y-2">
              {links.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => handleAnchorClick(e, link.href)}
                  className="block rounded-2xl border border-transparent px-4 py-3 text-sm font-medium text-foreground/85 transition-colors hover:border-primary/20 hover:bg-primary/8 hover:text-primary"
                >
                  {link.label}
                </a>
              ))}
              <Link
                to="/festivaler"
                onClick={() => setOpen(false)}
                className="block rounded-2xl px-4 py-3 text-sm font-medium text-foreground/85"
              >
                Festivaler
              </Link>
              <Link
                to="/blog"
                onClick={() => setOpen(false)}
                className="block rounded-2xl px-4 py-3 text-sm font-medium text-foreground/85"
              >
                Blog
              </Link>
            </div>
            <a
              href="#booking"
              onClick={(e) => handleAnchorClick(e, "#booking")}
              className="mt-5 inline-flex w-full items-center justify-center rounded-full bg-primary px-5 py-3 font-heading text-sm font-semibold text-primary-foreground"
            >
              Book nu
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
