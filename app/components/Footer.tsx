import { Mail, MapPin, Phone } from "lucide-react";
import { CONTACTS_LYCEE } from "@/lib/contacts-lycee";

export default function Footer() {
  return (
    <footer className="border-t border-bordure bg-fond">
      <div className="mx-auto flex max-w-5xl flex-col gap-2 px-4 py-8 text-sm text-texte-secondaire sm:px-6">
        <p className="font-semibold text-marine">Akieni College</p>

        <address className="flex flex-col not-italic sm:flex-row sm:flex-wrap sm:gap-x-8">
          <span className="flex min-h-11 items-center gap-2">
            <MapPin size={16} aria-hidden="true" />
            {CONTACTS_LYCEE.adresse}
          </span>
          <a href={CONTACTS_LYCEE.lienTelephone} className="flex min-h-11 items-center gap-2 hover:underline">
            <Phone size={16} aria-hidden="true" />
            {CONTACTS_LYCEE.telephone}
          </a>
          <a
            href={`mailto:${CONTACTS_LYCEE.email}`}
            className="flex min-h-11 items-center gap-2 hover:underline"
          >
            <Mail size={16} aria-hidden="true" />
            {CONTACTS_LYCEE.email}
          </a>
        </address>
      </div>
    </footer>
  );
}
