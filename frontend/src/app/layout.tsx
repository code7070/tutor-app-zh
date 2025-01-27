import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

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
      <body className={`${fontPrimary.variable} antialiased`}>{children}</body>
    </html>
  );
}
