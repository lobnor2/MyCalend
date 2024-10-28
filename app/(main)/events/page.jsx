import { getUserEvents } from "@/actions/events";
import EventCard from "@/components/event-card";
import React, { Suspense } from "react";

export default function EventsPage() {
  return (
    <Suspense fallback={<div>Loading Events...</div>}>
      <Events />
    </Suspense>
  );
}

// fetch events inside this component
// but data might not be available instantly
// hence we use Suspense to show fallback ui
const Events = async () => {
  const { events, username } = await getUserEvents();

  if (events.length === 0) {
    return (
      <>
        <p>You haven't created any events yet.</p>
      </>
    );
  }
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 mx-4 md:mx-9">
      {events.map((event) => (
        <EventCard key={event.id} event={event} username={username} />
      ))}
    </div>
  );
};
