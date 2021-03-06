/**
 * Define the routes for the pokemon entity.
 * The Pokemon model will handle all the logic for the Pokemon
 */
const express = require('express');
const router = express.Router();

const { pokemon } = require('../models/pokemon.model');

// Get pokemon
router.get('/pokemon', async (req, res)=>{
    const pokemonResp = await pokemon.get();
    res.status(pokemonResp.status).json(pokemonResp).end();
});

router.get('/pokemon/:id', async (req, res)=>{
    const id = req.params.id || null;
    const pokemonResp = await pokemon.getById(id);
    res.status(pokemonResp.status).json(pokemonResp).end();
});

// Add a pokemon
router.post('/pokemon/add', async (req, res)=>{
    const { newPokemon } = req.body || null;
    const apiResp = await pokemon.add(newPokemon);
    res.status(apiResp.status).send(apiResp).end();
});

// Update a pokemon
router.put('/pokemon/update', async (req, res)=>{
    const { updatedPokemon } = req.body || null;
    const apiResp = await pokemon.update(updatedPokemon);
    res.status(apiResp.status).json(apiResp).end();
});

// Delete a pokemon
router.delete('/pokemon/delete/:id', async (req, res)=>{
    const id = req.params.id || null;
    const apiResp = await pokemon.delete(id);
    res.status(apiResp.status).json(apiResp).end();
});


module.exports = router;