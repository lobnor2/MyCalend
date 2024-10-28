"use client";
import Testimonials from "@/components/testimonials";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { features, howItWorks } from "./lib/constant";

export default function Home() {
  return (
    <main className="lg:px-32 xl:px-52">
      <div className="flex flex-col md:flex-row  justify-evenly items-center mt-5 lg:w-full lg:mt-16">
        <div className="px-5 md:px-2 text-center md:w-3/4 lg:w-1/2">
          <h1 className="text-3xl mt-9 pb-4 lg:text-4xl font-extralight lg:pb-6">
            Simplify Your Meetings
          </h1>
          <p className="text-md lg:text-xl text-gray-500 mb-10 lg:line-clamp-3">
            mycalend helps you manage your time effectively. Create events, set
            your availability and let others book time with you seamlessly.
          </p>
          <Link href="/dashboard">
            <Button size="lg" className="text-lg mb-5">
              Get Started <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
        <div>
          <Image
            src="/videocall.png"
            width={500}
            height={500}
            alt="video call"
            // layout="responsive"
            className=""
          />
        </div>
      </div>

      {/* Key Features */}
      <div className="mt-10">
        <h2 className="text-center text-4xl mb-5 font-extralight">
          Key Features
        </h2>
        <div className="flex flex-col mx-5 sm:flex-row justify-center gap-5">
          {features.map((feature, index) => {
            return (
              <Card key={index} className="text-center">
                <CardHeader>
                  <feature.icon className="w-12 h-12 mb-4 mx-auto" />
                  <CardTitle className="font-normal">
                    {" "}
                    {feature.title}
                  </CardTitle>
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
      <div className="mt-20">
        <h2 className="text-center text-4xl mb-5 font-extralight">
          What Our Users Say
        </h2>
        <Testimonials />
      </div>

      {/* Call to Action */}
      <div className="mt-20 py-11">
        <h2 className="text-center text-4xl mb-5 font-extralight">
          How It Works
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
          {howItWorks.map((step, index) => {
            return (
              <div key={index} className="text-center mb-5">
                <div className="bg-gray-200 rounded-full w-16 h-16 flex justify-center items-center mx-auto mb-2">
                  <span className="font-normal text-xl">{index + 1}</span>
                </div>
                <h3 className="font-semibold mb-1">{step.step}</h3>
                <h3 className="text-gray-500">{step.description}</h3>
              </div>
            );
          })}
        </div>
      </div>

      <Card className="mt-10 mb-10 mx-5 text-center">
        <CardHeader>
          <CardTitle className="text-2xl font-semibold">
            Ready to Simplify Your Meetings?
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p>
            {" "}
            Join thousands of professionals who trust mycalend for efficient
            time management.
          </p>
        </CardContent>
        <CardFooter>
          <Link href="/dashboard" className="w-full">
            <Button size="lg">
              Start For Free <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </CardFooter>
      </Card>
    </main>
  );
}
