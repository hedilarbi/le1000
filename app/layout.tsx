import type { Metadata } from "next";
import { Bebas_Neue, Montserrat, Teko } from "next/font/google";
import { SiteFooter } from "@/app/components/site-footer";
import { SiteHeader } from "@/app/components/site-header";
import { CustomCursor } from "@/app/components/custom-cursor";
import { SITE_NAME, SITE_URL, SOCIAL_IMAGE } from "@/app/lib/seo";
import "./globals.css";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  display: "swap",
});

const teko = Teko({
  variable: "--font-teko",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const bebasNeue = Bebas_Neue({
  variable: "--font-bebas-neue",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Le 1000 Resto Bar Relais | Restaurant à Trois-Rivières",
    template: "%s | Le 1000 Resto Bar Relais",
  },
  description:
    "Restaurant et resto-bar à Trois-Rivières : cuisine bistro, grillades, pizzas, cocktails, terrasse et ambiance sportive au 1000 montée Sainte-Marthe.",
  applicationName: SITE_NAME,
  keywords: [
    "restaurant Trois-Rivières",
    "resto bar Trois-Rivières",
    "restaurant Sainte-Marthe-du-Cap",
    "Le 1000 Resto Bar Relais",
    "restaurant terrasse Trois-Rivières",
    "cuisine bistro",
  ],
  authors: [{ name: SITE_NAME }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  category: "restaurant",
  alternates: { canonical: "/" },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "fr_CA",
    url: "/",
    siteName: SITE_NAME,
    title: "Le 1000 Resto Bar Relais | Restaurant à Trois-Rivières",
    description: "Cuisine bistro, grillades, pizzas, cocktails et ambiance sportive à Trois-Rivières.",
    images: [{ url: SOCIAL_IMAGE, width: 1200, height: 630, alt: SITE_NAME }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Le 1000 Resto Bar Relais | Restaurant à Trois-Rivières",
    description: "Cuisine bistro, grillades, pizzas, cocktails et ambiance sportive à Trois-Rivières.",
    images: [SOCIAL_IMAGE],
  },
};

const restaurantJsonLd = {
  "@context": "https://schema.org",
  "@type": "Restaurant",
  "@id": `${SITE_URL}/#restaurant`,
  name: SITE_NAME,
  url: SITE_URL,
  image: `${SITE_URL}${SOCIAL_IMAGE}`,
  logo: `${SITE_URL}/Le1000_Logo.png`,
  telephone: "+1-819-697-1214",
  email: "info@le1000resto.com",
  address: {
    "@type": "PostalAddress",
    streetAddress: "1000 montée Sainte-Marthe",
    addressLocality: "Trois-Rivières",
    addressRegion: "QC",
    postalCode: "G8V 2P7",
    addressCountry: "CA",
  },
  servesCuisine: ["Cuisine bistro", "Grillades", "Pizza", "Poutine"],
  menu: `${SITE_URL}/menu`,
  sameAs: [
    "https://www.instagram.com/le1000restobarrelais/",
    "https://www.facebook.com/profile.php?id=61576957533585",
  ],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="fr"
      className={`${montserrat.variable} ${teko.variable} ${bebasNeue.variable}`}
    >
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(restaurantJsonLd).replace(/</g, "\\u003c") }}
        />
        <CustomCursor />
        <SiteHeader />
        {children}
        <SiteFooter />
      </body>
    </html>
  );
}
