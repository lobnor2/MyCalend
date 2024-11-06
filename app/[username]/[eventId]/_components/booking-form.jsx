"use client";
import { bookingSchema } from "@/app/lib/validators";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import React, { useState } from "react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/style.css";
import { useForm } from "react-hook-form";

const BookingForm = ({ event, availability }) => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const {
    register,
    handleSubmit,
    formState: { error },
  } = useForm({
    resolver: zodResolver(bookingSchema),
  });

  const availableDays = availability.map((day) => new Date(day.date));

  const timeSlots = selectedDate
    ? availability.find(
        (day) => day.date === format(selectedDate, "yyyy-MM-dd")
      )?.slots || []
    : [];
  return (
    <div className="shadow-lg rounded-xl border py-5 mt-2 md:mt-0 flex flex-col justify-center items-center">
      <div className="flex flex-col lg:flex-row gap-5">
        <div className="flex justify-center items-center">
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
                // background: "#fee4e4",
                borderRadius: 100,
                fontWeight: "bold",
              },
            }}
            classNames={{
              today: `text-white bg-black`,
              selected: `bg-black/40 text-white rounded-full`,
              chevron: `fill-black`,
            }}
          />
        </div>
        <div className="mt-2 w-full md:overflow-scroll no-scrollbar">
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
        </div>
      </div>
      <div></div>
    </div>
  );
};

export default BookingForm;
