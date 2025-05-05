import { NextResponse } from "next/server";
import { Client } from "@neondatabase/serverless";

export async function POST(req: Request) {
  const { siteName, action } = await req.json();

  if (!siteName) {
    return NextResponse.json({ error: "Nom du site manquant" }, { status: 400 });
  }

  const delta = action === "downvote" ? -1 : 1;

  const client = new Client({
    connectionString: process.env.DATABASE_URL,
  });

  try {
    await client.connect();
    const result = await client.query("UPDATE sites SET votes = GREATEST(0, votes + $1) WHERE name = $2 RETURNING votes;", [delta, siteName]);
    return NextResponse.json({ votes: result.rows[0].votes });
  } catch (error) {
    console.error("Erreur lors du vote :", error);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  } finally {
    await client.end();
  }
}