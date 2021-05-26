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
                res.redirect('/views/welcome.ejs');
            }
            else {
                const { name, email, date, hour, type, address } = decodedToken;

                User.findOne({ email: email}).then(user => {
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
                    } else {
                        const marcacao = new Marcacao({
                            name,
                            email,
                            date,
                            hour,
                            type,
                            address
                        });
                        try {
                            const savedMarcacao = marcacao.save();
                            res.json(savedMarcacao);
                        } catch (err) {
                            res.json({message: err});
                        }
                    }
                })
            }

        })
    }
    else {
        console.log("Fatal wrong session")
    }
}


