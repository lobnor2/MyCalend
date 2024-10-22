import { getUserAvailability } from "@/actions/availability";
import React from "react";
import { defaultAvailability } from "./data";
import AvailabilityForm from "./_components/availability-form";

const Availability = async () => {
  const availability = await getUserAvailability();
  console.log("availability data -> ", availability);

  return (
    <>
      <AvailabilityForm initialData={availability || defaultAvailability} />
    </>
  );
};

export default Availability;
