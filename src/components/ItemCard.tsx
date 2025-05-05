"use client";

import { useEffect, useState } from "react";
import { Card } from "./ui/card";
import Link from "next/link";
import GithubStars from "./GithubStars";
import { ExternalLink, ThumbsUp } from "lucide-react";
import { Site } from "@/lib/definitions";

export default function ItemCard({ site }: {site : Site}) {
    const [votes, setVotes] = useState(site.votes);
    const [currentVoted, setCurrentVoted] = useState(false);

    const localKey = `voted-${site.name}`;

    useEffect(() => {
        setCurrentVoted(localStorage.getItem(localKey) === "true");
      }, []);

    const handleVote = async () => {
        try {
            const currentVoted = localStorage.getItem(localKey) === "true";
            const res = await fetch("/api/vote", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ siteName: site.name, action: currentVoted ? "downvote" : "upvote" }),
            });

            if (!res.ok) throw new Error("Erreur lors du vote");

            const data = await res.json();
            setVotes(data.votes);

            if (currentVoted) {
                localStorage.removeItem(localKey);
                setCurrentVoted(false);
              } else {
                localStorage.setItem(localKey, "true");
                setCurrentVoted(true);
              }
        } catch (error) {
            console.error(error);
        }
        };

    return (
      <Card className="shadow-md hover:shadow-xl duration-200">        
        <div className="flex flex-col items-center px-4 gap-4">
          <Link href={"/" + site.name.replace(/[ \/]/g, "")}>
            <div className="flex flex-col items-center px-4 gap-4">
              <h1 className="text-xl flex gap-1 items-center"><img src={"https://www.google.com/s2/favicons?sz=64&domain=" + site.link} alt={site.name} loading="lazy" width={20} height={20} className="w-6 h-6"/>{site.name.length > 15 ? site.name.slice(0, 15) + "…" : site.name}</h1>
              <p className="text-sm h-32">{site.description}</p>
            </div>
          </Link>
          <div className="flex gap-2 mb-4">
            <button onClick={handleVote} className={`group flex items-center gap-1 px-2 py-2 transition cursor-pointer ${currentVoted ? "text-green-600" : "text-gray-500 hover:text-primary"}`}>
                <ThumbsUp className={`w-5 h-5 transition-all duration-150 ${currentVoted ? " stroke-green-600" : "group-hover:stroke-primary"}`} /> {votes}
            </button>
            {site.github && (
            <a href={site.github} target="_blank" rel="noopener" className="flex items-center gap-1 px-4 py-2 hover:scale-105 duration-100">
            <img src="/github-mark.svg" alt="Github" className="w-5 h-5"/>
            <GithubStars item={site} className="text-black text-sm" />
            </a>)
            }
          </div>
          <a href={site.link} target="_blank" rel="noopener" className="relative flex items-center gap-2 overflow-hidden bg-primary border border-white/20 text-white px-4 py-2 rounded-lg transition-all duration-300 before:absolute before:top-0 before:left-[-100%] before:w-[200%] before:h-full before:bg-gradient-to-r before:from-transparent before:via-white/30 before:to-transparent before:transition-all before:duration-500 hover:before:left-[100%]">
            <ExternalLink className="w-4 h-4" /> Visiter le site officiel
          </a>
        </div>
      </Card>  
    )
};