import { motion } from "framer-motion";

const Footer = () => (
  <motion.footer
    initial={{ opacity: 0 }}
    whileInView={{ opacity: 1 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5 }}
    className="border-t border-border py-8 px-6 text-center"
  >
    <p className="text-muted-foreground text-sm">
      © {new Date().getFullYear()} LejDinLyd · CVR: 43952919 · Alle rettigheder forbeholdes.
    </p>
  </motion.footer>
);

export default Footer;
