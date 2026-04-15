import { useEffect, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { format, parseISO, eachDayOfInterval } from "date-fns";
import { da } from "date-fns/locale";
import { LogOut, CalendarDays, Users, DollarSign, Loader2, CheckCircle, Clock, Sun, PartyPopper, XCircle, Search, X, ChevronUp, ChevronDown, Plus } from "lucide-react";
import { toast } from "sonner";
import BookingStatusBadge from "@/components/admin/BookingStatusBadge";
import BookingActions from "@/components/admin/BookingActions";
import EditBookingDialog, { type Booking } from "@/components/admin/EditBookingDialog";
import BookingChart from "@/components/admin/BookingChart";
import BookingCalendar from "@/components/admin/BookingCalendar";

const AdminDashboard = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [authChecked, setAuthChecked] = useState(false);
  const [editBooking, setEditBooking] = useState<Booking | null>(null);
  const [editOpen, setEditOpen] = useState(false);
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [sendingEmail, setSendingEmail] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        navigate("/admin/login");
        return;
      }
      setAuthChecked(true);
    };
    checkAuth();
  }, [navigate]);

  const fetchBookings = async () => {
    const { data, error } = await supabase
      .from("bookings")
      .select("*")
      .order("created_at", { ascending: false });
    if (!error && data) setBookings(data as unknown as Booking[]);
    setLoading(false);
  };

  useEffect(() => {
    if (!authChecked) return;
    fetchBookings();
  }, [authChecked]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/admin/login");
  };

  const updateStatus = async (id: string, status: string) => {
    const { error } = await supabase
      .from("bookings")
      .update({ status } as any)
      .eq("id", id);
    if (error) {
      toast.error(`Kunne ikke opdatere status`);
      return;
    }
    setBookings((prev) => prev.map((b) => b.id === id ? { ...b, status } : b));
    const labels: Record<string, string> = { confirmed: "Booking bekræftet", rejected: "Booking afvist" };
    toast.success(labels[status] || "Status opdateret");
  };

  const handleDelete = async (id: string) => {
    const { error } = await supabase.from("bookings").delete().eq("id", id);
    if (error) {
      toast.error("Kunne ikke slette booking");
      return;
    }
    setBookings((prev) => prev.filter((b) => b.id !== id));
    toast.success("Booking slettet");
  };

  const handleSendEmail = async (booking: Booking) => {
    setSendingEmail(booking.id);
    try {
      const { error } = await supabase.functions.invoke("send-transactional-email", {
        body: {
          templateName: "booking-confirmation",
          recipientEmail: booking.email,
          templateData: {
            name: booking.name,
            email: booking.email,
            phone: booking.phone,
            dateFrom: booking.date_from,
            dateTo: booking.date_to,
            speakerCount: booking.speaker_count,
            totalPrice: booking.total_price,
          },
        },
      });
      if (error) throw error;
      toast.success(`Bekræftelses-email sendt til ${booking.email}`);
    } catch {
      toast.error("Kunne ikke sende email – er Resend API-nøglen sat op?");
    } finally {
      setSendingEmail(null);
    }
  };

  const handleSendReview = async (booking: Booking) => {
    setSendingEmail(`review-${booking.id}`);
    try {
      const { error } = await supabase.functions.invoke("send-transactional-email", {
        body: {
          templateName: "review-request",
          recipientEmail: booking.email,
          templateData: {
            name: booking.name,
          },
        },
      });
      if (error) throw error;
      toast.success(`Anmeldelsesanmodning sendt til ${booking.email}`);
    } catch {
      toast.error("Kunne ikke sende email – er Resend API-nøglen sat op?");
    } finally {
      setSendingEmail(null);
    }
  };

  const pendingBookings = bookings.filter((b) => b.status === "pending");
  const nonPendingBookings = bookings.filter((b) => b.status !== "pending");

  const totalRevenue = bookings.filter((b) => b.status !== "rejected").reduce((sum, b) => sum + b.total_price, 0);

  const confirmedCount = bookings.filter((b) => b.status === "confirmed").length;
  const pendingCount = pendingBookings.length;
  const rejectedCount = bookings.filter((b) => b.status === "rejected").length;
  const activeBookingsCount = bookings.filter((b) => b.status !== "rejected").length;

  const { weekdayBookings, weekendBookings } = bookings.filter((b) => b.status !== "rejected").reduce(
    (acc, b) => {
      const from = parseISO(b.date_from);
      const to = b.date_to ? parseISO(b.date_to) : from;
      const days = eachDayOfInterval({ start: from, end: to });
      days.forEach((d) => {
        const day = d.getDay();
        if (day === 5 || day === 6) acc.weekendBookings++;
        else acc.weekdayBookings++;
      });
      return acc;
    },
    { weekdayBookings: 0, weekendBookings: 0 }
  );

  if (!authChecked) return null;

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border px-6 py-4 flex items-center justify-between">
        <h1 className="font-heading text-xl font-bold">
          <span className="text-primary">Lej Din Lyd</span> — Admin
        </h1>
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <LogOut className="w-4 h-4" /> Log ud
        </button>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-8 space-y-8">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          <StatCard icon={<CalendarDays className="w-5 h-5 text-primary" />} label="Bookinger i alt" value={activeBookingsCount} />
          <StatCard icon={<CheckCircle className="w-5 h-5 text-primary" />} label="Bekræftede" value={confirmedCount} />
          <StatCard icon={<Clock className="w-5 h-5 text-primary" />} label="Afventende" value={pendingCount} />
          <StatCard icon={<XCircle className="w-5 h-5 text-destructive" />} label="Afviste" value={rejectedCount} />
          <StatCard icon={<DollarSign className="w-5 h-5 text-primary" />} label="Omsætning" value={`${totalRevenue.toLocaleString("da-DK")} DKK`} />
          <StatCard icon={<Users className="w-5 h-5 text-primary" />} label="Højttalere udlejet" value={bookings.filter((b) => b.status !== "rejected").reduce((s, b) => s + b.speaker_count, 0)} />
          <StatCard icon={<Sun className="w-5 h-5 text-primary" />} label="Hverdage booket" value={weekdayBookings} />
          <StatCard icon={<PartyPopper className="w-5 h-5 text-primary" />} label="Weekenddage booket" value={weekendBookings} />
        </div>

        {/* Pending bookings shown first for quick action */}
        {!loading && pendingBookings.length > 0 && (
          <BookingsTable
            title="Afventende bookinger"
            bookings={pendingBookings}
            onConfirm={(id) => updateStatus(id, "confirmed")}
            onReject={(id) => updateStatus(id, "rejected")}
            onDelete={handleDelete}
            onEdit={(booking) => { setEditBooking(booking); setEditOpen(true); }}
            onSendEmail={handleSendEmail}
            onSendReview={handleSendReview}
            sendingEmail={sendingEmail}
          />
        )}

        <BookingCalendar bookings={bookings.filter((b) => b.status !== "rejected")} onScrollToBooking={(id) => {
          const el = document.getElementById(`booking-row-${id}`);
          if (el) {
            el.scrollIntoView({ behavior: "smooth", block: "center" });
            el.classList.add("ring-2", "ring-primary", "ring-offset-2");
            setTimeout(() => el.classList.remove("ring-2", "ring-primary", "ring-offset-2"), 2000);
          }
        }} />

        <BookingChart bookings={bookings} />

        {loading ? (
          <div className="flex justify-center py-12">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
          </div>
        ) : nonPendingBookings.length === 0 && pendingBookings.length === 0 ? (
          <p className="text-center text-muted-foreground py-12">Ingen bookinger endnu.</p>
        ) : nonPendingBookings.length > 0 ? (
          <BookingsTable
            title="Alle bookinger"
            bookings={nonPendingBookings}
            onConfirm={(id) => updateStatus(id, "confirmed")}
            onReject={(id) => updateStatus(id, "rejected")}
            onDelete={handleDelete}
            onEdit={(booking) => { setEditBooking(booking); setEditOpen(true); }}
            onSendEmail={handleSendEmail}
            onSendReview={handleSendReview}
            sendingEmail={sendingEmail}
            showFilters
            onAddBooking={() => setShowCreateDialog(true)}
          />
        ) : null}

        <EditBookingDialog
          booking={editBooking}
          open={editOpen}
          onOpenChange={setEditOpen}
          onSaved={(updated) => {
            setBookings((prev) => prev.map((b) => b.id === updated.id ? updated : b));
          }}
        />

        <EditBookingDialog
          booking={null}
          open={showCreateDialog}
          onOpenChange={setShowCreateDialog}
          mode="create"
          onCreated={() => { setShowCreateDialog(false); fetchBookings(); }}
          onUpdated={() => {}}
        />
      </main>
    </div>
  );
};

const StatCard = ({ icon, label, value }: { icon: React.ReactNode; label: string; value: string | number }) => (
  <div className="rounded-xl border border-border bg-card p-5 flex items-center gap-4">
    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">{icon}</div>
    <div>
      <p className="text-muted-foreground text-xs">{label}</p>
      <p className="font-heading font-bold text-lg">{value}</p>
    </div>
  </div>
);

const STATUS_OPTIONS = [
  { value: "all", label: "Alle statuser" },
  { value: "confirmed", label: "Bekræftede" },
  { value: "pending", label: "Afventende" },
  { value: "rejected", label: "Afviste" },
];

const BookingsTable = ({
  title,
  bookings,
  onConfirm,
  onReject,
  onDelete,
  onEdit,
  onSendEmail,
  onSendReview,
  sendingEmail,
  showFilters = false,
  onAddBooking,
}: {
  title: string;
  bookings: Booking[];
  onConfirm: (id: string) => void;
  onReject: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (booking: Booking) => void;
  onSendEmail: (booking: Booking) => void;
  onSendReview: (booking: Booking) => void;
  sendingEmail: string | null;
  showFilters?: boolean;
  onAddBooking?: () => void;
}) => {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [sortField, setSortField] = useState<"date_from" | "name" | "total_price" | "created_at">("created_at");
  const [sortDir, setSortDir] = useState<"asc" | "desc">("desc");

  const toggleSort = (field: typeof sortField) => {
    if (sortField === field) setSortDir(d => d === "asc" ? "desc" : "asc");
    else { setSortField(field); setSortDir("asc"); }
  };

  const SortBtn = ({ field, children }: { field: typeof sortField; children: React.ReactNode }) => {
    const active = sortField === field;
    const Icon = active && sortDir === "asc" ? ChevronUp : ChevronDown;
    return (
      <button onClick={() => toggleSort(field)} className="inline-flex items-center gap-1 hover:text-primary transition-colors cursor-pointer">
        {children}
        <Icon className={`h-3.5 w-3.5${active ? "" : " text-muted-foreground/40"}`} />
      </button>
    );
  };

  const filtered = useMemo(() => {
    return bookings.filter((b) => {
      if (statusFilter !== "all" && b.status !== statusFilter) return false;
      if (search) {
        const q = search.toLowerCase();
        if (
          !b.name.toLowerCase().includes(q) &&
          !b.email.toLowerCase().includes(q) &&
          !b.phone.toLowerCase().includes(q)
        ) return false;
      }
      if (dateFrom && b.date_from < dateFrom) return false;
      if (dateTo && b.date_from > dateTo) return false;
      return true;
    }).sort((a, b) => {
      let aVal: string | number = a[sortField] ?? "";
      let bVal: string | number = b[sortField] ?? "";
      if (sortField === "date_from") {
        aVal = new Date(a.date_from).getTime();
        bVal = new Date(b.date_from).getTime();
      } else if (sortField === "total_price") {
        aVal = Number(a.total_price) || 0;
        bVal = Number(b.total_price) || 0;
      }
      if (aVal < bVal) return sortDir === "asc" ? -1 : 1;
      if (aVal > bVal) return sortDir === "asc" ? 1 : -1;
      return 0;
    });
  }, [bookings, search, statusFilter, dateFrom, dateTo, sortField, sortDir]);

  const hasActiveFilters = search || statusFilter !== "all" || dateFrom || dateTo;

  const clearFilters = () => {
    setSearch("");
    setStatusFilter("all");
    setDateFrom("");
    setDateTo("");
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h2 className="font-heading font-bold text-lg">{title}</h2>
        <div className="flex items-center gap-3">
          {onAddBooking && (
            <button
              onClick={onAddBooking}
              className="inline-flex items-center gap-1.5 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground hover:opacity-90 transition"
            >
              <Plus className="h-4 w-4" />
              Tilføj booking
            </button>
          )}
          {showFilters && hasActiveFilters && (
            <button
              onClick={clearFilters}
              className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors"
            >
              <X className="w-3.5 h-3.5" /> Ryd filtre
            </button>
          )}
        </div>
      </div>

      {showFilters && (
        <div className="flex flex-wrap gap-3">
          {/* Search */}
          <div className="relative flex-1 min-w-[180px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
            <input
              type="text"
              placeholder="Søg navn, email, tlf…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-3 py-2 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/40"
            />
          </div>

          {/* Status */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/40"
          >
            {STATUS_OPTIONS.map((o) => (
              <option key={o.value} value={o.value}>{o.label}</option>
            ))}
          </select>

          {/* Date from */}
          <input
            type="date"
            value={dateFrom}
            onChange={(e) => setDateFrom(e.target.value)}
            title="Fra dato"
            className="px-3 py-2 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/40"
          />

          {/* Date to */}
          <input
            type="date"
            value={dateTo}
            onChange={(e) => setDateTo(e.target.value)}
            title="Til dato"
            className="px-3 py-2 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/40"
          />
        </div>
      )}

      <div className="rounded-xl border border-border overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border bg-secondary/50">
              <th className="text-left px-4 py-3 font-heading font-semibold">Status</th>
              <th className="text-left px-4 py-3 font-heading font-semibold">
                <button onClick={() => toggleSort("date_from")} className="inline-flex items-center gap-1 hover:text-primary transition-colors cursor-pointer">
                  Dato
                  {sortField === "date_from" ? (sortDir === "asc" ? <ChevronUp className="h-3.5 w-3.5" /> : <ChevronDown className="h-3.5 w-3.5" />) : <ChevronDown className="h-3.5 w-3.5 text-muted-foreground/40" />}
                </button>
              </th>
              <th className="text-left px-4 py-3 font-heading font-semibold">
                <button onClick={() => toggleSort("name")} className="inline-flex items-center gap-1 hover:text-primary transition-colors cursor-pointer">
                  Navn
                  {sortField === "name" ? (sortDir === "asc" ? <ChevronUp className="h-3.5 w-3.5" /> : <ChevronDown className="h-3.5 w-3.5" />) : <ChevronDown className="h-3.5 w-3.5 text-muted-foreground/40" />}
                </button>
              </th>
              <th className="text-left px-4 py-3 font-heading font-semibold hidden sm:table-cell">Email</th>
              <th className="text-left px-4 py-3 font-heading font-semibold hidden md:table-cell">Telefon</th>
              <th className="text-center px-4 py-3 font-heading font-semibold">Stk</th>
              <th className="text-right px-4 py-3 font-heading font-semibold">
                <button onClick={() => toggleSort("total_price")} className="inline-flex items-center gap-1 hover:text-primary transition-colors cursor-pointer ml-auto">
                  Pris
                  {sortField === "total_price" ? (sortDir === "asc" ? <ChevronUp className="h-3.5 w-3.5" /> : <ChevronDown className="h-3.5 w-3.5" />) : <ChevronDown className="h-3.5 w-3.5 text-muted-foreground/40" />}
                </button>
              </th>
              <th className="text-right px-4 py-3 font-heading font-semibold">Handlinger</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={8} className="px-4 py-10 text-center text-muted-foreground text-sm">
                  Ingen bookinger matcher dine filtre.
                </td>
              </tr>
            ) : (
              filtered.map((b) => (
                <tr key={b.id} id={`booking-row-${b.id}`} className="border-b border-border/50 hover:bg-secondary/30 transition-colors">
                  <td className="px-4 py-3">
                    <BookingStatusBadge status={b.status} />
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    {format(parseISO(b.date_from), "d. MMM", { locale: da })}
                    {b.date_to && b.date_to !== b.date_from && ` – ${format(parseISO(b.date_to), "d. MMM", { locale: da })}`}
                  </td>
                  <td className="px-4 py-3 font-medium">{b.name}</td>
                  <td className="px-4 py-3 text-muted-foreground hidden sm:table-cell">{b.email}</td>
                  <td className="px-4 py-3 text-muted-foreground hidden md:table-cell">{b.phone}</td>
                  <td className="px-4 py-3 text-center">{b.speaker_count}</td>
                  <td className="px-4 py-3 text-right font-medium text-primary">{b.total_price} DKK</td>
                  <td className="px-4 py-3 text-right">
                    <BookingActions
                      booking={b}
                      onConfirm={onConfirm}
                      onReject={onReject}
                      onDelete={onDelete}
                      onEdit={onEdit}
                      onSendEmail={onSendEmail}
                      onSendReview={onSendReview}
                      sendingEmail={sendingEmail}
                    />
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {showFilters && filtered.length > 0 && filtered.length !== bookings.length && (
        <p className="text-xs text-muted-foreground">
          Viser {filtered.length} af {bookings.length} bookinger
        </p>
      )}
    </div>
  );
};

export default AdminDashboard;
