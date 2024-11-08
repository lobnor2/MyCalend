import React, { Suspense } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import MeetingList from "./_components/meeting-list";
import { getUserMeetings } from "@/actions/meetings";

export const metadata = {
  title: "Your Meetings || mycalend",
  description: "View and manage your upcoming and past meetings.",
};

const Meeting = () => {
  return (
    <div className="mx-4 md:ml-7">
      <Tabs defaultValue="upcoming" className="pt-2">
        <TabsList className="mb-5 w-full">
          <TabsTrigger value="upcoming" className="px-10">
            Upcoming Meetings
          </TabsTrigger>
          <TabsTrigger value="past" className="px-10">
            Past Meetings
          </TabsTrigger>
        </TabsList>
        <TabsContent value="upcoming">
          <Suspense
            fallback={<div className="ml-4">Loading upcoming meetings...</div>}
          >
            <UpcomingMeetings />
          </Suspense>
        </TabsContent>
        <TabsContent value="past">
          <Suspense
            fallback={<div className="ml-4">Loading past meetings...</div>}
          >
            <PastMeetings />
          </Suspense>
        </TabsContent>
      </Tabs>
    </div>
  );
};

async function UpcomingMeetings() {
  const meetings = await getUserMeetings("upcoming");
  return <MeetingList meetings={meetings} type="upcoming" />;
}
async function PastMeetings() {
  const meetings = await getUserMeetings("past");
  return <MeetingList meetings={meetings} type="past" />;
}

export default Meeting;
