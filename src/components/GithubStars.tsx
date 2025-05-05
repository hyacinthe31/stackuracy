import { Site } from "@/lib/definitions";
import { getGithubStars } from "@/lib/github";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

export default function GithubStars({ item, className }: { item: Site, className?: string; }) {
    const [stars, setStars] = useState<number | null>(null);
  
    useEffect(() => {
      if (item.github) {
        setStars(item.github_stars);
      }
    }, [item.github]);
  
    return (
        <>
            {stars !== null ? (
              <span className={cn("flex items-center text-gray-500 text-xs", className)}>
                {formatStars(stars)}
              </span>
            ) : ( item.github &&
              <span className="w-4 h-3 bg-gray-200 animate-pulse rounded-sm"></span>
            )}
        </>
    );
}

function formatStars(stars: number): string {
    return stars >= 1000 ? (stars / 1000).toFixed(1) + "K" : stars.toString();
}