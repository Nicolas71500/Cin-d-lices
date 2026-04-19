import jwt from "jsonwebtoken";
import Users from "../Models/Users.js";
import Role from "../Models/Role.js";

const isAdmin = async (req, res, next) => {
  try {
    const token = req.cookies.token; // Récupère le token du cookie

    if (!token) {
      return res.status(401).json({
        message: "Non autorisé : Aucun token fourni dans les cookies",
      });
    }

    console.log("Token extrait du cookie :", token);

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("Payload du JWT décodé :", decoded);

    const user = await Users.findByPk(decoded.id);
    console.log("Utilisateur trouvé :", user);

    if (!user) {
      return res.status(404).json({ message: "Utilisateur non trouvé" });
    }

    const role = await Role.findByPk(user.role_id);
    console.log("Rôle de l'utilisateur trouvé :", role);

    if (role.name !== "Admin") {
      return res
        .status(403)
        .json({ message: "Accès réservé aux administrateurs" });
    }

    req.user = user;
    next();
  } catch (error) {
    console.error("Erreur dans le middleware isAdmin :", error);
    return res.status(500).json({ message: "Erreur interne du serveur" });
  }
};

export default isAdmin;
