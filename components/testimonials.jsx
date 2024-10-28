import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel";
import { Card, CardContent } from "./ui/card";
import Autoplay from "embla-carousel-autoplay";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";

// const testimonials = [
//   {
//     name: "Sarah Johnson",
//     role: "Marketing Manager",
//     content:
//       "Schedulrr has transformed how I manage my team's meetings. It's intuitive and saves us hours every week!",
//     image: "https://i.pravatar.cc/150?img=1",
//   },
//   {
//     name: "David Lee",
//     role: "Freelance Designer",
//     content:
//       "As a freelancer, Schedulrr helps me stay organized and professional. My clients love how easy it is to book time with me.",
//     image: "https://i.pravatar.cc/150?img=2",
//   },
//   {
//     name: "Emily Chen",
//     role: "Startup Founder",
//     content:
//       "Schedulrr streamlined our hiring process. Setting up interviews has never been easier!",
//     image: "https://i.pravatar.cc/150?img=3",
//   },
//   {
//     name: "Michael Brown",
//     role: "Sales Executive",
//     content:
//       "I've seen a 30% increase in my meeting bookings since using Schedulrr. It's a game-changer for sales professionals.",
//     image: "https://i.pravatar.cc/150?img=4",
//   },
// ];

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "Marketing Manager",
    content:
      "MyCalend has transformed how I manage my team's meetings. It's intuitive and saves us hours every week!",
    image: "https://i.pravatar.cc/150?img=1",
  },
  {
    name: "David Lee",
    role: "Freelance Designer",
    content:
      "As a freelancer, MyCalend helps me stay organized and professional. My clients love how easy it is to book time with me.",
    image: "https://i.pravatar.cc/150?img=2",
  },
  {
    name: "Emily Chen",
    role: "Startup Founder",
    content:
      "MyCalend streamlined our hiring process. Setting up interviews has never been easier!",
    image: "https://i.pravatar.cc/150?img=3",
  },
  {
    name: "Michael Brown",
    role: "Sales Executive",
    content:
      "I've seen a 30% increase in my meeting bookings since using MyCalend. It's a game-changer for sales professionals.",
    image: "https://i.pravatar.cc/150?img=4",
  },
  {
    name: "Sophia Martinez",
    role: "Project Manager",
    content:
      "Managing client appointments has become a breeze with MyCalend. It’s helped me stay on top of my schedule with ease.",
    image: "https://i.pravatar.cc/150?img=5",
  },
  {
    name: "Daniel Clark",
    role: "Fitness Trainer",
    content:
      "I love how MyCalend keeps my workout sessions organized and on time. My clients appreciate the seamless experience.",
    image: "https://i.pravatar.cc/150?img=6",
  },
  {
    name: "Jessica Lopez",
    role: "Therapist",
    content:
      "With MyCalend, booking therapy sessions has become so simple. It has truly enhanced my client's experience.",
    image: "https://i.pravatar.cc/150?img=7",
  },
  {
    name: "Chris Evans",
    role: "Software Developer",
    content:
      "MyCalend integrates perfectly with my workflow. Scheduling meetings with clients and teammates has never been this smooth.",
    image: "https://i.pravatar.cc/150?img=8",
  },
  {
    name: "Emma Green",
    role: "Real Estate Agent",
    content:
      "MyCalend makes organizing property viewings and client consultations incredibly easy. It’s a must-have tool in my line of work.",
    image: "https://i.pravatar.cc/150?img=9",
  },
  {
    name: "Robert Parker",
    role: "Consultant",
    content:
      "I was looking for a scheduling tool that was simple but powerful. MyCalend has exceeded my expectations in every way.",
    image: "https://i.pravatar.cc/150?img=10",
  },
  {
    name: "Olivia Patel",
    role: "Yoga Instructor",
    content:
      "MyCalend has made managing class schedules so much easier. My students love how simple it is to book sessions.",
    image: "https://i.pravatar.cc/150?img=11",
  },
  {
    name: "Ethan Walker",
    role: "Business Analyst",
    content:
      "I’ve been able to optimize my client meeting schedule and reduce no-shows with MyCalend. It’s been a fantastic tool!",
    image: "https://i.pravatar.cc/150?img=12",
  },
  {
    name: "Isabella Wright",
    role: "Photographer",
    content:
      "MyCalend has helped me streamline my booking process with clients. I’m more organized than ever before.",
    image: "https://i.pravatar.cc/150?img=13",
  },
  {
    name: "Liam Anderson",
    role: "College Professor",
    content:
      "Booking office hours with students has never been easier. MyCalend keeps everything organized for me.",
    image: "https://i.pravatar.cc/150?img=14",
  },
  {
    name: "Sophia Rivera",
    role: "Wedding Planner",
    content:
      "MyCalend takes all the stress out of organizing client meetings. I don’t know how I managed before using it!",
    image: "https://i.pravatar.cc/150?img=15",
  },
  {
    name: "James Morgan",
    role: "Life Coach",
    content:
      "Since switching to MyCalend, I’ve been able to manage client bookings effortlessly. It’s a fantastic tool for my business.",
    image: "https://i.pravatar.cc/150?img=16",
  },
  {
    name: "Ava Scott",
    role: "Interior Designer",
    content:
      "I can easily set up client meetings and consultations using MyCalend. It’s become a core part of how I run my business.",
    image: "https://i.pravatar.cc/150?img=17",
  },
  {
    name: "Henry Carter",
    role: "Accountant",
    content:
      "MyCalend has simplified my scheduling process. I can focus more on my work and less on managing appointments.",
    image: "https://i.pravatar.cc/150?img=18",
  },
  {
    name: "Amelia Mitchell",
    role: "Nutritionist",
    content:
      "With MyCalend, I can manage my clients’ appointments with ease. It has improved my workflow tremendously.",
    image: "https://i.pravatar.cc/150?img=19",
  },
  {
    name: "Lucas Perez",
    role: "Graphic Designer",
    content:
      "MyCalend keeps my design project meetings on track. It’s a great tool for any creative professional.",
    image: "https://i.pravatar.cc/150?img=20",
  },
];

const Testimonials = () => {
  return (
    <div>
      <Carousel
        className="mx-5"
        plugins={[
          Autoplay({
            delay: 4000,
          }),
        ]}
      >
        <CarouselContent className="">
          {testimonials.map((testimonial, index) => (
            <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
              <Card className="h-full">
                <CardContent className="flex flex-col items-center justify-between p-6">
                  <p className="text-gray-600 mb-2 text-center">
                    &quot;{testimonial.content}&quot;
                  </p>
                  <div className="flex items-center mt-4">
                    <Avatar className="h-16 w-16 mr-4">
                      <AvatarImage
                        src={testimonial.image}
                        alt={testimonial.name}
                        className="rounded-full"
                      />
                      <AvatarFallback>
                        {testimonial.name
                          .split(" ")
                          .map((n) => n[0])
                          .join(" ")}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-semibold">{testimonial.name}</p>
                      <p className="text-sm text-gray-500">
                        {testimonial.role}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
};

export default Testimonials;
