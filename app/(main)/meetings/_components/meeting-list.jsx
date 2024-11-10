import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Calendar, Clock, Video } from "lucide-react";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import CancelMeetingButton from "./cancel-meeting";

const MeetingList = ({ meetings, type }) => {
  if (meetings.length === 0) {
    return <p>No {type} meetings found.</p>;
  }
  console.log("meetings => ", meetings);
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {meetings.map((meeting) => {
        return (
          <Card key={meeting.id} className="flex flex-col justify-between">
            <CardHeader>
              <CardTitle>{meeting.event.title}</CardTitle>
              <CardDescription> With {meeting.name}</CardDescription>
              <CardDescription>
                {" "}
                &quot;{meeting.additionalInfo}&quot;
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center mb-2">
                <Calendar className="mr-2" />
                <span>
                  {format(new Date(meeting.startTime), "MMMM d, yyyy")}
                </span>
              </div>
              <div className="flex items-center mb-2">
                <Clock className="mr-2" />
                <span>
                  {format(new Date(meeting.startTime), "h:mm a")} -{" "}
                  {format(new Date(meeting.endTime), "h:mm a")}
                </span>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col items-center gap-3 ">
              <div className="flex-grow w-full">
                <CancelMeetingButton meetingId={meeting.id} />
                {/* <Button variant="outline" className="w-full">
                  Cancel Meeting
                </Button> */}
              </div>
              <div className="flex-grow w-full">
                {meeting.meetLink && (
                  <div className="flex items-center">
                    <Button variant="default" className="w-full">
                      <Video className="mr-2" />
                      <a
                        href={meeting.meetLink}
                        target="_blank"
                        rel="noopener noreferrer"

                        // className="text-blue-600 hover:underline"
                      >
                        Join Meeting
                      </a>
                    </Button>
                  </div>
                )}
              </div>
            </CardFooter>
          </Card>
        );
      })}
    </div>
  );
};

export default MeetingList;
