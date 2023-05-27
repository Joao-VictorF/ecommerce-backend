-- Inserts for User table (password: abc123456)
INSERT INTO "User" ("id", "email", "password", "name", "address", "role")
VALUES
    ('1', 'user1@example.com', '$2b$10$1XpzUYu8FuvuaBb3SC0xzuR9DX7KakbMLt0vLNoZ.UnLntDMFc4LK', 'User 1', 'Address 1', 'USER'),
    ('2', 'user2@example.com', '$2b$10$1XpzUYu8FuvuaBb3SC0xzuR9DX7KakbMLt0vLNoZ.UnLntDMFc4LK', 'User 2', 'Address 2', 'USER'),
    ('3', 'user3@example.com', '$2b$10$1XpzUYu8FuvuaBb3SC0xzuR9DX7KakbMLt0vLNoZ.UnLntDMFc4LK', 'User 3', 'Address 3', 'USER');

-- Inserts for Product table
INSERT INTO "Product" ("id", "name", "urlName", "picture", "basePrice", "discountPercentage", "stock", "description")
VALUES
    (
        '1',
        'Óculos De Sol Retrô Rave Colorido Com Proteção Uv400 + Case',
        'oculos-de-sol-retr-rave-colorido-com-proteco-uv400-case',
        'https://http2.mlstatic.com/D_NQ_NP_2X_634874-MLB51468640682_092022-F.webp',
        79.99,
        5,
        100,
        'Óculos de sol com design atual e moderno, levando um visual cheio de atitude estilo e personalidade. E sempre trazendo maior conforto ao usa-lo seja no dia a dia ou em ocasiões especiais.'
    ),
    (
        '2',
        'Novo Óculos De Sol Quisviker Esportivo Surf Polarizado Uv400',
        'novo-oculos-de-sol-quisviker-esportivo-surf-polarizado-uv400',
        'https://http2.mlstatic.com/D_NQ_NP_2X_945889-MLB46671431111_072021-F.webp',
        99.99,
        1,
        12,
        'É um óculos esportivo casual que traz excelente custo benefício. Sua armação é feita em policarbonato, um material resistente.'
    ),
    (
        '3',
        'Oculos Retro Vintage Lente Colorida Moscot Degrade Sol Uv',
        'oculos-retro-vintage-lente-colorida-moscot-degrade-sol-uv',
        'https://http2.mlstatic.com/D_NQ_NP_2X_881396-MLB45323473195_032021-F.webp',
        80.00,
        12,
        16,
        'Os óculos Vintage Milhawk são ideais para compor o visual seja em uso urbano ou com capacete aberto. Com proteção uv 400 e lentes retro nos tons azul, vermelho e amarelo, são confeccionada em acetato e lente em policarbonato, garantindo leveza e conforto no uso.'
    );
    

-- Inserts for Category table
INSERT INTO "Category" ("id", "name", "description")
VALUES
    ('1', 'Óculos', ''),
    ('2', 'Calçados, Roupas e Bolsas', ''),
    ('3', 'Acessórios de Moda', '');

-- Inserts for CategoryToProduct table
INSERT INTO "_CategoryToProduct" ("A", "B")
VALUES
    ('1', '1'), -- Product 1 belongs to Category 1
    ('2', '1'), -- Product 2 belongs to Category 1
    ('3', '1'); -- Product 3 belongs to Category 1;