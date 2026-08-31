import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import { Environment } from "@/components/system/Environment";
import { AppShell } from "@/components/system/Shell/AppShell";
import "./globals.css";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Project Nexus — Genesis",
  description: "A cinematic engineering portfolio.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${poppins.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body
          className="min-h-full flex flex-col text-white overflow-hidden select-none"
          suppressHydrationWarning
        >
          <Environment />
          <AppShell>{children}</AppShell>
        </body>
    </html>
  );
}
