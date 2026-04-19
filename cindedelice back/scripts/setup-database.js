import { readFileSync } from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import pkg from "pg";
const { Client } = pkg;
import "dotenv/config";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

async function setupDatabase() {
  console.log("🚀 Initialisation de la base de données...");

  const client = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: process.env.NODE_ENV === "production" ? { rejectUnauthorized: false } : false,
  });

  try {
    // Connexion à la base de données
    await client.connect();
    console.log("✅ Connexion à Neon établie");

    // Lire le fichier SQL
    const sqlPath = join(__dirname, "..", "data", "create_tables.sql");
    const sql = readFileSync(sqlPath, "utf8");
    console.log("📖 Fichier SQL lu avec succès");

    // Exécuter le script SQL
    console.log("⏳ Exécution du script SQL en cours...");
    await client.query(sql);
    console.log("✅ Script SQL exécuté avec succès!");

    // Vérifier les données
    console.log("\n📊 Vérification des données:");

    const tables = await client.query(`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public'
      ORDER BY table_name
    `);
    console.log(`   Nombre de tables créées: ${tables.rows.length}`);

    const recipeCount = await client.query("SELECT COUNT(*) FROM recipes");
    console.log(`   Nombre de recettes: ${recipeCount.rows[0].count}`);

    const movieCount = await client.query("SELECT COUNT(*) FROM movies");
    console.log(`   Nombre de films: ${movieCount.rows[0].count}`);

    const userCount = await client.query("SELECT COUNT(*) FROM users");
    console.log(`   Nombre d'utilisateurs: ${userCount.rows[0].count}`);

    console.log("\n🎉 Base de données initialisée avec succès!");
  } catch (error) {
    console.error("❌ Erreur lors de l'initialisation:", error.message);
    if (error.code) {
      console.error(`   Code d'erreur: ${error.code}`);
    }
    if (error.detail) {
      console.error(`   Détail: ${error.detail}`);
    }
    process.exit(1);
  } finally {
    await client.end();
    console.log("🔌 Connexion fermée");
  }
}

setupDatabase();
