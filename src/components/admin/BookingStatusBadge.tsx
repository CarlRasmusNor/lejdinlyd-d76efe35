interface BookingStatusBadgeProps {
  status: string;
}

const statusConfig: Record<string, { label: string; className: string }> = {
  confirmed: { label: "Bekræftet", className: "bg-green-500/10 text-green-600" },
  rejected: { label: "Afvist", className: "bg-red-500/10 text-red-600" },
  pending: { label: "Afventer", className: "bg-yellow-500/10 text-yellow-600" },
};

const BookingStatusBadge = ({ status }: BookingStatusBadgeProps) => {
  const config = statusConfig[status] || statusConfig.pending;
  return (
    <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-medium ${config.className}`}>
      {config.label}
    </span>
  );
};

export default BookingStatusBadge;
