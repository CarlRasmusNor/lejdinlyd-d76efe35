import { useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Calendar, Clock, ArrowRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { blogPosts } from "@/data/blogPosts";

const Blog = () => {
  useEffect(() => {
    document.title = "Blog – Soundboks udlejning i Aalborg | LejDinLyd";
    const meta = document.querySelector('meta[name="description"]');
    if (meta) meta.setAttribute("content", "Læs vores blog om soundboks udlejning i Aalborg. Tips til fester, guides til højttalere og alt om at leje en Soundboks Go hos LejDinLyd.");
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />

      <main className="pt-24 pb-16">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <h1 className="font-heading text-4xl md:text-5xl font-bold mb-4">
              Blog – <span className="text-primary">LejDinLyd</span>
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
              Tips, guides og inspiration til din næste fest i Aalborg. Alt om soundboks udlejning, højttalere og events.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {blogPosts.map((post, i) => (
              <motion.article
                key={post.slug}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
              >
                <Link
                  to={`/blog/${post.slug}`}
                  className="group block rounded-2xl border border-border bg-card overflow-hidden hover:border-primary/50 transition-colors"
                >
                  <div className="aspect-video overflow-hidden">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-4 text-xs text-muted-foreground mb-3">
                      <span className="flex items-center gap-1"><Calendar className="w-3 h-3" />{new Date(post.date).toLocaleDateString("da-DK", { day: "numeric", month: "long", year: "numeric" })}</span>
                      <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{post.readTime}</span>
                    </div>
                    <h2 className="font-heading text-lg font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                      {post.title}
                    </h2>
                    <p className="text-muted-foreground text-sm mb-4 line-clamp-3">{post.excerpt}</p>
                    <span className="inline-flex items-center gap-1 text-primary text-sm font-semibold">
                      Læs mere <ArrowRight className="w-3 h-3" />
                    </span>
                  </div>
                </Link>
              </motion.article>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Blog;
