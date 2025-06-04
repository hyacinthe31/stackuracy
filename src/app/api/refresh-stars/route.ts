import { NextResponse } from "next/server";
import { Client } from "@neondatabase/serverless";

export async function GET() {
  const client = new Client({
    connectionString: process.env.DATABASE_URL,
  });

  try {
    await client.connect();

    // Récupérer tous les sites avec un lien GitHub
    const result = await client.query<{ id: number; github: string }>(
      "SELECT id, github FROM sites WHERE github IS NOT NULL LIMIT 20"
    );

    for (const row of result.rows) {
      try {
        const repoPath = new URL(row.github).pathname.slice(1);
        const res = await fetch(`https://api.github.com/repos/${repoPath}`, {
          headers: {
            Authorization: `token ${process.env.GITHUB_TOKEN}`,
            "User-Agent": "stackuracy-app",
          },
        });

        if (!res.ok) {
          console.warn(
            `Échec GitHub pour ${row.github}: ${res.status} ${res.statusText}`
          );
          continue;
        }

        const data = await res.json();
        const stars = data.stargazers_count ?? 0;

        // Mettre à jour la colonne github_stars
        await client.query(
          "UPDATE sites SET github_stars = $1 WHERE id = $2",
          [stars, row.id]
        );
      } catch (innerError) {
        console.error(`Erreur sur ${row.github}:`, innerError);
      }
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Erreur de refresh-stars:", error);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  } finally {
    await client.end();
  }
}