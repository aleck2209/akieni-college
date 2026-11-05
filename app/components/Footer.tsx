
import {
  MapPin,
  Phone,
  Mail,
  MessageCircle,
} from "lucide-react";

export default function Footer() {
  return (
    <footer className="mt-auto border-t border-slate-200 bg-white">
      <div className="w-full px-6 py-8">

        <div className="grid grid-cols-1 gap-8 text-center md:grid-cols-3">

          {/* Adresse */}
          <div>
            <h3 className="mb-3 font-semibold text-slate-800">
              Notre adresse
            </h3>
            <div className="flex items-center justify-center gap-2 text-sm text-slate-500">
              <MapPin size={17} />
              Bacongo
            </div>
          </div>

          {/* Téléphone et email */}
          <div>
            <h3 className="mb-3 font-semibold text-slate-800">
              Contact
            </h3>

            <div className="mb-2 flex items-center justify-center gap-2 text-sm text-slate-500">
              <Phone size={17} />
              <a href="tel:065533804" className="hover:text-blue-600">
                065533804
              </a>
            </div>

            <div className="flex items-center justify-center gap-2 text-sm text-slate-500">
              <Mail size={17} />
              <a
                href="mailto:mbamahonore15@gmail.com"
                className="hover:text-blue-600"
              >
                mbamahonore15@gmail.com
              </a>
            </div>
          </div>

          {/* Réseaux sociaux */}
          <div>
            <h3 className="mb-3 font-semibold text-slate-800">
              Suivez-nous
            </h3>

            <div className="flex items-center justify-center gap-5">

              <a
                href="https://wa.me/242065533804"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
                className="text-green-500 transition hover:scale-110"
              >
                <MessageCircle size={25} />
              </a>

              <a
                href="https://www.facebook.com/akieni-college-demo"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="text-blue-600 transition hover:scale-110"
              >
                <span className="text-xl font-bold">f</span>
              </a>

              <a
                href="https://www.linkedin.com/company/akieni-college-demo/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="text-sky-700 transition hover:scale-110"
              >
                <span className="text-lg font-bold">in</span>
              </a>

            </div>
          </div>

        </div>

        <div className="mt-8 border-t border-slate-200 pt-5 text-center text-sm text-slate-500">
          © {new Date().getFullYear()} Akieni College.
          Tous droits réservés.
        </div>

      </div>
    </footer>
  );
}


