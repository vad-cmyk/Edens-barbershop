import type { Metadata } from "next";
import "./globals.css";
import { cormorant, archivo } from "./fonts";
import CustomCursor from "@/components/CustomCursor";
import LoadingScreen from "@/components/LoadingScreen";
import SmoothScroll from "@/components/SmoothScroll";

export const metadata: Metadata = {
  // TODO: replace with your production domain once deployed
  metadataBase: new URL("https://edens-barbershop.vercel.app"),
  title: "EDENS — Barbershop & Tattoo Studio | Wymondham, UK",
  description:
    "EDENS is Wymondham's quietly refined barbershop and tattoo studio. With over 20 years of combined experience, our team provides exceptional cuts, fades, and tattoo work in a welcoming environment.",
  keywords: [
    "barbershop",
    "barber",
    "Wymondham",
    "Norfolk",
    "UK",
    "haircut",
    "skin fade",
    "tattoo",
    "EDENS",
    "men's grooming",
    "beard trim",
  ],
  authors: [{ name: "EDENS" }],
  openGraph: {
    type: "website",
    locale: "en_GB",
    title: "EDENS — Barbershop & Tattoo Studio | Wymondham",
    description:
      "Wymondham's quietly refined barbershop. Twenty years of craft.",
    siteName: "EDENS",
    images: [
      {
        url: "/images/504562859_18047550272575605_199543636622676739_n.jpg",
        width: 1200,
        height: 630,
        alt: "EDENS Barbershop — Wymondham, UK",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "EDENS — Barbershop & Tattoo Studio | Wymondham",
    description:
      "Wymondham's quietly refined barbershop. Twenty years of craft.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

// LocalBusiness structured data
const structuredData = {
  "@context": "https://schema.org",
  "@type": "HairSalon",
  name: "EDENS",
  description:
    "EDENS is Wymondham's premier barbershop and tattoo studio, offering precision haircuts, skin fades, beard services, and tattoo consultations.",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Unit 5, Acorn Court",
    addressLocality: "Wymondham",
    postalCode: "NR18 9AL",
    addressCountry: "GB",
  },
  telephone: "07824697164",
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "10:00",
      closes: "18:30",
    },
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: "Saturday",
      opens: "09:00",
      closes: "16:30",
    },
  ],
  sameAs: [
    "https://instagram.com/lewiscowdrycuts_",
    "https://instagram.com/barber.rt_",
    "https://instagram.com/oliblacktattoo",
  ],
  priceRange: "££",
  currenciesAccepted: "GBP",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${archivo.variable}`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </head>
      <body className="bg-bone text-near-black antialiased overflow-x-hidden">
        <LoadingScreen />
        <CustomCursor />
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
