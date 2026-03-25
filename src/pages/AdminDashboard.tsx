import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { format, parseISO, eachDayOfInterval } from "date-fns";
import { da } from "date-fns/locale";
import { LogOut, CalendarDays, Users, DollarSign, Loader2, CheckCircle, Clock, Sun, PartyPopper } from "lucide-react";
import { toast } from "sonner";
import BookingStatusBadge from "@/components/admin/BookingStatusBadge";
import BookingActions from "@/components/admin/BookingActions";
import EditBookingDialog, { type Booking } from "@/components/admin/EditBookingDialog";
import BookingChart from "@/components/admin/BookingChart";

const AdminDashboard = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [authChecked, setAuthChecked] = useState(false);
  const [editBooking, setEditBooking] = useState<Booking | null>(null);
  const [editOpen, setEditOpen] = useState(false);
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

  useEffect(() => {
    if (!authChecked) return;
    const fetchBookings = async () => {
      const { data, error } = await supabase
        .from("bookings")
        .select("*")
        .order("created_at", { ascending: false });
      if (!error && data) setBookings(data as unknown as Booking[]);
      setLoading(false);
    };
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
          idempotencyKey: `booking-confirm-${booking.id}`,
          templateData: {
            name: booking.name,
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
      toast.error("Email-infrastruktur er ikke sat op endnu. Kontakt support.");
    } finally {
      setSendingEmail(null);
    }
  };

  const totalRevenue = bookings.filter((b) => b.status !== "rejected").reduce((sum, b) => sum + b.total_price, 0);

  const confirmedCount = bookings.filter((b) => b.status === "confirmed").length;
  const pendingCount = bookings.filter((b) => b.status === "pending").length;

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
          <StatCard icon={<CalendarDays className="w-5 h-5 text-primary" />} label="Bookinger i alt" value={bookings.length} />
          <StatCard icon={<CheckCircle className="w-5 h-5 text-primary" />} label="Bekræftede" value={confirmedCount} />
          <StatCard icon={<Clock className="w-5 h-5 text-primary" />} label="Afventende" value={pendingCount} />
          <StatCard icon={<DollarSign className="w-5 h-5 text-primary" />} label="Omsætning" value={`${totalRevenue.toLocaleString("da-DK")} DKK`} />
          <StatCard icon={<Users className="w-5 h-5 text-primary" />} label="Højttalere udlejet" value={bookings.filter((b) => b.status !== "rejected").reduce((s, b) => s + b.speaker_count, 0)} />
          <StatCard icon={<Sun className="w-5 h-5 text-primary" />} label="Hverdage booket" value={weekdayBookings} />
          <StatCard icon={<PartyPopper className="w-5 h-5 text-primary" />} label="Weekenddage booket" value={weekendBookings} />
        </div>

        <BookingChart bookings={bookings} />

        {loading ? (
          <div className="flex justify-center py-12">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
          </div>
        ) : bookings.length === 0 ? (
          <p className="text-center text-muted-foreground py-12">Ingen bookinger endnu.</p>
        ) : (
          <div className="rounded-xl border border-border overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border bg-secondary/50">
                  <th className="text-left px-4 py-3 font-heading font-semibold">Status</th>
                  <th className="text-left px-4 py-3 font-heading font-semibold">Dato</th>
                  <th className="text-left px-4 py-3 font-heading font-semibold">Navn</th>
                  <th className="text-left px-4 py-3 font-heading font-semibold hidden sm:table-cell">Email</th>
                  <th className="text-left px-4 py-3 font-heading font-semibold hidden md:table-cell">Telefon</th>
                  <th className="text-center px-4 py-3 font-heading font-semibold">Stk</th>
                  <th className="text-right px-4 py-3 font-heading font-semibold">Pris</th>
                  <th className="text-right px-4 py-3 font-heading font-semibold">Handlinger</th>
                </tr>
              </thead>
              <tbody>
                {bookings.map((b) => (
                  <tr key={b.id} className="border-b border-border/50 hover:bg-secondary/30 transition-colors">
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
                        onConfirm={(id) => updateStatus(id, "confirmed")}
                        onReject={(id) => updateStatus(id, "rejected")}
                        onDelete={handleDelete}
                        onEdit={(booking) => { setEditBooking(booking); setEditOpen(true); }}
                        onSendEmail={handleSendEmail}
                        sendingEmail={sendingEmail}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        <EditBookingDialog
          booking={editBooking}
          open={editOpen}
          onOpenChange={setEditOpen}
          onSaved={(updated) => {
            setBookings((prev) => prev.map((b) => b.id === updated.id ? updated : b));
          }}
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

export default AdminDashboard;
