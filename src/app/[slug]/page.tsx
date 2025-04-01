import { notFound } from "next/navigation";
import items from "@/lib/items.json";
import Item from "@/components/Item";
import Navbar from "@/components/Navbar";

type Props = {
  params: Promise<{ slug: string }>;
};

export default async function Page({ params }: Props) {
  const { slug } = await params;

  // Trouver l'élément correspondant au slug
  const item = items.find((item) => item.name.replace(/ /g, '').toLowerCase() === slug.toLowerCase());

  if (!item) {
    return notFound(); // Renvoie une page 404 si le slug n'existe pas
  }

  return (
    <div className="">
        <Navbar />
        <Item item={item} />
    </div>
  );
}