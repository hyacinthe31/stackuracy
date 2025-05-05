import Link from "next/link";
import { Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-logo-dark text-white py-8">
      <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between space-y-6 md:space-y-0">
        {/* Logo + nom */}
        <Link href="/" className="flex items-center space-x-2">
          {/* <img src="/stackuracy_logo_only.avif" alt="Stackuracy" className="h-8 w-auto mix-blend-color-burn" /> */}
          <span className="text-xl font-bold">Stackuracy</span>
        </Link>

        {/* Liens de navigation */}
        <nav className="flex flex-wrap justify-center gap-4">
          <Link href="/" className="hover:underline">
            Accueil
          </Link>
          <Link href="/about" className="hover:underline">
            À propos
          </Link>
          <Link href="/contact" className="hover:underline">
            Contact
          </Link>
        </nav>

        {/* Réseaux sociaux / contact */}
        <div className="flex items-center space-x-4">
          <Link
            href="mailto:contact@stackuracy.com"
            className="hover:opacity-80 transition"
          >
            <Mail className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </footer>
  );
}