import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { heroPhoto, metiers, selectedWorks } from "@/data/catalogue";

export const metadata: Metadata = {
  title: { absolute: "Cuisines et aménagements sur mesure au Sénégal | Sénégal Découpe Services" },
  alternates: { canonical: "/" },
};

const atelier = [
  {
    title: "Mesure",
    text: "Nous venons relever les cotes chez vous. Chaque meuble part des dimensions réelles de la pièce.",
  },
  {
    title: "Conception",
    text: "Plan, matériaux, finitions et quincaillerie : nous validons le projet ensemble avant la découpe.",
  },
  {
    title: "Fabrication locale",
    text: "Découpe et assemblage dans notre atelier au Sénégal, panneau par panneau.",
  },
  {
    title: "Pose",
    text: "Notre équipe installe, règle et vérifie chaque élément sur place.",
  },
];

const team = [
  {
    src: "/team/equipe-sds-01.jpg",
    alt: "L’équipe de Sénégal Découpe Services en gilets et casques de chantier, réunie autour de la banderole SDS",
  },
  {
    src: "/team/equipe-sds-02.jpg",
    alt: "Membres de l’équipe Sénégal Découpe Services posant avec la banderole de l’entreprise",
  },
];

export default function Home() {
  return (
    <>
      <section className="relative isolate flex h-svh max-h-[1000px] min-h-[600px] items-end overflow-hidden bg-ink text-white">
        <Image
          src={heroPhoto.src}
          alt={heroPhoto.alt}
          fill
          preload
          sizes="100vw"
          className="-z-10 object-cover object-[50%_60%]"
        />
        <div className="absolute inset-0 -z-10 bg-gradient-to-t from-ink via-ink/55 to-ink/30" aria-hidden="true" />
        <div className="mx-auto w-full max-w-7xl px-5 pt-32 pb-14 md:px-8 md:pb-20">
          <div className="max-w-3xl border-l-2 border-accent pl-5 md:pl-8">
            <h1 className="text-4xl leading-[1.05] font-semibold tracking-tight text-balance sm:text-5xl md:text-6xl lg:text-7xl">
              Cuisines et aménagements sur mesure, fabriqués au Sénégal
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-white/85 md:text-xl">
              Sénégal Découpe Services conçoit et fabrique des cuisines haut de gamme, des dressings, des meubles
              et des portes, pensés pour votre espace et posés par notre équipe.
            </p>
          </div>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:gap-4">
            <Link
              href="/catalogue/"
              className="inline-flex items-center justify-center rounded-xs border border-white/70 px-6 py-3.5 font-medium transition-colors hover:bg-white hover:text-ink"
            >
              Voir le catalogue
            </Link>
            <WhatsAppButton />
          </div>
        </div>
      </section>

      <section aria-labelledby="metiers" className="mx-auto max-w-7xl px-5 py-20 md:px-8 md:py-28">
        <h2 id="metiers" className="border-t border-ink pt-6 text-3xl font-semibold tracking-tight md:text-4xl">
          Nos métiers
        </h2>
        <ul className="mt-10 grid grid-cols-2 gap-x-4 gap-y-8 md:grid-cols-4 md:gap-x-6 md:gap-y-10">
          {metiers.map((m) => (
            <li key={m.title} className={m.wide ? "col-span-2" : ""}>
              <Link href={m.href} className="group block">
                <div className={`relative overflow-hidden bg-line ${m.wide ? "aspect-[8/5]" : "aspect-[4/5]"}`}>
                  <Image
                    src={m.cover.src}
                    alt=""
                    fill
                    sizes={m.wide ? "(min-width: 768px) 50vw, 100vw" : "(min-width: 768px) 25vw, 50vw"}
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                  />
                </div>
                <h3
                  className={`mt-3 border-b border-line pb-3 font-medium transition-colors group-hover:border-accent ${m.wide ? "text-xl md:text-2xl" : "text-base md:text-lg"}`}
                >
                  {m.title}
                </h3>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="atelier" className="bg-ink text-white">
        <div className="mx-auto grid max-w-7xl gap-12 px-5 py-20 md:grid-cols-[1fr_1.4fr] md:px-8 md:py-28">
          <div className="md:sticky md:top-28 md:self-start">
            <h2 id="atelier" className="text-3xl font-semibold tracking-tight md:text-4xl">
              De la mesure à la pose, un seul atelier
            </h2>
            <p className="mt-5 max-w-sm leading-relaxed text-white/70">
              Pas d’intermédiaire. Le même interlocuteur suit votre projet du premier rendez-vous à l’installation.
            </p>
          </div>
          <ol className="border-l border-white/20">
            {atelier.map((step) => (
              <li key={step.title} className="relative border-b border-white/10 py-8 pl-8 last:border-0 md:pl-12">
                <span className="absolute top-10 -left-px h-6 w-0.5 bg-accent" aria-hidden="true" />
                <h3 className="text-xl font-medium md:text-2xl">{step.title}</h3>
                <p className="mt-2 max-w-lg leading-relaxed text-white/70">{step.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section aria-labelledby="equipe">
        <div className="mx-auto max-w-7xl px-5 pt-20 md:px-8 md:pt-28">
          <h2 id="equipe" className="text-3xl font-semibold tracking-tight md:text-4xl">
            L’équipe
          </h2>
          <ul className="mt-10 grid gap-4 sm:grid-cols-2 md:gap-6">
            {team.map((p) => (
              <li key={p.src} className="relative aspect-[4/3] overflow-hidden bg-line">
                <Image src={p.src} alt={p.alt} fill sizes="(min-width: 640px) 50vw, 100vw" className="object-cover" />
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section aria-labelledby="realisations" className="py-20 md:py-28">
        <div className="mx-auto flex max-w-7xl items-end justify-between gap-6 px-5 md:px-8">
          <h2 id="realisations" className="text-3xl font-semibold tracking-tight md:text-4xl">
            Réalisations choisies
          </h2>
          <Link href="/catalogue/" className="shrink-0 border-b-2 border-accent pb-1 font-medium">
            Tout le catalogue
          </Link>
        </div>
        <ul className="mx-auto mt-10 flex max-w-7xl snap-x snap-mandatory scroll-px-5 gap-4 overflow-x-auto px-5 pb-4 md:grid md:grid-cols-3 md:gap-6 md:overflow-visible md:px-8 lg:grid-cols-6">
          {selectedWorks.map((p) => (
            <li key={p.src} className="w-[70vw] shrink-0 snap-start sm:w-[40vw] md:w-auto">
              <Link href="/catalogue/" className="block">
                <figure>
                  <div className="relative aspect-[3/4] overflow-hidden bg-line">
                    <Image src={p.src} alt={p.alt} fill sizes="(min-width: 1024px) 16vw, (min-width: 768px) 33vw, 70vw" className="object-cover" />
                  </div>
                  <figcaption className="mt-2 text-sm text-stone">{p.alt.split(",")[0]}</figcaption>
                </figure>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="devis" className="border-t-4 border-accent bg-paper">
        <div className="mx-auto flex max-w-7xl flex-col gap-8 px-5 py-16 md:flex-row md:items-center md:justify-between md:px-8 md:py-20">
          <h2 id="devis" className="max-w-2xl text-2xl font-semibold tracking-tight text-balance md:text-4xl">
            Un projet de cuisine ou d’aménagement&nbsp;? Envoyez-nous vos mesures ou une photo sur WhatsApp.
          </h2>
          <WhatsAppButton size="lg" className="shrink-0">
            Demander un devis
          </WhatsAppButton>
        </div>
      </section>
    </>
  );
}
