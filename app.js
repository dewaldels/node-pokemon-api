const express = require('express');
const port = process.env.PORT || 5000;
const cors = require('cors');

const authMiddleware = require('./middleware/auth.middleware');

const app = express();

app.get('/', (req, res)=>{
    res.json({
        api: 'Pokemon Catalogue',
        version: 0.1,
        author: 'Noroff'
    }).end();
});

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

app.use(authMiddleware);

// Route imports.
const authRoutes = require('./routes/auth.route');
const pokemonRoutes = require('./routes/pokemon.route');

app.use('/api/v1', authRoutes);
app.use('/api/v1', pokemonRoutes);

app.listen(port, () => {
    console.log(`The server has started on port ${port}`);
});