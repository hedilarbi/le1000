import type { Metadata } from "next";

export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://le1000resto.com").replace(/\/$/, "");
export const SITE_NAME = "Le 1000 Resto Bar Relais";
export const SOCIAL_IMAGE = "/opengraph-image";

type PageMetadata = {
  title: string;
  description: string;
  path: string;
};

export function createPageMetadata({ title, description, path }: PageMetadata): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      locale: "fr_CA",
      siteName: SITE_NAME,
      title,
      description,
      url: path,
      images: [{ url: SOCIAL_IMAGE, width: 1200, height: 630, alt: SITE_NAME }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [SOCIAL_IMAGE],
    },
  };
}
