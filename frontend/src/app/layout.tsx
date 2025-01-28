import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";

const fontPrimary = Plus_Jakarta_Sans({
  variable: "--font-primary",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Tutor App",
  description:
    "Appointment leading platform for your learning the world -- Take Home Test Zora Health",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${fontPrimary.variable} antialiased`}>
        {children}
        <Toaster
          position="top-center"
          toastOptions={{
            classNames: {
              error: "bg-red-600 text-white border-transparent text-sm",
              success: "bg-green-600 text-white border-transparent text-sm",
              warning: "bg-yellow-600 text-white border-transparent text-sm",
              info: "bg-blue-600 text-white border-transparent text-sm",
              default: "bg-gray-600 text-white border-transparent text-sm",
            },
          }}
        />
      </body>
    </html>
  );
}
