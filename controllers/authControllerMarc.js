const passport = require('passport');
const bcryptjs = require('bcryptjs');
const nodemailer = require('nodemailer');
const { google } = require("googleapis");
const OAuth2 = google.auth.OAuth2;
const jwt = require('jsonwebtoken');
const JWT_KEY = "jwtactive987";
const JWT_RESET_KEY = "jwtreset987";

const Marc = require('../models/Marc');

//------------ Register Handle ------------//

exports.registerMarcHandle = (req, res) => {
    const { date, hour, type, address } = req.body;
    let errors = [];

    //------------ Checking required fields ------------//

    
}

//------------ Activate Account Handle ------------//
exports.registerMarcHandle = (req, res) => {
    const token = req.params.token;
    let errors = [];
    if (token) {
        jwt.verify(token, JWT_KEY, (err, decodedToken) => {
            if (err) {
                req.flash(
                    'error_msg',
                    'Incorrect or expired link! Please register again.'
                );
                res.redirect('/auth/colegas');
            }
            else {
                const { date, hour, type, address } = decodedToken;
                Marc.findOne({ date: date }).then(marc => {
             
                        const newMarc = new Marc({
                            date, 
                            hour, 
                            type, 
                            address
                        });

                        bcryptjs.genSalt(10, (err, salt) => {
                            bcryptjs.hash(newMarc.password, salt, (err, hash) => {
                                if (err) throw err;
                                newMarc.password = hash;
                                MarMarc
                                    .save()
                                    .then(marc => {
                                        req.flash(
                                            'success_msg',
                                            'Account activated. You can now log in.'
                                        );
                                        res.redirect('/auth/welcome');
                                    })
                                    .catch(err => console.log(err));
                            });
                        });
                    
                });
            }

        })
    }
    else {
        console.log("Account activation error!")
    }
}


