const express = require('express');
const port = process.env.PORT || 5000;
const authMiddleware = require('./middleware/auth.middleware');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(authMiddleware);

// Route imports.
const authRoutes = require('./routes/auth.route');
const pokemonRoutes = require('./routes/pokemon.route');

app.use('/api/v1', authRoutes);
app.use('/api/v1', pokemonRoutes);


app.listen(port, () => {
    console.log(`The server has started on port ${port}`);
})