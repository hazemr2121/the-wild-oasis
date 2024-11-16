import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteBooking } from "../../services/apiBookings";
import toast from "react-hot-toast";

export function useBookingDelete() {
  const queryClient = useQueryClient();
  const { mutate: bookingDelete, isLoading: isDeleteing } = useMutation({
    mutationFn: (bookingId) => deleteBooking(bookingId),
    onSuccess: () => {
      toast.success(`successfully Deleted`);
      queryClient.invalidateQueries({ queryKey: "bookings" });
    },
    onError: (err) => toast.error(err.message),
  });

  return { bookingDelete, isDeleteing };
}
