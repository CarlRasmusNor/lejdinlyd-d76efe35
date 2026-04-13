import { useState, useMemo, useEffect } from "react";
import { motion } from "framer-motion";
import { Send, Minus, Plus, CalendarIcon, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format, differenceInCalendarDays, eachDayOfInterval, parseISO } from "date-fns";
import { da } from "date-fns/locale";
import { DateRange } from "react-day-picker";
import { cn } from "@/lib/utils";
import { z } from "zod";

const MAX_SPEAKERS = 2;

const getRate = (date: Date) => {
  const day = date.getDay();
  return day === 5 || day === 6 ? 300 : 150;
};

const bookingSchema = z.object({
  name: z.string().trim().min(1, "Indtast dit navn"),
  phone: z.string().trim().min(1, "Indtast dit telefonnummer").regex(/^[\d\s+()-]{6,20}$/, "Ugyldigt telefonnummer"),
  email: z.string().trim().min(1, "Indtast din email").email("Ugyldig email-adresse"),
  message: z.string().max(1000, "Beskeden er for lang (maks 1000 tegn)").optional(),
});

const BookingSection = () => {
  const [formData, setFormData] = useState({ name: "", phone: "", email: "", message: "" });
  const [dateRange, setDateRange] = useState<DateRange | undefined>();
  const [speakerCount, setSpeakerCount] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [bookedCounts, setBookedCounts] = useState<Record<string, number>>({});
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  // Fetch existing bookings to calculate availability per day
  useEffect(() => {
    const fetchBookings = async () => {
      const { data, error } = await supabase
        .from("bookings")
        .select("date_from, date_to, speaker_count, status")
        .neq("status", "rejected");
      if (error || !data) return;

      const counts: Record<string, number> = {};
      data.forEach((booking) => {
        const from = parseISO(booking.date_from);
        const to = booking.date_to ? parseISO(booking.date_to) : from;
        const days = eachDayOfInterval({ start: from, end: to });
        days.forEach((day) => {
          const key = format(day, "yyyy-MM-dd");
          counts[key] = (counts[key] || 0) + booking.speaker_count;
        });
      });
      setBookedCounts(counts);
    };
    fetchBookings();
  }, [submitted]);

  const getSoldOut = (date: Date) => {
    const key = format(date, "yyyy-MM-dd");
    const booked = bookedCounts[key] || 0;
    return booked >= MAX_SPEAKERS;
  };

  const getAvailableSpeakers = (date: Date) => {
    const key = format(date, "yyyy-MM-dd");
    return MAX_SPEAKERS - (bookedCounts[key] || 0);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFieldErrors({});

    if (!dateRange?.from) {
      toast.error("Vælg venligst en dato først.");
      return;
    }
    if (!priceBreakdown) return;

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
      const { error } = await supabase.from("bookings").insert({
        name: result.data.name,
        phone: result.data.phone,
        email: result.data.email,
        message: result.data.message || null,
        date_from: format(dateRange.from, "yyyy-MM-dd"),
        date_to: dateRange.to ? format(dateRange.to, "yyyy-MM-dd") : null,
        speaker_count: speakerCount,
        total_price: priceBreakdown.total,
      });
      if (error) throw error;
      setSubmitted(true);
      toast.success("Booking modtaget!");

      // Send emails i baggrunden – blokerer ikke UI
      const emailPayload = {
        name: result.data.name,
        email: result.data.email,
        phone: result.data.phone,
        message: result.data.message || null,
        dateFrom: format(dateRange.from, "yyyy-MM-dd"),
        dateTo: dateRange.to ? format(dateRange.to, "yyyy-MM-dd") : null,
        speakerCount,
        totalPrice: priceBreakdown.total,
      };

      // Bekræftelse til kunden
      supabase.functions.invoke("send-transactional-email", {
        body: { templateName: "booking-confirmation", recipientEmail: result.data.email, templateData: emailPayload },
      }).catch(console.error);

      // Notifikation til ejer
      supabase.functions.invoke("send-transactional-email", {
        body: { templateName: "new-booking-admin", templateData: emailPayload },
      }).catch(console.error);
    } catch (err) {
      console.error(err);
      const msg = err instanceof Error ? err.message : "";
      if (msg.includes("row-level security")) {
        toast.error("Booking kunne ikke gemmes – tjek at alle felter er udfyldt korrekt.");
      } else if (msg.includes("duplicate")) {
        toast.error("Denne booking findes allerede.");
      } else {
        toast.error("Noget gik galt – prøv igen om lidt.");
      }
    } finally {
      setLoading(false);
    }
  };

  const formatSelectedDates = () => {
    if (!dateRange?.from) return "";
    if (!dateRange.to || dateRange.from.getTime() === dateRange.to.getTime()) {
      return format(dateRange.from, "d. MMMM yyyy", { locale: da });
    }
    return `${format(dateRange.from, "d. MMM", { locale: da })} – ${format(dateRange.to, "d. MMM yyyy", { locale: da })}`;
  };

  const priceBreakdown = useMemo(() => {
    if (!dateRange?.from) return null;
    const end = dateRange.to ?? dateRange.from;
    const days = differenceInCalendarDays(end, dateRange.from) + 1;
    let total = 0;
    let weekdayDays = 0;
    let weekendDays = 0;

    for (let i = 0; i < days; i++) {
      const d = new Date(dateRange.from);
      d.setDate(d.getDate() + i);
      const rate = getRate(d);
      if (rate === 300) weekendDays++;
      else weekdayDays++;
      total += rate;
    }

    total *= speakerCount;

    return { days, weekdayDays, weekendDays, total };
  }, [dateRange, speakerCount]);

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  // Calculate max available speakers across selected date range
  const maxAvailableForRange = useMemo(() => {
    if (!dateRange?.from) return MAX_SPEAKERS;
    const end = dateRange.to ?? dateRange.from;
    const days = eachDayOfInterval({ start: dateRange.from, end });
    return Math.min(...days.map(getAvailableSpeakers));
  }, [dateRange, bookedCounts]);

  // Clamp speaker count when range changes
  useEffect(() => {
    if (speakerCount > maxAvailableForRange) {
      setSpeakerCount(Math.max(1, maxAvailableForRange));
    }
  }, [maxAvailableForRange]);

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
              {priceBreakdown && (
                <>
                  <p className="text-primary font-heading font-bold text-lg mt-2">Total: {priceBreakdown.total} DKK</p>
                  <p className="text-xs text-muted-foreground">Betaling sker ved overlevering</p>
                </>
              )}
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
            <div>
              <label className="block font-heading font-semibold text-sm mb-3">Vælg dato(er)</label>
              <Popover>
                <PopoverTrigger asChild>
                  <button
                    type="button"
                    className={cn(
                      "w-full rounded-lg border border-border bg-secondary px-4 py-3 text-left font-body text-sm flex items-center gap-2 hover:border-primary/40 transition-colors",
                      !dateRange?.from && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="w-4 h-4" />
                    {dateRange?.from ? formatSelectedDates() : "Vælg datoer..."}
                  </button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="range"
                    selected={dateRange}
                    onSelect={setDateRange}
                    locale={da}
                    disabled={(date) => date < today || getSoldOut(date)}
                    className="pointer-events-auto"
                    numberOfMonths={1}
                    modifiers={{ soldOut: (date) => date >= today && getSoldOut(date) }}
                    modifiersClassNames={{ soldOut: "sold-out-day" }}
                  />
                  <div className="px-3 pb-3 pt-1 flex items-center gap-2 text-xs text-foreground/80">
                    <span className="inline-block w-3 h-3 rounded-sm bg-destructive/20 border border-destructive/40" />
                    Udsolgt
                  </div>
                </PopoverContent>
              </Popover>
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
                  onClick={() => setSpeakerCount(Math.min(maxAvailableForRange, speakerCount + 1))}
                  className="w-10 h-10 rounded-lg border border-border bg-secondary flex items-center justify-center hover:border-primary/40 transition-colors disabled:opacity-30"
                  disabled={speakerCount >= maxAvailableForRange}
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>
            {dateRange?.from && maxAvailableForRange < MAX_SPEAKERS && maxAvailableForRange >= 1 && (
              <p className="text-center text-xs text-destructive -mt-3 font-body">
                Kun {maxAvailableForRange} højttaler ledig på de valgte datoer – den anden er allerede booket.
              </p>
            )}

            {/* Price breakdown */}
            {priceBreakdown && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                transition={{ duration: 0.3 }}
                className="rounded-xl border border-primary/20 bg-primary/5 p-5 space-y-2"
              >
                <p className="font-heading font-semibold text-sm text-foreground mb-3">Prisberegning</p>
                {priceBreakdown.weekdayDays > 0 && (
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">
                      {priceBreakdown.weekdayDays} hverdag{priceBreakdown.weekdayDays > 1 ? "e" : ""} × 150 DKK{speakerCount > 1 ? ` × ${speakerCount} stk` : ""}
                    </span>
                    <span className="text-foreground font-medium">{priceBreakdown.weekdayDays * 150 * speakerCount} DKK</span>
                  </div>
                )}
                {priceBreakdown.weekendDays > 0 && (
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">
                      {priceBreakdown.weekendDays} weekenddag{priceBreakdown.weekendDays > 1 ? "e" : ""} × 300 DKK{speakerCount > 1 ? ` × ${speakerCount} stk` : ""}
                    </span>
                    <span className="text-foreground font-medium">{priceBreakdown.weekendDays * 300 * speakerCount} DKK</span>
                  </div>
                )}
                <div className="border-t border-border pt-2 mt-2 flex justify-between">
                  <span className="font-heading font-bold text-foreground">Total</span>
                  <span className="font-heading font-bold text-primary text-lg">{priceBreakdown.total} DKK</span>
                </div>
                <p className="text-xs text-muted-foreground text-center mt-1">Betaling sker ved overlevering</p>
              </motion.div>
            )}

            {/* Contact fields */}
            <div className="grid sm:grid-cols-2 gap-5 gap-y-4">
              <div>
                <input type="text" placeholder="Navn" required className={cn(inputClass, fieldErrors.name && "border-destructive ring-1 ring-destructive/30")} value={formData.name} onChange={e => { setFormData(p => ({ ...p, name: e.target.value })); setFieldErrors(p => ({ ...p, name: "" })); }} />
                {fieldErrors.name && <p className="text-destructive text-xs mt-1 font-body">{fieldErrors.name}</p>}
              </div>
              <div>
                <input type="tel" placeholder="Telefonnummer" required className={cn(inputClass, fieldErrors.phone && "border-destructive ring-1 ring-destructive/30")} value={formData.phone} onChange={e => { setFormData(p => ({ ...p, phone: e.target.value })); setFieldErrors(p => ({ ...p, phone: "" })); }} />
                {fieldErrors.phone && <p className="text-destructive text-xs mt-1 font-body">{fieldErrors.phone}</p>}
              </div>
            </div>
            <div>
              <input type="email" placeholder="Email" required className={cn(inputClass, fieldErrors.email && "border-destructive ring-1 ring-destructive/30")} value={formData.email} onChange={e => { setFormData(p => ({ ...p, email: e.target.value })); setFieldErrors(p => ({ ...p, email: "" })); }} />
              {fieldErrors.email && <p className="text-destructive text-xs mt-1 font-body">{fieldErrors.email}</p>}
            </div>
            <div>
              <textarea placeholder="Besked (valgfrit) – fx ønskes levering/afhentning, tidspunkt på dagen, eller andre ønsker" rows={3} className={cn(inputClass, fieldErrors.message && "border-destructive ring-1 ring-destructive/30")} value={formData.message} onChange={e => { setFormData(p => ({ ...p, message: e.target.value })); setFieldErrors(p => ({ ...p, message: "" })); }} />
              {fieldErrors.message && <p className="text-destructive text-xs mt-1 font-body">{fieldErrors.message}</p>}
            </div>

            <button
              type="submit"
              disabled={!dateRange?.from || loading}
              className="w-full rounded-lg bg-primary text-primary-foreground font-heading font-semibold py-4 text-lg hover:opacity-90 transition-all disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading ? <><Loader2 className="w-5 h-5 animate-spin" /> Sender...</> : "Send booking-forespørgsel"}
            </button>
          </motion.form>
        )}
      </div>
    </section>
  );
};

export default BookingSection;
