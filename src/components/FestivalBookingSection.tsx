import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Loader2, MapPin, Calendar, Music, Battery } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { z } from "zod";

interface Festival {
  name: string;
  slug: string;
  location: string;
  dates: string;
  dateFrom: string;
  dateTo: string | undefined;
  days: number;
  price: number;
}

interface FestivalBookingSectionProps {
  festival: Festival | null;
}

const bookingSchema = z.object({
  name: z.string().trim().min(1, "Indtast dit navn"),
  phone: z.string().trim().min(1, "Indtast dit telefonnummer").regex(/^[\d\s+()-]{6,20}$/, "Ugyldigt telefonnummer"),
  email: z.string().trim().min(1, "Indtast din email").email("Ugyldig email-adresse"),
  message: z.string().max(1000, "Beskeden er for lang (maks 1000 tegn)").optional(),
});

const inputClass = "w-full rounded-lg border border-border bg-secondary px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition";

const FestivalBookingSection = ({ festival }: FestivalBookingSectionProps) => {
  const [formData, setFormData] = useState({ name: "", phone: "", email: "", message: "" });
  const [extraBattery, setExtraBattery] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  // Reset form when festival changes
  const [lastSlug, setLastSlug] = useState<string | null>(null);
  if (festival && festival.slug !== lastSlug) {
    setLastSlug(festival.slug);
    setSubmitted(false);
    setExtraBattery(false);
    setFormData({ name: "", phone: "", email: "", message: "" });
    setFieldErrors({});
  }

  if (!festival) {
    return (
      <section id="booking" className="py-24 px-6">
        <div className="container mx-auto max-w-2xl text-center">
          <div className="rounded-2xl border border-dashed border-border bg-secondary/30 p-16">
            <Music className="w-10 h-10 text-muted-foreground mx-auto mb-4" />
            <p className="font-heading font-bold text-lg text-foreground mb-2">Vælg en festival herover</p>
            <p className="text-muted-foreground text-sm">Tryk på "Book til [festival]" for at se priser og udfylde din booking.</p>
          </div>
        </div>
      </section>
    );
  }

  const batteryTotal = extraBattery ? festival.days * 50 : 0;
  const total = festival.price + batteryTotal;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFieldErrors({});

    const result = bookingSchema.safeParse(formData);
    if (!result.success) {
      const errors: Record<string, string> = {};
      result.error.issues.forEach((issue) => {
        const key = issue.path[0] as string;
        if (!errors[key]) errors[key] = issue.message;
      });
      setFieldErrors(errors);
      return;
    }

    setLoading(true);
    try {
      const batteryNote = extraBattery ? "✓ Ekstra batteri ønskes (+50 kr/dag)" : "";
      const festivalNote = `Festival: ${festival.name}`;
      const combinedMessage = [festivalNote, batteryNote, result.data.message].filter(Boolean).join("\n") || null;

      const { error } = await supabase.from("bookings").insert({
        name: result.data.name,
        phone: result.data.phone,
        email: result.data.email,
        message: combinedMessage,
        date_from: festival.dateFrom,
        date_to: festival.dateTo ?? null,
        speaker_count: 1,
        total_price: total,
      });
      if (error) throw error;

      setSubmitted(true);
      toast.success("Booking modtaget!");

      const emailPayload = {
        name: result.data.name,
        email: result.data.email,
        phone: result.data.phone,
        message: combinedMessage,
        dateFrom: festival.dateFrom,
        dateTo: festival.dateTo ?? null,
        speakerCount: 1,
        extraBattery,
        totalPrice: total,
      };

      supabase.functions.invoke("send-transactional-email", {
        body: { templateName: "booking-confirmation", recipientEmail: result.data.email, templateData: emailPayload },
      }).catch(console.error);

      supabase.functions.invoke("send-transactional-email", {
        body: { templateName: "new-booking-admin", templateData: emailPayload },
      }).catch(console.error);
    } catch (err) {
      console.error(err);
      toast.error("Noget gik galt – prøv igen om lidt.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="booking" className="py-24 px-6">
      <div className="container mx-auto max-w-2xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-10"
        >
          <h2 className="font-heading text-3xl md:text-5xl font-bold mb-4">
            Book din <span className="text-primary">plads</span>
          </h2>
          <p className="text-muted-foreground text-lg">Udfyld formularen og vi bekræfter din booking hurtigst muligt.</p>
        </motion.div>

        <AnimatePresence mode="wait">
          {submitted ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="rounded-2xl border border-primary/30 bg-card p-12 text-center"
            >
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
                <Send className="w-8 h-8 text-primary" />
              </div>
              <h3 className="font-heading text-2xl font-bold mb-2">Tak for din booking!</h3>
              <p className="text-muted-foreground mb-6">Vi vender tilbage hurtigst muligt med bekræftelse.</p>
              <div className="rounded-xl bg-secondary/50 border border-border px-6 py-4 space-y-1 text-sm text-left">
                <p className="font-heading font-semibold text-foreground mb-2">{festival.name}</p>
                <p className="text-muted-foreground flex items-center gap-2"><Calendar className="w-4 h-4" /> {festival.dates}</p>
                <p className="text-muted-foreground flex items-center gap-2"><MapPin className="w-4 h-4" /> {festival.location}</p>
                {extraBattery && <p className="text-muted-foreground flex items-center gap-2"><Battery className="w-4 h-4" /> Ekstra batteri inkluderet</p>}
                <p className="text-primary font-heading font-bold text-lg pt-2">Total: {total.toLocaleString("da-DK")} DKK</p>
                <p className="text-xs text-muted-foreground">Betaling sker ved overlevering</p>
              </div>
            </motion.div>
          ) : (
            <motion.form
              key={festival.slug}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              onSubmit={handleSubmit}
              className="rounded-2xl border border-border bg-card p-8 space-y-6"
            >
              {/* Festival info card */}
              <div className="rounded-xl border border-primary/20 bg-primary/5 p-5">
                <div className="flex items-center gap-2 mb-3">
                  <Music className="w-4 h-4 text-primary" />
                  <p className="font-heading font-bold text-foreground">{festival.name}</p>
                </div>
                <div className="grid grid-cols-2 gap-2 text-sm mb-4">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Calendar className="w-4 h-4 flex-shrink-0" />
                    <span>{festival.dates}</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <MapPin className="w-4 h-4 flex-shrink-0" />
                    <span>{festival.location}</span>
                  </div>
                </div>
                <div className="border-t border-primary/10 pt-3 flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Leje for {festival.days} dage</span>
                  <span className="font-heading font-bold text-xl text-foreground">
                    {festival.price.toLocaleString("da-DK")} <span className="text-sm font-normal text-muted-foreground">DKK</span>
                  </span>
                </div>
              </div>

              {/* Extra battery */}
              <div
                onClick={() => setExtraBattery((v) => !v)}
                className={cn(
                  "flex items-center gap-4 rounded-xl border px-5 py-4 cursor-pointer transition-colors select-none",
                  extraBattery ? "border-primary/50 bg-primary/5" : "border-border bg-secondary hover:border-primary/30"
                )}
              >
                <div className={cn(
                  "w-5 h-5 rounded border-2 flex items-center justify-center flex-shrink-0 transition-colors",
                  extraBattery ? "border-primary bg-primary" : "border-border bg-background"
                )}>
                  {extraBattery && <svg viewBox="0 0 10 8" className="w-3 h-3 text-primary-foreground fill-none stroke-current stroke-2"><polyline points="1,4 4,7 9,1" /></svg>}
                </div>
                <div className="flex-1">
                  <p className="text-sm font-heading font-semibold text-foreground">Ekstra batteri</p>
                  <p className="text-xs text-muted-foreground">
                    50 kr/dag × {festival.days} dage = {(festival.days * 50).toLocaleString("da-DK")} kr ekstra
                  </p>
                </div>
                <span className={cn(
                  "text-sm font-medium",
                  extraBattery ? "text-primary" : "text-muted-foreground"
                )}>
                  +{(festival.days * 50).toLocaleString("da-DK")} DKK
                </span>
              </div>

              {/* Price summary */}
              <div className="rounded-xl bg-secondary/50 border border-border px-5 py-4 flex items-center justify-between">
                <div className="space-y-0.5">
                  <p className="text-xs text-muted-foreground">Total at betale</p>
                  {extraBattery && (
                    <p className="text-xs text-muted-foreground">
                      {festival.price.toLocaleString("da-DK")} + {batteryTotal.toLocaleString("da-DK")} DKK
                    </p>
                  )}
                </div>
                <p className="font-heading font-bold text-2xl text-primary">
                  {total.toLocaleString("da-DK")} <span className="text-sm font-normal text-muted-foreground">DKK</span>
                </p>
              </div>

              {/* Contact fields */}
              <div className="grid sm:grid-cols-2 gap-5 gap-y-4">
                <div>
                  <input
                    type="text"
                    placeholder="Navn"
                    required
                    className={cn(inputClass, fieldErrors.name && "border-destructive ring-1 ring-destructive/30")}
                    value={formData.name}
                    onChange={e => { setFormData(p => ({ ...p, name: e.target.value })); setFieldErrors(p => ({ ...p, name: "" })); }}
                  />
                  {fieldErrors.name && <p className="text-destructive text-xs mt-1">{fieldErrors.name}</p>}
                </div>
                <div>
                  <input
                    type="tel"
                    placeholder="Telefonnummer"
                    required
                    className={cn(inputClass, fieldErrors.phone && "border-destructive ring-1 ring-destructive/30")}
                    value={formData.phone}
                    onChange={e => { setFormData(p => ({ ...p, phone: e.target.value })); setFieldErrors(p => ({ ...p, phone: "" })); }}
                  />
                  {fieldErrors.phone && <p className="text-destructive text-xs mt-1">{fieldErrors.phone}</p>}
                </div>
              </div>
              <div>
                <input
                  type="email"
                  placeholder="Email"
                  required
                  className={cn(inputClass, fieldErrors.email && "border-destructive ring-1 ring-destructive/30")}
                  value={formData.email}
                  onChange={e => { setFormData(p => ({ ...p, email: e.target.value })); setFieldErrors(p => ({ ...p, email: "" })); }}
                />
                {fieldErrors.email && <p className="text-destructive text-xs mt-1">{fieldErrors.email}</p>}
              </div>
              <div>
                <textarea
                  placeholder="Besked (valgfrit) – fx afhentning, tidspunkt eller andre ønsker"
                  rows={3}
                  className={cn(inputClass, fieldErrors.message && "border-destructive ring-1 ring-destructive/30")}
                  value={formData.message}
                  onChange={e => { setFormData(p => ({ ...p, message: e.target.value })); setFieldErrors(p => ({ ...p, message: "" })); }}
                />
                {fieldErrors.message && <p className="text-destructive text-xs mt-1">{fieldErrors.message}</p>}
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-lg bg-primary text-primary-foreground font-heading font-semibold py-4 text-lg hover:opacity-90 transition-all disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {loading
                  ? <><Loader2 className="w-5 h-5 animate-spin" /> Sender...</>
                  : `Book ${festival.name} – ${total.toLocaleString("da-DK")} DKK`
                }
              </button>
              <p className="text-center text-xs text-muted-foreground">Betaling sker ved overlevering · Intet depositum</p>
            </motion.form>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default FestivalBookingSection;
