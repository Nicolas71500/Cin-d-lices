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
DROP TABLE IF EXISTS comment CASCADE;
DROP TABLE IF EXISTS Likes CASCADE;





CREATE TABLE Role (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP 
);

CREATE TABLE Users (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    first_name TEXT,
    last_name TEXT,
    username TEXT NOT NULL UNIQUE,
    email_address TEXT NOT NULL UNIQUE,
    password TEXT NOT NULL,
    role_id INTEGER REFERENCES Role(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP 
);

CREATE TABLE Category (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP 
);

CREATE TABLE DishTypes (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP 
);

CREATE TABLE Movies (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name TEXT NOT NULL,
    picture TEXT,
    anecdote TEXT,
    category_id INTEGER REFERENCES Category(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP 
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
    movie_id INTEGER REFERENCES Movies(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP 
);

CREATE TABLE Ingredients (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name TEXT NOT NULL,
    quantity TEXT NOT NULL,
    recipe_id INTEGER REFERENCES Recipes(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP 
);

CREATE TABLE Preparation (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    description TEXT NOT NULL,
    step_position INTEGER NOT NULL,
    recipes_id INTEGER REFERENCES Recipes(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP 
);

CREATE TABLE Recipes_has_Ingredients (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    recipes_id INTEGER REFERENCES Recipes(id),
    ingredients_id INTEGER REFERENCES Ingredients(id)
);

CREATE TABLE Comment(
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    content TEXT NOT NULL,
    note INTEGER NOT NULL,
    recipe_id INTEGER REFERENCES Recipes(id) ON DELETE CASCADE,
    user_id INTEGER REFERENCES Users(id) ON DELETE CASCADE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP 
);

CREATE TABLE Likes(
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    user_id INTEGER REFERENCES Users(id) ON DELETE CASCADE,
    recipe_id INTEGER REFERENCES Recipes(id) ON DELETE CASCADE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE (user_id, recipe_id)
);

-- Insertion des rôles
INSERT INTO Role (name) VALUES ('Admin'), ('User'), ('Guest');

-- Insertion des catégories
INSERT INTO Category (name) VALUES ('Film'), ('Série'), ('Animé');

-- Insertion des types de plats
INSERT INTO DishTypes (name) VALUES ('Boisson'), ('Plat'), ('Dessert'), ('Entrée');

-- Insertion des utilisateurs
INSERT INTO Users (first_name, last_name, username, email_address, password, role_id) VALUES
('John', 'john_doe', 'JD', 'john@example.com', '$2b$10$tE.quSqgpu18fiK5j82sCO6mUJ/JoPIxOVcSHzWY1ZQXYVVlWmBqO', 2),
('Jane', 'jane_doe', 'Janie', 'jane@example.com', '$2b$10$tE.quSqgpu18fiK5j82sCO6mUJ/JoPIxOVcSHzWY1ZQXYVVlWmBqO', 2),
('Alice', 'alice_wonder', 'Alice', 'alice@example.com', '$2b$10$tE.quSqgpu18fiK5j82sCO6mUJ/JoPIxOVcSHzWY1ZQXYVVlWmBqO', 2),
('Bob', 'bob_builder', 'Bob', 'bob@example.com', '$2b$10$tE.quSqgpu18fiK5j82sCO6mUJ/JoPIxOVcSHzWY1ZQXYVVlWmBqO', 2),
('Charlie', 'charlie_brown', 'Charlie', 'charlie@example.com', '$2b$10$tE.quSqgpu18fiK5j82sCO6mUJ/JoPIxOVcSHzWY1ZQXYVVlWmBqO', 2),
('Philippe', 'Etchebest', 'Fifi-Etchebest', 'fifi@gfaim.fr', '$2b$10$tE.quSqgpu18fiK5j82sCO6mUJ/JoPIxOVcSHzWY1ZQXYVVlWmBqO', 2),
('Cyril', 'Lignac', 'Cyril_Lignac', 'cici@gfaim.fr', '$2b$10$tE.quSqgpu18fiK5j82sCO6mUJ/JoPIxOVcSHzWY1ZQXYVVlWmBqO', 2),
('Brigitte', 'Macron', 'Bribri', 'jm@gmail.com', '$2b$10$tE.quSqgpu18fiK5j82sCO6mUJ/JoPIxOVcSHzWY1ZQXYVVlWmBqO', 2),
('Chuck', 'Norris', 'Chuck_Norris', 'walker@gmail.com', '$2b$10$tE.quSqgpu18fiK5j82sCO6mUJ/JoPIxOVcSHzWY1ZQXYVVlWmBqO',1);

-- Insertion des filmss
INSERT INTO Movies (name, picture, category_id) VALUES 
('Harry Potter', 'harrypotter.jpg', 1),
('Bob l''éponge', 'bob.png', 2),
('Le Seigneur des Anneaux', 'LOTR.jpg', 1),
('Ratatouille', 'rat.jpg', 1),
('Pulp Fiction', 'pulpe_fictive.webp', 1),
('Star Wars', 'starwars.png', 1),
('Le Grand Hotel Budapest', 'hotel.jpg',  1),
('V Pour Vendetta', 'v-pour-vendetta.png',  2),
('Les Désastreuses Aventures des Orphelins de Baudelaire', 'baudelaire.webp', 2),
('One Piece', 'onepiece.jpg', 3),
('Dragon Ball Z', 'dbz.jpg', 3),
('Les Tortues Ninja', 'les-tortues-ninja.png', 2),
('Seul oeil vert', 'oeil.webp', 1),
('Naruto', 'naruto.png', 3),
('Cowboy Bhiphop', 'bhip_hop.webp',  3),
('Pastrama', 'pastrama.webp',  2),
('Pokémon', 'pokemon.jpg',  3),
('Lupin', 'lupin.jpg',  1),
('Bleach', 'bleach.jpg',  3),
('Pirate des Caraïbes', 'pirate.jpg',  2),
('Le Livre de Boba Fett', 'boba-fett.png',  1),
('Breaking Bad', 'brbad.jpg',  2),
('Sherlock Holmes', 'chere_loque.webp',  2),
('Demons Slayer', 'demon-slayer.png',  3),
('Pretty Little Liars', 'desperate_little_liars.webp',  2),
('Dorie', 'dorie.png',  1),
('Fullmetal Alchemist', 'full-metal.jpg',  3),
('Game Of Thrones', 'game-of-thrones.jpg',  2),
('Good Eater', 'good_eater.webp',  3),
('The Dark Knight ', 'batman.jpg',  1),
('Narcos', 'narcos.jpeg',  2),
('Moi, Moche et Méchant', 'moi_moche_et_mes_champs.webp',  1),
('How I Met Your Mother', 'oh_i_met_your_mother_in_a_creepy_bar.webp',  2),
('La Reine des Neiges', 'reinedesneiges.jpg',  1),
('The Witcher', 'thewitcher.jpg',  2),
('Friends', 'friands.webp',  2),
('How To Get Away With A Burger', 'how_to_get_away_with_a_burger.webp',  2),
('Stanger Things', 'stangerthings.webp',  2),
('Death Note', 'deathnote.png',  3),
('Fairy Tail', 'fairy-tail.jpg',  3),
('Le Hobbit', 'hobbit.webp',  1),
('Walking Dead', 'marcheurs_morts.webp',  2),
('Matrix', 'matrix.jpg',  1),
('Olive et Tom', 'olive-et-tom.png',  3),
('Nicky Larson', 'nicky_lardon.webp',  3),
('Les Anneaux de Pouvoir', 'anneaux.jpg',  2),
('The Mask', 'themask.jpg',  1),
('Les dents de la Mer', 'jaws.png', 1);

-- Insertion des recettes
INSERT INTO Recipes (name, difficulty, anecdote, total_duration, picture, is_checked, user_id, dish_types_id, movie_id) VALUES
('Bière de beurre', 'Facile', 'Une boisson emblématique de l’univers de Harry Potterie, souvent servie dans les scènes de la Taverne des Trois Balais.', 15, 'biere_de_beurre.webp', TRUE, 1, 1, 1),
('Crabe au fromage', 'Moyenne', 'Son surnom venait de son passé de plongeur dans un grand restaurant gastronomique du centre de Lyon', 30, 'crabe_au_fromage.webp', TRUE, 2, 2, 2),
('Ragoût du Mordor','Difficile', 'Un met à emporter lors de votre trek dans le Mordor', 120, 'ragout_du_mordor.webp', TRUE, 3, 2, 3),
('Ratatouille', 'Moyenne', 'Un plat traditionnel provençal de légumes mijotés, comme dans le film Rate à Touille.', 60, 'ratatouille.webp', TRUE, 4, 2, 4),
('Milkshake à la vanille', 'Facile', 'Un milkshake à la vanille classique, comme celui bu par les personnages dans Pulpe Fictive.', 15, 'milkshake_vanille.webp', TRUE, 1, 1, 5),
('Cocktail Blue Milk', 'Facile', 'C''est la seule recette qu''un humain pourrait cuisiner dans cet univers.', 10, 'cocktail_blue_milk.webp', TRUE, 2, 1, 6),
('Gâteau au citron de Mendl', 'Difficile', 'Les principaux acteurs ont pris 20kg à force d''en manger tant ils en redemandaient', 90, 'gateau_citron_mendl.webp', TRUE, 3, 3, 7),
('Œuf camouflé', 'Difficile','Qui aurait cru qu''un homme aux goûts vestimentaires si discutables pourrait cuisiner si bien.', 120, 'oeuf_camoufle.webp', TRUE, 4, 2, 8),
('Cookies aux pépites de chocolat', 'Facile',  'Ils ont vraiment mis le feu à une maison en cuisinant cette recette !', 30, 'cookies_pepites_chocolat.webp', TRUE, 5, 3, 9),
('Bento japonais', 'Moyenne', 'Malgré son goût fabuleux, l''équipage en mange tellement souvent qu''ils n''en veulent plus en rentrant au port! ', 45, 'bento_japonais.webp', TRUE, 1, 2, 10),
('Curry de poulet', 'Moyenne', 'C''est le premier plat offert par un dragon aux humains!', 60, 'curry_poulet.webp', TRUE, 1, 2, 11),
('Pizza aux quatre fromages', 'Facile', 'Recette préférée de leur maître rat.', 45, 'pizza_quatre_fromages.webp', TRUE, 2, 2, 12),
('Ragoût de viande', 'Difficile', 'Une fois qu''il a retrouvé la vue en couleur, c''est l''un des premiers plats qu''il voit', 120, 'ragout_viande.webp', TRUE, 3, 2, 13),
('Ramen', 'Moyenne', 'La recette d''ichiraku, élue la meilleure à l''unanimité des clones', 45, 'ramen.webp', TRUE, 4, 2, 14),
('Burgers spatiaux', 'Facile', 'Des burgers avec des garnitures originales inspirés de Cowboy Bebop.', 30, 'burgers_spatiaux.webp', TRUE, 5, 2, 15),
('Burgers antiques', 'Facile', 'Des burgers créatifs inspirés de Futurama, parfaits pour un repas futuriste.', 30, 'burgers_antiques.webp', TRUE, 1, 2, 16),
('Sushis', 'Moyenne', 'Des sushis frais et variés, inspirés de l’univers de Pokémon.', 60, 'sushis.webp', TRUE, 2, 2, 17),
('Croissants au chocolat', 'Facile', 'Des croissants fourrés au chocolat, un délice inspiré par Lupin.', 30, 'croissants_chocolat.webp', TRUE, 3, 3, 18),
('Tacos mexicains', 'Facile', 'Des tacos garnis de viande et légumes, inspirés de l’univers de Bleach.', 45, 'tacos_mexicains.webp', TRUE, 4, 2, 19),
('Nachos', 'Facile', 'Des nachos garnis de fromage, inspirés par les aventures dans Better Call Saul.', 30, 'nachos.webp', TRUE, 5, 2, 20),
('Étouffé de Banthas', 'Difficile', 'Un plat d’étouffé de Banthas inspiré de l’univers de Boba Fett.', 90, 'etouffe_bantha.webp', TRUE, 1, 2, 21),
('Poulet frit', 'Facile', 'Un poulet frit savoureux inspiré de Breaking Bad.', 60, 'poulet_frit.webp', TRUE, 2, 2, 22),
('Scone anglais', 'Facile', 'Des scones traditionnels que Sherlock Holmes pourrait déguster avec son thé.', 30, 'scone_anglais.webp', TRUE, 3, 3, 23),
('Onigiri', 'Facile', 'Des onigiri japonais inspirés de Demon Slayer.', 45, 'onigiri.webp', TRUE, 4, 2, 24),
('Glace au caramel', 'Facile', 'Une glace au caramel douce inspirée de Pretty Little Liars.', 30, 'glace_caramel.webp', TRUE, 5, 3, 25),
('Dorade grillée', 'Moyenne', 'Un plat de dorade grillée, inspiré du film Le Monde de Dory.', 45, 'dorade_grillee.webp', TRUE, 1, 2, 26),
('Quiche lorraine', 'Moyenne', 'Une quiche lorraine savoureuse inspirée de Fullmetal Alchemist.', 60, 'quiche_lorraine.webp', TRUE, 2, 2, 27),
('Poulet au miel', 'Moyenne', 'Un poulet au miel épicé inspiré de Game of Thrones.', 90, 'poulet_miel.webp', TRUE, 3, 2, 28),
('Brochettes de viande', 'Facile', 'Des brochettes de viande inspirées de God Eater.', 45, 'brochettes_viande.webp', TRUE, 4, 2, 29),
('Cheesecake de Gotham', 'Difficile', 'Un cheesecake riche inspiré de The Dark Knight.', 120, 'cheesecake_gotham.webp', TRUE, 5, 3, 30),
('Empanadas', 'Moyenne', 'Des empanadas épicées inspirées de l’univers de Narcos.', 60, 'empanadas.webp', TRUE, 1, 2, 31),
('Cookies Minions', 'Facile', 'Des cookies amusants inspirés de Moi, Moche et Méchant.', 30, 'cookies_minions.webp', TRUE, 2, 3, 32),
('Dinde Rôtie', 'Moyenne', 'Une dinde rôtie inspirée de How I Met Your Mother.', 90, 'dinde_rotie.webp', TRUE, 3, 2, 33),
('Gâteau Elsa', 'Difficile', 'Un gâteau glacé inspiré de La Reine des Neiges.', 90, 'gateau_elsa.webp', TRUE, 4, 3, 34),
('Ragoût du Continent', 'Moyenne', 'Un ragoût inspiré de l’univers de The Witcher.', 75, 'ragout_continent.webp', TRUE, 5, 2, 35),
('Cheeseburger avec Sauce Marinara', 'Facile', 'Un cheeseburger avec une sauce marinara inspirée de Friends.', 45, 'cheeseburger_sauce_marinara.webp', TRUE, 1, 2, 36),
('Oeufs Benedict', 'Moyenne', 'Des oeufs Benedict élégants inspirés de How To Get Away With Murder.', 60, 'oeufs_benedict.webp', TRUE, 2, 2, 37),
('Gaufres Eggo', 'Facile', 'Des gaufres Eggo inspirées de Stranger Things.', 20, 'gaufres_eggo.webp', TRUE, 3, 3, 38),
('Ramen au Poulet', 'Moyenne', 'Des ramen au poulet inspirés de Death Note.', 45, 'ramen_poulet.webp', TRUE, 4, 2, 39),
('Soupe au Miso', 'Facile', 'Une soupe au miso inspirée de Fairy Tail.', 30, 'soupe_miso.webp', TRUE, 5, 2, 40),
('Pâté Hobbit', 'Moyenne', 'Un pâté traditionnel inspiré du Hobbit.', 60, 'pate_hobbit.webp', TRUE, 1, 2, 41),
('Cookie Zombie', 'Facile', 'Des cookies inspirés de The Walking Dead.', 30, 'cookie_zombie.webp', TRUE, 1, 3, 42),
('Curry Vert', 'Moyenne', 'Un curry vert inspiré de The Matrix.', 60, 'curry_vert.webp', TRUE, 2, 2, 43),
('Tapenade et Croûtons Aillés', 'Facile', 'Une tapenade avec croûtons aillés inspirée d’Olive et Tom.', 20, 'tapenade_croûtons.webp', TRUE, 3, 4, 44),
('Crevettes Sautées', 'Facile', 'Des crevettes sautées inspirées de Nicky Larson.', 30, 'crevettes_sautees.webp', TRUE, 5, 2, 45),
('Boeuf aux Oignons', 'Moyenne', 'Un plat de boeuf aux oignons inspiré des Anneaux de Pouvoir.', 75, 'boeuf_aux_oignons.webp', TRUE, 4, 2, 46),
('Tacos de Poulet', 'Facile', 'Des tacos au poulet inspirés de The Mask.', 45, 'tacos_poulet.webp', TRUE, 1, 2, 47),
('Poisson Grillé au Citron', 'Facile',  'Quand elle ne mange pas du requin, elle se fait cette recette.', 40, 'poisson_grille_citron.webp', TRUE, 1, 2, 48);

-- Insertion des étapes de préparation
INSERT INTO Preparation (description, step_position, recipes_id) VALUES
('Dans une grande casserole, chauffez le beurre jusqu’à ce qu’il fonde.', 1, 1),
('Ajoutez la bière et continuez à chauffer tout en remuant.', 2, 1),
('Incorporez les épices et laissez mijoter pendant quelques minutes.', 3, 1),
('Servez chaud dans des mugs, décoré de quelques épices supplémentaires si désiré.', 4, 1),
('Préparez le crabe en le nettoyant et en le découpant.', 1, 2),
('Mélangez le fromage avec des herbes et des épices.', 2, 2),
('Garnissez les morceaux de crabe avec le mélange de fromage.', 3, 2),
('Faites cuire au four jusqu’à ce que le fromage soit doré et bouillonnant.', 4, 2),
('Découpez la viande en morceaux et faites-la dorer dans une grande casserole.', 1, 3),
('Ajoutez les légumes coupés et faites revenir le tout.', 2, 3),
('Incorporez le bouillon et les épices, puis laissez mijoter.', 3, 3),
('Laissez cuire pendant plusieurs heures jusqu’à ce que la viande soit tendre.', 4, 3),
('Découpez les légumes en dés.', 1, 4),
('Faites revenir les oignons dans une grande poêle.', 2, 4),
('Ajoutez les légumes et faites cuire jusqu’à ce qu’ils soient tendres.', 3, 4),
('Assaisonnez avec des herbes et servez chaud.', 4, 4),
('Dans un mixeur, combinez la glace à la vanille et le lait.', 1, 5),
('Mixez jusqu’à obtenir une consistance lisse.', 2, 5),
('Versez dans un grand verre et servez immédiatement.', 3, 5),
('Dans un shaker, combinez les ingrédients du cocktail.', 1, 6),
('Secouez vigoureusement pour mélanger.', 2, 6),
('Versez dans un verre avec de la glace et servez.', 3, 6),
('Préparez la pâte en mélangeant le beurre, le sucre, et les œufs.', 1, 7),
('Incorporez la farine et le zeste de citron.', 2, 7),
('Versez dans un moule et faites cuire au four jusqu’à ce que le gâteau soit doré.', 3, 7),
('Laissez refroidir et glacer avec du glaçage au citron.', 4, 7),
('Dans un grand bol, mélangez la farine, la poudre de pain, la poudre de parmesan, la poudre de tomates séchées, le paprika, la poudre d’ail, le sel et le poivre noir.', 1, 8),
('Dans un autre bol, combinez le lait, l’œuf et la sauce soja. Fouettez jusqu’à homogénéité.', 2, 8),
('Formez une boule avec chaque œuf dur, puis roulez-les d’abord dans le mélange de farine pour les enrober.', 3, 8),
('Trempez les œufs enrobés de farine dans le mélange de lait, puis roulez-les de nouveau dans le mélange de farine pour une double couche.', 4, 8),
('Faites chauffer de l’huile dans une poêle à feu moyen. Faites frémir les œufs enrobés jusqu’à ce qu’ils soient dorés et croustillants.', 5, 8),
('Égouttez les œufs sur du papier absorbant et laissez refroidir avant de servir.', 6, 8),
('Mélangez le beurre, le sucre, et les œufs.', 1, 9),
('Incorporez la farine et les pépites de chocolat.', 2, 9),
('Formez des boules et disposez-les sur une plaque de cuisson.', 3, 9),
('Faites cuire au four jusqu’à ce que les cookies soient dorés.', 4, 9),
('Préparez les sushis en utilisant du riz, du poisson, et des algues.', 1, 10),
('Disposez les sushis dans une boîte bento.', 2, 10),
('Ajoutez des légumes marinés et des fruits.', 3, 10),
('Servez avec de la sauce soja et du wasabi.', 4, 10),
('Faites revenir les morceaux de poulet dans une poêle.', 1, 11),
('Ajoutez les légumes et les épices.', 2, 11),
('Incorporez le lait de coco et laissez mijoter jusqu’à ce que le poulet soit cuit.', 3, 11),
('Servez chaud avec du riz.', 4, 11),
('Préchauffez le four à 220°C (425°F). Étalez la pâte à pizza sur une plaque de cuisson.', 1, 12),
('Étalez la sauce tomate sur la pâte.', 2, 12),
('Parsemez de mozzarella, de cheddar, de parmesan, et de gorgonzola.', 3, 12),
('Enfournez pour 20 minutes ou jusqu’à ce que la croûte soit dorée et le fromage fondu.', 4, 12),
('Laissez refroidir légèrement avant de couper et servir.', 5, 12),
('Coupez la viande en morceaux et faites-la dorer dans une grande casserole.', 1, 13),
('Ajoutez des oignons, de l’ail, et des épices (comme du paprika et du cumin). Faites revenir.', 2, 13),
('Incorporez des légumes coupés (carottes, pommes de terre) et du bouillon.', 3, 13),
('Laissez mijoter à feu doux pendant environ 2 heures jusqu’à ce que la viande soit tendre.', 4, 13),
('Servez chaud avec du pain ou du riz.', 5, 13),
-- Ramen
('Faites cuire les nouilles ramen selon les instructions du paquet.', 1, 14),
('Préparez le bouillon avec du miso, du bouillon de poulet, et des épices.', 2, 14),
('Faites revenir des légumes (comme des champignons et des épinards) et des tranches de viande.', 3, 14),
('Assemblez le ramen en mettant les nouilles dans un bol, ajoutez le bouillon chaud, et garnissez de légumes et de viande.', 4, 14),
('Servez chaud avec des garnitures comme des œufs mollets et des oignons verts.', 5, 14),

-- Burgers spatiaux
('Formez des galettes de viande hachée et assaisonnez.', 1, 15),
('Grillez les galettes de viande jusqu’à ce qu’elles soient cuites à votre goût.', 2, 15),
('Assemblez les burgers avec des garnitures créatives comme du fromage, des légumes, et des sauces.', 3, 15),
('Servez avec des frites ou une salade.', 4, 15),

-- Burgers antiques
('Préparez des galettes de viande hachée et assaisonnez.', 1, 16),
('Grillez les galettes de viande jusqu’à ce qu’elles soient bien cuites.', 2, 16),
('Ajoutez des garnitures typiques comme du fromage, de la laitue, et des tomates sur les petits pains.', 3, 16),
('Servez les burgers avec des frites ou des chips.', 4, 16),

-- Sushis
('Préparez le riz à sushi selon les instructions.', 1, 17),
('Préparez des garnitures comme du poisson cru, des légumes, et des algues.', 2, 17),
('Enroulez le riz et les garnitures dans des feuilles d’algues ou formez des sushis nigiri.', 3, 17),
('Servez avec de la sauce soja, du wasabi, et du gingembre mariné.', 4, 17),

-- Croissants au chocolat
('Préparez la pâte à croissant selon les instructions.', 1, 18),
('Roulez la pâte en triangles et placez des morceaux de chocolat au centre.', 2, 18),
('Roulez les croissants et disposez-les sur une plaque de cuisson.', 3, 18),
('Enfournez à 180°C (350°F) pendant environ 15 minutes ou jusqu’à ce qu’ils soient dorés.', 4, 18),
('Laissez refroidir avant de servir.', 5, 18),

-- Tacos mexicains
('Préparez la viande en la faisant revenir avec des épices pour tacos.', 1, 19),
('Réchauffez les tortillas.', 2, 19),
('Garnissez les tortillas avec la viande, des légumes frais, et des sauces.', 3, 19),
('Servez avec des garnitures comme de la salsa et de la crème aigre.', 4, 19),

-- Nachos
('Disposez des chips de tortilla sur une plaque de cuisson.', 1, 20),
('Garnissez avec du fromage râpé et des jalapeños.', 2, 20),
('Faites chauffer jusqu’à ce que le fromage soit fondu.', 3, 20),
('Servez avec des garnitures comme de la salsa et de la crème aigre.', 4, 20),

-- Bantha
('Préparez la viande d’agneau en la coupant en morceaux.', 1, 21),
('Faites revenir la viande avec des oignons, de l’ail, et des épices.', 2, 21),
('Ajoutez des légumes, du bouillon, et laissez mijoter jusqu’à ce que la viande soit tendre.', 3, 21),
('Servez avec du riz ou du pain.', 4, 21),
-- Poulet frit
('Préparez une pâte à friture avec de la farine, des épices, et du lait.', 1, 22),
('Enrobez les morceaux de poulet dans la pâte.', 2, 22),
('Faites frémir les morceaux de poulet dans de l’huile chaude jusqu’à ce qu’ils soient dorés et croustillants.', 3, 22),
('Égouttez sur du papier absorbant et servez chaud.', 4, 22),
-- Scone anglais
('Préchauffez le four à 220°C (425°F). Mélangez la farine, le sucre, et la levure chimique dans un bol.', 1, 23),
('Ajoutez le beurre coupé en petits morceaux et mélangez jusqu’à obtenir une texture granuleuse.', 2, 23),
('Incorporez le lait et mélangez jusqu’à former une pâte.', 3, 23),
('Étalez la pâte sur une surface farinée et découpez des cercles.', 4, 23),
('Enfournez pendant 15-20 minutes ou jusqu’à ce qu’ils soient dorés. Servez tiède avec de la confiture et de la crème.', 5, 23),

-- Onigiri
('Préparez le riz à sushi selon les instructions.', 1, 24),
('Formez des triangles avec le riz et placez une garniture (comme du saumon ou des légumes) au centre.', 2, 24),
('Enveloppez les onigiri avec des feuilles d’algues si désiré.', 3, 24),
('Servez comme en-cas ou accompagnement.', 4, 24),

-- Glace caramel
('Faites chauffer de la crème et du sucre dans une casserole jusqu’à ce que le sucre soit dissous et le mélange épaissi.', 1, 25),
('Incorporez du caramel et mélangez bien.', 2, 25),
('Versez dans une sorbetière et faites tourner selon les instructions du fabricant.', 3, 25),
('Conservez au congélateur jusqu’à ce qu’elle soit bien prise.', 4, 25),

-- Dorade grillée
('Préchauffez le gril. Assaisonnez les filets de dorade avec du sel, du poivre, et des herbes.', 1, 26),
('Grillez les filets de dorade pendant environ 4-5 minutes de chaque côté ou jusqu’à ce qu’ils soient bien cuits.', 2, 26),
('Servez avec des légumes grillés ou une salade.', 3, 26),

-- Quiche lorraine
('Préchauffez le four à 180°C (350°F). Étalez la pâte dans un moule à tarte.', 1, 27),
('Faites revenir des lardons dans une poêle et égouttez-les.', 2, 27),
('Dans un bol, mélangez des œufs, de la crème, du lait, du sel, et du poivre.', 3, 27),
('Répartissez les lardons sur la pâte et versez le mélange d’œufs par-dessus.', 4, 27),
('Enfournez pendant 45-50 minutes jusqu’à ce que la quiche soit dorée et ferme.', 5, 27),

-- Poulet au miel
('Mélangez du miel, de la sauce soja, de l’ail, et du gingembre dans un bol pour faire la marinade.', 1, 28),
('Enrobez les morceaux de poulet dans la marinade et laissez reposer pendant au moins 30 minutes.', 2, 28),
('Faites cuire les morceaux de poulet dans une poêle ou au four jusqu’à ce qu’ils soient bien cuits et caramélisés.', 3, 28),
('Servez avec du riz ou des légumes.', 4, 28),

-- Brochettes de viande
('Coupez la viande en cubes et assaisonnez avec des épices.', 1, 29),
('Enfilez les morceaux de viande sur des brochettes.', 2, 29),
('Grillez les brochettes jusqu’à ce que la viande soit cuite à votre goût.', 3, 29),
('Servez avec des légumes grillés ou une sauce.', 4, 29),

-- Cheesecake de Gotham
('Préparez la croûte avec des biscuits écrasés et du beurre fondu. Pressez dans le fond d’un moule à charnière.', 1, 30),
('Préparez le mélange de fromage à la crème, du sucre, et des œufs jusqu’à obtenir une consistance lisse.', 2, 30),
('Versez le mélange sur la croûte et faites cuire à 160°C (325°F) pendant environ 60 minutes.', 3, 30),
('Laissez refroidir complètement avant de démouler. Réfrigérez avant de servir.', 4, 30),

-- Empanadas
('Préparez la pâte en mélangeant la farine, le beurre, et une pincée de sel. Formez une boule et laissez reposer.', 1, 31),
('Préparez la garniture en faisant revenir des oignons, de la viande hachée, et des épices.', 2, 31),
('Étalez la pâte, découpez des cercles, et garnissez-les avec la préparation.', 3, 31),
('Repliez les cercles pour former des demi-lunes et scellez les bords.', 4, 31),
('Enfournez à 200°C (400°F) pendant environ 20 minutes ou jusqu’à ce qu’elles soient dorées.', 5, 31),

('Préchauffez le four à 180°C (350°F). Mélangez de la farine, du sucre, du beurre, et des pépites de chocolat.', 1, 32),
('Formez des boules de pâte et disposez-les sur une plaque de cuisson.', 2, 32),
('Utilisez un moule à cookies ou façonnez les cookies en forme de Minions avec les mains.', 3, 32),
('Enfournez pendant 10-12 minutes ou jusqu’à ce que les cookies soient dorés.', 4, 32),
('Laissez refroidir sur une grille avant de déguster.', 5, 32),

-- Dinde Rôtie
('Préchauffez le four à 180°C (350°F). Assaisonnez la dinde avec du sel, du poivre, et des herbes.', 1, 33),
('Enfournez la dinde et faites-la rôtir pendant environ 1h30 à 2 heures, en la badigeonnant régulièrement.', 2, 33),
('Laissez reposer avant de découper.', 3, 33),
('Servez avec des légumes ou une purée.', 4, 33),

-- Gâteau Elsa
('Préparez la base du gâteau en mélangeant farine, sucre, œufs et beurre.', 1, 34),
('Ajoutez de la vanille et du lait, puis mélangez jusqu’à obtenir une pâte homogène.', 2, 34),
('Versez la pâte dans un moule et faites cuire au four pendant environ 60 minutes à 180°C (350°F).', 3, 34),
('Laissez refroidir, puis glacez le gâteau avec un glaçage bleu et blanc pour évoquer la glace.', 4, 34),
('Décorez avec des paillettes comestibles pour un effet glacé.', 5, 34),

-- Ragoût du Continent
('Faites revenir des morceaux de viande avec des oignons et de l’ail.', 1, 35),
('Ajoutez des légumes coupés en dés (carottes, pommes de terre) et des épices.', 2, 35),
('Versez du bouillon et laissez mijoter à feu doux pendant environ 60 minutes.', 3, 35),
('Servez chaud avec du pain frais.', 4, 35),

-- Cheeseburger avec Sauce Marinara
('Formez des galettes de viande hachée et faites-les cuire à la poêle.', 1, 36),
('Grillez des pains à burger et étalez de la sauce marinara sur chaque moitié.', 2, 36),
('Placez les galettes de viande sur les pains, ajoutez du fromage et faites fondre au four.', 3, 36),
('Ajoutez des garnitures comme des oignons et des cornichons, puis refermez les burgers.', 4, 36),

-- Oeufs Benedict
('Préparez les muffins anglais en les coupant en deux et en les faisant griller.', 1, 37),
('Pocher les œufs dans de l’eau bouillante avec du vinaigre jusqu’à ce qu’ils soient cuits mais encore coulants.', 2, 37),
('Préparez la sauce hollandaise en fouettant des jaunes d’œufs avec du beurre fondu, du citron et du sel.', 3, 37),
('Assemblez les œufs Benedict en plaçant les œufs pochés sur les muffins avec du jambon ou du bacon, puis nappez de sauce hollandaise.', 4, 37),

-- Gaufres Eggo
('Préparez la pâte à gaufres en mélangeant farine, œufs, lait et sucre.', 1, 38),
('Versez la pâte dans un gaufrier préchauffé et faites cuire jusqu’à ce que les gaufres soient dorées.', 2, 38),
('Servez avec des garnitures comme du sirop d’érable, des fruits frais, ou de la chantilly.', 3, 38),

-- Ramen au Poulet
('Préparez le bouillon en faisant mijoter du poulet avec des légumes, des épices et du bouillon.', 1, 39),
('Faites cuire les nouilles ramen selon les instructions.', 2, 39),
('Ajoutez le poulet et les légumes au bouillon, puis incorporez les nouilles.', 3, 39),
('Servez chaud avec des garnitures comme des œufs, des oignons verts, et du nori.', 4, 39),

-- Soupe au Miso
('Faites chauffer du bouillon dashi dans une casserole.', 1, 40),
('Ajoutez de la pâte de miso au bouillon et mélangez jusqu’à ce qu’elle soit complètement dissoute.', 2, 40),
('Ajoutez des cubes de tofu et des algues wakame, puis chauffez sans ébullition.', 3, 40),
('Servez chaud, garni d’oignons verts.', 4, 40),

-- Pâté Hobbit
('Préparez la pâte brisée en mélangeant farine, beurre, et un peu d’eau.', 1, 41),
('Étalez la pâte dans un moule à tarte et précuisez-la pendant 15 minutes.', 2, 41),
('Préparez la garniture en mélangeant viande hachée, légumes, et épices, puis remplissez la pâte précuite.', 3, 41),
('Cuisez le pâté au four pendant 45 minutes à 180°C (350°F).', 4, 41),

-- Cookie Zombie
('Préparez la pâte à cookies en mélangeant farine, sucre, beurre, et pépites de chocolat.', 1, 42),
('Formez des boules de pâte et disposez-les sur une plaque de cuisson.', 2, 42),
('Utilisez un moule pour créer des formes de zombies ou façonnez-les avec les mains.', 3, 42),
('Enfournez pendant 10-12 minutes ou jusqu’à ce que les cookies soient dorés.', 4, 42),
('Laissez refroidir sur une grille avant de déguster.', 5, 42),

-- Curry Vert
('Faites revenir des oignons et de la pâte de curry vert dans une casserole.', 1, 43),
('Ajoutez du lait de coco, des légumes et de la viande ou des fruits de mer.', 2, 43),
('Laissez mijoter jusqu’à ce que la viande soit cuite et les légumes tendres.', 3, 43),
('Servez avec du riz basmati.', 4, 43),

-- Tapenade et Croûtons Aillés
('Préparez la tapenade en mixant des olives, des câpres, de l’ail, et de l’huile d’olive.', 1, 44),
('Coupez du pain en tranches et faites-les griller.', 2, 44),
('Tartinez les croûtons avec la tapenade et servez.', 3, 44),

-- Crevettes Sautées
('Faites sauter des crevettes avec de l’ail et du gingembre dans une poêle.', 1, 45),
('Ajoutez des légumes comme des poivrons et des oignons.', 2, 45),
('Assaisonnez avec de la sauce soja et des épices.', 3, 45),
('Servez chaud avec du riz ou des nouilles.', 4, 45),

-- Boeuf aux Oignons
('Faites revenir des tranches de boeuf avec des oignons dans une poêle.', 1, 46),
('Ajoutez de la sauce soja, du sucre, et des épices.', 2, 46),
('Laissez mijoter jusqu’à ce que le boeuf soit tendre et bien imprégné de sauce.', 3, 46),
('Servez avec du riz ou des légumes.', 4, 46),

-- Tacos de Poulet
('Préparez le poulet en le faisant cuire avec des épices mexicaines.', 1, 47),
('Garnissez des tortillas de poulet, de légumes frais, et de fromage.', 2, 47),
('Servez avec des sauces comme la salsa ou la crème aigre.', 3, 47),

-- Poisson Grillé au Citron
('Assaisonnez des filets de poisson avec du sel, du poivre, et du jus de citron.', 1, 48),
('Grillez les filets de poisson jusqu’à ce qu’ils soient bien cuits.', 2, 48),
('Servez avec des quartiers de citron et des légumes grillés.', 3, 48);

-- Insertion des ingrédients
INSERT INTO Ingredients (name, quantity, recipe_id) VALUES 
-- Bière de Beurre 
('Beurre', '50g', 1),
('Bière', '500ml', 1),
('Épices (cannelle, clou de girofle)', '1 cuillère à café', 1),

-- Crabe au Fromage 
('Crabe', '500g', 2),
('Fromage râpé', '200g', 2),
('Herbes', '1 cuillère à soupe', 2),
('Épices', '1 cuillère à café', 2),

-- Ragoût du Mordor 
('Viande (bœuf)', '1kg', 3),
('Carottes', '3', 3),
('Pommes de terre', '4', 3),
('Oignons', '2', 3),
('Bouillon', '1L', 3),
('Épices', '2 cuillères à café', 3),

-- Ratatouille 
('Courgettes', '2', 4),
('Aubergines', '2', 4),
('Poivrons', '2', 4),
('Tomates', '4', 4),
('Oignons', '2', 4),
('Herbes (thym, basilic)', '1 cuillère à soupe', 4),
('Huile d’olive', '2 cuillères à soupe', 4),

-- Milkshake à la Vanille 
('Glace à la vanille', '200g', 5),
('Lait', '250ml', 5),
('Sucre', '1 cuillère à soupe', 5),

-- Cocktail Blue Milk 
('Lait', '200ml', 6),
('Sirop bleu', '50ml', 6),
('Rhum (optionnel)', '30ml', 6),

-- Gâteau au Citron de Mendl 
('Farine', '200g', 7),
('Sucre', '150g', 7),
('Beurre', '100g', 7),
('Œufs', '2', 7),
('Jus de citron', '50ml', 7),
('Zeste de citron', '1 cuillère à café', 7),

-- Œuf Camouflé 
('Œufs durs', '6', 8),
('Farine', '100g', 8),
('Lait', '100ml', 8),
('Chapelure', '100g', 8),
('Épices (paprika, ail en poudre)', '1 cuillère à café', 8),
('Huile pour friture', '500ml', 8),

-- Cookies aux Pépites de Chocolat 
('Beurre', '100g', 9),
('Sucre', '150g', 9),
('Œufs', '1', 9),
('Farine', '200g', 9),
('Pépites de chocolat', '150g', 9),

-- Bento Japonais 
('Riz', '200g', 10),
('Poisson (saumon ou thon)', '150g', 10),
('Algues nori', '2 feuilles', 10),
('Légumes marinés', '100g', 10),
('Fruits', '50g', 10),
('Sauce soja', '50ml', 10),
('Wasabi', 'au goût', 10),
-- Curry de Poulet
('Poulet', '500g', 11),
('Légumes (poivrons, carottes)', '200g', 11),
('Épices (curry, curcuma)', '2 cuillères à café', 11),
('Lait de coco', '400ml', 11),
('Riz', '200g', 11),

-- Pizza aux Quatre Fromages
('Pâte à pizza', '1', 12),
('Sauce tomate', '200ml', 12),
('Mozzarella', '100g', 12),
('Cheddar', '100g', 12),
('Parmesan', '50g', 12),
('Gorgonzola', '50g', 12),

-- Ragoût de Viande
('Viande (bœuf)', '1kg', 13),
('Oignons', '2', 13),
('Ail', '3 gousses', 13),
('Épices (paprika, cumin)', '1 cuillère à café', 13),
('Carottes', '3', 13),
('Pommes de terre', '4', 13),
('Bouillon', '1L', 13),

-- Ramen
('Nouilles ramen', '200g', 14),
('Bouillon de poulet', '500ml', 14),
('Miso', '2 cuillères à soupe', 14),
('Légumes (champignons, épinards)', '150g', 14),
('Viande (tranches de porc)', '150g', 14),
('Œufs mollets', '2', 14),
('Oignons verts', '2', 14),

-- Burgers Spatiaux
('Viande hachée', '500g', 15),
('Fromage', '4 tranches', 15),
('Légumes (laitue, tomates)', '100g', 15),
('Sauces', 'au goût', 15),
('Petits pains à burger', '4', 15),

-- Burgers Antiques
('Viande hachée', '500g', 16),
('Fromage', '4 tranches', 16),
('Laitue', '100g', 16),
('Tomates', '2', 16),
('Petits pains à burger', '4', 16),

-- Sushis
('Riz à sushi', '200g', 17),
('Poisson cru', '150g', 17),
('Algues nori', '5 feuilles', 17),
('Légumes (avocat, concombre)', '100g', 17),
('Sauce soja', '50ml', 17),
('Wasabi', 'au goût', 17),

-- Croissants au Chocolat
('Pâte à croissant', '1 rouleau', 18),
('Chocolat', '100g', 18),

-- Tacos Mexicains
('Viande hachée', '500g', 19),
('Épices pour tacos', '2 cuillères à soupe', 19),
('Tortillas', '6', 19),
('Légumes (salade, tomates)', '100g', 19),
('Sauces', 'au goût', 19),

-- Nachos
('Chips de tortilla', '200g', 20),
('Fromage râpé', '150g', 20),
('Jalapeños', '50g', 20),
('Salsa', '100g', 20),
('Crème aigre', '100g', 20),

-- Bantha
('Viande d’agneau', '800g', 21),
('Oignons', '2', 21),
('Ail', '3 gousses', 21),
('Épices (cumin, coriandre)', '1 cuillère à café', 21),
('Légumes (carottes, pommes de terre)', '300g', 21),
('Bouillon', '500ml', 21),
('Riz ou pain', 'au goût', 21),

-- Poulet frit
('Farine', '200g', 22),
('Épices (paprika, poivre)', '1 cuillère à café', 22),
('Lait', '150ml', 22),
('Poulet', '1kg', 22),
('Huile', 'pour friture', 22),

-- Scone anglais
('Farine', '250g', 23),
('Sucre', '50g', 23),
('Levure chimique', '1 cuillère à café', 23),
('Beurre', '60g', 23),
('Lait', '150ml', 23),
('Confiture', 'au goût', 23),
('Crème', 'au goût', 23),

-- Onigiri
('Riz à sushi', '200g', 24),
('Garniture (saumon ou légumes)', '100g', 24),
('Algues nori', '5 feuilles', 24),

-- Glace au caramel
('Crème', '500ml', 25),
('Sucre', '200g', 25),
('Caramel', '100g', 25),

-- Dorade grillée
('Filets de dorade', '4', 26),
('Sel', 'au goût', 26),
('Poivre', 'au goût', 26),
('Herbes (aneth, persil)', '1 cuillère à soupe', 26),

-- Quiche lorraine
('Pâte à tarte', '1 rouleau', 27),
('Lardons', '150g', 27),
('Œufs', '3', 27),
('Crème', '200ml', 27),
('Lait', '100ml', 27),
('Sel', 'au goût', 27),
('Poivre', 'au goût', 27),

-- Poulet au miel
('Miel', '100ml', 28),
('Sauce soja', '50ml', 28),
('Ail', '3 gousses', 28),
('Gingembre', '1 cuillère à café', 28),
('Poulet', '1kg', 28),

-- Brochettes de viande
('Viande (bœuf ou poulet)', '500g', 29),
('Épices (paprika, cumin)', '1 cuillère à café', 29),
('Légumes (poivrons, oignons)', '200g', 29),

-- Cheesecake de Gotham
('Biscuits écrasés', '200g', 30),
('Beurre fondu', '100g', 30),
('Fromage à la crème', '500g', 30),
('Sucre', '200g', 30),
('Œufs', '3', 30),

-- Empanadas
('Farine', '250g', 31),
('Beurre', '125g', 31),
('Sel', '1 pincée', 31),
('Oignons', '2', 31),
('Viande hachée', '300g', 31),
('Épices (cumin, paprika)', '1 cuillère à café', 31),

-- Cookies Minions
('Farine', '200g', 32),
('Sucre', '150g', 32),
('Beurre', '100g', 32),
('Pépites de chocolat', '100g', 32),

-- Dinde Rôtie
('Dinde', '1', 33),
('Sel', 'au goût', 33),
('Poivre', 'au goût', 33),
('Herbes (thym, romarin)', '1 cuillère à soupe', 33),

-- Gâteau Elsa
('Farine', '250g', 34),
('Sucre', '200g', 34),
('Œufs', '4', 34),
('Beurre', '150g', 34),
('Vanille', '1 cuillère à café', 34),
('Lait', '200ml', 34),
('Glaçage bleu et blanc', 'pour décorer', 34),
('Paillettes comestibles', 'pour décorer', 34),

-- Ragoût du Continent
('Viande (bœuf)', '500g', 35),
('Oignons', '2', 35),
('Ail', '3 gousses', 35),
('Carottes', '2', 35),
('Pommes de terre', '3', 35),
('Épices (paprika, thym)', '1 cuillère à café', 35),
('Bouillon', '500ml', 35),

-- Cheeseburger avec Sauce Marinara
('Viande hachée', '500g', 36),
('Pains à burger', '4', 36),
('Sauce marinara', '200ml', 36),
('Fromage', '4 tranches', 36),
('Oignons', '1', 36),
('Cornichons', 'au goût', 36),

-- Oeufs Benedict
('Muffins anglais', '4', 37),
('Œufs', '4', 37),
('Vinaigre', '1 cuillère à soupe', 37),
('Beurre', '100g', 37),
('Jus de citron', '1 cuillère à soupe', 37),
('Sel', 'au goût', 37),
('Jambon ou bacon', '4 tranches', 37),

-- Gaufres Eggo
('Farine', '250g', 38),
('Œufs', '2', 38),
('Lait', '200ml', 38),
('Sucre', '50g', 38),

-- Ramen au Poulet
('Bouillon', '1L', 39),
('Poulet', '300g', 39),
('Légumes (carottes, champignons)', '200g', 39),
('Épices (gingembre, ail)', '1 cuillère à café', 39),
('Nouilles ramen', '200g', 39),

-- Soupe au Miso
('Bouillon dashi', '500ml', 40),
('Pâte de miso', '3 cuillères à soupe', 40),
('Tofu', '200g', 40),
('Algues wakame', '10g', 40),
('Oignons verts', '2', 40),

-- Pâté Hobbit
('Farine', '250g', 41),
('Beurre', '125g', 41),
('Eau', '50ml', 41),
('Viande hachée', '300g', 41),
('Légumes (carottes, oignons)', '200g', 41),
('Épices (thym, paprika)', '1 cuillère à café', 41),

-- Cookie Zombie
('Farine', '200g', 42),
('Sucre', '150g', 42),
('Beurre', '100g', 42),
('Pépites de chocolat', '100g', 42),

-- Curry Vert
('Oignons', '2', 43),
('Pâte de curry vert', '2 cuillères à soupe', 43),
('Lait de coco', '400ml', 43),
('Légumes (poivrons, aubergines)', '200g', 43),
('Viande ou fruits de mer', '300g', 43),
('Riz basmati', '250g', 43),

-- Tapenade et Croûtons Aillés
('Olives', '200g', 44),
('Câpres', '2 cuillères à soupe', 44),
('Ail', '2 gousses', 44),
('Huile d’olive', '3 cuillères à soupe', 44),
('Pain', '1 baguette', 44),

-- Crevettes Sautées
('Crevettes', '300g', 45),
('Ail', '2 gousses', 45),
('Gingembre', '1 cuillère à soupe', 45),
('Poivrons', '1', 45),
('Oignons', '1', 45),
('Sauce soja', '2 cuillères à soupe', 45),
('Épices (piment, coriandre)', 'au goût', 45),

-- Boeuf aux Oignons
('Tranches de boeuf', '300g', 46),
('Oignons', '2', 46),
('Sauce soja', '3 cuillères à soupe', 46),
('Sucre', '1 cuillère à soupe', 46),
('Épices (poivre, gingembre)', '1 cuillère à café', 46),

-- Tacos de Poulet
('Poulet', '300g', 47),
('Épices mexicaines', '2 cuillères à soupe', 47),
('Tortillas', '4', 47),
('Légumes frais (laitue, tomates)', '200g', 47),
('Fromage', '100g', 47),
('Sauces (salsa, crème aigre)', 'au goût', 47),

-- Poisson Grillé au Citron
('Filets de poisson', '300g', 48),
('Sel', 'au goût', 48),
('Poivre', 'au goût', 48),
('Jus de citron', '2 cuillères à soupe', 48),
('Légumes grillés', '200g', 48);

-- Insertion des relations entre recettes et ingrédients
INSERT INTO Recipes_has_Ingredients (recipes_id, ingredients_id) VALUES 
(1, 1), -- Beurre
(1, 2), -- Bière
(1, 3), -- Épices

-- Recettes et Ingrédients associés pour recipe_id 2

(2, 4), -- Crabe
(2, 5), -- Fromage
(2, 6), -- Herbes et épices

-- Recettes et Ingrédients associés pour recipe_id 3

(3, 7), -- Viande
(3, 8), -- Légumes
(3, 9), -- Bouillon
(3, 10), -- Épices

-- Recettes et Ingrédients associés pour recipe_id 4

(4, 11), -- Légumes
(4, 12), -- Oignons
(4, 13), -- Herbes

-- Recettes et Ingrédients associés pour recipe_id 5

(5, 14), -- Glace à la vanille
(5, 15), -- Lait

-- Recettes et Ingrédients associés pour recipe_id 6

(6, 16), -- Ingrédients du cocktail

-- Recettes et Ingrédients associés pour recipe_id 7

(7, 17), -- Beurre
(7, 18), -- Sucre
(7, 19), -- Œufs
(7, 20), -- Farine
(7, 21), -- Zeste de citron
(7, 22), -- Glaçage au citron

-- Recettes et Ingrédients associés pour recipe_id 8

(8, 23), -- Farine
(8, 24), -- Lait
(8, 25), -- Œuf
(8, 26), -- Sauce soja
(8, 27), -- Poudre de pain
(8, 28), -- Poudre de parmesan
(8, 29), -- Poudre de tomates séchées
(8, 30), -- Paprika
(8, 31), -- Poudre d’ail
(8, 32), -- Sel
(8, 33), -- Poivre noir

-- Recettes et Ingrédients associés pour recipe_id 9

(9, 34), -- Beurre
(9, 35), -- Sucre
(9, 36), -- Œufs
(9, 37), -- Farine
(9, 38), -- Pépites de chocolat

-- Recettes et Ingrédients associés pour recipe_id 10

(10, 39), -- Riz
(10, 40), -- Poisson
(10, 41), -- Algues
(10, 42), -- Légumes marinés
(10, 43), -- Fruits
(10, 44), -- Sauce soja
(10, 45), -- Wasabi

-- Recettes et Ingrédients associés pour recipe_id 11

(11, 46), -- Poulet
(11, 47), -- Légumes
(11, 48), -- Épices
(11, 49), -- Lait de coco

-- Recettes et Ingrédients associés pour recipe_id 12

(12, 50), -- Pâte à pizza
(12, 51), -- Sauce tomate
(12, 52), -- Mozzarella
(12, 53), -- Cheddar
(12, 54), -- Parmesan
(12, 55), -- Gorgonzola

-- Recettes et Ingrédients associés pour recipe_id 13

(13, 56), -- Viande
(13, 57), -- Oignons
(13, 58), -- Ail
(13, 59), -- Paprika
(13, 60), -- Cumin
(13, 61), -- Légumes
(13, 62), -- Bouillon

-- Recettes et Ingrédients associés pour recipe_id 14

(14, 63), -- Nouilles ramen
(14, 64), -- Miso
(14, 65), -- Bouillon de poulet
(14, 66), -- Épices
(14, 67), -- Légumes
(14, 68), -- Viande
(14, 69), -- Œufs mollets
(14, 70), -- Oignons verts
(14, 71), -- Nori

-- Recettes et Ingrédients associés pour recipe_id 15

(15, 72), -- Viande hachée
(15, 73), -- Fromage
(15, 74), -- Légumes
(15, 75), -- Sauces
(15, 76), -- Frites

-- Recettes et Ingrédients associés pour recipe_id 16

(16, 77), -- Viande hachée
(16, 78), -- Fromage
(16, 79), -- Laitue
(16, 80), -- Tomates
(16, 81), -- Petits pains
(16, 82), -- Frites
(16, 83), -- Chips

-- Recettes et Ingrédients associés pour recipe_id 17

(17, 84), -- Riz à sushi
(17, 85), -- Poisson cru
(17, 86), -- Légumes
(17, 87), -- Algues
(17, 88), -- Sauce soja
(17, 89), -- Wasabi
(17, 90), -- Gingembre mariné

-- Recettes et Ingrédients associés pour recipe_id 18

(18, 91), -- Pâte à croissant
(18, 92), -- Chocolat

-- Recettes et Ingrédients associés pour recipe_id 19

(19, 93), -- Viande
(19, 94), -- Épices pour tacos
(19, 95), -- Tortillas
(19, 96), -- Légumes frais
(19, 97), -- Sauces

-- Recettes et Ingrédients associés pour recipe_id 20

(20, 98), -- Chips de tortilla
(20, 99), -- Fromage râpé
(20, 100), -- Jalapeños
(20, 101), -- Salsa
(20, 102), -- Crème aigre

-- Recettes et Ingrédients associés pour recipe_id 21

(21, 103), -- Viande d’agneau
(21, 104), -- Oignons
(21, 105), -- Ail
(21, 106), -- Épices
(21, 107), -- Légumes
(21, 108), -- Bouillon

-- Recettes et Ingrédients associés pour recipe_id 22

(22, 109), -- Farine
(22, 110), -- Épices
(22, 111), -- Lait
(22, 112), -- Poulet
(22, 113), -- Huile

-- Recettes et Ingrédients associés pour recipe_id 23

(23, 114), -- Farine
(23, 115), -- Sucre
(23, 116), -- Levure chimique
(23, 117), -- Beurre
(23, 118), -- Lait
(23, 119), -- Confiture
(23, 120), -- Crème

-- Recettes et Ingrédients associés pour recipe_id 24

(24, 121), -- Riz à sushi
(24, 122), -- Garniture
(24, 123), -- Feuilles d’algues

-- Recettes et Ingrédients associés pour recipe_id 25

(25, 124), -- Crème
(25, 125), -- Sucre
(25, 126), -- Caramel

-- Recettes et Ingrédients associés pour recipe_id 26

(26, 127), -- Filets de dorade
(26, 128), -- Sel
(26, 129), -- Poivre
(26, 130), -- Herbes

-- Recettes et Ingrédients associés pour recipe_id 27

(27, 131), -- Pâte à tarte
(27, 132), -- Lardons
(27, 133), -- Crème
(27, 134), -- Œufs
(27, 135), -- Lait
(27, 136), -- Sel
(27, 137), -- Poivre

-- Recettes et Ingrédients associés pour recipe_id 28

(28, 138), -- Miel
(28, 139), -- Sauce soja
(28, 140), -- Ail
(28, 141), -- Gingembre
(28, 142), -- Poulet

-- Recettes et Ingrédients associés pour recipe_id 29

(29, 143), -- Viande
(29, 144), -- Épices
(29, 145), -- Brochettes

-- Recettes et Ingrédients associés pour recipe_id 30

(30, 146), -- Biscuits
(30, 147), -- Beurre
(30, 148), -- Fromage à la crème
(30, 149), -- Sucre
(30, 150), -- Œufs

-- Recettes et Ingrédients associés pour recipe_id 31

(31, 151), -- Farine
(31, 152), -- Beurre
(31, 153), -- Sel
(31, 154), -- Viande hachée
(31, 155), -- Oignons
(31, 156), -- Épices

-- Recettes et Ingrédients associés pour recipe_id 32

(32, 157), -- Farine
(32, 158), -- Sucre
(32, 159), -- Beurre
(32, 160), -- Pépites de chocolat

-- Recettes et Ingrédients associés pour recipe_id 33

(33, 161), -- Dinde
(33, 162), -- Herbes
(33, 163), -- Sel
(33, 164), -- Poivre

-- Recettes et Ingrédients associés pour recipe_id 34

(34, 165), -- Farine
(34, 166), -- Sucre
(34, 167), -- Œufs
(34, 168), -- Beurre
(34, 169), -- Vanille
(34, 170), -- Lait
(34, 171), -- Glaçage bleu
(34, 172), -- Paillettes comestibles

-- Recettes et Ingrédients associés pour recipe_id 35

(35, 173), -- Viande
(35, 174), -- Oignons
(35, 175), -- Ail
(35, 176), -- Épices
(35, 177), -- Légumes
(35, 178), -- Bouillon

-- Recettes et Ingrédients associés pour recipe_id 36

(36, 179), -- Viande hachée
(36, 180), -- Fromage
(36, 181), -- Sauce marinara
(36, 182), -- Pains à burger
(36, 183), -- Garnitures

-- Recettes et Ingrédients associés pour recipe_id 37

(37, 184), -- Muffins anglais
(37, 185), -- Œufs
(37, 186), -- Sauce hollandaise
(37, 187), -- Jambon
(37, 188), -- Bacon

-- Recettes et Ingrédients associés pour recipe_id 38

(38, 189), -- Farine
(38, 190), -- Œufs
(38, 191), -- Lait
(38, 192), -- Sucre
(38, 193), -- Sirop d’érable
(38, 194), -- Fruits frais
(38, 195), -- Chantilly

-- Recettes et Ingrédients associés pour recipe_id 39

(39, 196), -- Bouillon
(39, 197), -- Poulet
(39, 198), -- Nouilles ramen
(39, 199), -- Légumes
(39, 200), -- Garnitures

-- Recettes et Ingrédients associés pour recipe_id 40

(40, 201), -- Bouillon dashi
(40, 202), -- Pâte de miso
(40, 203), -- Tofu
(40, 204), -- Algues wakame
(40, 205), -- Oignons verts


(41, 206), -- Farine
(41, 207), -- Beurre
(41, 208), -- Eau
(41, 209), -- Viande hachée
(41, 210), -- Légumes
(41, 211), -- Épices

-- Recettes et Ingrédients associés pour recipe_id 42 (Cookie Zombie)

(42, 212), -- Farine
(42, 213), -- Sucre
(42, 214), -- Beurre
(42, 215), -- Pépites de chocolat

-- Recettes et Ingrédients associés pour recipe_id 43 (Curry Vert)

(43, 216), -- Oignons
(43, 217), -- Pâte de curry vert
(43, 218), -- Lait de coco
(43, 219), -- Légumes
(43, 220), -- Viande ou fruits de mer

-- Recettes et Ingrédients associés pour recipe_id 44 (Tapenade et Croûtons Aillés)

(44, 221), -- Olives
(44, 222), -- Câpres
(44, 223), -- Ail
(44, 224), -- Huile d’olive
(44, 225), -- Pain

-- Recettes et Ingrédients associés pour recipe_id 45 (Crevettes Sautées)

(45, 226), -- Crevettes
(45, 227), -- Ail
(45, 228), -- Gingembre
(45, 229), -- Poivrons
(45, 230), -- Oignons
(45, 231), -- Sauce soja

-- Recettes et Ingrédients associés pour recipe_id 46 (Boeuf aux Oignons)

(46, 232), -- Bœuf
(46, 233), -- Oignons
(46, 234), -- Sauce soja
(46, 235), -- Sucre
(46, 236), -- Épices

-- Recettes et Ingrédients associés pour recipe_id 47 (Tacos de Poulet)

(47, 237), -- Poulet
(47, 238), -- Épices mexicaines
(47, 239), -- Tortillas
(47, 240), -- Légumes frais
(47, 241), -- Fromage
(47, 242), -- Salsa
(47, 243), -- Crème aigre

-- Recettes et Ingrédients associés pour recipe_id 48 (Poisson Grillé au Citron)

(48, 244), -- Filets de poisson
(48, 245), -- Sel
(48, 246), -- Poivre
(48, 247), -- Jus de citron
(48, 248); -- Légumes grillés

INSERT INTO Comment (content, note, recipe_id, user_id) VALUES
('Vraiment pas mal cette recette! Avec du piment d''Espelette c''est encore mieux!',4.5,2,6),
('Du fondant, du croquant, du peps, moi j''aime bien, c''est élégant et gouteux on se fait plaisir d''abord avec les yeux !',5,7,7);

INSERT INTO Likes(user_id,recipe_id) VALUES
(2,2);

COMMIT;
