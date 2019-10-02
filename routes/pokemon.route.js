const express = require('express');
const router = express.Router();

const { pokemon } = require('../models/pokemon.model');

// Get pokemon
router.get('/pokemon', async (req, res)=>{
    const pokemonResp = await pokemon.get();
    res.status(pokemonResp.status).json(pokemonResp).end();
});

// Add a pokemon
router.post('/pokemon/add', async (req, res)=>{
    const { newPokemon } = req.body || null;
    const apiResp = await pokemon.add(newPokemon);
    res.status(apiResp.status).send(apiResp).end();
});

// Update a pokemon
router.put('/pokemon/update', (req, res)=>{
    res.send('Update a Pokemon.').end();
});

// Delete a pokemon
router.delete('/pokemon/delete', (req, res)=>{
    res.send('Delete a Pokemon.').end();
});


module.exports = router;