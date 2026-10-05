import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import LenisProvider from "@/components/LenisProvider";
import CustomCursor from "@/components/CustomCursor";
import Preloader from "@/components/Preloader";
import { AntigravityEffect } from "@/components/animations/AntigravityEffect";

import LayoutWrapper from "@/components/LayoutWrapper";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-geist-sans",
});

export const metadata: Metadata = {
  title: "Outsmart Technology | Custom Software & AI Development Company Noida",
  description: "Top enterprise software development agency in Noida specializing in custom SaaS, AI automation, and scalable mobile apps. We build technology that solves complex business challenges.",
  keywords: ["Custom Software Development Noida", "AI Automation Solutions", "Enterprise SaaS Development Noida", "Mobile App Developers Noida", "Top Tech Agency India", "B2B Software Company", "Local SEO Company Noida"],
  alternates: {
    canonical: "https://outsmarttechnology.com",
  },
  openGraph: {
    title: "Outsmart Technology | Custom Software & AI Development",
    description: "Enterprise software development agency in Noida specializing in custom SaaS, AI automation, and scalable mobile apps.",
    url: "https://outsmarttechnology.com",
    siteName: "Outsmart Technology",
    locale: "en_IN",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "LocalBusiness",
              "name": "Outsmart Technology",
              "image": "https://outsmarttechnology.com/logo.png",
              "@id": "https://outsmarttechnology.com",
              "url": "https://outsmarttechnology.com",
              "telephone": "+91-9599-34-2525",
              "priceRange": "$$",
              "description": "Enterprise software development agency specializing in custom SaaS, AI automation, and mobile apps in Noida.",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "111, F-Block, Sector 8",
                "addressLocality": "Noida",
                "addressRegion": "U.P.",
                "postalCode": "201301",
                "addressCountry": "India"
              },
              "geo": {
                "@type": "GeoCoordinates",
                "latitude": 28.5959,
                "longitude": 77.3275
              },
              "openingHoursSpecification": {
                "@type": "OpeningHoursSpecification",
                "dayOfWeek": [
                  "Monday",
                  "Tuesday",
                  "Wednesday",
                  "Thursday",
                  "Friday"
                ],
                "opens": "09:00",
                "closes": "18:00"
              },
              "sameAs": [
                "https://www.linkedin.com/company/outsmarttechnology"
              ]
            })
          }}
        />
      </head>
      <body
        className={`${inter.variable} antialiased`}
        suppressHydrationWarning
      >
        <Preloader />
        <LenisProvider>
          <CustomCursor />
          <AntigravityEffect />
          <LayoutWrapper>
            {children}
          </LayoutWrapper>
        </LenisProvider>
      </body>
    </html>
  );
}
