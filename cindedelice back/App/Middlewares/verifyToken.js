import jwt from 'jsonwebtoken';

const verifyToken = (req, res, next) => {
  const token = req.cookies.token; // Récupérer le token depuis le cookie

  if (!token) {
    return res.status(403).json({ message: "Accès interdit. Token manquant." });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Vérifier le JWT
    req.userId = decoded.id; // Stocker l'ID utilisateur dans req pour l'utiliser plus tard
    next(); // Passer au middleware suivant
  } catch (error) {
    return res.status(401).json({ message: "Token invalide ou expiré." });
  }
};

export default verifyToken;
