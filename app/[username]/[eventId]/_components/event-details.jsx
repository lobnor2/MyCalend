import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import { Calendar, Clock } from "lucide-react";
import React from "react";

const EventDetails = ({ event }) => {
  const { user } = event;
  //   console.log(event);
  return (
    <div className="border py-5 px-5 bg-white shadow-md rounded-xl">
      <h1 className="text-2xl text-center mt-1 font-semibold">{event.title}</h1>
      <div className="flex items-center mb-3">
        <Avatar className="h-24 w-24 ">
          <AvatarImage src={user.imageUrl} alt={user.name} />
          <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
        </Avatar>
        <div className="">
          <h2 className="text-xl">{user.name}</h2>
          <h2 className=" text-gray-500">@{user.username}</h2>
        </div>
      </div>

      <div className="flex items-center mb-3">
        <Clock className="mr-1" />
        <span>{event.duration} Mins</span>
      </div>
      <div className="flex items-center mb-3">
        <Calendar className="mr-1" />
        <span>Google Meet</span>
      </div>
      <p className="mt-5">{event.description}</p>
    </div>
  );
};

export default EventDetails;
