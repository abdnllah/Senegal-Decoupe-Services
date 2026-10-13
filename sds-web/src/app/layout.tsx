import type { Metadata, Viewport } from "next";
import { Geist } from "next/font/google";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { JsonLd } from "@/components/JsonLd";
import { site } from "@/config/site";
import { heroPhoto } from "@/data/catalogue";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "Cuisines et aménagements sur mesure au Sénégal | Sénégal Découpe Services",
    template: "%s | Sénégal Découpe Services",
  },
  description: site.description,
  applicationName: site.name,  openGraph: {
    type: "website",
    locale: site.locale,
    siteName: site.name,
    images: [{ url: heroPhoto.src, width: heroPhoto.width, height: heroPhoto.height, alt: heroPhoto.alt }],
  },
  twitter: { card: "summary_large_image" },
  icons: { icon: "/brand/logo.svg" },
};

export const viewport: Viewport = {
  themeColor: "#111111",
};

const businessLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "HomeAndConstructionBusiness",
      "@id": `${site.url}/#business`,
      name: site.name,
      alternateName: site.shortName,
      url: site.url,
      logo: `${site.url}/brand/logo.svg`,
      image: `${site.url}${heroPhoto.src}`,
      description: site.description,
      telephone: `+${site.whatsapp}`,
      address: {
        "@type": "PostalAddress",
        addressLocality: site.address.city,
        addressCountry: site.address.country,
      },
      areaServed: { "@type": "Country", name: site.address.countryName },
      openingHoursSpecification: {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
        opens: site.opens,
        closes: site.closes,
      },
      knowsAbout: [
        "Cuisines sur mesure",
        "Dressings",
        "Meubles TV",
        "Meubles de bureau",
        "Portes en aluminium",
        "Baies vitrées coulissantes",
        "Portes en bois laminé",
        "Revêtements muraux",
        "Cloisons",
        "Consoles et panneaux 3D",
        "Meubles de salle de bain",
      ],
    },
    {
      "@type": "Organization",
      "@id": `${site.url}/#organization`,
      name: site.name,
      url: site.url,
      logo: `${site.url}/brand/logo.svg`,
    },
    {
      "@type": "WebSite",
      "@id": `${site.url}/#website`,
      url: site.url,
      name: site.name,
      inLanguage: "fr",
      publisher: { "@id": `${site.url}/#organization` },
    },
  ],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="fr" className={`${geistSans.variable} antialiased`}>
      <body className="flex min-h-screen flex-col font-sans">
        <a
          href="#contenu"
          className="sr-only z-50 bg-accent px-4 py-2 text-white focus:not-sr-only focus:fixed focus:top-2 focus:left-2"
        >
          Aller au contenu
        </a>
        <Header />
        <main id="contenu" className="flex-1">
          {children}
        </main>
        <Footer />
        <JsonLd data={businessLd} />
      </body>
    </html>
  );
}
