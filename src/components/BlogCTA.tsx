import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const BlogCTA = () => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    className="my-12 rounded-2xl border border-primary/20 bg-card p-8 text-center"
  >
    <h3 className="font-heading text-2xl font-bold text-foreground mb-3">
      Klar til at leje en Soundboks i Aalborg?
    </h3>
    <p className="text-muted-foreground mb-6 max-w-lg mx-auto">
      Fast lav pris, nem booking og levering i Aalborg og omegn. Book din Soundboks Go på under 2 minutter.
    </p>
    <Link
      to="/lej-soundboks-aalborg#booking"
      className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-primary text-primary-foreground font-heading font-semibold hover:opacity-90 transition"
    >
      Book nu <ArrowRight className="w-4 h-4" />
    </Link>
  </motion.div>
);

export default BlogCTA;
