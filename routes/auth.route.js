const express = require('express');
const router = express.Router();
const { auth } = require('../models/auth.model');


router.post('/auth/generate-token', async (req, res)=>{

    const apiResult = await auth.generateToken();
    res.status(apiResult.status).json(apiResult).end();

});

module.exports = router;