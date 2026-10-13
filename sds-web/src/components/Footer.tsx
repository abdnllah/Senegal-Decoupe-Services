import Link from "next/link";
import { nav, site, telLink, waLink } from "@/config/site";
import { Logo } from "./Logo";

export function Footer() {
  return (
    <footer className="bg-ink text-white/80">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-14 md:grid-cols-[1.5fr_1fr_1fr] md:px-8">
        <div>
          <Logo className="h-12 w-auto text-white" />
          <p className="mt-5 max-w-sm text-sm leading-relaxed">
            Cuisines, dressings, meubles et aménagements sur mesure, conçus et fabriqués au Sénégal.
          </p>
        </div>
        <nav aria-label="Pied de page">
          <h2 className="text-xs font-medium tracking-widest text-white/50 uppercase">Pages</h2>
          <ul className="mt-4 space-y-2 text-sm">
            {nav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="hover:text-white">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div>
          <h2 className="text-xs font-medium tracking-widest text-white/50 uppercase">Contact</h2>
          <ul className="mt-4 space-y-2 text-sm">
            <li>
              <a href={waLink()} target="_blank" rel="noopener noreferrer" className="hover:text-white">
                WhatsApp
              </a>
            </li>
            <li>
              <a href={telLink} className="hover:text-white">
                {site.phoneDisplay}
              </a>
            </li>
            <li>
              {site.address.city}, {site.address.countryName}
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-5 py-6 text-xs text-white/50 sm:flex-row sm:justify-between md:px-8">
          <p>
            © {new Date().getFullYear()} {site.name}
            <span className="mt-1 block">Note&nbsp;: Certaines images sont présentées à titre de référence visuelle uniquement.</span>
          </p>
          <p>Developed by eien</p>
        </div>
      </div>
    </footer>
  );
}
