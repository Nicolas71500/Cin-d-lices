import express from "express";
import cors from "cors";
import "dotenv/config";
import cookieParser from "cookie-parser";
import "./App/Models/Association.js";
import router from "./App/Router.js";
import path from "path";
import { fileURLToPath } from "url";
import methodOverride from "method-override";
import pg from "pg";
console.log("✅ pg forcibly loaded:", typeof pg.Client);

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const allowedOrigins = process.env.ALLOWED_ORIGINS
  ? process.env.ALLOWED_ORIGINS.split(",")
  : ["http://localhost:5173"];

app.use(cors({
  origin: allowedOrigins,
  credentials: true,
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
}));

app.use(cookieParser());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname, "public")));

// Routes API — AVANT les statiques pour éviter que express.static intercepte /recipes
app.use(router);

// Images statiques
app.use("/recipes", express.static(path.join(__dirname, "images/recipes")));
app.use("/movies", express.static(path.join(__dirname, "images/movies")));

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

// 👇 Export pour Vercel
export default app;
