import postgres from "postgres";
import "dotenv/config";

const sql = postgres(process.env.DATABASE_URL!);

async function main() {
  await sql`ALTER TABLE resources ADD COLUMN IF NOT EXISTS url text`;
  console.log("Added url column to resources");
  await sql.end();
}

main();
