import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Adrian Tan — Software Engineer",
  description: "Software engineer building thoughtful interfaces and connected digital experiences. Selected work by Adrian Tan.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
