const passport = require('passport');
const bcryptjs = require('bcryptjs');
const nodemailer = require('nodemailer');
const { google } = require("googleapis");
const OAuth2 = google.auth.OAuth2;
const jwt = require('jsonwebtoken');
const JWT_KEY = "jwtactive987";
const JWT_RESET_KEY = "jwtreset987";

const User = require('../models/User');

exports.getClients = async(req,res) => {

    console.log("Getting all Clients...");
    try {
        const clients = await User.find();
        res.status(200).json(clients);
    }catch(err) {
        res.json({message:err});
    }
    console.log("Done!");

}

exports.getClient = async(req,res) => {
    
    console.log("Getting the Client...");
    try {
        const client = await User.findById(req.params.clientId).populate('marcacaoCliente');
        console.log('client', client);
        res.status(200).json(client.marcacaoCliente);
    } catch (err) {
        res.json({message:err});
    }
    console.log("Done!");
}

exports.hasAdmin = async(req,res) => {
    console.log("Updating Manager...");
    console.log(req.params.clientId);
    try {
        const assigned = await User.findByIdAndUpdate(req.params.clientId, req.body, {useFindAndModify: false});
        console.log(req.body);
        res.status(200).json(assigned);
    } catch (err) {
        res.json({message: err})
    }
    console.log("Done!")
}

