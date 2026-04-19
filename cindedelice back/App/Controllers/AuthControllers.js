import { z } from "zod";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import Users from "../Models/Users.js";

const userSchema = z.object({
  email_address: z.string().email(),
  password: z.string().min(6),
  first_name: z.string().optional(),
  last_name: z.string().optional(),
  username: z.string().min(2),
});

const authController = {
  // Inscription utilisateur
  async create(req, res) {
    const result = userSchema.safeParse(req.body);

    // Validation des données
    if (!result.success) {
      return res.status(400).json(result.error.errors); // Renvoie des erreurs de validation
    }

    const { email_address, password, first_name, last_name, username } =
      result.data;

    try {
      // Vérifier si l'email est déjà utilisé
      const emailExist = await Users.findOne({ where: { email_address } });
      if (emailExist) {
        return res
          .status(400)
          .json({ message: "Adresse e-mail déjà utilisée." });
      }

      // Vérifier si le nom d'utilisateur est déjà pris
      const usernameExist = await Users.findOne({ where: { username } });
      if (usernameExist) {
        return res
          .status(400)
          .json({
            message:
              "Nom d'utilisateur déjà utilisé, veuillez en choisir un autre.",
          });
      }

      // Hash du mot de passe
      const hashedPassword = await bcrypt.hash(password, 10);

      // Création de l'utilisateur
      const user = await Users.create({
        email_address,
        password: hashedPassword,
        first_name: first_name || "",
        last_name: last_name || "",
        username,
        role_id: 2, // Assigner un rôle par défaut (exemple: utilisateur)
      });

      return res.status(201).json({
        message: "Inscription réussie ! Vous pouvez maintenant vous connecter.",
      });
    } catch (error) {
      console.error("Erreur lors de l'inscription :", error);
      return res
        .status(500)
        .json({
          message:
            "Problème lors de l'inscription, veuillez réessayer plus tard.",
        });
    }
  },

  // Connexion utilisateur
  async login(req, res) {
    const loginSchema = z.object({
      email_address: z.string().email(),
      password: z.string().min(6),
    });

    const result = loginSchema.safeParse(req.body);

    // Validation des données
    if (!result.success) {
      return res.status(400).json(result.error.errors); // Renvoie des erreurs de validation
    }

    const { email_address, password } = result.data;

    try {
      // Recherche de l'utilisateur par email
      const user = await Users.findOne({
        where: { email_address },
        attributes: ["id", "password"], // Obtenir seulement l'id et le mot de passe
      });

      // Si l'utilisateur n'existe pas
      if (!user) {
        return res
          .status(401)
          .json({ message: "Email ou mot de passe incorrect." });
      }

      // Comparer le mot de passe avec le hash enregistré
      const isValidPassword = await bcrypt.compare(password, user.password);

      // Si le mot de passe est incorrect
      if (!isValidPassword) {
        return res
          .status(401)
          .json({ message: "Email ou mot de passe incorrect." });
      }

      // Génération du token JWT
      const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
        expiresIn: "3h",
      });

      // Envoi du token dans un cookie HTTP-only
      res.cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production", // Utiliser HTTPS en production
        maxAge: 10800000, // 3 heures
        sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax", // Samesite réglé correctement
      });

      return res.status(200).json({ message: "Connexion réussie !" });
    } catch (error) {
      console.error("Erreur lors de la connexion :", error);
      return res
        .status(500)
        .json({ message: "Problème serveur, veuillez réessayer plus tard." });
    }
  },

  // Déconnexion utilisateur
  async logout(req, res) {
    res.clearCookie("token");
    return res.status(200).json({ message: "Déconnexion réussie !" });
  },
};

export default authController;
