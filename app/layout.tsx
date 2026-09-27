import type { Metadata } from "next";
import "./globals.css";
export const metadata: Metadata = { title: "Rishi Kumar — AI/ML Engineer", description: "AI/ML and software portfolio of Rishi Kumar." };
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="en"><body>{children}</body></html>}