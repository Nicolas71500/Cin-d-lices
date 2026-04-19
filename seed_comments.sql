-- Seed commentaires — Cinédelices
-- Utilise les noms de recettes pour retrouver les IDs dynamiquement

INSERT INTO comment (content, note, recipe_id, user_id, parent_id, created_at, updated_at) VALUES

-- Bière de beurre
('Une recette magique, exactement comme dans les livres ! J''ai adoré la mousse crémeuse.', 5, (SELECT id FROM recipes WHERE name = 'Bière de beurre'), 3, NULL, NOW() - INTERVAL '10 days', NOW() - INTERVAL '10 days'),
('Délicieux mais très sucré, à consommer avec modération !', 4, (SELECT id FROM recipes WHERE name = 'Bière de beurre'), 7, NULL, NOW() - INTERVAL '8 days', NOW() - INTERVAL '8 days'),
('Mes enfants ont adoré, on s''est crus à Poudlard !', 5, (SELECT id FROM recipes WHERE name = 'Bière de beurre'), 2, NULL, NOW() - INTERVAL '5 days', NOW() - INTERVAL '5 days'),

-- Crabe au fromage
('Le mariage crabe-fromage est surprenant mais vraiment réussi.', 4, (SELECT id FROM recipes WHERE name = 'Crabe au fromage'), 1, NULL, NOW() - INTERVAL '12 days', NOW() - INTERVAL '12 days'),
('Recette originale, je n''aurais jamais pensé à cette combinaison !', 3, (SELECT id FROM recipes WHERE name = 'Crabe au fromage'), 9, NULL, NOW() - INTERVAL '6 days', NOW() - INTERVAL '6 days'),

-- Ragoût du Mordor
('Sombre, robuste, parfait pour une soirée marathon du Seigneur des Anneaux.', 5, (SELECT id FROM recipes WHERE name = 'Ragoût du Mordor'), 5, NULL, NOW() - INTERVAL '15 days', NOW() - INTERVAL '15 days'),
('Un peu long à préparer mais le résultat en vaut vraiment la peine.', 4, (SELECT id FROM recipes WHERE name = 'Ragoût du Mordor'), 8, NULL, NOW() - INTERVAL '9 days', NOW() - INTERVAL '9 days'),
('On ne marche pas vers le Mordor, mais on cuisine ce ragoût avec plaisir !', 5, (SELECT id FROM recipes WHERE name = 'Ragoût du Mordor'), 10, NULL, NOW() - INTERVAL '3 days', NOW() - INTERVAL '3 days'),

-- Ratatouille
('Rémi serait fier ! La présentation en tranches fines est magnifique.', 5, (SELECT id FROM recipes WHERE name = 'Ratatouille'), 6, NULL, NOW() - INTERVAL '20 days', NOW() - INTERVAL '20 days'),
('Recette classique bien expliquée, j''ai suivi chaque étape sans problème.', 4, (SELECT id FROM recipes WHERE name = 'Ratatouille'), 4, NULL, NOW() - INTERVAL '11 days', NOW() - INTERVAL '11 days'),

-- Milkshake à la vanille
('Onctueux et savoureux, comme dans les diners américains des années 50 !', 5, (SELECT id FROM recipes WHERE name = 'Milkshake à la vanille'), 2, NULL, NOW() - INTERVAL '7 days', NOW() - INTERVAL '7 days'),
('Parfait pour l''été, très rafraîchissant.', 4, (SELECT id FROM recipes WHERE name = 'Milkshake à la vanille'), 1, NULL, NOW() - INTERVAL '4 days', NOW() - INTERVAL '4 days'),

-- Cocktail Blue Milk
('Iconique ! La couleur bleue est parfaite et le goût est vraiment unique.', 5, (SELECT id FROM recipes WHERE name = 'Cocktail Blue Milk'), 9, NULL, NOW() - INTERVAL '18 days', NOW() - INTERVAL '18 days'),
('Mes amis fans de Star Wars ont été bluffés lors de ma soirée ciné.', 5, (SELECT id FROM recipes WHERE name = 'Cocktail Blue Milk'), 3, NULL, NOW() - INTERVAL '10 days', NOW() - INTERVAL '10 days'),
('Un peu sucré à mon goût mais visuellement époustouflant.', 3, (SELECT id FROM recipes WHERE name = 'Cocktail Blue Milk'), 7, NULL, NOW() - INTERVAL '2 days', NOW() - INTERVAL '2 days'),

-- Gâteau au citron de Mendl
('Les Délices de Mendl dans votre cuisine ! Le glaçage est divin.', 5, (SELECT id FROM recipes WHERE name = 'Gâteau au citron de Mendl'), 2, NULL, NOW() - INTERVAL '14 days', NOW() - INTERVAL '14 days'),
('Recette bien détaillée, j''ai réussi du premier coup !', 5, (SELECT id FROM recipes WHERE name = 'Gâteau au citron de Mendl'), 6, NULL, NOW() - INTERVAL '7 days', NOW() - INTERVAL '7 days'),

-- Œuf camouflé
('Technique impressionnante, mes invités n''ont pas compris ce qu''ils mangeaient au début !', 4, (SELECT id FROM recipes WHERE name = 'Œuf camouflé'), 4, NULL, NOW() - INTERVAL '16 days', NOW() - INTERVAL '16 days'),
('Créatif et délicieux, une belle façon de revisiter l''œuf.', 4, (SELECT id FROM recipes WHERE name = 'Œuf camouflé'), 8, NULL, NOW() - INTERVAL '5 days', NOW() - INTERVAL '5 days'),

-- Cookies aux pépites de chocolat
('Les meilleurs cookies que j''aie jamais faits, la texture est parfaite.', 5, (SELECT id FROM recipes WHERE name = 'Cookies aux pépites de chocolat'), 1, NULL, NOW() - INTERVAL '22 days', NOW() - INTERVAL '22 days'),
('Croustillants dehors, moelleux dedans — exactement ce qu''il faut.', 5, (SELECT id FROM recipes WHERE name = 'Cookies aux pépites de chocolat'), 5, NULL, NOW() - INTERVAL '13 days', NOW() - INTERVAL '13 days'),
('Disparus en 10 minutes à la maison !', 5, (SELECT id FROM recipes WHERE name = 'Cookies aux pépites de chocolat'), 10, NULL, NOW() - INTERVAL '1 days', NOW() - INTERVAL '1 days'),

-- Bento japonais
('Magnifique à regarder autant qu''à manger. Très satisfaisant à préparer.', 5, (SELECT id FROM recipes WHERE name = 'Bento japonais'), 3, NULL, NOW() - INTERVAL '19 days', NOW() - INTERVAL '19 days'),
('Un peu de temps mais le résultat est vraiment beau, parfait pour les lunchbox.', 4, (SELECT id FROM recipes WHERE name = 'Bento japonais'), 7, NULL, NOW() - INTERVAL '8 days', NOW() - INTERVAL '8 days'),

-- Curry de poulet
('Épices bien dosées, saveurs riches — ce curry est une vraie réussite.', 5, (SELECT id FROM recipes WHERE name = 'Curry de poulet'), 9, NULL, NOW() - INTERVAL '25 days', NOW() - INTERVAL '25 days'),
('J''ai ajouté un peu de lait de coco, encore meilleur !', 4, (SELECT id FROM recipes WHERE name = 'Curry de poulet'), 2, NULL, NOW() - INTERVAL '12 days', NOW() - INTERVAL '12 days'),

-- Pizza aux quatre fromages
('La combinaison de fromages est parfaite, la pâte croustillante à souhait.', 5, (SELECT id FROM recipes WHERE name = 'Pizza aux quatre fromages'), 6, NULL, NOW() - INTERVAL '17 days', NOW() - INTERVAL '17 days'),
('Simple mais délicieux, maintenant je ne commande plus de pizza !', 4, (SELECT id FROM recipes WHERE name = 'Pizza aux quatre fromages'), 4, NULL, NOW() - INTERVAL '6 days', NOW() - INTERVAL '6 days'),

-- Ragoût de viande
('Réconfortant et savoureux, parfait pour les soirées d''hiver.', 4, (SELECT id FROM recipes WHERE name = 'Ragoût de viande'), 8, NULL, NOW() - INTERVAL '30 days', NOW() - INTERVAL '30 days'),
('La viande est tellement tendre après la longue cuisson.', 5, (SELECT id FROM recipes WHERE name = 'Ragoût de viande'), 1, NULL, NOW() - INTERVAL '15 days', NOW() - INTERVAL '15 days'),

-- Ramen
('Le bouillon maison est incomparable, ça vaut vraiment l''effort.', 5, (SELECT id FROM recipes WHERE name = 'Ramen'), 5, NULL, NOW() - INTERVAL '21 days', NOW() - INTERVAL '21 days'),
('Un peu complexe mais les instructions sont claires, résultat au top !', 4, (SELECT id FROM recipes WHERE name = 'Ramen'), 10, NULL, NOW() - INTERVAL '9 days', NOW() - INTERVAL '9 days'),
('Meilleur que beaucoup de restaurants japonais de ma ville !', 5, (SELECT id FROM recipes WHERE name = 'Ramen'), 3, NULL, NOW() - INTERVAL '3 days', NOW() - INTERVAL '3 days'),

-- Burgers spatiaux
('Futuriste et délicieux ! La sauce secrète fait toute la différence.', 5, (SELECT id FROM recipes WHERE name = 'Burgers spatiaux'), 7, NULL, NOW() - INTERVAL '13 days', NOW() - INTERVAL '13 days'),
('Parfait pour une soirée SF, à refaire absolument.', 4, (SELECT id FROM recipes WHERE name = 'Burgers spatiaux'), 9, NULL, NOW() - INTERVAL '4 days', NOW() - INTERVAL '4 days'),

-- Burgers antiques
('Une recette qui traverse les âges ! Ingrédients simples, goût authentique.', 4, (SELECT id FROM recipes WHERE name = 'Burgers antiques'), 2, NULL, NOW() - INTERVAL '28 days', NOW() - INTERVAL '28 days'),
('Rusique et savoureux, j''adore le concept.', 4, (SELECT id FROM recipes WHERE name = 'Burgers antiques'), 6, NULL, NOW() - INTERVAL '10 days', NOW() - INTERVAL '10 days'),

-- Sushis
('Technique bien expliquée, mes sushis ont fière allure pour une première fois !', 4, (SELECT id FROM recipes WHERE name = 'Sushis'), 1, NULL, NOW() - INTERVAL '35 days', NOW() - INTERVAL '35 days'),
('Le riz vinaigré est la clé, et cette recette le maîtrise parfaitement.', 5, (SELECT id FROM recipes WHERE name = 'Sushis'), 8, NULL, NOW() - INTERVAL '18 days', NOW() - INTERVAL '18 days'),

-- Croissants au chocolat
('Feuilletage magnifique, le chocolat fond dans la bouche — sublime !', 5, (SELECT id FROM recipes WHERE name = 'Croissants au chocolat'), 3, NULL, NOW() - INTERVAL '40 days', NOW() - INTERVAL '40 days'),
('Long à faire mais tellement gratifiant. Le week-end idéal.', 5, (SELECT id FROM recipes WHERE name = 'Croissants au chocolat'), 5, NULL, NOW() - INTERVAL '20 days', NOW() - INTERVAL '20 days'),

-- Tacos mexicains
('Authentiques et savoureux ! La marinade de la viande est excellente.', 5, (SELECT id FROM recipes WHERE name = 'Tacos mexicains'), 7, NULL, NOW() - INTERVAL '11 days', NOW() - INTERVAL '11 days'),
('Toute ma famille a adoré, on en a refait deux fois dans la semaine.', 5, (SELECT id FROM recipes WHERE name = 'Tacos mexicains'), 4, NULL, NOW() - INTERVAL '5 days', NOW() - INTERVAL '5 days'),

-- Nachos
('Croustillants et bien garnis, parfaits pour regarder un film !', 5, (SELECT id FROM recipes WHERE name = 'Nachos'), 9, NULL, NOW() - INTERVAL '9 days', NOW() - INTERVAL '9 days'),
('La sauce fromage maison est une révélation.', 4, (SELECT id FROM recipes WHERE name = 'Nachos'), 10, NULL, NOW() - INTERVAL '2 days', NOW() - INTERVAL '2 days'),

-- Étouffé de Banthas
('Recette galactique ! Les épices sont parfaitement équilibrées.', 5, (SELECT id FROM recipes WHERE name = 'Étouffé de Banthas'), 2, NULL, NOW() - INTERVAL '23 days', NOW() - INTERVAL '23 days'),
('On se croirait dans une cantine de la République !', 4, (SELECT id FROM recipes WHERE name = 'Étouffé de Banthas'), 6, NULL, NOW() - INTERVAL '7 days', NOW() - INTERVAL '7 days'),

-- Poulet frit
('Croustillant comme dans les fast-foods mais en bien meilleur !', 5, (SELECT id FROM recipes WHERE name = 'Poulet frit'), 1, NULL, NOW() - INTERVAL '16 days', NOW() - INTERVAL '16 days'),
('La double panure change tout, le résultat est parfait.', 5, (SELECT id FROM recipes WHERE name = 'Poulet frit'), 8, NULL, NOW() - INTERVAL '6 days', NOW() - INTERVAL '6 days'),

-- Scone anglais
('Parfait pour un tea time ! Texture légère et goût délicat.', 5, (SELECT id FROM recipes WHERE name = 'Scone anglais'), 3, NULL, NOW() - INTERVAL '14 days', NOW() - INTERVAL '14 days'),
('Avec de la clotted cream et de la confiture, c''est le paradis.', 5, (SELECT id FROM recipes WHERE name = 'Scone anglais'), 7, NULL, NOW() - INTERVAL '4 days', NOW() - INTERVAL '4 days'),

-- Onigiri
('Adorable et délicieux ! Le façonnage triangulaire est bien expliqué.', 4, (SELECT id FROM recipes WHERE name = 'Onigiri'), 5, NULL, NOW() - INTERVAL '27 days', NOW() - INTERVAL '27 days'),
('Parfait pour les pique-niques, mes enfants adorent en faire avec moi.', 5, (SELECT id FROM recipes WHERE name = 'Onigiri'), 2, NULL, NOW() - INTERVAL '8 days', NOW() - INTERVAL '8 days'),

-- Glace au caramel
('Crémeuse et intense en goût, bien meilleure que du commerce.', 5, (SELECT id FROM recipes WHERE name = 'Glace au caramel'), 9, NULL, NOW() - INTERVAL '32 days', NOW() - INTERVAL '32 days'),
('Le caramel légèrement salé est divin !', 5, (SELECT id FROM recipes WHERE name = 'Glace au caramel'), 4, NULL, NOW() - INTERVAL '11 days', NOW() - INTERVAL '11 days'),

-- Dorade grillée
('Cuisson parfaite, la chair est fondante et les herbes très parfumées.', 5, (SELECT id FROM recipes WHERE name = 'Dorade grillée'), 6, NULL, NOW() - INTERVAL '19 days', NOW() - INTERVAL '19 days'),
('Simple et élégant, un plat de restaurant à la maison.', 4, (SELECT id FROM recipes WHERE name = 'Dorade grillée'), 10, NULL, NOW() - INTERVAL '5 days', NOW() - INTERVAL '5 days'),

-- Quiche lorraine
('La quiche lorraine parfaite : appareil bien dosé, pâte croustillante.', 5, (SELECT id FROM recipes WHERE name = 'Quiche lorraine'), 1, NULL, NOW() - INTERVAL '45 days', NOW() - INTERVAL '45 days'),
('Recette classique et bien expliquée, un grand classique réussi.', 4, (SELECT id FROM recipes WHERE name = 'Quiche lorraine'), 5, NULL, NOW() - INTERVAL '22 days', NOW() - INTERVAL '22 days'),

-- Poulet au miel
('Le glaçage au miel caramélise magnifiquement, une merveille visuelle et gustative.', 5, (SELECT id FROM recipes WHERE name = 'Poulet au miel'), 7, NULL, NOW() - INTERVAL '13 days', NOW() - INTERVAL '13 days'),
('Sucré-salé parfaitement équilibré, toute la famille s''est resservie.', 5, (SELECT id FROM recipes WHERE name = 'Poulet au miel'), 3, NULL, NOW() - INTERVAL '3 days', NOW() - INTERVAL '3 days'),

-- Brochettes de viande
('Marinées à la perfection, ces brochettes sentent bon le barbecue d''été.', 5, (SELECT id FROM recipes WHERE name = 'Brochettes de viande'), 8, NULL, NOW() - INTERVAL '38 days', NOW() - INTERVAL '38 days'),
('La marinade est la clé de cette recette, vraiment excellente.', 4, (SELECT id FROM recipes WHERE name = 'Brochettes de viande'), 2, NULL, NOW() - INTERVAL '16 days', NOW() - INTERVAL '16 days'),

-- Cheesecake de Gotham
('Aussi sombre et mystérieux que Gotham City, et tout aussi inoubliable.', 5, (SELECT id FROM recipes WHERE name = 'Cheesecake de Gotham'), 9, NULL, NOW() - INTERVAL '24 days', NOW() - INTERVAL '24 days'),
('La croûte aux Oreos est géniale, le gâteau est visuellement spectaculaire.', 5, (SELECT id FROM recipes WHERE name = 'Cheesecake de Gotham'), 6, NULL, NOW() - INTERVAL '7 days', NOW() - INTERVAL '7 days'),

-- Empanadas
('Dorées et croustillantes, la farce est bien assaisonnée — un délice !', 5, (SELECT id FROM recipes WHERE name = 'Empanadas'), 4, NULL, NOW() - INTERVAL '29 days', NOW() - INTERVAL '29 days'),
('Recette authentique, mes collègues argentins ont approuvé !', 5, (SELECT id FROM recipes WHERE name = 'Empanadas'), 1, NULL, NOW() - INTERVAL '10 days', NOW() - INTERVAL '10 days'),

-- Cookies Minions
('Trop mignons ! Les enfants ont adoré décorer les petits visages.', 5, (SELECT id FROM recipes WHERE name = 'Cookies Minions'), 2, NULL, NOW() - INTERVAL '17 days', NOW() - INTERVAL '17 days'),
('Parfaits pour un anniversaire thématique Minions !', 5, (SELECT id FROM recipes WHERE name = 'Cookies Minions'), 7, NULL, NOW() - INTERVAL '6 days', NOW() - INTERVAL '6 days'),

-- Dinde Rôtie
('Juteuse et dorée à souhait, ma famille m''a demandé de la refaire à Noël.', 5, (SELECT id FROM recipes WHERE name = 'Dinde Rôtie'), 5, NULL, NOW() - INTERVAL '50 days', NOW() - INTERVAL '50 days'),
('Le temps de cuisson est bien respecté, la dinde n''était pas sèche du tout.', 4, (SELECT id FROM recipes WHERE name = 'Dinde Rôtie'), 10, NULL, NOW() - INTERVAL '20 days', NOW() - INTERVAL '20 days'),

-- Gâteau Elsa
('Aussi majestueux que la reine des neiges ! Le glaçage bleu est parfait.', 5, (SELECT id FROM recipes WHERE name = 'Gâteau Elsa'), 3, NULL, NOW() - INTERVAL '33 days', NOW() - INTERVAL '33 days'),
('Ma fille était aux anges, le gâteau est magnifique et délicieux.', 5, (SELECT id FROM recipes WHERE name = 'Gâteau Elsa'), 8, NULL, NOW() - INTERVAL '12 days', NOW() - INTERVAL '12 days'),

-- Ragoût du Continent
('Digne de Geralt de Rivia ! Saveurs médiévales et rustiques à souhait.', 5, (SELECT id FROM recipes WHERE name = 'Ragoût du Continent'), 9, NULL, NOW() - INTERVAL '26 days', NOW() - INTERVAL '26 days'),
('On s''est crus dans une taverne du Continent, c''était parfait !', 4, (SELECT id FROM recipes WHERE name = 'Ragoût du Continent'), 6, NULL, NOW() - INTERVAL '9 days', NOW() - INTERVAL '9 days'),

-- Cheeseburger avec Sauce Marinara
('Fusion italo-américaine réussie ! La sauce marinara maison est excellente.', 4, (SELECT id FROM recipes WHERE name = 'Cheeseburger avec Sauce Marinara'), 1, NULL, NOW() - INTERVAL '22 days', NOW() - INTERVAL '22 days'),
('Original et savoureux, j''adore cette idée créative.', 4, (SELECT id FROM recipes WHERE name = 'Cheeseburger avec Sauce Marinara'), 4, NULL, NOW() - INTERVAL '8 days', NOW() - INTERVAL '8 days'),

-- Oeufs Benedict
('Hollandaise parfaitement émulsionnée, cuisson des œufs pochés impeccable.', 5, (SELECT id FROM recipes WHERE name = 'Oeufs Benedict'), 7, NULL, NOW() - INTERVAL '42 days', NOW() - INTERVAL '42 days'),
('Le brunch ultime ! Recette bien détaillée même pour les débutants.', 5, (SELECT id FROM recipes WHERE name = 'Oeufs Benedict'), 2, NULL, NOW() - INTERVAL '15 days', NOW() - INTERVAL '15 days'),

-- Gaufres Eggo
('Ondulez-les ! Croustillantes dehors, moelleuses dedans comme dans la série.', 5, (SELECT id FROM recipes WHERE name = 'Gaufres Eggo'), 5, NULL, NOW() - INTERVAL '18 days', NOW() - INTERVAL '18 days'),
('Mes enfants adorent faire semblant d''être Eleven !', 5, (SELECT id FROM recipes WHERE name = 'Gaufres Eggo'), 3, NULL, NOW() - INTERVAL '4 days', NOW() - INTERVAL '4 days'),

-- Ramen au Poulet
('Bouillon clair et savoureux, poulet tendre — un ramen réconfortant.', 5, (SELECT id FROM recipes WHERE name = 'Ramen au Poulet'), 8, NULL, NOW() - INTERVAL '14 days', NOW() - INTERVAL '14 days'),
('Plus léger que le ramen classique mais tout aussi délicieux.', 4, (SELECT id FROM recipes WHERE name = 'Ramen au Poulet'), 10, NULL, NOW() - INTERVAL '3 days', NOW() - INTERVAL '3 days'),

-- Soupe au Miso
('Umami et réconfortante, cette soupe est exactement comme au Japon.', 5, (SELECT id FROM recipes WHERE name = 'Soupe au Miso'), 9, NULL, NOW() - INTERVAL '36 days', NOW() - INTERVAL '36 days'),
('Simple à préparer mais tellement bonne, j''en fais maintenant chaque semaine.', 5, (SELECT id FROM recipes WHERE name = 'Soupe au Miso'), 1, NULL, NOW() - INTERVAL '11 days', NOW() - INTERVAL '11 days'),

-- Pâté Hobbit
('Rustique et nourrissant, digne d''un second petit-déjeuner hobbit.', 5, (SELECT id FROM recipes WHERE name = 'Pâté Hobbit'), 6, NULL, NOW() - INTERVAL '28 days', NOW() - INTERVAL '28 days'),
('La croûte feuilletée est magnifique, parfait pour une soirée Tolkien.', 4, (SELECT id FROM recipes WHERE name = 'Pâté Hobbit'), 4, NULL, NOW() - INTERVAL '7 days', NOW() - INTERVAL '7 days'),

-- Cookie Zombie
('Terrifiant visuellement et délicieux gustativement, parfait pour Halloween.', 5, (SELECT id FROM recipes WHERE name = 'Cookie Zombie'), 7, NULL, NOW() - INTERVAL '31 days', NOW() - INTERVAL '31 days'),
('Les enfants ont adoré faire les décorations macabres !', 5, (SELECT id FROM recipes WHERE name = 'Cookie Zombie'), 2, NULL, NOW() - INTERVAL '10 days', NOW() - INTERVAL '10 days'),

-- Curry Vert
('Épicé comme il se doit, la crème de coco adoucit parfaitement le tout.', 5, (SELECT id FROM recipes WHERE name = 'Curry Vert'), 5, NULL, NOW() - INTERVAL '23 days', NOW() - INTERVAL '23 days'),
('Authentique et parfumé, le meilleur curry vert que j''aie cuisiné.', 5, (SELECT id FROM recipes WHERE name = 'Curry Vert'), 9, NULL, NOW() - INTERVAL '6 days', NOW() - INTERVAL '6 days'),

-- Tapenade et Croûtons Aillés
('Apéro parfait ! La tapenade maison n''a rien à voir avec celle du commerce.', 5, (SELECT id FROM recipes WHERE name = 'Tapenade et Croûtons Aillés'), 3, NULL, NOW() - INTERVAL '39 days', NOW() - INTERVAL '39 days'),
('Simple, rapide et tellement bon avec un verre de rosé.', 5, (SELECT id FROM recipes WHERE name = 'Tapenade et Croûtons Aillés'), 8, NULL, NOW() - INTERVAL '12 days', NOW() - INTERVAL '12 days'),

-- Crevettes Sautées
('Cuisson rapide et goût intense, ces crevettes sont une merveille.', 5, (SELECT id FROM recipes WHERE name = 'Crevettes Sautées'), 1, NULL, NOW() - INTERVAL '17 days', NOW() - INTERVAL '17 days'),
('L''ail et le beurre font des miracles avec les crevettes.', 4, (SELECT id FROM recipes WHERE name = 'Crevettes Sautées'), 6, NULL, NOW() - INTERVAL '5 days', NOW() - INTERVAL '5 days'),

-- Boeuf aux Oignons
('Classique de la cuisine asiatique parfaitement exécuté, la sauce est divine.', 5, (SELECT id FROM recipes WHERE name = 'Boeuf aux Oignons'), 10, NULL, NOW() - INTERVAL '44 days', NOW() - INTERVAL '44 days'),
('La viande est ultra tendre grâce au bicarbonate, astuce géniale !', 5, (SELECT id FROM recipes WHERE name = 'Boeuf aux Oignons'), 7, NULL, NOW() - INTERVAL '14 days', NOW() - INTERVAL '14 days'),

-- Tacos de Poulet
('Frais et savoureux, la salsa maison fait toute la différence.', 5, (SELECT id FROM recipes WHERE name = 'Tacos de Poulet'), 4, NULL, NOW() - INTERVAL '21 days', NOW() - INTERVAL '21 days'),
('On s''est régalés en famille, recette à refaire absolument !', 4, (SELECT id FROM recipes WHERE name = 'Tacos de Poulet'), 2, NULL, NOW() - INTERVAL '6 days', NOW() - INTERVAL '6 days'),

-- Poisson Grillé au Citron
('Léger et savoureux, le citron apporte une fraîcheur incomparable.', 5, (SELECT id FROM recipes WHERE name = 'Poisson Grillé au Citron'), 8, NULL, NOW() - INTERVAL '16 days', NOW() - INTERVAL '16 days'),
('Recette saine et délicieuse, parfaite pour un repas estival.', 4, (SELECT id FROM recipes WHERE name = 'Poisson Grillé au Citron'), 5, NULL, NOW() - INTERVAL '4 days', NOW() - INTERVAL '4 days');
