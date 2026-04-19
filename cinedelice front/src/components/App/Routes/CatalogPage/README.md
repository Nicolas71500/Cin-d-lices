# Cinedelices Project

## Fonctionnalités

### 1. Catalogue de Recettes

L'utilisateur peut voir un ensemble de recettes affichées sous forme de grille, chaque recette étant associée à un film. Chaque recette comprend :

-   **Nom de la recette**
-   **Image de la recette**
-   **Film associé** (nom et image)

### 2. Filtres de Recherche

L'utilisateur peut filtrer les recettes par :

-   **Difficulté** : Facile, Moyen, Difficile
-   **Type de plat** : Boisson, Entrée, Plat, Dessert

#### Utilisation des filtres

-   Lorsque l'utilisateur sélectionne une difficulté, les recettes s'actualisent pour n'afficher que celles de la difficulté choisie.
-   Lorsque l'utilisateur sélectionne un type de plat, les recettes s'actualisent en conséquence.
-   L'utilisateur peut réinitialiser les filtres en cliquant sur le titre **"Catalogue"**.

### 3. Ajouter une nouvelle recette

L'application permet d'ajouter une nouvelle recette via une modale :

-   **Nom de la recette**
-   **Image de la recette**
-   **Film associé (nom et image)**
-   **Type de plat**
-   **Difficulté**
-   **Ingrédients**
-   **Préparation**
-   **Durée totale de la recette**
-   **Anecdote**

Les recettes ajoutées via cette modale sont immédiatement affichées dans le catalogue.

## Structure du Projet

### Composants Principaux

1. **Catalog**

    - Composant principal qui affiche le catalogue des recettes avec la possibilité de filtrer les recettes.
    - Gère les filtres par difficulté et type de plat.
    - Contient la logique pour réinitialiser les filtres.

2. **NavBarCalogue**

    - Barre de navigation avec les filtres et la modale d'ajout de recettes.
    - Passe les filtres sélectionnés au composant `Catalog` via des props.

3. **AddRecipeModal**

    - Modale pour ajouter une nouvelle recette.
    - Contient un formulaire qui envoie les données au backend via une requête `POST`.

4. **DifficultyFilter**
    - Composant pour filtrer les recettes par difficulté.
5. **DishTypeFilter**
    - Composant pour filtrer les recettes par type de plat.

### Routes API

#### GET `/recipes`

Retourne l'ensemble des recettes.

#### GET `/Recipes/DishTypes/:dishTypeId`

Retourne les recettes pour un type de plat spécifique.

#### POST `/recipes`

Ajoute une nouvelle recette. Les données envoyées doivent inclure :

-   `name` : Nom de la recette
-   `picture` : URL de l'image de la recette
-   `movies` : Objet contenant le nom et l'image du film
-   `dish_types_id` : ID du type de plat (1 pour Boisson, 2 pour Plat, etc.)
-   `difficulty` : Difficulté de la recette (Facile, Moyen, Difficile)
-   `ingredients` : Liste des ingrédients
-   `preparation` : Étapes de la préparation
-   `total_duration` : Durée totale de la recette
-   `anecdote` : Anecdote liée à la recette

# Interfaces et Types du Projet Cinedelices

## Interfaces

### 1. `Models / index.ts`

Il s'agit de l'interface `Recipe` représente une recette dans l'application. Chaque recette a un identifiant unique, un nom, une image, et une référence à un film (`movie_id`), si applicable.

### 2. `Components / dishtypeFIlter / index.tsx`

Il s'agit d'un composant React pour filtrer les recettes par type de plat. Il prend en paramètre une fonction `onFilterChange` qui est appelée lorsque l'utilisateur clique sur un bouton de filtre.

### 3. `Components / difficultyFIlter / index.tsx`

Il s'agit d'un composant React pour filtrer les recettes par difficulté. Il prend en paramètre une fonction `onFilterChange` qui est appelée lorsque l'utilisateur clique sur un bouton de filtre.

### 4. `Components / AddRecipeModal / index.tsx`

Il s'agit d'un composant React pour la modale d'ajout de recette. Il prend en paramètre une fonction `onAddRecipe` qui est appelée lorsque l'utilisateur clique sur le bouton d'ajout de recette.

### 5. `Components / navbarCalogue / index.tsx`

Il s'agit d'un composant React pour la barre de navigation de l'application. Il prend en paramètres les fonctions `onDifficultyFilterChange`, `onDishTypeFilterChange` et `onAddRecipe` qui sont appelées lorsque l'utilisateur clique sur un bouton de filtre ou sur le bouton d'ajout de recette.

### 6. `Pages / CatalogPage / index.tsx`

Il s'agit de la page principale de l'application. Elle affiche le catalogue des recettes et permet de filtrer les recettes par difficulté et type de plat. Elle contient également la modale d'ajout de recette.
