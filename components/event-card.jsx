"use client";

import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "./ui/button";
import { Link, Trash } from "lucide-react";
import { useRouter } from "next/navigation";

const EventCard = ({ event, username, isPublic = false }) => {
  const [isCopied, setIsCopied] = useState(false);
  const router = useRouter();

  const handleCopy = async () => {
    try {
      //navigator is built in browser
      await navigator.clipboard.writeText(
        `${window.location.origin}/${username}/${event.id}`
      );
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch (error) {
      console.error("Failed to copy: ", error);
    }
  };
  const handleDelete = async () => {};
  return (
    <div className="">
      <Card className="cursor-pointer h-full flex flex-col justify-between">
        <CardHeader>
          <CardTitle className="text-xl  lg:text-2xl font-semibold line-clamp-2">
            {event.title.charAt(0).toUpperCase() + event.title.slice(1)}
          </CardTitle>
          <CardDescription className="line-clamp-3">
            {event.description}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p>Duration : {event.duration} Mins</p>
          <p>Event Privacy : {event.isPrivate ? "Private" : "Public"}</p>
          <p>Organizer : {username}</p>
          <p>Bookings count : {event._count.bookings}</p>
        </CardContent>
        <CardFooter className="flex sm:flex-col gap-4 md:mt-5  md:items-start">
          <Button variant="outline" onClick={handleCopy} className="w-full">
            {" "}
            <Link className="mr-2 h-5 w-5" />{" "}
            {isCopied ? "Copied" : "Copy Link"}
          </Button>
          <Button variant="default" className="w-full" onClick={handleDelete}>
            <Trash className="mr-2 h-5 w-5" />
            {/* <Trash2 /> */}
            Delete
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default EventCard;
