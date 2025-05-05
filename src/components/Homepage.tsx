"use client";

import { useEffect, useState } from "react";
import { Label } from "@/components/ui/label";
import MultipleSelector, { Option } from "@/components/ui/multiselect";
import Table from "@/components/Table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Site } from "@/lib/definitions";

const allLanguages: Option[] = [
  { value: "front-end", label: "Front-end" },
  { value: "java", label: "Java" },
  { value: "php", label: "PHP" },
  { value: "python", label: "Python" },
]

type SortBy = "none" | "stars-desc" | "votes-desc";

// const allFrameworks: Option[] = [
//   { value: "react", label: "React" },
//   { value: "vuejs", label: "Vue.js" },
// ]

export default function HomePage() {
    const [sites, setSites] = useState<Site[]>([]);
    const [selectedLanguages, setSelectedLanguages] = useState<Option[]>([]);
    const [selectedFrameworks, setSelectedFrameworks] = useState<Option[]>([]);
    const [sortBy, setSortBy] = useState<SortBy>("none");

    useEffect(() => {
      async function fetchSites() {
        try {
          const res = await fetch("/api/sites");
          const data = await res.json();
          setSites(data);
        } catch (error) {
          console.error("Erreur lors du chargement des sites", error);
        }
      }
  
      fetchSites();
    }, []);

    const allFrameworks: Option[] = Array.from(
      new Set(sites.flatMap((site) => site.frameworks || []))
    ).map((fw) => ({ value: fw.toLowerCase(), label: fw })).sort((a, b) => a.label.localeCompare(b.label));
  
  return (
    <div className="min-h-screen bg-gray-100 p-6 space-y-4 flex flex-col items-center">
      <h1 className="text-3xl font-bold flex justify-center mb-12 mt-6">Liste outils développeurs</h1>
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
          <Select value={sortBy} onValueChange={(v: SortBy) => setSortBy(v)}>
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
        <Table title="Librairies UI" icon={<span>🖼️</span>} type="UI Library" selectedLanguages={selectedLanguages} selectedFrameworks={selectedFrameworks} sortBy={sortBy} />
        <Table title="Authentification" icon={<span>🖼️</span>} type="Authentication" selectedLanguages={selectedLanguages} selectedFrameworks={selectedFrameworks} sortBy={sortBy} />
        <Table title="ORM" icon={<span>🖼️</span>} type="ORM" selectedLanguages={selectedLanguages} selectedFrameworks={selectedFrameworks} sortBy={sortBy} />
        <Table title="Visualisation de données" icon={<span>🖼️</span>} type="data visualization" selectedLanguages={selectedLanguages} selectedFrameworks={selectedFrameworks} sortBy={sortBy} />
        <Table title="test & QA" icon={<span>🖼️</span>} type="testing" selectedLanguages={selectedLanguages} selectedFrameworks={selectedFrameworks} sortBy={sortBy} />
      </div>
    </div>
  );
}