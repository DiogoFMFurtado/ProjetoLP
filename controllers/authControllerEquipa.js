const Equipas = require('../models/Equipas');
const Trab = require('../models/Trab');
var mongodb = require('mongodb');

exports.registerEquipaHandle = async (req, res) => {
    
    const { trab1, trab2, trab3 } = req.body;

    try {
        console.log(req.body);
        const equipa = new Equipas({
            trab1,
            trab2,
            trab3
        });
        const trab = await Trab.findById(req.trab);
        equipa.cliente = trab;
        await equipa.save();
        trab.equipaTrab.push(equipa);
        await trab.save();
        res.status(201).json()
        
    } catch (err) {}
}

/*exports.getFeedbacks = async(req, res) => {

    console.log("Getting all feedbacks...");
    try {
        const feedbacks = await Feedback.find();
        res.status(200).json(feedbacks);
    } catch(err) {
        res.json({message:err});
    }
    console.log("Done!");
}*/