import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CalendarIcon, Loader2 } from "lucide-react";
import { format, parseISO, eachDayOfInterval, getDay } from "date-fns";
import { da } from "date-fns/locale";
import { DateRange } from "react-day-picker";
import { cn } from "@/lib/utils";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export interface Booking {
  id: string;
  name: string;
  email: string;
  phone: string;
  message: string | null;
  date_from: string;
  date_to: string | null;
  speaker_count: number;
  total_price: number;
  created_at: string;
  status: string;
}

type BookingStatus = "pending" | "confirmed" | "rejected";

interface EditBookingDialogProps {
  booking: Booking | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSaved?: (updated: Booking) => void;
  onUpdated?: () => void;
  mode?: "create" | "edit";
  onCreated?: () => void;
}

function calcPrice(dateRange: DateRange | undefined, speakerCount: number): number {
  if (!dateRange?.from) return 0;
  const to = dateRange.to ?? dateRange.from;
  const days = eachDayOfInterval({ start: dateRange.from, end: to });
  const base = days.reduce((sum, d) => {
    const day = getDay(d);
    return sum + (day === 5 || day === 6 ? 300 : 150);
  }, 0);
  return base * speakerCount;
}

const EditBookingDialog = ({
  booking,
  open,
  onOpenChange,
  onSaved,
  onUpdated,
  mode = "edit",
  onCreated,
}: EditBookingDialogProps) => {
  const [saving, setSaving] = useState(false);
  const [dateRange, setDateRange] = useState<DateRange | undefined>();
  const [speakerCount, setSpeakerCount] = useState(1);
  const [totalPrice, setTotalPrice] = useState(0);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [status, setStatus] = useState<BookingStatus>("pending");

  const resetToEmpty = () => {
    setName("");
    setEmail("");
    setPhone("");
    setSpeakerCount(1);
    setTotalPrice(0);
    setDateRange(undefined);
    setStatus("pending");
  };

  const initFromBooking = (b: Booking) => {
    setName(b.name);
    setEmail(b.email);
    setPhone(b.phone);
    setSpeakerCount(b.speaker_count);
    setTotalPrice(b.total_price);
    setStatus((b.status as BookingStatus) ?? "pending");
    setDateRange({
      from: parseISO(b.date_from),
      to: b.date_to ? parseISO(b.date_to) : undefined,
    });
  };

  useEffect(() => {
    if (!open) return;
    if (mode === "create") {
      resetToEmpty();
    } else if (booking) {
      initFromBooking(booking);
    }
  }, [booking, open, mode]);

  // Auto-calculate price in create mode when dateRange or speakerCount changes
  useEffect(() => {
    if (mode === "create") {
      setTotalPrice(calcPrice(dateRange, speakerCount));
    }
  }, [dateRange, speakerCount, mode]);

  if (mode === "edit" && !booking) return null;

  const isCreate = mode === "create";

  const handleSave = async () => {
    if (!dateRange?.from) return;
    setSaving(true);

    const dateFrom = format(dateRange.from, "yyyy-MM-dd");
    const dateTo = dateRange.to ? format(dateRange.to, "yyyy-MM-dd") : null;

    if (isCreate) {
      const { error } = await supabase.from("bookings").insert([
        {
          name,
          email,
          phone,
          speaker_count: speakerCount,
          total_price: totalPrice,
          date_from: dateFrom,
          date_to: dateTo,
          status,
          message: "",
        },
      ] as any);
      setSaving(false);
      if (error) {
        toast.error("Kunne ikke oprette booking");
        return;
      }
      toast.success("Booking oprettet");
      onCreated?.();
      onOpenChange(false);
    } else {
      const updates = {
        name,
        email,
        phone,
        speaker_count: speakerCount,
        total_price: totalPrice,
        date_from: dateFrom,
        date_to: dateTo,
        status,
      };
      const { error } = await supabase
        .from("bookings")
        .update(updates as any)
        .eq("id", booking!.id);
      setSaving(false);
      if (error) {
        toast.error("Kunne ikke gemme ændringer");
        return;
      }
      onSaved?.({ ...booking!, ...updates });
      onUpdated?.();
      onOpenChange(false);
      toast.success("Booking opdateret");
    }
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(v) => {
        if (v && mode === "edit" && booking) initFromBooking(booking);
        if (v && mode === "create") resetToEmpty();
        onOpenChange(v);
      }}
    >
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{isCreate ? "Opret booking" : "Rediger booking"}</DialogTitle>
        </DialogHeader>

        <div className="space-y-4 py-2">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-medium text-muted-foreground">Navn</label>
              <input
                className="w-full mt-1 rounded-md border border-border bg-secondary px-3 py-2 text-sm"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div>
              <label className="text-xs font-medium text-muted-foreground">Telefon</label>
              <input
                className="w-full mt-1 rounded-md border border-border bg-secondary px-3 py-2 text-sm"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-medium text-muted-foreground">Email</label>
            <input
              className="w-full mt-1 rounded-md border border-border bg-secondary px-3 py-2 text-sm"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div>
            <label className="text-xs font-medium text-muted-foreground">Dato</label>
            <Popover>
              <PopoverTrigger asChild>
                <button
                  type="button"
                  className={cn(
                    "w-full mt-1 rounded-md border border-border bg-secondary px-3 py-2 text-sm text-left flex items-center gap-2",
                    !dateRange?.from && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="w-4 h-4" />
                  {dateRange?.from
                    ? dateRange.to
                      ? `${format(dateRange.from, "d. MMM", { locale: da })} – ${format(dateRange.to, "d. MMM", { locale: da })}`
                      : format(dateRange.from, "d. MMM yyyy", { locale: da })
                    : "Vælg dato"}
                </button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="range"
                  selected={dateRange}
                  onSelect={setDateRange}
                  locale={da}
                  numberOfMonths={1}
                  className="pointer-events-auto"
                />
              </PopoverContent>
            </Popover>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-medium text-muted-foreground">Antal højttalere</label>
              <input
                type="number"
                min={1}
                max={10}
                className="w-full mt-1 rounded-md border border-border bg-secondary px-3 py-2 text-sm"
                value={speakerCount}
                onChange={(e) => setSpeakerCount(Number(e.target.value))}
              />
            </div>
            <div>
              <label className="text-xs font-medium text-muted-foreground">Total pris (DKK)</label>
              <input
                type="number"
                min={0}
                className="w-full mt-1 rounded-md border border-border bg-secondary px-3 py-2 text-sm"
                value={totalPrice}
                onChange={(e) => setTotalPrice(Number(e.target.value))}
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-medium text-muted-foreground">Status</label>
            <Select value={status} onValueChange={(v) => setStatus(v as BookingStatus)}>
              <SelectTrigger className="mt-1 w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="pending">Afventer</SelectItem>
                <SelectItem value="confirmed">Bekræftet</SelectItem>
                <SelectItem value="rejected">Afvist</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Annuller
          </Button>
          <Button disabled={saving} onClick={handleSave}>
            {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : isCreate ? "Opret" : "Gem"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EditBookingDialog;
