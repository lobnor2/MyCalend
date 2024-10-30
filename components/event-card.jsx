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
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";

import { Button } from "./ui/button";
import { Link, Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import useFetch from "@/hooks/use-fetch";
import { deleteEvent } from "@/actions/events";

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

  const { loading, fn: fnDeleteEvent } = useFetch(deleteEvent);

  const handleDelete = async () => {
    // if (window?.confirm("Are you sure you want to delete this event?")) {
    // }
    await fnDeleteEvent(event.id);
    router.refresh();
  };
  return (
    <TooltipProvider>
      <div className="">
        <Card className="cursor-pointer h-full flex flex-col justify-between">
          <CardHeader>
            <Tooltip>
              <TooltipTrigger>
                <CardTitle
                  className="text-xl text-left lg:text-2xl font-semibold line-clamp-2"
                  //   title={event.title}
                >
                  {event?.title?.charAt(0).toUpperCase() +
                    event?.title?.slice(1)}
                </CardTitle>
              </TooltipTrigger>
              <TooltipContent>
                <p>{event?.title}</p>
              </TooltipContent>
            </Tooltip>

            <HoverCard>
              <HoverCardTrigger>
                <CardDescription className="line-clamp-2">
                  {event?.description}
                </CardDescription>
              </HoverCardTrigger>
              <HoverCardContent>{event?.description}</HoverCardContent>
            </HoverCard>
          </CardHeader>
          <CardContent>
            <p>Duration : {event?.duration} Mins</p>
            <p>Event Privacy : {event?.isPrivate ? "Private" : "Public"}</p>
            <p>Bookings count : {event?._count?.bookings}</p>
            <p>Organizer : {username}</p>
          </CardContent>
          <CardFooter className="flex sm:flex-col gap-4 md:mt-5  md:items-start">
            <Button variant="outline" onClick={handleCopy} className="w-full">
              {" "}
              <Link className="mr-2 h-5 w-5" /> {isCopied ? "Copied" : "Copy"}
            </Button>

            <Dialog>
              <DialogTrigger className="w-full">
                <Button variant="default" className="w-full" disabled={loading}>
                  <Trash className="mr-2 h-5 w-5" />
                  {/* <Trash2 /> */}
                  {loading ? "Deleting..." : "Delete"}
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle className="text-center mb-3">
                    Are you sure you want to delete this event?
                  </DialogTitle>
                </DialogHeader>

                <div className="flex gap-5 justify-center">
                  <DialogClose asChild>
                    <Button variant="outline">Cancel</Button>
                  </DialogClose>
                  <Button variant="" onClick={handleDelete}>
                    Ok
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </CardFooter>
        </Card>
      </div>
    </TooltipProvider>
  );
};

export default EventCard;
