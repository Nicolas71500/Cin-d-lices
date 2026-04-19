import jwt from "jsonwebtoken";
import Users from "../Models/Users.js";

const isLoggedIn = async (req, res, next) => {
  // Récupérer le token depuis les cookies
  const token = req.cookies.token;

  // Vérifier si le token est présent dans les cookies
  if (!token) {
    return res.status(401).json({
      message: "Unauthorized: No token provided",
    });
  }

  try {
    // Vérifier et décoder le token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // Rechercher l'utilisateur par l'id décodé à partir du token
    const user = await Users.findByPk(decoded.id);

    // Si aucun utilisateur n'est trouvé, renvoyer une erreur 401
    if (!user) {
      return res.status(401).json({ message: "Unauthorized: User not found" });
    }

    // Attacher l'utilisateur à l'objet de requête (req)
    req.user = user;
    next();
  } catch (error) {
    // Si le token est expiré
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({ message: "Unauthorized: Token expired" });
    }

    // Si le token est invalide
    if (error.name === "JsonWebTokenError") {
      return res.status(401).json({ message: "Unauthorized: Invalid token" });
    }

    // En cas d'erreur inattendue
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export default isLoggedIn;
