# CinéDélices

Application web de recettes de cuisine inspirées de films Séries et Animés.

- **Frontend** : React + TypeScript + Vite + TailwindCSS
- **Backend** : Node.js + Express + Sequelize
- **Base de données** : PostgreSQL

---

## Déploiement sur serveur (Docker)

### Prérequis

- [Docker](https://docs.docker.com/get-docker/) installé sur le serveur
- [Docker Compose](https://docs.docker.com/compose/install/) (inclus avec Docker Desktop)

### 1. Cloner le dépôt

```bash
git clone https://github.com/Nicolas71500/Cin-d-lices.git Cinedelice
cd Cinedelice
```

### 2. Configurer les variables d'environnement

```bash
cp .env.example .env
nano .env
```

Remplir les valeurs :

```env
SERVER_IP=192.168.1.XXX     # IP locale de ton serveur
DB_PASSWORD=cinedelices      # Mot de passe PostgreSQL
JWT_SECRET=un_long_secret    # Secret pour les tokens JWT
SECRET_KEY=un_autre_secret   # Clé secrète
```

### 3. Lancer l'application

```bash
docker compose up -d --build
```

Les trois services démarrent automatiquement :
| Service | Port |
|---|---|
| Frontend (nginx) | 80 |
| Backend (Express) | 3000 |
| Base de données (PostgreSQL) | 5432 (interne) |

### 4. Importer les données existantes (optionnel)

Si tu as un dump SQL à importer :

```bash
docker exec -i cinedelice_db psql -U cinedelices cinedelices < dump.sql
```

### 5. Accéder à l'application

Ouvre `http://<SERVER_IP>` dans ton navigateur.

---

## Mise à jour

```bash
git pull
docker compose up -d --build
```

---

## Développement local

### Backend

```bash
cd "cindedelice back"
cp .env.exemple .env   # puis remplir les valeurs
npm install
npm run dev
```

### Frontend

```bash
cd "cinedelice front"
npm install
npm run dev
```

L'application de dev est accessible sur `http://localhost:5173`.

---

## Commandes utiles

```bash
# Voir l'état des containers
docker compose ps

# Voir les logs du backend
docker compose logs backend -f

# Accéder à la base de données
docker exec -it cinedelice_db psql -U cinedelices

# Arrêter l'application
docker compose down

# Arrêter et supprimer les données
docker compose down -v
```
