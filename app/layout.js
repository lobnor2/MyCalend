import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/header";
import { ClerkProvider } from "@clerk/nextjs";
import CreateEventDrawer from "@/components/create-event";
import { Toaster } from "@/components/ui/toaster";

export const metadata = {
  title: "mycalend",
  description: "Meeting Scheduling App",
};
const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={inter.className}>
          {/* Header Component */}
          <Header />

          <main className="min-h-screen overflow-auto">{children}</main>

          {/* Footer Component */}
          <footer className="py-5 mb-14 md:mb-0">
            <div className="container mx-auto px-4 text-center text-gray-600">
              <p className="">Made by ©lobnor</p>
            </div>
          </footer>
          <CreateEventDrawer />
          <Toaster />
        </body>{" "}
      </html>
    </ClerkProvider>
  );
}
