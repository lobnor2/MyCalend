"use client";

import { useUser } from "@clerk/nextjs";
import { BarChart, Calendar, Clock, Users } from "lucide-react";
import React from "react";
import { BarLoader } from "react-spinners";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { href: "/dashboard", label: "Dashboard", icon: BarChart },
  { href: "/events", label: "Events", icon: Calendar },
  { href: "/meetings", label: "Meetings", icon: Users },
  { href: "/availability", label: "Availability", icon: Clock },
];

const AppLayout = ({ children }) => {
  const { isLoaded } = useUser();
  const pathname = usePathname();
  return (
    <>
      {!isLoaded && <BarLoader width={"100%"} />}
      <div className="flex flex-col h-screen md:flex-row">
        <aside className="hidden md:block md:w-60 lg:w-80">
          <nav className="">
            <ul>
              {navItems.map((item) => {
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className={`flex items-center px-4 py-4 hover:bg-black hover:text-white ${
                        pathname === item.href
                          ? "text-white bg-black"
                          : "text-black"
                      }`}
                    >
                      {<item.icon className="mr-3" />}
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
        </aside>
        <main className="w-screen">
          <header>
            <h2 className="text-3xl font-light mt-8 mb-4 ml-4 md:ml-9">
              {navItems.find((item) => item.href === pathname).label ||
                "Dashboard"}
            </h2>
          </header>
          {children}
        </main>

        {/* for small screen */}
        <nav className="md:hidden fixed bottom-0 bg-black w-screen">
          <ul className="flex justify-between sm:justify-evenly flex-grow">
            {navItems.map((item) => {
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={`flex items-center py-4 mx-2 ${
                      pathname === item.href ? "text-white" : "text-gray-400 "
                    }`}
                  >
                    {<item.icon className="mr-2" />}
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </>
  );
};

export default AppLayout;
