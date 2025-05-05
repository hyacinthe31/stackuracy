import { NextResponse } from "next/server";
import { Client } from "@neondatabase/serverless";

export async function GET(req: Request) {
  const client = new Client({
    connectionString: process.env.DATABASE_URL,
  });

  const { searchParams } = new URL(req.url);
  const type = searchParams.get("type");
  const frameworks = searchParams.getAll("frameworks");
  const languages = searchParams.getAll("languages");

  const conditions: string[] = [];
  const values: any[] = [];

  if (type) {
    const normalizedType = type.replace(/\s/g, "").toLowerCase();
    conditions.push(`EXISTS (SELECT 1 FROM unnest(types) AS t WHERE LOWER(REPLACE(t, ' ', '')) = $${values.length + 1})`);
    values.push(normalizedType);
  }

  if (frameworks.length > 0) {
    conditions.push(`(frameworks && $${values.length + 1}::text[] OR frameworks IS NULL OR cardinality(frameworks) = 0)`);
    values.push(frameworks);
  }

  if (languages.length > 0) {
    conditions.push(`languages && $${values.length + 1}::text[]`);
    values.push(languages);
  }

  const whereClause = conditions.length > 0 ? `WHERE ${conditions.join(" AND ")}` : "";

  try {
    await client.connect();
    const result = await client.query(`SELECT * FROM sites ${whereClause}`, values);
    return NextResponse.json(result.rows);
  } catch (error) {
    console.error("Erreur lors de la récupération des sites :", error);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  } finally {
    await client.end();
  }
}