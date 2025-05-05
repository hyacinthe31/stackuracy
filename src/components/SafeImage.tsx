"use client";

import { useState } from "react";

interface SafeImgProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  /** Chemin de l’image */
  src: string;
  /** Texte alternatif */
  alt: string;
  /** Classe Tailwind pour le fallback et l’image */
  className?: string;
  loading?: "lazy" | "eager" | undefined;
}

/**
 * SafeImage : affiche une <img> et, si elle échoue,
 * rend un div blanc avec bordure et même gabarit.
 */
export function SafeImage({ src, alt, className = "", style, loading, ...rest }: SafeImgProps) {
  const [errored, setErrored] = useState(false);

  if (errored) {
    return (
        <div className={`bg-white border shadow-md w-full h-[200] lg:w-[600px] lg:h-[289px] flex items-center justify-center`} >
            <span className="text-gray-500 text-sm">Image bientôt ajoutée</span>
        </div>
    );
  }

  return (
    <img
        src={src}
        alt={alt}
        className={className}
        style={style}
        loading={loading}
        onError={() => setErrored(true)}
        width={600}
        height={289}
        {...rest}
    />
  );
}