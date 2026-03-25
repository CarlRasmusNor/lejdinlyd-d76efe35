import { useMemo } from "react";
import { Calendar } from "@/components/ui/calendar";
import { da } from "date-fns/locale";
import { format, parseISO, eachDayOfInterval } from "date-fns";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";

type Booking = {
  id: string;
  name: string;
  date_from: string;
  date_to: string | null;
  speaker_count: number;
  total_price: number;
  status: string;
};

const statusColors: Record<string, string> = {
  pending: "bg-amber-500",
  confirmed: "bg-emerald-500",
  rejected: "bg-destructive",
};

const statusLabels: Record<string, string> = {
  pending: "Afventer",
  confirmed: "Bekræftet",
  rejected: "Afvist",
};

const BookingCalendar = ({ bookings }: { bookings: Booking[] }) => {
  // Build map: date string → bookings on that day
  const dateBookings = useMemo(() => {
    const map: Record<string, Booking[]> = {};
    bookings.forEach((b) => {
      const from = parseISO(b.date_from);
      const to = b.date_to ? parseISO(b.date_to) : from;
      eachDayOfInterval({ start: from, end: to }).forEach((d) => {
        const key = format(d, "yyyy-MM-dd");
        if (!map[key]) map[key] = [];
        map[key].push(b);
      });
    });
    return map;
  }, [bookings]);

  const bookedDates = useMemo(
    () => Object.keys(dateBookings).map((d) => parseISO(d)),
    [dateBookings]
  );

  return (
    <div className="rounded-xl border border-border bg-card p-6 space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="font-heading font-bold text-lg">Booking-kalender</h2>
        <div className="flex gap-3 text-xs">
          {Object.entries(statusLabels).map(([key, label]) => (
            <span key={key} className="flex items-center gap-1.5">
              <span className={cn("w-2.5 h-2.5 rounded-full", statusColors[key])} />
              {label}
            </span>
          ))}
        </div>
      </div>

      <Calendar
        mode="multiple"
        selected={bookedDates}
        locale={da}
        numberOfMonths={2}
        className="pointer-events-auto"
        components={{
          DayContent: ({ date }) => {
            const key = format(date, "yyyy-MM-dd");
            const dayBookings = dateBookings[key];

            if (!dayBookings || dayBookings.length === 0) {
              return <span>{date.getDate()}</span>;
            }

            return (
              <Popover>
                <PopoverTrigger asChild>
                  <button type="button" className="relative w-full h-full flex flex-col items-center">
                    <span>{date.getDate()}</span>
                    <span className="flex gap-0.5 mt-0.5">
                      {dayBookings.map((b, i) => (
                        <span
                          key={b.id + i}
                          className={cn("w-1.5 h-1.5 rounded-full", statusColors[b.status] || "bg-muted-foreground")}
                        />
                      ))}
                    </span>
                  </button>
                </PopoverTrigger>
                <PopoverContent className="w-64 p-3 space-y-2" align="center">
                  <p className="font-heading font-semibold text-sm">
                    {format(date, "d. MMMM yyyy", { locale: da })}
                  </p>
                  {dayBookings.map((b) => (
                    <div
                      key={b.id}
                      className="flex items-start gap-2 text-xs border-t border-border pt-2"
                    >
                      <span className={cn("w-2 h-2 rounded-full mt-1 shrink-0", statusColors[b.status])} />
                      <div>
                        <p className="font-medium text-foreground">{b.name}</p>
                        <p className="text-muted-foreground">
                          {b.speaker_count} stk · {b.total_price} DKK · {statusLabels[b.status]}
                        </p>
                      </div>
                    </div>
                  ))}
                </PopoverContent>
              </Popover>
            );
          },
        }}
      />
    </div>
  );
};

export default BookingCalendar;