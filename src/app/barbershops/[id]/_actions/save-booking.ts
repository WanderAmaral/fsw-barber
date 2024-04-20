"use server";

import { db } from "@/app/_lib/prisma";

interface SaveBookingParams {
  barbershopId: string;
  serveceId: string;
  userId: string;
  date: Date;
}

export const saveBooking = async (params: SaveBookingParams) => {
  await db.booking.create({
    data: {
      serviceId: params.serveceId,
      userId: params.userId,
      date: params.date,
      barbershopId: params.barbershopId
    },
  });
};
