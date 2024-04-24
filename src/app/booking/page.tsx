import { getServerSession } from "next-auth";
import Header from "../_components/header";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import { db } from "../_lib/prisma";
import BookingItem from "../_components/booking-item";
import { isFuture, isPast } from "date-fns";

const Booking = async () => {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    return redirect("/");
  }

  const bookings = await db.booking.findMany({
    where: {
      userId: (session.user as any).id,
    },
    include: {
      service: true,
      barbershop: true,
    },
  });

  const confirmedBookings = bookings.filter((booking => isFuture(booking.date)))
  const fineshedBookings = bookings.filter((booking => isPast(booking.date)))

  return (
    <>
      <Header />
      <div className="px-5 py-6">
        <h1 className="font-bold text-xl">Agendamentos</h1>

        <h2 className="py-3 text-gray-400 uppercase text-sm font-bold">
          Confirmados
        </h2>

        <div className="flex flex-col gap-3">
          {confirmedBookings.map((booking) => (
            <BookingItem key={booking.id} booking={booking} />
          ))}
        </div>

        <h2 className="py-3 text-gray-400 uppercase text-sm font-bold">
          Finalizados
        </h2>

        <div className="flex flex-col gap-3">
          {fineshedBookings.map((booking) => (
            <BookingItem key={booking.id} booking={booking} />
          ))}
        </div>
      </div>
    </>
  );
};

export default Booking;
