import pkg from "pg";
const { Client } = pkg;
import "dotenv/config";

async function testConnection() {
  console.log("🔍 Test de connexion à Neon...");

  const client = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false },
  });

  try {
    await client.connect();
    console.log("✅ Connexion réussie!");

    const result = await client.query("SELECT NOW() as current_time");
    console.log(`⏰ Heure serveur: ${result.rows[0].current_time}`);

    const version = await client.query("SELECT version()");
    console.log(
      `🐘 Version PostgreSQL: ${version.rows[0].version.split(" ")[1]}`
    );
  } catch (error) {
    console.error("❌ Erreur de connexion:", error.message);
  } finally {
    await client.end();
  }
}

testConnection();
