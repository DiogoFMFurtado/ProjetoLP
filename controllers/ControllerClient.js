const passport = require('passport');
const bcryptjs = require('bcryptjs');
const nodemailer = require('nodemailer');
const { google } = require("googleapis");
const OAuth2 = google.auth.OAuth2;
const jwt = require('jsonwebtoken');
const JWT_KEY = "jwtactive987";
const JWT_RESET_KEY = "jwtreset987";

const User = require('../models/User');
const Admin = require('../models/Admin');

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

exports.getClientById = async(req,res) => {
    console.log("Getting Client...")
    try {
        const clientById = await User.findById(req.params.clientId);
        console.log('cliente', clientById);
        res.status(200).json(clientById);
    } catch (err) {
        res.status(404).json({message: err});
    }
}

/*
exports.hasAdmin = async(req,res) => {
    console.log("Updating Manager...");
    console.log(req.params.clientId);
    try {
        const assigned = await User.findByIdAndUpdate(req.params.clientId, req.body, {useFindAndModify: false});
        console.log(req.body);
        const manager = await User.findByIdAndUpdate(req.params.clientId, {$set: { hasAdmin: true }}, {useFindAndModify: false});
        await manager.save();
        console.log("Saved!");
        res.status(200).json(assigned);
    } catch (err) {
        res.json({message: err})
    }
    console.log("Done!")
}
*/

exports.hasAdmin = async(req,res) => {
    
    console.log(req.body);
    try {
        await Admin.findOne({firstName: req.body.admin}).exec(async function(err, admin) {

            if(admin){
                //Atribui cliente ao Admin.
                const user = await User.findById(req.params.clientId);
                admin.clients.push(user);
                await admin.save();
                console.log("Admin has a new Client...");

                // Faz update ao nome do admin do cliente, e faz update true cliente tem admin
                console.log("... & updating Users Admin...");
                const assigned = await User.findByIdAndUpdate(req.params.clientId, req.body, {useFindAndModify: false});
                await assigned.save();
                const manager = await User.findByIdAndUpdate(req.params.clientId, {$set: { hasAdmin: true }}, {useFindAndModify: false});
                await manager.save();
                console.log("Done!");

                res.status(200).json(assigned);
                
                
            }else{
                return console.log(err);
            }
        });
        
    } catch (err) {
        res.json({message: err})
    }
}