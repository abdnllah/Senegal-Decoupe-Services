import type { Metadata } from "next";
import Image from "next/image";
import { JsonLd } from "@/components/JsonLd";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { site, telLink } from "@/config/site";
import { photo } from "@/data/catalogue";

export const metadata: Metadata = {
  title: "Contact et devis WhatsApp",
  description:
    "Demandez un devis pour votre cuisine, dressing ou aménagement sur mesure : écrivez ou appelez Sénégal Découpes Services sur WhatsApp.",
  alternates: { canonical: "/contact/" },
  openGraph: { url: "/contact/" },
};

const ld = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Accueil", item: `${site.url}/` },
    { "@type": "ListItem", position: 2, name: "Contact", item: `${site.url}/contact/` },
  ],
};

const side = photo("cuisine-americaine", 45);

export default function ContactPage() {
  return (
    <div className="mx-auto grid max-w-7xl gap-12 px-5 pt-12 pb-20 md:grid-cols-[1.2fr_1fr] md:gap-16 md:px-8 md:pt-20 md:pb-28">
      <div>
        <h1 className="text-4xl font-semibold tracking-tight text-balance md:text-6xl">
          Parlons de votre projet sur WhatsApp
        </h1>
        <p className="mt-6 max-w-lg text-lg leading-relaxed text-stone">
          Devis, prise de rendez-vous pour la mesure ou simple question&nbsp;: écrivez-nous ou appelez-nous directement.
          Joignez une photo de la pièce ou d’un modèle du catalogue, nous vous répondons avec une estimation.
        </p>

        <div className="mt-10 flex flex-col items-start gap-4">
          <WhatsAppButton size="lg">Appeler / écrire sur WhatsApp</WhatsAppButton>
          <a href={telLink} className="border-b border-ink pb-0.5 text-lg hover:border-accent hover:text-accent">
            Appel classique&nbsp;: {site.phoneDisplay}
          </a>
        </div>

        <dl className="mt-14 grid max-w-lg gap-6 border-t border-line pt-8 sm:grid-cols-2">
          <div>
            <dt className="text-xs font-medium tracking-widest text-stone uppercase">Adresse</dt>
            <dd className="mt-2">
              {site.address.street}
              <br />
              {site.address.city}, {site.address.countryName}
            </dd>
          </div>
          <div>
            <dt className="text-xs font-medium tracking-widest text-stone uppercase">Horaires</dt>
            <dd className="mt-2">{site.hours}</dd>
          </div>
        </dl>
      </div>

      <div className="relative hidden aspect-[4/5] overflow-hidden bg-line md:block">
        <Image src={side.src} alt={side.alt} fill sizes="40vw" className="object-cover" />
      </div>
      <JsonLd data={ld} />
    </div>
  );
}
