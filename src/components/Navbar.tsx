import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const links = [
  { href: "#priser", label: "Priser" },
  { href: "#om-os", label: "Om os" },
  { href: "#faq", label: "FAQ" },
  { href: "#kontakt", label: "Kontakt" },
];

const pageLinks = [
  { to: "/festivaler", label: "Festivaler" },
  { to: "/blog", label: "Blog" },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const isHome = location.pathname === "/";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleAnchorClick = (
    e: React.MouseEvent,
    anchor: string
  ) => {
    e.preventDefault();
    setOpen(false);
    if (isHome) {
      setTimeout(() => {
        document.querySelector(anchor)?.scrollIntoView({ behavior: "smooth" });
      }, open ? 350 : 0);
    } else {
      navigate("/");
      setTimeout(() => {
        document.querySelector(anchor)?.scrollIntoView({ behavior: "smooth" });
      }, 400);
    }
  };

  const isActivePage = (path: string) =>
    path === "/blog"
      ? location.pathname.startsWith("/blog")
      : location.pathname === path;

  return (
    <motion.nav
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 border-b transition-all duration-300 ${
        scrolled
          ? "bg-background/95 backdrop-blur-xl border-border/80 shadow-sm"
          : "bg-background/80 backdrop-blur-lg border-border/50"
      }`}
    >
      <div className="container mx-auto px-6 flex items-center justify-between h-16">
        <Link to="/" className="font-heading font-bold text-xl text-primary">
          LejDinLyd
        </Link>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-8">
          {links.map((l, i) => (
            <motion.a
              key={l.href}
              href={l.href}
              onClick={(e) => handleAnchorClick(e, l.href)}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + i * 0.08 }}
              className="text-sm text-foreground hover:text-primary transition-colors font-medium relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-px after:bg-primary after:scale-x-0 after:origin-right after:transition-transform after:duration-300 hover:after:scale-x-100 hover:after:origin-left"
            >
              {l.label}
            </motion.a>
          ))}

          {pageLinks.map((pageLink, i) => (
            <motion.div
              key={pageLink.to}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + (links.length + i) * 0.08 }}
            >
              <Link
                to={pageLink.to}
                className={`text-sm font-medium transition-colors relative pb-0.5 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-px after:transition-all after:duration-300 ${
                  isActivePage(pageLink.to)
                    ? "text-primary after:bg-primary after:scale-x-100"
                    : "text-foreground hover:text-primary after:bg-primary after:scale-x-0 after:origin-right hover:after:scale-x-100 hover:after:origin-left"
                }`}
              >
                {pageLink.label}
              </Link>
            </motion.div>
          ))}

          <motion.a
            href="#booking"
            onClick={(e) => handleAnchorClick(e, "#booking")}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-5 py-2 rounded-lg bg-primary text-primary-foreground font-heading font-semibold text-sm hover:opacity-90 transition"
          >
            Book nu
          </motion.a>
        </div>

        {/* Mobile toggle */}
        <button onClick={() => setOpen(!open)} className="md:hidden text-foreground">
          {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="md:hidden bg-background/98 backdrop-blur-xl border-b border-border px-6 pb-6 overflow-hidden"
          >
            <div className="pt-4 space-y-1">
              {links.map((l, i) => (
                <motion.a
                  key={l.href}
                  href={l.href}
                  onClick={(e) => handleAnchorClick(e, l.href)}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.04 }}
                  className="block py-2 text-muted-foreground hover:text-foreground transition-colors font-medium"
                >
                  {l.label}
                </motion.a>
              ))}

              {pageLinks.map((pageLink, i) => (
                <motion.div
                  key={pageLink.to}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: (links.length + i) * 0.04 }}
                >
                  <Link
                    to={pageLink.to}
                    onClick={() => setOpen(false)}
                    className={`block py-2 font-medium transition-colors ${
                      isActivePage(pageLink.to)
                        ? "text-primary"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {pageLink.label}
                  </Link>
                </motion.div>
              ))}
            </div>

            <div className="border-t border-border mt-4 pt-4">
              <motion.a
                href="#booking"
                onClick={(e) => handleAnchorClick(e, "#booking")}
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.22 }}
                className="block text-center px-5 py-3 rounded-lg bg-primary text-primary-foreground font-heading font-semibold hover:opacity-90 transition"
              >
                Book nu
              </motion.a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
