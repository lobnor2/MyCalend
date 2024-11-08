import React, { Suspense } from "react";

export default function AvailabilityLayout({ children }) {
  return (
    <div className="mx-auto">
      <Suspense fallback={<div className="ml-4">Loading Availability...</div>}>
        {children}
      </Suspense>
    </div>
  );
}
