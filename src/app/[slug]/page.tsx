import { notFound } from "next/navigation";
import { Client } from "@neondatabase/serverless";
import Item from "@/components/Item";
import Navbar from "@/components/Navbar";

type Props = {
  params: Promise<{ slug: string }>;
};

export default async function Page({ params }: Props) {
  const { slug } = await params;

  const client = new Client({
    connectionString: process.env.DATABASE_URL,
  });

  try {
    await client.connect();
    
    // Récupérer l'élément correspondant au slug
    const result = await client.query("SELECT * FROM sites WHERE LOWER(REPLACE(REPLACE(name, ' ', ''), '/', '')) = $1", [slug.toLowerCase()]);

    if (result.rows.length === 0) {
      return notFound(); // Page 404 si aucun résultat
    }

    const item = result.rows[0];

    return (
      <div>
        <Navbar />
        <Item item={item} />
      </div>
    );
  } catch (error) {
    console.error("Erreur lors de la récupération des données :", error);
    return notFound();
  } finally {
    await client.end();
  }
}