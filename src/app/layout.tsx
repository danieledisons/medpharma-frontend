import React from "react";
import { AuthProvider } from "../context/AuthContext";
import { Libre_Baskerville } from "@next/font/google";

const libreBaskerville = Libre_Baskerville({
  weight: ["400", "700"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  display: "swap",
});

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={libreBaskerville.className}>
      <body>{children}</body>
    </html>
  );
}
