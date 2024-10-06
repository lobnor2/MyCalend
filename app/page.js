"use client";
import Testimonials from "@/components/testimonials";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ArrowRight, Calendar, Clock, LinkIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const features = [
  {
    icon: Calendar,
    title: "Create Events",
    description: "Easily set up and customize your event types",
  },
  {
    icon: Clock,
    title: "Manage Availability",
    description: "Define your abailability to streamline scheduling ",
  },
  {
    icon: LinkIcon,
    title: "Custom Links",
    description: "Share your personalized scheduling link",
  },
];

const howItWorks = [
  {
    step: "Sign Up",
    description: "Create your free mycalend account",
  },
  {
    step: "Set Availability",
    description: "Define when you're available for meetings",
  },
  {
    step: "Share Your Link",
    description: "Send your scheduling link to clients or colleagues",
  },
  {
    step: "Get Booked",
    description: "Receive confirmations for new appointments automatically",
  },
];

export default function Home() {
  return (
    <main>
      <div className="flex flex-col md:flex-row  justify-evenly items-center px-9 lg:w-full lg:mt-16">
        <div className="px-20 md:w-3/4 lg:w-1/2">
          <h1 className=" text-3xl mt-9 pb-4  lg:text-6xl font-extralight lg:pb-6">
            Simplify Your Meetings
          </h1>
          <p className="text-md lg:text-2xl text-gray-600 mb-10">
            mycalend helps you manage your time effectively.
            <span className="hidden lg:inline">
              <br />
            </span>
            Create events, set your availability and
            <span className="hidden lg:inline">
              <br />
            </span>
            let others book time with you seamlessly.
          </p>
          <Link href="/dashboard">
            <Button size="lg" className="text-lg">
              Get Started <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
        <div>
          <Image
            src="/videocall.png"
            width={600}
            height={600}
            alt="video call"
            // layout="responsive"
            className=" -mt-11 sm:h-70 sm:w-auto"
            // layout="fill"
            // objectFit="contain"
          />
        </div>
      </div>

      {/* Key Features */}
      <div className="border border-blue-700 mt-24 py-11">
        <h2 className="text-center text-6xl mb-12 font-extralight">
          Key Features
        </h2>
        <div className="flex flex-col mx-7 sm:flex-row justify-center gap-11">
          {features.map((feature, index) => {
            return (
              <Card key={index} className="text-center">
                <CardHeader>
                  <feature.icon className="w-12 h-12 mb-4 mx-auto" />
                  <CardTitle> {feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>{feature.description}</CardDescription>
                  {/* <p>{feature.description}</p> */}
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Carousel */}
      <div className="border border-blue-700 mt-24 py-11">
        <h2 className="text-center text-6xl mb-12 font-extralight">
          What Our Users Say
        </h2>
        <Testimonials />
      </div>
    </main>
  );
}
