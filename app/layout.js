import { Instrument_Serif, Inter_Tight } from "next/font/google";
import site from "@/content/site.json";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MotionProvider from "@/components/MotionProvider";
import "./globals.css";

const serif = Instrument_Serif({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
});

const inter = Inter_Tight({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata = {
  metadataBase: new URL("https://brightarc.example"),
  title: site.meta.title,
  description: site.meta.description,
  openGraph: {
    title: site.meta.title,
    description: site.meta.description,
    siteName: site.meta.siteName,
    locale: site.meta.locale,
    type: "website",
  },
};

export const viewport = {
  themeColor: "#16213e",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${serif.variable} ${inter.variable}`}>
      <body>
        <a className="skipLink" href="#main">
          {site.skipLink}
        </a>
        <Header />
        <main id="main">{children}</main>
        <Footer />
        <MotionProvider />
      </body>
    </html>
  );
}
