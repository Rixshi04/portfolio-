import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Rishi Kumar — Machine Learning Engineer",
  description:
    "Portfolio of Rishi Kumar, a Machine Learning Engineer focused on AI, computer vision, data-driven applications, and software engineering.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
