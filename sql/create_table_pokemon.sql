CREATE TABLE pokemon (
    id SERIAL PRIMARY KEY,
    name VARCHAR(20),
    species VARCHAR(40),
    height VARCHAR(10),
    weight VARCHAR(10),
    abilities VARCHAR(80),
    type VARCHAR(20),
    sprite VARCHAR(128),
    hp INTEGER,
    attack INTEGER,
    defense INTEGER,
    sp_atk INTEGER,
    sp_def INTEGER,
    speed INTEGER,
    total INTEGER,
    active INTEGER
);