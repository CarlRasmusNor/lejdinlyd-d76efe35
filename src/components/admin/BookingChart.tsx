import { useMemo, useState } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";
import { format, parseISO, eachDayOfInterval, subDays, subMonths, isWithinInterval } from "date-fns";
import { da } from "date-fns/locale";

type Booking = {
  id: string;
  date_from: string;
  date_to: string | null;
  speaker_count: number;
  total_price: number;
  status: string;
  created_at: string;
};

type TimeFilter = "7d" | "30d" | "90d" | "all";
type DayFilter = "all" | "weekday" | "weekend";

const TIME_OPTIONS: { value: TimeFilter; label: string }[] = [
  { value: "7d", label: "7 dage" },
  { value: "30d", label: "30 dage" },
  { value: "90d", label: "90 dage" },
  { value: "all", label: "Alt" },
];

const DAY_OPTIONS: { value: DayFilter; label: string }[] = [
  { value: "all", label: "Alle dage" },
  { value: "weekday", label: "Hverdage" },
  { value: "weekend", label: "Weekend" },
];

const BookingChart = ({ bookings }: { bookings: Booking[] }) => {
  const [timeFilter, setTimeFilter] = useState<TimeFilter>("30d");
  const [dayFilter, setDayFilter] = useState<DayFilter>("all");

  const chartData = useMemo(() => {
    const now = new Date();
    const cutoff =
      timeFilter === "7d" ? subDays(now, 7) :
      timeFilter === "30d" ? subDays(now, 30) :
      timeFilter === "90d" ? subMonths(now, 3) :
      null;

    const activeBookings = bookings.filter((b) => b.status !== "rejected");

    // Build a map of date → { count, revenue }
    const dateMap: Record<string, { count: number; revenue: number }> = {};

    activeBookings.forEach((b) => {
      const from = parseISO(b.date_from);
      const to = b.date_to ? parseISO(b.date_to) : from;
      const days = eachDayOfInterval({ start: from, end: to });
      const revenuePerDay = b.total_price / days.length;

      days.forEach((d) => {
        const dow = d.getDay();
        const isWeekend = dow === 5 || dow === 6;

        if (dayFilter === "weekday" && isWeekend) return;
        if (dayFilter === "weekend" && !isWeekend) return;
        if (cutoff && d < cutoff) return;

        const key = format(d, "yyyy-MM-dd");
        if (!dateMap[key]) dateMap[key] = { count: 0, revenue: 0 };
        dateMap[key].count += b.speaker_count;
        dateMap[key].revenue += Math.round(revenuePerDay);
      });
    });

    return Object.entries(dateMap)
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([date, val]) => ({
        date,
        label: format(parseISO(date), "d. MMM", { locale: da }),
        Højttalere: val.count,
        Omsætning: val.revenue,
      }));
  }, [bookings, timeFilter, dayFilter]);

  const btnClass = (active: boolean) =>
    `px-3 py-1.5 rounded-md text-xs font-heading font-semibold transition-colors ${
      active
        ? "bg-primary text-primary-foreground"
        : "bg-secondary text-muted-foreground hover:text-foreground"
    }`;

  return (
    <div className="rounded-xl border border-border bg-card p-6 space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h2 className="font-heading font-bold text-lg">Bookinger over tid</h2>
        <div className="flex flex-wrap gap-2">
          <div className="flex gap-1 rounded-lg bg-secondary p-1">
            {TIME_OPTIONS.map((o) => (
              <button key={o.value} className={btnClass(timeFilter === o.value)} onClick={() => setTimeFilter(o.value)}>
                {o.label}
              </button>
            ))}
          </div>
          <div className="flex gap-1 rounded-lg bg-secondary p-1">
            {DAY_OPTIONS.map((o) => (
              <button key={o.value} className={btnClass(dayFilter === o.value)} onClick={() => setDayFilter(o.value)}>
                {o.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {chartData.length === 0 ? (
        <p className="text-center text-muted-foreground py-8 text-sm">Ingen data for de valgte filtre.</p>
      ) : (
        <ResponsiveContainer width="100%" height={280}>
          <BarChart data={chartData} margin={{ top: 5, right: 5, bottom: 5, left: 0 }}>
            <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
            <XAxis dataKey="label" tick={{ fontSize: 11 }} className="fill-muted-foreground" />
            <YAxis allowDecimals={false} tick={{ fontSize: 11 }} className="fill-muted-foreground" />
            <Tooltip
              contentStyle={{
                backgroundColor: "hsl(var(--card))",
                border: "1px solid hsl(var(--border))",
                borderRadius: "0.5rem",
                fontSize: "0.8rem",
              }}
              labelStyle={{ color: "hsl(var(--foreground))" }}
              formatter={(value: number, name: string) =>
                name === "Omsætning" ? [`${value.toLocaleString("da-DK")} DKK`, name] : [value, name]
              }
            />
            <Bar dataKey="Højttalere" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
            <Bar dataKey="Omsætning" fill="hsl(var(--primary) / 0.4)" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      )}
    </div>
  );
};

export default BookingChart;