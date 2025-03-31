"use client";

import { useState } from "react";
import { Label } from "@/components/ui/label";
import MultipleSelector, { Option } from "@/components/ui/multiselect";
import Table from "@/components/Table";
import items from "@/lib/items.json";

const allLanguages: Option[] = [
  { value: "front-end", label: "Front-end" },
  { value: "java", label: "Java" },
  { value: "php", label: "PHP" },
  { value: "python", label: "Python" },
]

const allFrameworks: Option[] = Array.from(
  new Set(items.flatMap((item) => item.frameworks || []))
).map((fw) => ({ value: fw.toLowerCase(), label: fw })).sort((a, b) => a.label.localeCompare(b.label));

export default function HomePage() {

    const [selectedLanguages, setSelectedLanguages] = useState<Option[]>([]);
    const [selectedFrameworks, setSelectedFrameworks] = useState<Option[]>([]);
  
    // Filtrer les items en fonction des sélections
    const filteredItems = items.filter((item) => {
      const hasLanguage =
        selectedLanguages.length === 0 ||
        selectedLanguages.some((lang) => item.languages?.map((l) => l.toLowerCase()).includes(lang.value));
  
      const hasFramework =
        selectedFrameworks.length === 0 ||
        item.frameworks?.length === 0 ||
        selectedFrameworks.some((fw) => item.frameworks?.map((f) => f.toLowerCase()).includes(fw.value));
  
      return hasLanguage && hasFramework;
    });
  return (
    <div className="min-h-screen bg-gray-100 p-6 space-y-4">
      <div className="flex gap-4 p-4 bg-white shadow-md rounded-lg">
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
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <Table title="Librairies UI" icon={<span>🖼️</span>} items={filteredItems.filter((item) => item.types.includes("UI Library"))} />
      </div>
    </div>
  );
}