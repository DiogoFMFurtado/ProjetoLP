const Equipas = require('../models/Equipas');
const Trab = require('../models/Trab');

exports.registerEquipaHandle = async (req, res) => {
    
    const { trab1, trab2, trab3 } = req.body;
    console.log("Posting Team...");
    try {
        console.log(req.body);
        const equipa = new Equipas({
            trab1,
            trab2,
            trab3
        });
        await equipa.save();
        res.status(201).json();
        console.log("Done!");

    } catch (err) {
        res.json({message: err});
    }
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