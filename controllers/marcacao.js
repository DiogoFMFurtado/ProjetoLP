const express = require('express');
const router = express.Router();
const Marcacao = require('../model/Marcacao');

// Post Marcacao 
router.post('/POST', async(req, res) => {
    console.log("checkpoint");
    const marcacao = new Marcacao({
        name: req.body.name,
        email: req.body.email,
        date: req.body.date,
        hour: req.body.hour,
        type: req.body.type,
        address: req.body.address,
        state: req.body.state
    });
    try{
        const savedMarcacao = await marcacao.save();
        res.json(savedMarcacao);
    } catch(err) {
        res.json({message: err});
    }
});

module.exports = router;