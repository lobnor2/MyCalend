"use client";
import { availabilitySchema } from "@/app/lib/validators";
import { Checkbox } from "@/components/ui/checkbox";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { timeSlots } from "../data";

const AvailabilityForm = ({ initialData }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    setValue,
    watch,
  } = useForm({
    resolver: zodResolver(availabilitySchema),
    defaultValues: { ...initialData },
  });
  return (
    <form className="">
      {[
        "monday",
        "tuesday",
        "wednesday",
        "thursday",
        "friday",
        "saturday",
        "sunday",
      ].map((day) => {
        //if selected, then its true, else false
        const available = watch(`${day}.isAvailable`);
        return (
          <div
            className=" mb-2 mx-auto md:mx-5 p-4 flex justify-between items-center bg-white border border-gray-300 rounded-md w-[500px] h-16"
            key={day}
          >
            <div className="flex items-center">
              <Controller
                name={`${day}.isAvailable`}
                control={control}
                render={({ field }) => {
                  return (
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={(checked) => {
                        setValue(`${day}.isAvailable`, checked);
                        if (!checked) {
                          setValue(`${day}.startTime`, "09:00");
                          setValue(`${day}.endTime`, "17:00");
                        }
                      }}
                    />
                  );
                }}
              />
              <span className="ml-2 mr-20">
                {day.charAt(0).toUpperCase() + day.slice(1)}
              </span>
            </div>
            <div>
              {available && (
                <div className="flex items-center gap-3">
                  <Controller
                    name={`${day}.startTime`}
                    control={control}
                    render={({ field }) => {
                      return (
                        <Select
                          onValueChange={field.onChange}
                          value={field.value}
                        >
                          <SelectTrigger className="w-28">
                            <SelectValue placeholder="Start Time" />
                          </SelectTrigger>
                          <SelectContent>
                            {timeSlots.map((time) => {
                              return (
                                <SelectItem value={time} key={time}>
                                  {time}
                                </SelectItem>
                              );
                            })}
                          </SelectContent>
                        </Select>
                      );
                    }}
                  />
                  <span>to</span>
                  <Controller
                    name={`${day}.endTime`}
                    control={control}
                    render={({ field }) => {
                      return (
                        <Select
                          onValueChange={field.onChange}
                          value={field.value}
                        >
                          <SelectTrigger className="w-28">
                            <SelectValue placeholder="End Time" />
                          </SelectTrigger>
                          <SelectContent>
                            {timeSlots.map((time) => {
                              return (
                                <SelectItem value={time} key={time}>
                                  {time}
                                </SelectItem>
                              );
                            })}
                          </SelectContent>
                        </Select>
                      );
                    }}
                  />
                  {errors[day]?.endTime && (
                    <span className="text-red-500 text-sm ml-2">
                      {errors[day].endTime.message}
                    </span>
                  )}
                </div>
              )}
            </div>
          </div>
        );
      })}
    </form>
  );
};

export default AvailabilityForm;
