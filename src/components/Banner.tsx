"use client";

export function Banner() {
  return (
    <div className="fixed top-0 left-0 w-full bg-yellow-500 text-black z-50 h-9">
      <div className="max-w-7xl mx-auto flex items-center justify-center px-4 py-2 relative">
        <span className="text-sm font-medium">
          🚧 Site en construction – Merci de votre patience ! 🚧
        </span>
      </div>
    </div>
  );
}