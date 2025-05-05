"use client";

import { useEffect, useMemo, useState } from "react";
import { Label } from "@/components/ui/label";
import MultipleSelector, { Option } from "@/components/ui/multiselect";
import { Site } from "@/lib/definitions";
import ItemCard from "./ItemCard";
import { getTypeLabel } from "@/lib/utils";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";

const allLanguages: Option[] = [
  { value: "front-end", label: "Front-end" },
  { value: "java", label: "Java" },
  { value: "php", label: "PHP" },
  { value: "python", label: "Python" },
]

export default function Category({ type }: {type: string}) {
    const [sites, setSites] = useState<Site[]>([]);
    const [selectedLanguages, setSelectedLanguages] = useState<Option[]>([]);
    const [selectedFrameworks, setSelectedFrameworks] = useState<Option[]>([]);
    const [sortBy, setSortBy] = useState<"none" | "stars-desc" | "votes-desc">("none");

    useEffect(() => {
      async function fetchSites() {
        try {
            const params = new URLSearchParams();
            params.append("type", type);
            selectedFrameworks.forEach((fw) => params.append("frameworks", fw.label));
            selectedLanguages.forEach((lang) => params.append("languages", lang.label));
            const res = await fetch(`/api/sites?${params.toString()}`);
            const data = await res.json();
            setSites(data);
        } catch (error) {
            console.error("Erreur lors du chargement des sites", error);
        }
      }
  
      fetchSites();
    }, [selectedLanguages, selectedFrameworks]);

    const sortedSites = useMemo(() => {
      if (sortBy === "none") return sites;
      return [...sites].sort((a, b) => {
        if (sortBy === "stars-desc") {
          return (b.github_stars ?? 0) - (a.github_stars ?? 0);
        }
        if (sortBy === "votes-desc") {
          return (b.votes ?? 0) - (a.votes ?? 0);
        }
        return 0;
      });
    }, [sites, sortBy]);

    const allFrameworks: Option[] = Array.from(
      new Set(sites.flatMap((site) => site.frameworks || []))
    ).map((fw) => ({ value: fw.toLowerCase(), label: fw })).sort((a, b) => a.label.localeCompare(b.label));
  
  return (
    <div className="min-h-screen bg-gray-100 p-6 space-y-4 flex flex-col items-center">
      <h1 className="text-3xl font-bold flex justify-center mb-12 mt-6">Catégorie {getTypeLabel(type)}</h1>
      <div className="flex flex-col md:flex-row gap-4 p-4 bg-white shadow-md rounded-lg w-full xl:w-310">
        <div className="w-full md:w-1/2">
          <Label>Langages</Label>
          <MultipleSelector
            commandProps={{ label: "Sélectionner des langages" }}
            value={selectedLanguages}
            onChange={setSelectedLanguages}
            defaultOptions={allLanguages}
            placeholder="Sélectionner des langages"
            hidePlaceholderWhenSelected
            hideClearAllButton
            emptyIndicator={<p className="text-center text-sm">Aucun résultat</p>}
          />
        </div>
        <div className="w-full md:w-1/2">
          <Label>Frameworks</Label>
          { allFrameworks.length > 0 &&
          <MultipleSelector
            commandProps={{ label: "Sélectionner des frameworks" }}
            value={selectedFrameworks}
            onChange={setSelectedFrameworks}
            defaultOptions={allFrameworks}
            placeholder="Sélectionner des frameworks"
            hidePlaceholderWhenSelected
            hideClearAllButton
            emptyIndicator={<p className="text-center text-sm">Aucun résultat</p>}
          />
        }
        </div>
        <div className="w-full md:w-1/2">
          <Label>Trier par</Label>
          <Select value={sortBy} onValueChange={(v) => setSortBy(v as any)}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Trier par" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="none">Par défaut</SelectItem>
              <SelectItem value="stars-desc">Etoiles Github</SelectItem>
              <SelectItem value="votes-desc">Votes</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 w-full xl:w-310">
        {sortedSites.map((site) => (
          <ItemCard site={site} key={site.name} />    
        ))}
      </div>
    </div>
  );
}