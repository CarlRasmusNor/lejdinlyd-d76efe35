import { useState } from "react";
import { Menu, X } from "lucide-react";

const links = [
  { href: "#priser", label: "Priser" },
  { href: "#om-os", label: "Om os" },
  { href: "#faq", label: "FAQ" },
  { href: "#kontakt", label: "Kontakt" },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border/50">
      <div className="container mx-auto px-6 flex items-center justify-between h-16">
        <a href="#" className="font-heading font-bold text-xl text-primary">
          LejDinLyd
        </a>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-8">
          {links.map(l => (
            <a key={l.href} href={l.href} className="text-sm text-muted-foreground hover:text-foreground transition-colors font-medium">
              {l.label}
            </a>
          ))}
          <a href="#booking" className="px-5 py-2 rounded-lg bg-primary text-primary-foreground font-heading font-semibold text-sm hover:opacity-90 transition">
            Book nu
          </a>
        </div>

        {/* Mobile toggle */}
        <button onClick={() => setOpen(!open)} className="md:hidden text-foreground">
          {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-background border-b border-border px-6 pb-6 space-y-4">
          {links.map(l => (
            <a key={l.href} href={l.href} onClick={() => setOpen(false)} className="block text-muted-foreground hover:text-foreground transition-colors font-medium">
              {l.label}
            </a>
          ))}
          <a href="#booking" onClick={() => setOpen(false)} className="block text-center px-5 py-3 rounded-lg bg-primary text-primary-foreground font-heading font-semibold hover:opacity-90 transition">
            Book nu
          </a>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
