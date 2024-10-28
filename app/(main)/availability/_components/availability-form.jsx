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
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import useFetch from "@/hooks/use-fetch";
import { updateAvailability } from "@/actions/availability";

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

  const {
    fn: fnUpdateAvailability,
    loading,
    error,
  } = useFetch(updateAvailability);

  const onSubmit = async (data) => {
    await fnUpdateAvailability(data);
  };
  return (
    <form className="mx-4" onSubmit={handleSubmit(onSubmit)}>
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
            className="px-2 mb-3 md:mx-5 flex justify-between border border-black items-center bg-white border border-gray-300 rounded-md   md:w-[600px] h-16"
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
              <span className="ml-2">
                {day.charAt(0).toUpperCase() + day.slice(1)}
              </span>
            </div>
            <div className="w-96 flex justify-end items-center">
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
                            <SelectTrigger className="w-26">
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
                            <SelectTrigger className="w-26">
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
                  </div>
                )}
              </div>
              <div className="w-[130px] line-clamp-2 ml-3 ">
                {errors[day]?.endTime && (
                  <span className="text-red-500 text-xs">
                    {errors[day].endTime.message}
                  </span>
                )}
              </div>
            </div>
          </div>
        );
      })}
      <div className="flex items-center justify-between md:ml-5 p-3 mt-10 bg-white border border-black rounded-md md:w-[600px] h-16">
        <span>Min gap before booking (minutes):</span>
        <Input
          type="number"
          {...register("timeGap", {
            valueAsNumber: true,
          })}
          className="w-32"
        />
        {errors?.timeGap && (
          <span className="text-red-500 text-sm ml-2 ">
            {errors.timeGap.message}
          </span>
        )}
      </div>
      {error && (
        <div className="text-red-500 text-sm ml-6 mt-2">{error?.message}</div>
      )}
      <Button
        type="submit"
        className="mt-10 md:ml-5"
        size="default"
        disabled={loading}
      >
        {loading ? "Updating..." : "Update Availability"}
      </Button>
    </form>
  );
};

export default AvailabilityForm;
