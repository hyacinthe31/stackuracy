"use client";

import type { Site } from "@/lib/definitions";
import { Card } from "./ui/card";
import Image from "next/image";
import { ExternalLink, ThumbsUp } from "lucide-react";
import { useEffect, useState } from "react";
import GithubStars from "@/components/GithubStars";
import { SafeImage } from "./SafeImage";

export default function Item({ item }: {item : Site}) {
    const [votes, setVotes] = useState(item.votes);
    const [currentVoted, setCurrentVoted] = useState(false);

    const localKey = `voted-${item.name}`;

    useEffect(() => {
        setCurrentVoted(localStorage.getItem(localKey) === "true");
      }, []);

    const handleVote = async () => {
        try {
            const currentVoted = localStorage.getItem(localKey) === "true";
            const res = await fetch("/api/vote", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ siteName: item.name, action: currentVoted ? "downvote" : "upvote" }),
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
    <div className="flex justify-center pt-8 p-2">
        <Card className="p-4 lg:p-8 w-full lg:w-7xl">
            <div>#1 dans {item.types}</div>{/* TODO */}
            <div className="flex flex-col lg:flex-row gap-8 lg:gap-0">
                <a href={item.link} target="_blank" rel="noopener" className="">
                    <SafeImage src={"/upload/" + item.name.replace(/[ \/]/g, "").toLowerCase() + ".webp"} alt={item.name} loading="lazy" className="border shadow-md hover:scale-105 duration-200"/>
                </a>
                <div className="flex flex-col gap-4 items-center lg:w-1/2">
                    <div className="flex gap-2">
                        <img src={"https://www.google.com/s2/favicons?sz=64&domain=" + item.link} alt={item.name} width={32} height={32} loading="lazy" />
                        <h1 className="text-2xl font-bold">{item.name}</h1>
                    </div>
                    <Card className="bg-gray-50 p-4 md:w-2/3 mt-2">
                        <p>{item.description}</p>
                    </Card>
                    <div className="flex gap-4">
                        <button onClick={handleVote} className={`group flex items-center gap-1 px-4 py-2 transition cursor-pointer ${currentVoted ? "text-green-600" : "text-gray-500 hover:text-primary"}`}>
                            <ThumbsUp className={`w-5 h-5 transition-all duration-150 ${currentVoted ? " stroke-green-600" : "group-hover:stroke-primary"}`} /> {votes}
                        </button>
                        {item.github && (
                        <a href={item.github} target="_blank" rel="noopener" className="flex items-center gap-1 px-4 py-2">
                        <img src="/github-mark.svg" alt="Github" className="w-5 h-5"/>
                        <GithubStars item={item} className="text-black text-sm" />
                        </a>)
                        }
                    </div>
                    <a href={item.link} target="_blank" rel="noopener" className="relative flex items-center gap-2 overflow-hidden bg-primary border border-white/20 text-white px-4 py-2 rounded-lg transition-all duration-300 before:absolute before:top-0 before:left-[-100%] before:w-[200%] before:h-full before:bg-gradient-to-r before:from-transparent before:via-white/30 before:to-transparent before:transition-all before:duration-500 hover:before:left-[100%]">
                        <ExternalLink className="w-4 h-4" /> Visiter le site officiel
                    </a>
                </div>
            </div>
        </Card>
    </div>
  );
}