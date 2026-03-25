import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { format, parseISO } from "date-fns";
import { da } from "date-fns/locale";
import { LogOut, CalendarDays, Users, DollarSign, Loader2 } from "lucide-react";

interface Booking {
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
}

const AdminDashboard = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [authChecked, setAuthChecked] = useState(false);
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
      if (!error && data) setBookings(data);
      setLoading(false);
    };
    fetchBookings();
  }, [authChecked]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/admin/login");
  };

  const totalRevenue = bookings.reduce((sum, b) => sum + b.total_price, 0);

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
        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <StatCard icon={<CalendarDays className="w-5 h-5 text-primary" />} label="Bookinger i alt" value={bookings.length} />
          <StatCard icon={<Users className="w-5 h-5 text-primary" />} label="Højttalere udlejet" value={bookings.reduce((s, b) => s + b.speaker_count, 0)} />
          <StatCard icon={<DollarSign className="w-5 h-5 text-primary" />} label="Omsætning" value={`${totalRevenue.toLocaleString("da-DK")} DKK`} />
        </div>

        {/* Table */}
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
                  <th className="text-left px-4 py-3 font-heading font-semibold">Dato</th>
                  <th className="text-left px-4 py-3 font-heading font-semibold">Navn</th>
                  <th className="text-left px-4 py-3 font-heading font-semibold hidden sm:table-cell">Email</th>
                  <th className="text-left px-4 py-3 font-heading font-semibold hidden md:table-cell">Telefon</th>
                  <th className="text-center px-4 py-3 font-heading font-semibold">Stk</th>
                  <th className="text-right px-4 py-3 font-heading font-semibold">Pris</th>
                  <th className="text-right px-4 py-3 font-heading font-semibold hidden lg:table-cell">Oprettet</th>
                </tr>
              </thead>
              <tbody>
                {bookings.map((b) => (
                  <tr key={b.id} className="border-b border-border/50 hover:bg-secondary/30 transition-colors">
                    <td className="px-4 py-3 whitespace-nowrap">
                      {format(parseISO(b.date_from), "d. MMM", { locale: da })}
                      {b.date_to && b.date_to !== b.date_from && ` – ${format(parseISO(b.date_to), "d. MMM", { locale: da })}`}
                    </td>
                    <td className="px-4 py-3 font-medium">{b.name}</td>
                    <td className="px-4 py-3 text-muted-foreground hidden sm:table-cell">{b.email}</td>
                    <td className="px-4 py-3 text-muted-foreground hidden md:table-cell">{b.phone}</td>
                    <td className="px-4 py-3 text-center">{b.speaker_count}</td>
                    <td className="px-4 py-3 text-right font-medium text-primary">{b.total_price} DKK</td>
                    <td className="px-4 py-3 text-right text-muted-foreground hidden lg:table-cell">
                      {format(parseISO(b.created_at), "d. MMM HH:mm", { locale: da })}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
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
