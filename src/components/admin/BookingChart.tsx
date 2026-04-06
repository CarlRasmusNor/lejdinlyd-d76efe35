import { useMemo, useState } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";
import { format, parseISO, eachDayOfInterval, subDays, subMonths } from "date-fns";
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

type TimeFilter = "7d" | "30d" | "90d" | "year" | "all";
type DayFilter = "all" | "weekday" | "weekend";
type YearFilter = "all" | string;

const TIME_OPTIONS: { value: TimeFilter; label: string }[] = [
  { value: "7d", label: "7 dage" },
  { value: "30d", label: "30 dage" },
  { value: "90d", label: "90 dage" },
  { value: "year", label: "År" },
  { value: "all", label: "Alt" },
];

const DAY_OPTIONS: { value: DayFilter; label: string }[] = [
  { value: "all", label: "Alle dage" },
  { value: "weekday", label: "Hverdage" },
  { value: "weekend", label: "Weekend" },
];

const BookingChart = ({ bookings }: { bookings: Booking[] }) => {
  const [timeFilter, setTimeFilter] = useState<TimeFilter>("all");
  const [dayFilter, setDayFilter] = useState<DayFilter>("all");
  const [yearFilter, setYearFilter] = useState<YearFilter>("all");

  const availableYears = useMemo(() => {
    const years = new Set<string>();
    bookings.forEach((b) => {
      if (b.status !== "rejected") {
        years.add(parseISO(b.date_from).getFullYear().toString());
      }
    });
    return Array.from(years).sort();
  }, [bookings]);

  const chartData = useMemo(() => {
    const now = new Date();
    const cutoff =
      timeFilter === "7d" ? subDays(now, 7) :
      timeFilter === "30d" ? subDays(now, 30) :
      timeFilter === "90d" ? subMonths(now, 3) :
      null;

    const activeBookings = bookings.filter((b) => b.status !== "rejected");
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
        if (timeFilter === "year" && yearFilter !== "all" && d.getFullYear().toString() !== yearFilter) return;
        if (timeFilter !== "year" && yearFilter !== "all" && d.getFullYear().toString() !== yearFilter) return;

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
        label: format(parseISO(date), "d. MMM yy", { locale: da }),
        Højttalere: val.count,
        Omsætning: val.revenue,
      }));
  }, [bookings, timeFilter, dayFilter, yearFilter]);

  // Yearly summary
  const yearlySummary = useMemo(() => {
    const summary: Record<string, { revenue: number; bookings: number; days: number }> = {};
    const active = bookings.filter((b) => b.status !== "rejected");
    active.forEach((b) => {
      const from = parseISO(b.date_from);
      const to = b.date_to ? parseISO(b.date_to) : from;
      const days = eachDayOfInterval({ start: from, end: to });
      const revenuePerDay = b.total_price / days.length;
      days.forEach((d) => {
        const y = d.getFullYear().toString();
        if (!summary[y]) summary[y] = { revenue: 0, bookings: 0, days: 0 };
        summary[y].revenue += Math.round(revenuePerDay);
        summary[y].days++;
      });
      const y = from.getFullYear().toString();
      if (!summary[y]) summary[y] = { revenue: 0, bookings: 0, days: 0 };
      summary[y].bookings++;
    });
    return Object.entries(summary).sort(([a], [b]) => a.localeCompare(b));
  }, [bookings]);

  const totalChartRevenue = chartData.reduce((s, d) => s + d.Omsætning, 0);

  const btnClass = (active: boolean) =>
    `px-3 py-1.5 rounded-md text-xs font-heading font-semibold transition-colors ${
      active
        ? "bg-primary text-primary-foreground"
        : "bg-secondary text-muted-foreground hover:text-foreground"
    }`;

  return (
    <div className="space-y-4">
      {/* Yearly summary cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {yearlySummary.map(([year, data]) => (
          <button
            key={year}
            onClick={() => { setYearFilter(yearFilter === year ? "all" : year); setTimeFilter("year"); }}
            className={`rounded-xl border p-4 text-left transition-all ${
              yearFilter === year
                ? "border-primary bg-primary/10 ring-1 ring-primary"
                : "border-border bg-card hover:border-primary/50"
            }`}
          >
            <p className="font-heading font-bold text-2xl">{year}</p>
            <p className="text-primary font-semibold text-sm">{data.revenue.toLocaleString("da-DK")} DKK</p>
            <p className="text-muted-foreground text-xs">{data.bookings} bookinger · {data.days} dage</p>
          </button>
        ))}
      </div>

      {/* Chart */}
      <div className="rounded-xl border border-border bg-card p-6 space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="font-heading font-bold text-lg">Bookinger over tid</h2>
            {chartData.length > 0 && (
              <p className="text-sm text-muted-foreground">
                Samlet omsætning: <span className="text-primary font-semibold">{totalChartRevenue.toLocaleString("da-DK")} DKK</span>
              </p>
            )}
          </div>
          <div className="flex flex-wrap gap-2">
            <div className="flex gap-1 rounded-lg bg-secondary p-1">
              {TIME_OPTIONS.map((o) => (
                <button
                  key={o.value}
                  className={btnClass(timeFilter === o.value)}
                  onClick={() => {
                    setTimeFilter(o.value);
                    if (o.value !== "year") setYearFilter("all");
                  }}
                >
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

        {timeFilter === "year" && (
          <div className="flex gap-1 rounded-lg bg-secondary p-1 w-fit">
            <button className={btnClass(yearFilter === "all")} onClick={() => setYearFilter("all")}>Alle år</button>
            {availableYears.map((y) => (
              <button key={y} className={btnClass(yearFilter === y)} onClick={() => setYearFilter(y)}>{y}</button>
            ))}
          </div>
        )}

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
    </div>
  );
};

export default BookingChart;
