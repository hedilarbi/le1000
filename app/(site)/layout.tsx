import { CustomCursor } from "@/app/components/custom-cursor";
import { SiteFooter } from "@/app/components/site-footer";
import { SiteHeader } from "@/app/components/site-header";
import { SITE_NAME, SITE_URL, SOCIAL_IMAGE } from "@/app/lib/seo";

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

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(restaurantJsonLd).replace(/</g, "\\u003c") }}
      />
      <CustomCursor />
      <SiteHeader />
      {children}
      <SiteFooter />
    </>
  );
}
