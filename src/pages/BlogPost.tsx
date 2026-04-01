import { useEffect } from "react";
import { useParams, Link, Navigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Calendar, Clock, ArrowLeft } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BlogCTA from "@/components/BlogCTA";
import { getPostBySlug, blogPosts } from "@/data/blogPosts";

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const post = getPostBySlug(slug || "");

  useEffect(() => {
    if (post) {
      document.title = post.metaTitle;
      const meta = document.querySelector('meta[name="description"]');
      if (meta) meta.setAttribute("content", post.metaDescription);
    }
    window.scrollTo(0, 0);
  }, [post]);

  if (!post) return <Navigate to="/blog" replace />;

  // JSON-LD BlogPosting schema
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.metaDescription,
    image: post.image,
    datePublished: post.date,
    author: { "@type": "Organization", name: "LejDinLyd" },
    publisher: {
      "@type": "Organization",
      name: "LejDinLyd",
      url: "https://lej-din-lyd.dk",
    },
    mainEntityOfPage: `https://lej-din-lyd.dk/blog/${post.slug}`,
  };

  // Convert markdown-like content to HTML
  const renderContent = (content: string) => {
    return content
      .split("\n")
      .map((line) => {
        if (line.startsWith("### ")) return `<h3 class="font-heading text-xl font-bold text-foreground mt-8 mb-3">${line.slice(4)}</h3>`;
        if (line.startsWith("## ")) return `<h2 class="font-heading text-2xl font-bold text-foreground mt-10 mb-4">${line.slice(3)}</h2>`;
        if (line.startsWith("- **")) return `<li class="text-muted-foreground ml-4 mb-1">${line.slice(2)}</li>`;
        if (line.startsWith("1. ") || line.startsWith("2. ") || line.startsWith("3. "))
          return `<li class="text-muted-foreground ml-4 mb-1 list-decimal">${line.slice(3)}</li>`;
        if (line.trim() === "") return "<br/>";
        return `<p class="text-muted-foreground leading-relaxed mb-4">${line}</p>`;
      })
      .join("")
      // Bold
      .replace(/\*\*(.*?)\*\*/g, '<strong class="text-foreground font-semibold">$1</strong>')
      // Links
      .replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" class="text-primary underline hover:opacity-80 transition">$1</a>');
  };

  // Related posts
  const related = blogPosts.filter((p) => p.slug !== post.slug).slice(0, 2);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <main className="pt-24 pb-16">
        <article className="container mx-auto px-6 max-w-3xl">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <Link to="/blog" className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-8 text-sm">
              <ArrowLeft className="w-4 h-4" /> Tilbage til blog
            </Link>

            <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
              <span className="flex items-center gap-1"><Calendar className="w-4 h-4" />{new Date(post.date).toLocaleDateString("da-DK", { day: "numeric", month: "long", year: "numeric" })}</span>
              <span className="flex items-center gap-1"><Clock className="w-4 h-4" />{post.readTime}</span>
            </div>

            <h1 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-6">
              {post.title}
            </h1>

            <div className="rounded-2xl overflow-hidden mb-10">
              <img src={post.image} alt={post.title} className="w-full aspect-video object-cover" />
            </div>

            <div
              className="prose-custom"
              dangerouslySetInnerHTML={{ __html: renderContent(post.content) }}
            />

            <BlogCTA />
          </motion.div>
        </article>

        {/* Related posts */}
        <section className="container mx-auto px-6 max-w-3xl mt-16">
          <h2 className="font-heading text-2xl font-bold text-foreground mb-6">Læs også</h2>
          <div className="grid sm:grid-cols-2 gap-6">
            {related.map((r) => (
              <Link
                key={r.slug}
                to={`/blog/${r.slug}`}
                className="group block rounded-xl border border-border bg-card overflow-hidden hover:border-primary/50 transition-colors"
              >
                <div className="aspect-video overflow-hidden">
                  <img src={r.image} alt={r.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
                </div>
                <div className="p-4">
                  <h3 className="font-heading text-sm font-bold text-foreground group-hover:text-primary transition-colors">{r.title}</h3>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default BlogPost;
