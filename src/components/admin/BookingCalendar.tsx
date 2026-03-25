import { useMemo, useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { da } from "date-fns/locale";
import { format, parseISO, eachDayOfInterval, isSameDay } from "date-fns";
import { cn } from "@/lib/utils";

type Booking = {
  id: string;
  name: string;
  email: string;
  phone: string;
  date_from: string;
  date_to: string | null;
  speaker_count: number;
  total_price: number;
  status: string;
};

type BookingCalendarProps = {
  bookings: Booking[];
  onScrollToBooking?: (id: string) => void;
};

type DayInfo = {
  bookings: Booking[];
  totalSpeakers: number;
};

const statusColors: Record<string, string> = {
  pending: "bg-amber-500",
  confirmed: "bg-emerald-500",
  rejected: "bg-destructive",
};

const statusTextColors: Record<string, string> = {
  pending: "text-amber-500",
  confirmed: "text-emerald-500",
  rejected: "text-destructive",
};

const statusLabels: Record<string, string> = {
  pending: "Afventer",
  confirmed: "Bekræftet",
  rejected: "Afvist",
};

const BookingCalendar = ({ bookings, onScrollToBooking }: BookingCalendarProps) => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>();

  const dateInfo = useMemo(() => {
    const map: Record<string, DayInfo> = {};
    bookings.forEach((b) => {
      const from = parseISO(b.date_from);
      const to = b.date_to ? parseISO(b.date_to) : from;
      eachDayOfInterval({ start: from, end: to }).forEach((d) => {
        const key = format(d, "yyyy-MM-dd");
        if (!map[key]) map[key] = { bookings: [], totalSpeakers: 0 };
        map[key].bookings.push(b);
        map[key].totalSpeakers += b.speaker_count;
      });
    });
    return map;
  }, [bookings]);

  // Sorted upcoming bookings for the sidebar
  const sortedBookings = useMemo(() => {
    return [...bookings].sort((a, b) => a.date_from.localeCompare(b.date_from));
  }, [bookings]);

  // Bookings for the selected date
  const selectedDayBookings = useMemo(() => {
    if (!selectedDate) return null;
    const key = format(selectedDate, "yyyy-MM-dd");
    return dateInfo[key]?.bookings || null;
  }, [selectedDate, dateInfo]);

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

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Calendar */}
        <div className="shrink-0">
          <Calendar
            mode="default"
            locale={da}
            numberOfMonths={2}
            selected={selectedDate}
            onDayClick={(date) => setSelectedDate(prev => prev && isSameDay(prev, date) ? undefined : date)}
            className="pointer-events-auto"
            classNames={{
              day_selected: "bg-primary/20 text-primary font-bold",
            }}
            components={{
              DayContent: ({ date }) => {
                const key = format(date, "yyyy-MM-dd");
                const info = dateInfo[key];

                if (!info || info.bookings.length === 0) {
                  return <span>{date.getDate()}</span>;
                }

                return (
                  <div className="relative w-full h-full flex flex-col items-center gap-0.5">
                    <span className="font-medium">{date.getDate()}</span>
                    <span className="flex gap-0.5">
                      {info.bookings.map((b, i) => (
                        <span
                          key={b.id + i}
                          className={cn("w-1.5 h-1.5 rounded-full", statusColors[b.status] || "bg-muted-foreground")}
                        />
                      ))}
                    </span>
                    <span className="text-[9px] leading-none text-muted-foreground font-medium">
                      {info.totalSpeakers} stk
                    </span>
                  </div>
                );
              },
            }}
          />
        </div>

        {/* Sidebar booking list */}
        <div className="flex-1 min-w-0">
          {selectedDayBookings ? (
            <div className="space-y-3">
              <h3 className="font-heading font-semibold text-sm text-muted-foreground">
                {format(selectedDate!, "EEEE d. MMMM yyyy", { locale: da })}
              </h3>
              {selectedDayBookings.length === 0 ? (
                <p className="text-sm text-muted-foreground">Ingen bookinger denne dag.</p>
              ) : (
                <div className="space-y-2">
                  {selectedDayBookings.map((b) => (
                    <button
                      key={b.id}
                      type="button"
                      onClick={() => onScrollToBooking?.(b.id)}
                      className="w-full text-left rounded-lg border border-border bg-secondary/30 p-3 hover:bg-secondary/60 transition-colors cursor-pointer"
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-medium text-sm text-foreground">{b.name}</span>
                        <span className={cn("text-xs font-medium", statusTextColors[b.status])}>
                          {statusLabels[b.status]}
                        </span>
                      </div>
                      <div className="text-xs text-muted-foreground space-y-0.5">
                        <p>
                          {format(parseISO(b.date_from), "d. MMM", { locale: da })}
                          {b.date_to && b.date_to !== b.date_from && ` – ${format(parseISO(b.date_to), "d. MMM", { locale: da })}`}
                        </p>
                        <p>{b.speaker_count} stk · {b.total_price} DKK</p>
                        <p>{b.email} · {b.phone}</p>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>
          ) : (
            <div className="space-y-3">
              <h3 className="font-heading font-semibold text-sm text-muted-foreground">
                Kommende bookinger ({sortedBookings.length})
              </h3>
              {sortedBookings.length === 0 ? (
                <p className="text-sm text-muted-foreground">Ingen bookinger.</p>
              ) : (
                <div className="space-y-2 max-h-[400px] overflow-y-auto pr-1">
                  {sortedBookings.map((b) => (
                    <button
                      key={b.id}
                      type="button"
                      onClick={() => onScrollToBooking?.(b.id)}
                      className="w-full text-left rounded-lg border border-border bg-secondary/30 p-3 hover:bg-secondary/60 transition-colors cursor-pointer"
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-medium text-sm text-foreground">{b.name}</span>
                        <span className={cn("text-xs font-medium", statusTextColors[b.status])}>
                          {statusLabels[b.status]}
                        </span>
                      </div>
                      <div className="text-xs text-muted-foreground space-y-0.5">
                        <p>
                          {format(parseISO(b.date_from), "d. MMM", { locale: da })}
                          {b.date_to && b.date_to !== b.date_from && ` – ${format(parseISO(b.date_to), "d. MMM", { locale: da })}`}
                        </p>
                        <p>{b.speaker_count} stk · {b.total_price} DKK</p>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookingCalendar;
