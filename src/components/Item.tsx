import type { Item } from "@/lib/definitions";
import { Card } from "./ui/card";
import Image from "next/image";
import { ExternalLink } from "lucide-react";

export default function Item({ item }: {item : Item}) {

  return (
    <div className="flex justify-center pt-8">
        <Card className="p-8 w-7xl">
            <div>#1 dans {item.types}</div>{/* TODO */}
            <div className="flex flex-row">
                <a href={item.link} target="_blank" rel="noopener" className="">
                    <Image src={"/upload/" + item.name.replace(/ /g, '').toLowerCase() + ".webp"} alt={item.name} width={600} height={289} className="border shadow-md w-full hover:scale-105 duration-200"/>
                </a>
                <div className="flex flex-col gap-12 items-center w-1/2">
                    <div className="flex gap-2">
                    <Image src={"https://www.google.com/s2/favicons?sz=64&domain=" + item.link} alt={item.name} width={32} height={32} />
                    <h1 className="text-2xl font-bold">{item.name}</h1>
                    </div>
                    <Card className="bg-gray-50 p-4 w-2/3">
                        <p>{item.description}</p>
                    </Card>
                    <a href={item.link} target="_blank" rel="noopener" className="relative flex items-center gap-2 overflow-hidden bg-primary border border-white/20 text-white px-4 py-2 rounded-lg transition-all duration-300 before:absolute before:top-0 before:left-[-100%] before:w-[200%] before:h-full before:bg-gradient-to-r before:from-transparent before:via-white/30 before:to-transparent before:transition-all before:duration-500 hover:before:left-[100%]">
                        <ExternalLink className="w-4 h-4" /> Visiter le site officiel
                    </a>
                </div>
            </div>
        </Card>
    </div>
  );
}