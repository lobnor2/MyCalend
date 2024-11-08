import { getUserByUsername } from "@/actions/users";
import EventCard from "@/components/event-card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { notFound } from "next/navigation";
import React from "react";

export async function generateMetadata({ params }) {
  const user = await getUserByUsername(params.username);
  if (!user) {
    return {
      title: "User Not Found",
    };
  }
  return {
    title: `${user.name}'s Profile | MyCalend`,
    description: `Book an event with ${user.name}. View available public events events and schedules.`,
  };
}

const UserProfile = async ({ params }) => {
  const user = await getUserByUsername(params.username);
  console.log(user);

  if (!user) {
    notFound();
  }
  return (
    <div className="mx-auto px-4 py-8">
      <div className="flex flex-col items-center">
        <Avatar className="h-24 w-24 mb-2">
          <AvatarImage src={user.imageUrl} alt={user.name} />
          <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
        </Avatar>
        <h1 className="mb-5">{user.name}</h1>
        <p className="text-gray-500 text-center">
          Welcome to mycalend. Please select an event below to book a call with
          me.
        </p>
      </div>
      {user.events.length === 0 ? (
        <p className="text-gray-500">No Public Events Availabile</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mt-5">
          {user.events.map((event) => {
            return (
              <EventCard
                key={event.id}
                event={event}
                username={params.username}
                isPublic
              />
            );
          })}
        </div>
      )}
    </div>
  );
};

export default UserProfile;
