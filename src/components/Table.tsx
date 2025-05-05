"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowRight, ExternalLink, Star } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import Link from "next/link";
import { Site } from "@/lib/definitions";
import type { Option } from "@/components/ui/multiselect";
import GithubStars from "@/components/GithubStars";

type Props = {
  title: string;
  icon?: React.ReactNode;
  type: string;
  selectedLanguages: Option[];
  selectedFrameworks: Option[];
  sortBy: "none" | "stars-desc" | "votes-desc";
};

export default function Table({ title, icon, type, selectedLanguages, selectedFrameworks, sortBy }: Props) {
  const [items, setItems] = useState<Site[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const params = new URLSearchParams();
        params.append("type", type);
        selectedFrameworks.forEach((fw) => params.append("frameworks", fw.label));
        selectedLanguages.forEach((lang) => params.append("languages", lang.label));
        const res = await fetch(`/api/sites?${params.toString()}`);
        if (!res.ok) throw new Error("Erreur lors du chargement des données");
        const data: Site[] = await res.json();
        setItems(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [type, selectedLanguages, selectedFrameworks]);

  const sortedItems = useMemo(() => {
    if (sortBy === "none") return items;
    return [...items].sort((a, b) => {
      if (sortBy === "stars-desc") {
        return (b.github_stars ?? 0) - (a.github_stars ?? 0);
      }
      if (sortBy === "votes-desc") {
        return (b.votes ?? 0) - (a.votes ?? 0);
      }
      return 0;
    });
  }, [items, sortBy]);

  return (
    <Card className="p-4 border border-gray-200 rounded-lg shadow-md h-108 relative">
      <div className="flex items-center justify-center space-x-2 text-lg font-semibold border-b pb-2">
        {icon} <span>{title}</span>
      </div>
      <ul className="space-y-1">
        {sortedItems.slice(0, 10).map((item, index) => (
          <li key={item.name} className="flex items-center justify-between text-sm border-b pb-1">
            <Tooltip>
              <TooltipTrigger>
                <Link href={"/" + item.name.replace(/[ \/]/g, "")} className="flex items-center space-x-2 hover:scale-105 hover:bg-free w-40">
                  <span className="text-gray-600">{index + 1}.</span>
                  <span className="flex items-center space-x-1 w-40">
                    <img src={"https://www.google.com/s2/favicons?sz=64&domain=" + item.link} alt={item.name} loading="lazy" width={16} height={16} />
                    <span>{item.name.length > 15 ? item.name.slice(0, 15) + "…" : item.name}</span>                    
                  </span>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right">
                <div className="flex flex-col space-y-1">
                  <div className="flex flex-row gap-1">
                    <img src={"https://www.google.com/s2/favicons?sz=64&domain=" + item.link} alt={item.name} loading="lazy" width={20} height={20} />
                    <span className="font-semibold">{item.name}</span>
                  </div>
                  <span className="text-xs">{item.description}</span>
                </div>
              </TooltipContent>
            </Tooltip>
            {item.github && (
            <div className="flex items-center space-x-1">
              <Star className="w-3 h-3 fill-[#F0B400] stroke-none ml-1" /> 
              <GithubStars key={item.name} item={item} className="w-16" />
            </div>)
            }
            <Link href={item.link} target="_blank" rel="noopener noreferrer">
              <ExternalLink className="w-4 h-4 text-gray-400 hover:text-gray-600" />
            </Link>
          </li>
        ))}
      </ul>
      <Link href={"/category/" + type.replace(/\s/g, "").toLowerCase()} className="absolute bottom-4 left-5 right-5">
        <Button variant="outline" className="w-full flex justify-between cursor-pointer">
          Voir toute la catégorie ({items.length}) <ArrowRight className="w-4 h-4" />
        </Button>
      </Link>
    </Card>
  );
}