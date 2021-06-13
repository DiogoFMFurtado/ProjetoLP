const passport = require('passport');
const bcryptjs = require('bcryptjs');
const nodemailer = require('nodemailer');
const { google } = require("googleapis");
const OAuth2 = google.auth.OAuth2;
const jwt = require('jsonwebtoken');
const JWT_KEY = "jwtactive987";
const JWT_RESET_KEY = "jwtreset987";

const Marcacao = require('../models/Marcacao');
const User = require('../models/User');


exports.registerMarcHandle = async (req, res) => {
    
    const { name, email, date, hour, type, address } = req.body;

    try {
        console.log(req.body);
        const marcacao = new Marcacao({
            name,
            email,
            date,
            hour,
            type,
            address
        });
        const user = await User.findById(req.user);
        marcacao.cliente = user;
        await marcacao.save();
        user.marcacaoCliente.push(marcacao);
        await user.save();
        res.status(201).json()
        res.redirect("/clientpage")
        
    } catch (err) {
        res.json({message: err});
    }
}




exports.getMarcacoes = async(req, res) => {
    
    try {
        const user = await User.findById(req.user).populate('marcacaoCliente');
        console.log('user', user);
        res.status(200).json(user.marcacaoCliente);
    } catch (err) {
        res.json({message:err});
    }    

}

exports.getMarcacaoById = async(req, res) => {

    console.log("Getting Project...")
    try {
        const marc = await Marcacao.findById(req.params.marcacaoId);
        console.log('marcacao', marc);
        res.status(200).json(marc);
    } catch (err) {
        res.status(404).json({message: err});
    }
    
}

exports.getAllMarcacoes = async(req, res) => {

    console.log("Getting All of the Appointments...");
    try {
        const marcacoes = await Marcacao.find();
        res.status(200).json(marcacoes);
    } catch (err) {
        res.status(400).json({message: err});
    }
    console.log("Done!");

}

exports.giveAval = async (req, res) => {
    console.log("Giving Evaluation to the Appointment...");
    console.log(req.params.marcacaoId);
    try {
        const eval_admin = await Marcacao.findByIdAndUpdate(req.params.marcacaoId, req.body, {useFindAndModify: false});
        console.log(req.body);
        res.status(200).json(eval_admin);
    } catch (err) {
        res.status(404).json({message: err})
    }
    console.log("Done!")
}


exports.giveDescrip = async (req,res) => {

    console.log("Giving Description to the Appointment...");
    console.log(req.params.marcacaoId);
    try {
        const description = await Marcacao.findByIdAndUpdate(req.params.marcacaoId, req.body, {useFindAndModify: false});
        console.log(req.body);
        res.status(200).json(description);
    } catch (err) {
        res.status(404).json({message: err})
    }
    console.log("Done!")
}