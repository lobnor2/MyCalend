import Link from "next/link";
import Image from "next/image";
import React from "react";
import { Button } from "./ui/button";
import { PenBox } from "lucide-react";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import UserMenu from "./user-menu";
import { checkUser } from "@/lib/checkUser";

const Header = async () => {
  await checkUser();
  return (
    <nav className="mx-auto py-2 md:py-4 px-4 flex justify-between items-center border-b-2 shadow-md">
      <Link href={"/"} className="flex items-center justify-center">
        <Image
          src="/logo1.png"
          width="100"
          height="100"
          alt="mycalend logo"
          className="h-11 w-auto md:h-16"
        />
      </Link>
      <div className="flex gap-5 items-center">
        <Link href="/events?create=true">
          <Button className="h-8 md:h-11">
            <PenBox size="16" className="mx-1" />
            Create Event
          </Button>
        </Link>
        <SignedOut>
          <SignInButton forceRedirectUrl="/dashboard">
            <Button size="lg" variant="outline" className="h-8 md:h-11">
              Login
            </Button>
          </SignInButton>
        </SignedOut>
        <SignedIn>
          <UserMenu />
          {/* <UserButton /> */}
        </SignedIn>
      </div>
    </nav>
  );
};

export default Header;
