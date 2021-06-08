const passport = require('passport');
const bcryptjs = require('bcryptjs');
const nodemailer = require('nodemailer');
const { google } = require("googleapis");
const OAuth2 = google.auth.OAuth2;
const jwt = require('jsonwebtoken');
const JWT_KEY = "jwtactive987";
const JWT_RESET_KEY = "jwtreset987";

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
    
    // Slava se quiseres já podes tratar da função hidden

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



