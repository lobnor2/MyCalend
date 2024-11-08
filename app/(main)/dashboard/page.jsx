"use client";
import React, { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useUser } from "@clerk/nextjs";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { usernameSchema } from "@/app/lib/validators";
import useFetch from "@/hooks/use-fetch";
import { updateUsername } from "@/actions/users";
import { BarLoader } from "react-spinners";
import { useToast } from "@/hooks/use-toast";
import { getLatestUpdates } from "@/actions/dashboard";
import { format } from "date-fns";

const Dashboard = () => {
  const { isLoaded, user } = useUser();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(usernameSchema),
  });

  const { toast } = useToast();
  useEffect(() => {
    setValue("username", user?.username);
  }, [isLoaded, user?.username]);

  //provide function updateUsername to useFetch hook
  const { loading, error, fn: fnUpdateUsername } = useFetch(updateUsername);

  //handle when form is submitted, data contains all the form data
  const onSubmit = async (data) => {
    //data.username is directly goes into additional ...args in useFetch hook
    await fnUpdateUsername(data.username);
    if (error) {
      toast({
        duration: 3000,
        variant: "destructive",
        title: "Username already exists",
        description: "Try another username",
      });
    } else {
      toast({
        duration: 3000,
        title: "Successfully Updated Username",
        // description: "Friday, February 10, 2023 at 5:57 PM",
      });
    }
  };

  const {
    loading: loadingUpdates,
    data: upcomingMeetings,
    fn: fnUpdates,
  } = useFetch(getLatestUpdates);

  useEffect(() => {
    (async () => await fnUpdates())();
  }, []);

  return (
    <div className="mx-4 md:mx-9">
      <Card className="mb-6 md:mb-7">
        <CardHeader>
          <CardTitle>
            Welcome{" "}
            {user?.firstName.charAt(0).toUpperCase() + user?.firstName.slice(1)}{" "}
            {user?.lastName.charAt(0).toUpperCase() + user?.lastName.slice(1)}
          </CardTitle>
        </CardHeader>
        {/* Latest Updates */}
        <CardContent>
          {!loadingUpdates ? (
            <div>
              {upcomingMeetings && upcomingMeetings.length > 0 ? (
                <ul>
                  {upcomingMeetings.map((meeting) => {
                    return (
                      <li key={meeting.id}>
                        {meeting.event.title} on{" "}
                        {format(
                          new Date(meeting.startTime),
                          "MMM d, yyyy h:mm a"
                        )}{" "}
                        with {meeting.name}
                        <Badge className="ml-2 bg-black text-white text-xs animate-jiggle">
                          New
                        </Badge>
                      </li>
                    );
                  })}
                </ul>
              ) : (
                <p>No upcoming meetings</p>
              )}
            </div>
          ) : (
            <p>Loading Updates...</p>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Your Unique Link</CardTitle>
        </CardHeader>
        <CardContent>
          <form className="" onSubmit={handleSubmit(onSubmit)}>
            <div>
              <div className="flex items-center gap-2">
                <span>{window?.location.origin}/</span>
                <Input
                  placeholder="username"
                  className="w-1/4"
                  {...register("username")}
                />
              </div>
              {errors.username && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.username.message}
                </p>
              )}
              {error && (
                <p className="text-red-500 text-sm mt-1">{error?.message} </p>
              )}
              {/* {error &&
                toast({
                  duration: 3000,
                  variant: "destructive",
                  title: "Username already exists",
                  description: "Try another username",
                })} */}
            </div>
            {loading && <BarLoader className="my-2" width={"100%"} />}
            <Button className="mt-3" type="submit">
              {/* {loading ? "Updating..." : "Update Username"} */}
              Update Username
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
