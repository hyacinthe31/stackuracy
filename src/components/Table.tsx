"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowRight, ExternalLink, Star } from "lucide-react";
import items from "@/lib/items.json";
import { getGithubStars } from "@/lib/github";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import Link from "next/link";

type Props = {
  title: string;
  icon?: React.ReactNode;
  items: typeof items;
};

export default function Table({ title, icon, items }: Props) {

  return (
    <Card className="p-4 w-[300px] space-y-2 border border-gray-200 rounded-lg shadow-md">
      <div className="flex items-center justify-center space-x-2 text-lg font-semibold border-b pb-2">
        {icon} <span>{title}</span>
      </div>
      <ul className="space-y-1">
        {items.slice(0, 10).map((item, index) => (
          <li key={item.name} className="flex items-center justify-between text-sm">
            <Tooltip>
              <TooltipTrigger>
                <Link href={"/" + item.name.replace(/ /g, '')} className="flex items-center space-x-2 hover:scale-105 hover:bg-free">
                  <span className="text-gray-600">{index + 1}.</span>
                  <span className="flex items-center space-x-1 w-32">
                    <img src={"https://www.google.com/s2/favicons?sz=64&domain=" + item.link} alt={item.name} loading="lazy" width={16} height={16} />
                    <span>{item.name}</span>                    
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
            <ProjectItem key={item.name} item={item} />
            <Link href={item.link} target="_blank" rel="noopener noreferrer">
              <ExternalLink className="w-4 h-4 text-gray-400 hover:text-gray-600" />
            </Link>
          </li>
        ))}
      </ul>
      <Button variant="outline" className="w-full flex justify-between">
        Voir toute la catégorie (204) <ArrowRight className="w-4 h-4" />
      </Button>
    </Card>
  );
}

function ProjectItem({ item }: { item: any; }) {
    const [stars, setStars] = useState<number | null>(null);
  
    useEffect(() => {
      if (item.github) {
        getGithubStars(item.github).then(setStars);
      }
    }, [item.github]);
  
    return (
        <>
            {stars !== null ? (
              <span className="flex items-center text-gray-500 text-xs w-16">
                <Star className="w-3 h-3 fill-[#F0B400] stroke-none ml-1" /> {formatStars(stars)}
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