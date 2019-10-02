CREATE TABLE auth_token (
    id SERIAL PRIMARY KEY,
    token VARCHAR(128),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    active INTEGER DEFAULT 1
);