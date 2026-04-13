import { Check, X, Trash2, Pencil, Mail, Star, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";
import type { Booking } from "./EditBookingDialog";

interface BookingActionsProps {
  booking: Booking;
  onConfirm: (id: string) => void;
  onReject: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (booking: Booking) => void;
  onSendEmail: (booking: Booking) => void;
  onSendReview: (booking: Booking) => void;
  sendingEmail: string | null;
}

const BookingActions = ({
  booking,
  onConfirm,
  onReject,
  onDelete,
  onEdit,
  onSendEmail,
  onSendReview,
  sendingEmail,
}: BookingActionsProps) => {
  return (
    <div className="flex items-center justify-end gap-1">
      {booking.status === "pending" && (
        <>
          <Button
            size="sm"
            variant="ghost"
            onClick={() => onConfirm(booking.id)}
            className="h-8 w-8 p-0 text-green-600 hover:text-green-700 hover:bg-green-500/10"
            title="Bekræft booking"
          >
            <Check className="w-4 h-4" />
          </Button>
          <Button
            size="sm"
            variant="ghost"
            onClick={() => onReject(booking.id)}
            className="h-8 w-8 p-0 text-yellow-600 hover:text-yellow-700 hover:bg-yellow-500/10"
            title="Afvis booking"
          >
            <X className="w-4 h-4" />
          </Button>
        </>
      )}

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
            <MoreHorizontal className="w-4 h-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={() => onEdit(booking)}>
            <Pencil className="w-4 h-4 mr-2" />
            Rediger
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => onSendEmail(booking)}
            disabled={sendingEmail === booking.id}
          >
            {sendingEmail === booking.id ? (
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            ) : (
              <Mail className="w-4 h-4 mr-2" />
            )}
            Send bekræftelses-email
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => onSendReview(booking)}
            disabled={sendingEmail === `review-${booking.id}`}
          >
            {sendingEmail === `review-${booking.id}` ? (
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            ) : (
              <Star className="w-4 h-4 mr-2" />
            )}
            Send anmeldelsesanmodning
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <DropdownMenuItem
                onSelect={(e) => e.preventDefault()}
                className="text-destructive focus:text-destructive"
              >
                <Trash2 className="w-4 h-4 mr-2" />
                Slet booking
              </DropdownMenuItem>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Slet booking?</AlertDialogTitle>
                <AlertDialogDescription>
                  Er du sikker på, at du vil slette bookingen fra {booking.name}? Denne handling kan ikke fortrydes.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Annuller</AlertDialogCancel>
                <AlertDialogAction
                  onClick={() => onDelete(booking.id)}
                  className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                >
                  Slet
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default BookingActions;
