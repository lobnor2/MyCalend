"use server";
import { eventSchema } from "@/app/lib/validators";
import { db } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { addDays, format, startOfDay } from "date-fns";

export async function createEvent(data) {
  const { userId } = auth();
  // check is user is loggedin or not
  if (!userId) {
    throw new Error("Unauthorized");
  }
  //validate data, optional
  const validatedData = eventSchema.parse(data);

  // check if user already exists
  const user = await db.user.findUnique({
    where: { clerkUserId: userId },
  });

  //if user doesnt exists, throw error
  if (!user) {
    throw new Error("User not found");
  }

  //if user exists, create event
  const event = await db.event.create({
    data: { ...validatedData, userId: user.id },
  });

  return event;
}

export async function getUserEvents() {
  const { userId } = auth();
  if (!userId) {
    throw new error("Unauthorized");
  }

  const user = await db.user.findUnique({
    where: { clerkUserId: userId },
  });
  if (!user) {
    throw new error("User not found");
  }

  const events = await db.event.findMany({
    where: { userId: user.id },
    orderBy: { createdAt: "desc" },
    include: {
      _count: {
        //get all the bookings related to this event and give us the count
        select: { bookings: true },
      },
    },
  });
  return { events, username: user.username };
}

export async function deleteEvent(eventId) {
  const { userId } = auth();

  //check authorization
  if (!userId) {
    throw new Error("Unauthorized");
  }

  //check if user already exists
  const user = await db.user.findUnique({
    where: { clerkUserId: userId },
  });
  if (!user) {
    throw new Error("User not found");
  }
  //fetch event
  const event = await db.event.findUnique({
    where: { id: eventId },
  });

  //check if event not exists or doesnt belong to that particular user
  if (!event || event.userId !== user.id) {
    throw new Error("Event not found or unauthorized");
  }
  //if everything is fine, delete event
  await db.event.delete({
    where: { id: eventId },
  });
  return { success: true };
}

export async function getEventDetails(username, eventId) {
  const event = await db.event.findFirst({
    where: {
      id: eventId,
      user: {
        username: username,
      },
    },
    include: {
      user: {
        select: {
          name: true,
          email: true,
          username: true,
          imageUrl: true,
        },
      },
    },
  });

  return event;
}

export async function getEventAvialability(eventId) {
  const event = await db.event.findUnique({
    where: {
      id: eventId,
    },
    include: {
      user: {
        include: {
          availability: {
            select: {
              days: true,
              timeGap: true,
            },
          },
          //used for removing time slots that are already booked
          bookings: {
            select: {
              startTime: true,
              endTime: true,
            },
          },
        },
      },
    },
  });

  //if no event or no user availability available
  if (!event || !event.user.availability) {
    return [];
  }
  const { availability, bookings } = event.user;

  const startDate = startOfDay(new Date());
  const endDate = addDays(startDate, 30);

  const availableDates = [];
  for (let date = startDate; date <= endDate; date = addDays(startDate, 1)) {
    const dayOfWeek = format(date, "EEEE").toUpperCase();
    const dayAvailability = availability.days.find((d) => d.day === dayOfWeek);

    if (dayAvailability) {
      const dateStr = format(date, "yyyy-MM-dd");

      const slots = generateAvailableTimeSlots(
        dayAvailability.startTime,
        dayAvailability.endTime,
        event.duration,
        bookings,
        dateStr,
        availability.timeGap
      );
      availableDates.push({
        date: dateStr,
        slots,
      });
    }
    return availableDates;
  }
}

function generateAvailableTimeSlots(
  startTime,
  endTime,
  duration,
  bookings,
  dateStr,
  timeGap = 0
) {}
