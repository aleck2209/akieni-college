import { Mail, MapPin, Phone } from "lucide-react";

// Coordonnées fictives du lycée (prompt de la maquette).
export default function Footer() {
  return (
    <footer className="border-t border-bordure bg-fond">
      <div className="mx-auto flex max-w-5xl flex-col gap-2 px-4 py-8 text-sm text-texte-secondaire sm:px-6">
        <p className="font-semibold text-marine">Akieni College</p>

        <address className="flex flex-col not-italic sm:flex-row sm:flex-wrap sm:gap-x-8">
          <span className="flex min-h-11 items-center gap-2">
            <MapPin size={16} aria-hidden="true" />
            Avenue des Écoles, Bacongo, Brazzaville
          </span>
          <a href="tel:+242060000000" className="flex min-h-11 items-center gap-2 hover:underline">
            <Phone size={16} aria-hidden="true" />
            +242 06 000 00 00
          </a>
          <a
            href="mailto:contact@akieni-college.test"
            className="flex min-h-11 items-center gap-2 hover:underline"
          >
            <Mail size={16} aria-hidden="true" />
            contact@akieni-college.test
          </a>
        </address>
      </div>
    </footer>
  );
}
