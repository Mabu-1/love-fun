import { Baloo_2, Quicksand } from "next/font/google";
import "./globals.css";
import { LoveProvider } from "./LoveContext";

const display = Baloo_2({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
});

const body = Quicksand({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata = {
  title: "will you go on a date with me? 💌",
  description: "a very chaotic, very fun invitation",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${display.variable} ${body.variable} antialiased`}>
        <div className="chaos-bg">
          <span></span>
          <span></span>
          <span></span>
          <span></span>
        </div>
        <LoveProvider>{children}</LoveProvider>
      </body>
    </html>
  );
}
