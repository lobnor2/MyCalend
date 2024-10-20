import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/header";
import { ClerkProvider } from "@clerk/nextjs";
import CreateEventDrawer from "@/components/create-event";

export const metadata = {
  title: "mycalend",
  description: "Meeting Scheduling App",
};
const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en">
        {/* Header Component */}
        <body className={inter.className}>
          {/* Header Component */}
          <Header />

          <main className="min-h-screen">{children}</main>

          {/* Footer Component */}
          <footer className="py-12 border border-gray-200">
            <div className="container mx-auto px-4 text-center text-gray-600">
              <p>Made by lobnor</p>
            </div>
          </footer>
          <CreateEventDrawer />
        </body>{" "}
      </html>
    </ClerkProvider>
  );
}
