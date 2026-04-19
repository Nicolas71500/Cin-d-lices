BEGIN;

DROP TABLE IF EXISTS role CASCADE;
DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS dishtypes CASCADE;
DROP TABLE IF EXISTS movies CASCADE;
DROP TABLE IF EXISTS recipes CASCADE;
DROP TABLE IF EXISTS ingredients CASCADE;
DROP TABLE IF EXISTS recipes_has_ingredients CASCADE;
DROP TABLE IF EXISTS preparation CASCADE;
DROP TABLE IF EXISTS category CASCADE;




CREATE TABLE Role (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name TEXT NOT NULL
);

CREATE TABLE Users (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    username TEXT,
    email_address TEXT NOT NULL UNIQUE,
    password TEXT NOT NULL,
    role_id INTEGER REFERENCES Role(id)
);

CREATE TABLE Category (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name TEXT NOT NULL
);

CREATE TABLE DishTypes (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name TEXT NOT NULL
);

CREATE TABLE Movies (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name TEXT NOT NULL,
    picture TEXT,
    anecdote TEXT,
    category_id INTEGER REFERENCES Category(id)
);

CREATE TABLE Recipes (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name TEXT NOT NULL,
    difficulty TEXT NOT NULL,
    anecdote TEXT,
    total_duration INTEGER NOT NULL,
    picture TEXT,
    is_checked BOOLEAN NOT NULL,
    user_id INTEGER REFERENCES Users(id),
    dish_types_id INTEGER REFERENCES DishTypes(id),
    movie_id INTEGER REFERENCES Movies(id)
);

CREATE TABLE Ingredients (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name TEXT NOT NULL,
    quantity TEXT NOT NULL,
    recipe_id INTEGER REFERENCES Recipes(id)
);

CREATE TABLE Preparation (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    description TEXT NOT NULL,
    step_position INTEGER NOT NULL,
    recipes_id INTEGER REFERENCES Recipes(id)
);

CREATE TABLE Recipes_has_Ingredients (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    recipes_id INTEGER REFERENCES Recipes(id),
    ingredients_id INTEGER REFERENCES Ingredients(id)
);

-- Insertion des rôles
INSERT INTO Role (name) VALUES ('Admin'), ('User'), ('Guest');

-- Insertion des catégories
INSERT INTO Category (name) VALUES ('Film'), ('Série'), ('Animé');

-- Insertion des types de plats
INSERT INTO DishTypes (name) VALUES ('Boisson'), ('Plat principal'), ('Dessert'), ('Entrée');

-- Insertion des utilisateurs
INSERT INTO Users (first_name, last_name, username, email_address, password, role_id) VALUES
('John', 'john_doe', 'JD', 'john@example.com', 'password123', 2),
('Jane', 'jane_doe', 'Janie', 'jane@example.com', 'password456', 2),
('Alice', 'alice_wonder', 'Alice', 'alice@example.com', 'password789', 2),
('Bob', 'bob_builder', 'Bob', 'bob@example.com', 'password321', 2),
('Charlie', 'charlie_brown', 'Charlie', 'charlie@example.com', 'password654', 2);

-- Insertion des filmss
INSERT INTO Movies (name, picture, anecdote, category_id) VALUES 
('Harry Potter', 'harry_potter.jpg', 'A wizard''s journey.', 1),
('Bob l''éponge', 'bob_leponge.jpg', 'A sponge living in a pineapple under the sea.', 2),
('Le Seigneur des Anneaux', 'lord_of_the_rings.jpg', 'A journey to destroy the One Ring.', 1),
('Ratatouille', 'ratatouille.jpg', 'A rat who can cook in Paris.', 1),
('Pulp Fiction', 'pulp_fiction.jpg', 'Stories of crime and redemption.', 1),
('Star Wars', 'star_wars.jpg', 'A galaxy far, far away.', 1),
('The Grand Budapest Hotel', 'grand_budapest.jpg', 'A concierge''s adventures.', 1),
('V pour Vendetta', 'v_for_vendetta.jpg', 'A masked vigilante fights against tyranny.', 2),
('Les Désastreuses Aventures des orphelins Baudelaire', 'baudelaires.jpg', 'Orphans fight their fate.', 2),
('One Piece', 'one_piece.jpg', 'The adventure of a pirate crew.', 3),
('Dragon Ball Z', 'dbz.jpg', 'A warrior''s journey.', 3),
('Les Tortues Ninja', 'tortues_ninja.jpg', 'Mutant turtles fight crime.', 2),
('Soylent Green', 'soylent_green.jpg', 'A dystopian future.', 1),
('Twin Peaks', 'twin_peaks.jpg', 'A town full of secrets.', 2),
('Les Chroniques de Narnia', 'narnia.jpg', 'Children discover a magical land.', 1),
('Shingeki no Kyojin', 'attack_on_titan.jpg', 'Humanity fights giants.', 3),
('Death Note', 'death_note.jpg', 'A notebook of death.', 3),
('Cowboy Bebop', 'cowboy_bebop.jpg', 'Bounty hunters in space.', 3),
('Stranger Things', 'stranger_things.jpg', 'Mysteries in a small town.', 2),
('Futurama', 'futurama.jpg', 'The future is now.', 2),
('Spirited Away', 'spirited_away.jpg', 'A girl trapped in a magical world.', 3),
('Pokémon', 'pokemon.jpg', 'Catch them all in the world of Pokémon.', 3),
('It''s Okay to Not Be Okay', 'its_okay.jpg', 'A healing romance story.', 2),
('Sweet Bean', 'sweet_bean.jpg', 'A sweet tale of connection.', 1),
('Your Name', 'your_name.jpg', 'A story of connection across time.', 3),
('Tampopo', 'tampopo.jpg', 'A quest for the perfect ramen.', 1),
('My Neighbor Totoro', 'totoro.jpg', 'The adventures of two sisters and a forest spirit.', 3),
('Midnight Diner', 'midnight_diner.jpg', 'Stories from a late-night diner in Tokyo.', 2),
('Osaka Story', 'osaka_story.jpg', 'Life and cuisine in Osaka.', 1),
('Eat Pray Love', 'eat_pray_love.jpg', 'A journey of self-discovery.', 1),
('The Beach', 'the_beach.jpg', 'A hidden beach and the dark side of paradise.', 1),
('The Quiet American', 'quiet_american.jpg', 'A story of love and war in Vietnam.', 1),
('Lost in Translation', 'lost_in_translation.jpg', 'Two lost souls connect in Tokyo.', 1),
('Memoirs of a Geisha', 'memoirs_geisha.jpg', 'The life of a Japanese geisha.', 1),
('The Lunchbox', 'lunchbox.jpg', 'A mistaken delivery in Mumbai connects two people.', 1),
('Jiro Dreams of Sushi', 'jiro_sushi.jpg', 'A documentary about a sushi master.', 1),
('Julie & Julia', 'julie_julia.jpg', 'Cooking through the recipes of Julia Child.', 1);

-- Insertion des recettes
INSERT INTO Recipes (name, difficulty, anecdote, total_duration, picture, is_checked, user_id, dish_types_id, movie_id) VALUES
('Bièraubeurre', 'Facile', 'A magical drink from Harry Potter.', 15, 'bieraubeurre.jpg', TRUE, 1, 1, 1),
('Pâté de crabe', 'Moyen', 'La recette secrète du Crabe Croustillant dans Bob l''éponge.', 30, 'pate_de_crabe.jpg', TRUE, 2, 2, 2),
('Pain Lembas', 'Difficile', 'Le pain nourrissant des Elfes dans Le Seigneur des Anneaux.', 60, 'pain_lembas.jpg', TRUE, 3, 2, 3),
('Ratatouille', 'Moyen', 'Le plat emblématique du film Ratatouille.', 90, 'ratatouille.jpg', TRUE, 4, 2, 4),
('Big Kahuna Burger', 'Moyen', 'A legendary burger from Pulp Fiction.', 45, 'big_kahuna_burger.jpg', TRUE, 5, 2, 5),
('Lait Bleu', 'Facile', 'A refreshing drink from Star Wars.', 10, 'lait_bleu.jpg', TRUE, 1, 1, 6),
('Tarte aux cerises', 'Facile', 'A mysterious cherry pie from Twin Peaks.', 90, 'tarte_cerises.jpg', TRUE, 2, 3, 14),
('Chocogrenouilles', 'Facile', 'Magical chocolate frogs from Harry Potter.', 30, 'chocogrenouilles.jpg', TRUE, 3, 3, 1),
('Ramen de Naruto', 'Moyen', 'A hearty ramen dish loved by Naruto.', 25, 'ramen_naruto.jpg', TRUE, 2, 2, 17),
('Mugiwara Feast', 'Moyen', 'A pirate feast from One Piece.', 90, 'mugiwara_feast.jpg', TRUE, 3, 2, 10),
('Pollos Hermanos Chicken', 'Difficile', 'The famous chicken from Breaking Bad.', 120, 'pollos_hermanos.jpg', TRUE, 4, 2, 19),
('Game of Thrones Feast', 'Difficile', 'A feast fit for the Iron Throne.', 180, 'got_feast.jpg', TRUE, 5, 2, 20),
('Spaghetti alla Puttanesca', 'Moyen', 'Un plat célèbre des orphelins Baudelaire dans Les Désastreuses Aventures des orphelins Baudelaire.', 35, 'spaghetti_puttanesca.jpg', TRUE, 4, 2, 9),
('Pho', 'Difficile', 'Un plat vietnamien riche et savoureux vu dans The Quiet American.', 120, 'pho.jpg', TRUE, 5, 2, 33),
('Crêpes Suzette', 'Difficile', 'Un dessert flambé français classique du film Julie & Julia.', 40, 'crepes_suzette.jpg', TRUE, 1, 3, 37),
('Risotto aux Champignons', 'Moyen', 'Un plat italien crémeux comme vu dans Ratatouille.', 50, 'risotto_champignons.jpg', TRUE, 2, 2, 4),
('Boeuf Bourguignon', 'Difficile', 'Un classique français mijoté dans Julie & Julia.', 240, 'boeuf_bourguignon.jpg', TRUE, 3, 2, 37),
('Paella', 'Moyen', 'Un plat espagnol iconique du film Vicky Cristina Barcelona.', 90, 'paella.jpg', TRUE, 4, 2, 20),
('Sushi', 'Difficile', 'Une délicatesse japonaise vue dans Jiro Dreams of Sushi.', 75, 'sushi.jpg', TRUE, 5, 2, 36),
('Falafel', 'Facile', 'Un classique de la cuisine de rue du Moyen-Orient dans le film Munich.', 45, 'falafel.jpg', TRUE, 1, 2, 22),
('Tempura', 'Moyen', 'Un classique japonais souvent présent dans des animés comme Spirited Away.', 30, 'tempura.jpg', TRUE, 2, 2, 21),
('Katsudon', 'Moyen', 'Un plat japonais réconfortant dans l''animé Death Note.', 35, 'katsudon.jpg', TRUE, 3, 2, 17),
('Tonkatsu', 'Moyen', 'Un classique de la cuisine japonaise dans l''animé Shokugeki no Soma.', 40, 'tonkatsu.jpg', TRUE, 4, 2, 24),
('Onigiri', 'Facile', 'Les célèbres boules de riz japonais vues dans Pokémon.', 15, 'onigiri.jpg', TRUE, 5, 2, 22),
('Gâteau de Riz', 'Facile', 'Un dessert simple et délicieux souvent vu dans les animés.', 30, 'gateau_de_riz.jpg', TRUE, 1, 3, 21),
('Sukiyaki', 'Difficile', 'Un plat japonais complexe partagé dans l''animé Cowboy Bebop.', 120, 'sukiyaki.jpg', TRUE, 2, 2, 18),
('Hotpot', 'Difficile', 'Un plat asiatique à partager, comme vu dans It''s Okay to Not Be Okay.', 120, 'hotpot.jpg', TRUE, 3, 2, 23),
('Mochi', 'Moyen', 'Un dessert japonais à base de riz gluant vu dans les animés.', 60, 'mochi.jpg', TRUE, 4, 3, 21),
('Haricots rouges sucrés', 'Facile', 'Un dessert japonais à base de pâte d''azuki vu dans le film Sweet Bean.', 30, 'haricots_rouges_sucres.jpg', TRUE, 5, 3, 24),
('Croquettes de pommes de terre', 'Facile', 'Un plat simple mais réconfortant souvent vu dans les films japonais.', 25, 'croquettes_pommes_de_terre.jpg', TRUE, 1, 2, 25),
('Curry japonais', 'Moyen', 'Un plat japonais réconfortant dans le film Your Name.', 60, 'curry_japonais.jpg', TRUE, 2, 2, 26),
('Okonomiyaki', 'Moyen', 'Une crêpe japonaise garnie de divers ingrédients vue dans le film Tampopo.', 40, 'okonomiyaki.jpg', TRUE, 3, 2, 27),
('Taiyaki', 'Facile', 'Une pâtisserie japonaise en forme de poisson vue dans le film My Neighbor Totoro.', 30, 'taiyaki.jpg', TRUE, 4, 3, 28),
('Yaki Udon', 'Moyen', 'Des nouilles sautées japonaises comme vu dans le film Midnight Diner.', 35, 'yaki_udon.jpg', TRUE, 5, 2, 29),
('Sashimi', 'Difficile', 'Un plat de poisson cru japonais comme vu dans le film Jiro Dreams of Sushi.', 20, 'sashimi.jpg', TRUE, 1, 2, 36),
('Nasi Goreng', 'Moyen', 'Un plat indonésien de riz frit comme vu dans le film Eat Pray Love.', 45, 'nasi_goreng.jpg', TRUE, 2, 2, 30),
('Pad Thai', 'Moyen', 'Un plat thaïlandais célèbre vu dans le film The Beach.', 40, 'pad_thai.jpg', TRUE, 3, 2, 31),
('Butterbeer', 'Facile', 'Une boisson emblématique de Harry Potter.', 15, 'butterbeer.jpg', TRUE, 4, 1, 1),
('Green Tea Ice Cream', 'Facile', 'Un dessert japonais vu dans le film Lost in Translation.', 20, 'green_tea_ice_cream.jpg', TRUE, 1, 3, 32),
('Miso Soup', 'Facile', 'Une soupe japonaise réconfortante vue dans le film Memoirs of a Geisha.', 15, 'miso_soup.jpg', TRUE, 2, 2, 33),
('Bento', 'Moyen', 'Un repas japonais complet vu dans le film The Lunchbox.', 60, 'bento.jpg', TRUE, 3, 2, 34),
('Tempura Udon', 'Moyen', 'Des nouilles udon avec tempura, souvent vues dans des animés.', 35, 'tempura_udon.jpg', TRUE, 4, 2, 23),
('Matcha Cake', 'Moyen', 'Un gâteau japonais au thé vert vu dans le film Little Forest.', 45, 'matcha_cake.jpg', TRUE, 5, 3, 35),
('Takoyaki', 'Moyen', 'Des boulettes de poulpe japonaises vues dans le film Osaka Story.', 30, 'takoyaki.jpg', TRUE, 1, 2, 35);

-- Insertion des étapes de préparation
INSERT INTO Preparation (description, step_position, recipes_id) VALUES
('Faire chauffer le lait et le beurre dans une casserole.', 1, 1),
('Ajouter la crème et le sucre, puis remuer jusqu''à ce que le mélange soit homogène.', 2, 1),
('Mélanger le crabe, la mayonnaise et les épices.', 1, 2),
('Former des galettes et les faire cuire.', 2, 2),
('Mélanger la farine, le beurre et l''eau pour la pâte.', 1, 3),
('Ajouter les fruits secs et pétrir.', 2, 3),
('Faire revenir les légumes en tranches fines.', 1, 4),
('Ajouter les herbes et les épices.', 2, 4),
('Griller le steak pour le burger.', 1, 5),
('Assembler le burger avec les garnitures.', 2, 5),
('Mélanger le lait avec le colorant alimentaire bleu.', 1, 6),
('Servir bien frais avec des glaçons.', 2, 6),
('Préparer la pâte pour la tarte.', 1, 7),
('Cuire la tarte au four.', 2, 7),
('Faire fondre le chocolat au bain-marie.', 1, 8),
('Verser le chocolat dans des moules et laisser refroidir.', 2, 8),
('Cuire les nouilles dans le bouillon.', 1, 9),
('Ajouter les garnitures et servir chaud.', 2, 9),
('Préparer la viande et les légumes pour le festin.', 1, 10),
('Cuire et disposer les plats pour le festin.', 2, 10),
('Mélanger les ingrédients de la sauce pour le poulet.', 1, 11),
('Cuire le poulet mariné à la perfection.', 2, 11),
('Faire cuire les spaghettis, puis les mélanger avec la sauce.', 1, 12),
('Servir chaud avec du parmesan râpé.', 2, 12),
('Préparer le bouillon parfumé pour le pho.', 1, 13),
('Ajouter les nouilles et la viande au bouillon.', 2, 13),
('Préparer la pâte à crêpes.', 1, 14),
('Cuire les crêpes et les flamber avec du Grand Marnier.', 2, 14),
('Faire revenir les champignons avec du beurre.', 1, 15),
('Ajouter le riz, puis cuire lentement en ajoutant du bouillon.', 2, 15),
('Faire mariner le bœuf, puis le cuire lentement avec des légumes.', 1, 16),
('Servir avec des pommes de terre et du vin rouge.', 2, 16),
('Faire revenir les fruits de mer avec du riz.', 1, 17),
('Ajouter du bouillon et laisser mijoter.', 2, 17),
('Préparer le poisson pour le sushi.', 1, 18),
('Rouler le riz avec le poisson et servir.', 2, 18),
('Mélanger les pois chiches, les herbes et les épices.', 1, 19),
('Former des boulettes et les faire frire.', 2, 19),
('Préparer la pâte pour la tempura.', 1, 20),
('Faire frire les légumes et les fruits de mer en tempura.', 2, 20),
('Faire revenir le porc pané pour le katsudon.', 1, 21),
('Servir avec du riz et un œuf poché.', 2, 21),
('Préparer le porc pané pour le tonkatsu.', 1, 22),
('Servir avec du chou râpé et de la sauce tonkatsu.', 2, 22),
('Cuire le riz pour les onigiris.', 1, 23),
('Façonner le riz en triangles et ajouter des garnitures.', 2, 23),
('Préparer le sirop pour le gâteau de riz.', 1, 24),
('Cuire le gâteau à la vapeur.', 2, 24),
('Préparer les ingrédients pour le sukiyaki.', 1, 25),
('Cuire le tout dans un bouillon sucré-salé.', 2, 25),
('Préparer le bouillon pour le hotpot.', 1, 26),
('Ajouter les viandes, légumes, et tofu au bouillon.', 2, 26),
('Préparer la pâte pour les mochis.', 1, 27),
('Façonner les mochis et les garnir de pâte d’haricots rouges.', 2, 27),
('Préparer la pâte d’azuki pour les haricots rouges sucrés.', 1, 28),
('Laisser refroidir et servir en dessert.', 2, 28),
('Cuire les pommes de terre pour les croquettes.', 1, 29),
('Façonner les croquettes et les faire frire.', 2, 29),
('Préparer le roux pour le curry japonais.', 1, 30),
('Ajouter les légumes et la viande, puis servir avec du riz.', 2, 30),
('Préparer la pâte pour l’okonomiyaki.', 1, 31),
('Ajouter les garnitures et cuire comme une crêpe.', 2, 31),
('Préparer la pâte pour le taiyaki.', 1, 32),
('Ajouter la pâte d’haricots rouges et cuire en forme de poisson.', 2, 32),
('Cuire les nouilles udon, puis les faire sauter.', 1, 33),
('Ajouter la sauce soja et les légumes.', 2, 33),
('Préparer le poisson pour le sashimi.', 1, 34),
('Trancher finement et servir avec du wasabi.', 2, 34),
('Préparer les ingrédients pour le nasi goreng.', 1, 35),
('Faire sauter le riz avec les épices et la sauce soja.', 2, 35),
('Préparer les nouilles de riz pour le pad thaï.', 1, 36),
('Ajouter les légumes, la viande, et la sauce pad thaï.', 2, 36),
('Mélanger la pâte pour la butterbeer.', 1, 37),
('Ajouter le soda et servir bien frais.', 2, 37),
('Préparer le mélange pour la glace au thé vert.', 1, 38),
('Faire prendre la glace au congélateur.', 2, 38),
('Préparer la soupe miso.', 1, 39),
('Ajouter le tofu et les algues.', 2, 39),
('Préparer les éléments pour le bento.', 1, 40),
('Assembler le bento avec du riz et des accompagnements.', 2, 40),
('Cuire les nouilles udon, puis les servir avec la tempura.', 1, 41),
('Ajouter les garnitures et servir chaud.', 2, 41),
('Préparer la pâte pour le matcha cake.', 1, 42),
('Cuire le cake au four.', 2, 42),
('Préparer la pâte pour le takoyaki.', 1, 43),
('Ajouter les morceaux de poulpe et cuire en boulettes.', 2, 43);

-- Insertion des ingrédients
INSERT INTO Ingredients (name, quantity, recipe_id) VALUES 
('Lait', '500ml', 1),
('Beurre', '100g', 1),
('Crème', '200ml', 1),
('Sucre', '50g', 1),
('Crabe', '200g', 2),
('Mayonnaise', '50g', 2),
('Épices', '10g', 2),
('Farine', '300g', 3),
('Beurre', '100g', 3),
('Fruits secs', '50g', 3),
('Légumes', '300g', 4),
('Herbes', '10g', 4),
('Steak', '200g', 5),
('Pain à burger', '1 pièce', 5),
('Colorant bleu', 'quelques gouttes', 6),
('Glaçons', 'selon le besoin', 6),
('Chocolat', '200g', 8),
('Nouilles', '200g', 9),
('Bouillon', '500ml', 9),
('Poulet', '500g', 11),
('Riz', '200g', 12),
('Parmesan', '50g', 12),
('Viande', '200g', 13),
('Nouilles de riz', '200g', 13),
('Farine', '150g', 14),
('Grand Marnier', '50ml', 14),
('Champignons', '100g', 15),
('Boeuf', '500g', 16),
('Fruits de mer', '300g', 17),
('Poisson', '200g', 18),
('Pois chiches', '150g', 19),
('Herbes', '10g', 19),
('Légumes', '200g', 20),
('Fruits de mer', '200g', 20),
('Porc', '200g', 21),
('Riz', '200g', 21),
('Porc', '200g', 22),
('Chou', '100g', 22),
('Riz', '200g', 23),
('Garnitures', '50g', 23),
('Riz', '200g', 24),
('Azuki', '100g', 28),
('Pommes de terre', '300g', 29),
('Roux', '50g', 30),
('Légumes', '300g', 30),
('Pâte à crêpe', '150g', 31),
('Pâte d’haricots rouges', '100g', 32),
('Nouilles udon', '200g', 33),
('Sauce soja', '30ml', 33),
('Poisson', '200g', 34),
('Épices', '10g', 35),
('Sauce soja', '30ml', 35),
('Nouilles de riz', '200g', 36),
('Légumes', '200g', 36),
('Thé vert', '20g', 38),
('Tofu', '100g', 39),
('Algues', '10g', 39),
('Riz', '200g', 40),
('Accompagnements', '100g', 40),
('Nouilles udon', '200g', 41),
('Pâte', '200g', 42),
('Poulpe', '100g', 43);

-- Insertion des relations entre recettes et ingrédients
INSERT INTO Recipes_has_Ingredients (recipes_id, ingredients_id) VALUES 
(1, 1),
(1, 2),
(1, 3),
(1, 4),
(2, 5),
(2, 6),
(2, 7),
(3, 8),
(3, 9),
(3, 10),
(4, 11),
(4, 12),
(5, 13),
(5, 14),
(6, 15),
(6, 16),
(8, 17),
(9, 18),
(9, 19),
(11, 20),
(12, 21),
(12, 22),
(13, 23),
(13, 24),
(14, 25),
(14, 26),
(15, 27),
(16, 28),
(17, 29),
(18, 30),
(19, 31),
(19, 32),
(20, 33),
(21, 34),
(22, 35),
(22, 36),
(23, 37),
(24, 38),
(24, 39),
(25, 40),
(25, 41),
(27, 42),
(28, 43);

COMMIT;
