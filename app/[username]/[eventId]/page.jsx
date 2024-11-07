import { getEventAvialability, getEventDetails } from "@/actions/events";
import { getUserByUsername } from "@/actions/users";
import { notFound } from "next/navigation";
import React, { Suspense } from "react";
import EventDetails from "./_components/event-details";
import BookingForm from "./_components/booking-form";

export async function getMetadata({ params }) {
  const event = await getEventDetails(params.username, params.eventId);
  if (!event) {
    return {
      title: "Event Not Found",
    };
  }

  return {
    title: `Book ${event.title} with ${event.user.name} | mycalend`,
    description: `Schedule a ${event.duration}-minute ${event.title} event with ${event.user.name}`,
  };
}

const EventPage = async ({ params }) => {
  const event = await getEventDetails(params.username, params.eventId);
  const availability = await getEventAvialability(params.eventId);

  if (!event) {
    notFound();
  }

  return (
    <div className=" mx-10 grid md:grid-cols-[1fr_2fr] mt-5 gap-3 md:gap-2">
      <EventDetails event={event} />
      <Suspense fallback={<div>Loading Booking form...</div>}>
        {/*  most important logic */}
        <BookingForm event={event} availability={availability} />
      </Suspense>
    </div>
  );
};

export default EventPage;
