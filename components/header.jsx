import Link from "next/link";
import Image from "next/image";
import React from "react";
import { Button } from "./ui/button";
import { PenBox } from "lucide-react";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";

const Header = () => {
  return (
    <nav className="mx-auto py-2 px-4 flex justify-between items-center border-b-2">
      <Link href={"/"} className="flex items-center justify-center">
        <Image
          src="/logo1.png"
          width="100"
          height="100"
          alt="mycalend logo"
          className="h-16 w-auto"
        />
      </Link>
      <div className="flex gap-5">
        <Link href="/events?create=true">
          <Button size="lg">
            <PenBox size="16" className="mx-1" /> Create Event
          </Button>
        </Link>
        <SignedOut>
          <SignInButton forceRedirectUrl="/dashboard">
            <Button size="lg" variant="outline">
              Login
            </Button>
          </SignInButton>
        </SignedOut>
        <SignedIn>
          <UserButton />
        </SignedIn>
      </div>
    </nav>
  );
};

export default Header;
