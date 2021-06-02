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


/*
exports.registerMarcHandle = (req, res) => {
    
    console.log('Chegaste aqui ao menos');

    const { name, email, date, hour, type, address } = req.body;

    console.log(req.body);

    User.findOne({ email: email }).then(user => {
        let errors = [];
        console.log('1');
        console.log(email);
        if (!user) {
            errors.push({ msg: 'User not found. Must be registered' });
            res.render('welcome', {
                errors,
                name,
                email,
                date,
                hour,
                type,
                address
            });
            console.log('2');
        } else {
            const marcacao = new Marcacao({
                name,
                email,
                date,
                hour,
                type,
                address
            });
            console.log('3');
            try {
                const savedMarcacao = marcacao.save();
                //res.json(savedMarcacao);
                res.redirect("/clientpage")
            } catch (err) {
                res.json({message: err});
                }
            }
    });
}
*/



exports.registerMarcHandle = async (req, res) => {
    
    const { userId } = req.params;
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
        const user = await User.findById(userId);
        marcacao.cliente = user;
        await marcacao.save();
        user.marcacaoCliente.push(marcacao);
        await user.save();
        res.status(201).json()
        
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
    


    /*
    try {
        const marcacoes = await Marcacao.find();
        res.json(marcacoes);
    } catch(err) {
        res.json({message:err});
    }
    */


}

    