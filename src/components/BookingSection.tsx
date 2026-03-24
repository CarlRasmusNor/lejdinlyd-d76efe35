import { useState } from "react";
import { motion } from "framer-motion";
import { Send, Minus, Plus, CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { da } from "date-fns/locale";
import { DateRange } from "react-day-picker";
import { cn } from "@/lib/utils";

const MAX_SPEAKERS = 2;

const BookingSection = () => {
  const [formData, setFormData] = useState({ name: "", phone: "", email: "", message: "" });
  const [dateRange, setDateRange] = useState<DateRange | undefined>();
  const [speakerCount, setSpeakerCount] = useState(1);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!dateRange?.from) return;
    setSubmitted(true);
  };

  const formatSelectedDates = () => {
    if (!dateRange?.from) return "";
    if (!dateRange.to || dateRange.from.getTime() === dateRange.to.getTime()) {
      return format(dateRange.from, "d. MMMM yyyy", { locale: da });
    }
    return `${format(dateRange.from, "d. MMM", { locale: da })} – ${format(dateRange.to, "d. MMM yyyy", { locale: da })}`;
  };

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const inputClass = "w-full rounded-lg border border-border bg-secondary px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition font-body";

  return (
    <section id="booking" className="py-24 px-6">
      <div className="container mx-auto max-w-2xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="font-heading text-3xl md:text-5xl font-bold mb-4">
            Book din <span className="text-primary">Soundboks Go</span>
          </h2>
          <p className="text-muted-foreground text-lg">Vælg datoer, antal højttalere og udfyld formularen.</p>
        </motion.div>

        {submitted ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="rounded-2xl border border-primary/30 bg-card p-12 text-center"
          >
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
              <Send className="w-8 h-8 text-primary" />
            </div>
            <h3 className="font-heading text-2xl font-bold mb-2">Tak for din henvendelse!</h3>
            <p className="text-muted-foreground mb-4">Vi vender tilbage hurtigst muligt.</p>
            <div className="text-sm text-muted-foreground space-y-1">
              <p><span className="text-foreground font-medium">{speakerCount} højttaler{speakerCount > 1 ? "e" : ""}</span> · {formatSelectedDates()}</p>
            </div>
          </motion.div>
        ) : (
          <motion.form
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            onSubmit={handleSubmit}
            className="rounded-2xl border border-border bg-card p-8 space-y-6"
          >
            {/* Calendar */}
            <div>
              <label className="block font-heading font-semibold text-sm mb-3">Vælg dato(er)</label>
              <div className="flex justify-center rounded-xl border border-border bg-secondary p-2">
                <Calendar
                  mode="range"
                  selected={dateRange}
                  onSelect={setDateRange}
                  locale={da}
                  disabled={(date) => date < today}
                  className="pointer-events-auto"
                  numberOfMonths={1}
                />
              </div>
              {dateRange?.from && (
                <p className="text-sm text-primary mt-2 text-center font-medium">
                  {formatSelectedDates()}
                </p>
              )}
            </div>

            {/* Speaker count */}
            <div>
              <label className="block font-heading font-semibold text-sm mb-3">
                Antal højttalere <span className="text-muted-foreground font-normal">(maks {MAX_SPEAKERS} per dag)</span>
              </label>
              <div className="flex items-center gap-4 justify-center">
                <button
                  type="button"
                  onClick={() => setSpeakerCount(Math.max(1, speakerCount - 1))}
                  className="w-10 h-10 rounded-lg border border-border bg-secondary flex items-center justify-center hover:border-primary/40 transition-colors disabled:opacity-30"
                  disabled={speakerCount <= 1}
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="font-heading text-3xl font-bold w-8 text-center">{speakerCount}</span>
                <button
                  type="button"
                  onClick={() => setSpeakerCount(Math.min(MAX_SPEAKERS, speakerCount + 1))}
                  className="w-10 h-10 rounded-lg border border-border bg-secondary flex items-center justify-center hover:border-primary/40 transition-colors disabled:opacity-30"
                  disabled={speakerCount >= MAX_SPEAKERS}
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Contact fields */}
            <div className="grid sm:grid-cols-2 gap-5">
              <input type="text" placeholder="Navn" required className={inputClass} value={formData.name} onChange={e => setFormData(p => ({ ...p, name: e.target.value }))} />
              <input type="tel" placeholder="Telefonnummer" required className={inputClass} value={formData.phone} onChange={e => setFormData(p => ({ ...p, phone: e.target.value }))} />
            </div>
            <input type="email" placeholder="Email" required className={inputClass} value={formData.email} onChange={e => setFormData(p => ({ ...p, email: e.target.value }))} />
            <textarea placeholder="Besked (valgfrit)" rows={3} className={inputClass} value={formData.message} onChange={e => setFormData(p => ({ ...p, message: e.target.value }))} />

            <button
              type="submit"
              disabled={!dateRange?.from}
              className="w-full rounded-lg bg-primary text-primary-foreground font-heading font-semibold py-4 text-lg hover:opacity-90 transition-all disabled:opacity-40 disabled:cursor-not-allowed"
            >
              Send booking-forespørgsel
            </button>
          </motion.form>
        )}
      </div>
    </section>
  );
};

export default BookingSection;
