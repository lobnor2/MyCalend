"use client";
import { createBooking } from "@/actions/bookings";
import { bookingSchema } from "@/app/lib/validators";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import useFetch from "@/hooks/use-fetch";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import React, { useEffect, useState } from "react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/style.css";
import { useForm } from "react-hook-form";

const BookingForm = ({ event, availability }) => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    resolver: zodResolver(bookingSchema),
  });

  const availableDays = availability.map((day) => new Date(day.date));

  const timeSlots = selectedDate
    ? availability.find(
        (day) => day.date === format(selectedDate, "yyyy-MM-dd")
      )?.slots || []
    : [];

  useEffect(() => {
    if (selectedDate) {
      setValue("date", format(selectedDate, "yyyy-MM-dd"));
    }
  }, [selectedDate]);
  useEffect(() => {
    if (selectedTime) {
      setValue("time", selectedTime);
    }
  }, [selectedTime]);

  const { loading, data, fn: fnCreateBooking } = useFetch(createBooking);

  const onSubmit = async (data) => {
    fnCreateBooking(data);
    if (!selectedDate || !selectedTime) {
      console.error("Date or time not selected");
      return;
    }
    const startTime = new Date(
      `${format(selectedDate, "yyyy-MM-dd")}T${selectedTime}`
    );
    const endTime = new Date(startTime.getTime() + event.duration * 60000);

    const bookingData = {
      eventId: event.id,
      name: data.name,
      email: data.email,
      startTime: startTime.toISOString(),
      endTime: endTime.toISOString(),
      additionalInfo: data.additionalInfo,
    };

    await fnCreateBooking(bookingData);

    // console.log("form data ->>>>", data);
  };
  if (data) {
    return (
      <div className="border rounded-xl shadow-md">
        <h2 className="text-xl text-center mt-2">Booking Successfull</h2>
        {data.meetLink && (
          <p className="mt-2 px-5 text-center">
            Join the meeting:{" "}
            <a
              href={data.meetLink}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:underline"
            >
              {data.meetLink}
            </a>{" "}
          </p>
        )}
      </div>
    );
  }

  return (
    <div className="shadow-md rounded-xl border py-5 mt-2 md:mt-0">
      <div className="flex flex-col items-center lg:items-start justify-center lg:flex-row gap-5 /*border border-green-500*/">
        <div className="/*border border-blue-500*/ lg:h-96">
          <DayPicker
            autoFocus
            mode="single"
            selected={selectedDate}
            onSelect={(date) => {
              setSelectedDate(date);
              setSelectedTime(null);
            }}
            disabled={[{ before: new Date() }]}
            modifiers={{
              available: availableDays,
            }}
            modifiersStyles={{
              available: {
                borderRadius: 100,
                fontWeight: "900",
              },
            }}
            classNames={{
              today: `text-white bg-black rounded-full`,
              selected: `bg-black/40 text-white rounded-full`,
              chevron: `fill-black`,
            }}
          />
        </div>
        <div className="mt-2 px-2 md:mt-0 md:w-96 w-full md:overflow-scroll no-scrollbar /*border border-red-500*/ lg:h-96">
          {selectedDate && (
            <div>
              <div className="text-lg mb-2">Available Time Slots</div>
              <div className="grid grid-cols-2 lg:grid-cols-3 gap-2">
                {timeSlots.map((slot) => {
                  return (
                    <Button
                      key={slot}
                      onClick={() => setSelectedTime(slot)}
                      variant={selectedTime === slot ? "default" : "outline"}
                    >
                      {slot}
                    </Button>
                  );
                })}
              </div>
            </div>
          )}
          {selectedTime && (
            <form className="w-full mt-5" onSubmit={handleSubmit(onSubmit)}>
              <div className="flex flex-col gap-2">
                <div>
                  <Input placeholder="Name" {...register("name")} />
                  {errors.name && (
                    <p className="text-red-500 text-sm">
                      {errors.name.message}
                    </p>
                  )}
                </div>
                <div>
                  <Input placeholder="Email" {...register("email")} />
                  {errors.email && (
                    <p className="text-red-500 text-sm">
                      {errors.email.message}
                    </p>
                  )}
                </div>
                <div>
                  <Textarea
                    placeholder="Additional Information"
                    {...register("additionalInfo")}
                  />
                  {errors.email && (
                    <p className="text-red-500 text-sm">
                      {errors.email.message}
                    </p>
                  )}
                </div>
                <Button type="submit" disabled={loading}>
                  {loading ? "Scheduling..." : "Schedule Event"}
                </Button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookingForm;
