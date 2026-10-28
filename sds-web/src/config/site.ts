export const site = {
  name: "Sénégal Découpe Services",
  shortName: "SDS",
  url: "https://sds.sn",
  description:
    "Cuisines, dressings, meubles et aménagements intérieurs sur mesure, conçus et fabriqués au Sénégal.",
  // Digits only (wa.me format).
  whatsapp: "221773614745",
  phoneDisplay: "+221 77 361 47 45",
  address: {
    street: "Adresse à confirmer",
    city: "Dakar",
    country: "SN",
    countryName: "Sénégal",
  },
  hours: "Tous les jours, de 8h à 17h",
  opens: "08:00",
  closes: "17:00",
  locale: "fr_SN",
  social: {
    instagram: { handle: "senegal_decoupes_services_", url: "https://www.instagram.com/senegal_decoupes_services_/" },
    tiktok: { handle: "sngal.dcoupe.servi", url: "https://www.tiktok.com/@sngal.dcoupe.servi" },
  },
} as const;

const defaultWhatsAppMessage = "Bonjour SDS, je souhaite un devis pour un projet sur mesure.";

export function waLink(message: string = defaultWhatsAppMessage) {
  return `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(message)}`;
}

export const telLink = `tel:+${site.whatsapp}`;

export const nav = [
  { href: "/", label: "Accueil" },
  { href: "/catalogue/", label: "Catalogue" },
  { href: "/contact/", label: "Contact" },
] as const;
