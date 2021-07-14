const Marcacao = require('../models/Marcacao');
const Trab = require('../models/Trab');

exports.getWorkers = async(req, res) => {
    
    console.log("Getting all Workers...");
    try {
        const workers = await Trab.find();
        res.status(200).json(workers);
    } catch(err) {
        res.json({message:err});
    }
    console.log("Done!");
}

exports.fireWorker = async(req,res) => {

    console.log("Removing Worker..");

    try {
        const firedWorker = await Trab.deleteOne({_id: req.body._id});
        console.log(req.body);
        res.redirect("/ver_todos_trabalhadores")
        res.status(200).json(firedWorker);
        console.log("Worker Removed!");
    } catch (err) {
        res.status(400).json({message: err});
    }

}



