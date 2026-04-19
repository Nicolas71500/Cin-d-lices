import Movies from "../Models/Movie.js";
import Recipe from "../Models/Recipes.js";
import Users from "../Models/Users.js";
import bcrypt from "bcrypt";

export const GetUserById = {
  async me(req, res) {
    // find user by req.user.id
    const user = await Users.findByPk(req.user.id);
    const data = user.dataValues;
    delete data.password;

    // respond with user
    res.status(200).json(data);
  },
};

export const AllUsers = {
  async index(req, res) {
    // find all users
    const users = await Users.findAll();
    // respond with users
    res.json(users);
    if (!users) {
      res.status(404).json({ message: "No users found" });
    }
  },
};

export const createUser = {
  async index(req, res) {
    try {
      // Ajouter le role_id aux données de l'utilisateur
      const userData = {
        ...req.body,
        role_id: 2, // Forcer le role_id à 2
      };

      // Créer l'utilisateur avec les données modifiées
      const user = await Users.create(userData);

      if (!user) {
        return res.status(404).json({ message: "User could not be created" });
      }

      // Répondre avec l'utilisateur créé
      res.status(201).json(user);
    } catch (error) {
      // En cas d'erreur, renvoyer une réponse d'erreur
      res.status(500).json({ message: error.message });
    }
  },
};

export const deleteUser = {
  async index(req, res) {
    try {
      const destroyed = await Users.destroy({ where: { id: req.params.id } });
      if (!destroyed) return res.status(404).json({ message: "Utilisateur non trouvé" });
      return res.status(204).send();
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },
};

export const updateUserRole = {
  async index(req, res) {
    try {
      const { role_id } = req.body;
      if (!role_id) return res.status(400).json({ message: "role_id manquant" });
      const user = await Users.findByPk(req.params.id);
      if (!user) return res.status(404).json({ message: "Utilisateur non trouvé" });
      await user.update({ role_id });
      const data = user.dataValues;
      delete data.password;
      return res.status(200).json(data);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },
};

export const updateUser = {
  index: async (req, res) => {
    try {
      console.log("Données reçues :", req.body); // Pour voir les données envoyées

      const userId = req.user ? req.user.id : null; // Vérifier si l'ID utilisateur est présent
      if (!userId) {
        return res.status(400).json({ message: "ID utilisateur manquant" });
      }

      console.log("ID utilisateur :", userId); // Vérifier l'ID utilisateur

      const updatedData = req.body;

      // Trouver l'utilisateur par son ID
      const user = await Users.findByPk(userId);

      if (!user) {
        console.log("Utilisateur non trouvé");
        return res.status(404).json({ message: "Utilisateur non trouvé" });
      }

      // Mettre à jour les informations de l'utilisateur
      const response = await user.update(updatedData);
      if (response[0] === 0) {
        return res
          .status(400)
          .json({ message: "Problème lors de la mise à jour" });
      }
      console.log("Mise à jour réussie :", user);
      return res.status(204).json(user);
    } catch (error) {
      console.error(
        "Erreur lors de la mise à jour de l'utilisateur :",
        error.message
      );
      return res.status(500).json({ message: "Erreur interne du serveur" });
    }
  },
};

export const getUserRecipies = {
  async index(req, res) {
    const userId = req.user.id;
    const user = await Users.findByPk(userId, {
      include: [
        {
          model: Recipe,
          as: "Recipes",
          include: [
            {
              model: Movies,
              as: "Movie",
              attributes: ["name", "picture"],
            },
          ],
        },
      ],
    });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.json(user.Recipes);
  },
};

export const updatePassword = {
  async index(req, res) {
    try {
      console.log("Données reçues :", req.body);

      const userId = req.user ? req.user.id : null; // get userID from the token
      if (!userId) {
        return res.status(400).json({ message: "ID utilisateur manquant" });
      }

      const { oldPassword, newPassword, confirmPassword } = req.body;

      // check if password are the same
      if (newPassword !== confirmPassword) {
        return res
          .status(400)
          .json({ message: "Les mots de passe ne correspondent pas" });
      }

      // find the user
      const user = await Users.findByPk(userId);

      if (!user) {
        console.log("Utilisateur non trouvé");
        return res.status(404).json({ message: "Utilisateur non trouvé" });
      }

      // compare the passwords
      const isMatch = await bcrypt.compare(oldPassword, user.password);
      if (!isMatch) {
        return res
          .status(400)
          .json({ message: "Ancien mot de passe incorrect" });
      }

      // hash the new password
      const hashedPassword = await bcrypt.hash(newPassword, 10);

      // update the password of user
      await user.update({ password: hashedPassword });

      console.log("Mot de passe mis à jour avec succès");
      return res
        .status(204)
        .json({ message: "Mot de passe mis à jour avec succès" });
    } catch (error) {
      console.error(
        "Erreur lors de la mise à jour du mot de passe :",
        error.message
      );
      return res.status(500).json({ message: "Erreur interne du serveur" });
    }
  },
};
