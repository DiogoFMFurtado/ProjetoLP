const passport = require('passport');
const bcryptjs = require('bcryptjs');
const nodemailer = require('nodemailer');
const { google } = require("googleapis");
const OAuth2 = google.auth.OAuth2;
const jwt = require('jsonwebtoken');
const JWT_KEY = "jwtactive987";
const JWT_RESET_KEY = "jwtreset987";

const Admin = require('../models/Admin');
const User = require('../models/User');

//------------ Register Handle ------------//

exports.registerAdminHandle = (req, res) => {
    const { firstName, lastName, email, password, password2 } = req.body;
    let errors = [];
   
    //------------ Checking password mismatch ------------//
    if (password != password2) {
        errors.push({ msg: 'As Passwords não correspondem.' });
    }

    if (errors.length > 0) {
        res.render('colegas', {
            errors,
            firstName,
            lastName,
            email,
            password,
            password2
        });
    }else {
        //------------ Validation passed ------------//
        Admin.findOne({ email: email }).then(admin => {
            if (admin) {
                //------------ Admin already exists ------------//
                errors.push({ msg: 'Este email já está registado' });
                res.render('colegas', {
                    errors,
                    firstName,
                    lastName,
                    email,
                    password,
                    password2
                });
            } else {

                const oauth2Client = new OAuth2(
                    "173872994719-pvsnau5mbj47h0c6ea6ojrl7gjqq1908.apps.googleusercontent.com", // ClientID
                    "OKXIYR14wBB_zumf30EC__iJ", // Client Secret
                    "https://developers.google.com/oauthplayground" // Redirect URL
                );

                oauth2Client.setCredentials({
                    refresh_token: "1//04T_nqlj9UVrVCgYIARAAGAQSNwF-L9IrGm-NOdEKBOakzMn1cbbCHgg2ivkad3Q_hMyBkSQen0b5ABfR8kPR18aOoqhRrSlPm9w"
                });
                const accessToken = oauth2Client.getAccessToken()

                const token = jwt.sign({ firstName, lastName, email, password }, JWT_KEY, { expiresIn: '30m' });
                const CLIENT_URL = 'http://' + req.headers.host;

                const output = `
                <h2>Recebos o seu registo.</h2>
                <p>Para confirmar a sua conta copie o seguinte link:</p>
                <p>${CLIENT_URL}/auth/activate2/${token}</p>
                <p><b>Atenção: </b></p>
                <p>O link vai expirar após  30 minutos.</p>
                `;

                const transporter = nodemailer.createTransport({
                    service: 'gmail',
                    auth: {
                        type: "OAuth2",
                        user: "nodejsa@gmail.com",
                        clientId: "173872994719-pvsnau5mbj47h0c6ea6ojrl7gjqq1908.apps.googleusercontent.com",
                        clientSecret: "OKXIYR14wBB_zumf30EC__iJ",
                        refreshToken: "1//04T_nqlj9UVrVCgYIARAAGAQSNwF-L9IrGm-NOdEKBOakzMn1cbbCHgg2ivkad3Q_hMyBkSQen0b5ABfR8kPR18aOoqhRrSlPm9w",
                        accessToken: accessToken
                    },
                });

                // send mail with defined transport object
                const mailOptions = {
                    from: '"Cilit Bang" <nodejsa@gmail.com>',
                    to: email,
                    subject: "Confirme a sua conta.",
                    generateTextFromHTML: true,
                    html: output,
                };

                transporter.sendMail(mailOptions, (error, info) => {
                    if (error) {
                        console.log(error);
                        req.flash(
                            'error_msg',
                            'Ocorreu um erro, por favor, tente de novo.'
                        );
                        res.redirect('/auth/colegas');
                    }
                    else {
                        console.log('Mail sent : %s', info.response);
                        req.flash(
                            'success_msg',
                            'Sucesso! Verifique o seu email.'
                        );
                        res.redirect('/auth/colegas');
                    }
                })

            }
        });
    } 
}

//------------ Activate Account Handle ------------//
exports.activateAdminHandle = (req, res) => {
    const token = req.params.token;
    let errors = [];
    if (token) {
        jwt.verify(token, JWT_KEY, (err, decodedToken) => {
            if (err) {
                req.flash(
                    'error_msg',
                    'Link incorreto ou expirado, tente de novo.'
                );
                res.redirect('/auth/colegas');
            }
            else {
                const { firstName, lastName, email, password } = decodedToken;
                Admin.findOne({ email: email }).then(admin => {
                    if (admin) {
                        //------------ Admin already exists ------------//
                        req.flash(
                            'error_msg',
                            'Email com conta associada, por favor faça o login'
                        );
                        res.redirect('/auth/colegas');
                    } else {
                        const newAdmin = new Admin({
                            firstName,
                            lastName,
                            email,
                            password
                        });

                        bcryptjs.genSalt(10, (err, salt) => {
                            bcryptjs.hash(newAdmin.password, salt, (err, hash) => {
                                if (err) throw err;
                                newAdmin.password = hash;
                                newAdmin
                                    .save()
                                    .then(admin => {
                                        req.flash(
                                            'success_msg',
                                            'Conta criada, já pode fazer login.'
                                        );
                                        res.redirect('/auth/colegas');
                                    })
                                    .catch(err => console.log(err));
                            });
                        });
                    }
                });
            }

        })
    }
    else {
        console.log("Ocorreu um erro na criação da conta!")
    }
}

exports.forgotAdminPassword = (req, res) => {
    const { email } = req.body;

    let errors = [];

    //------------ Checking required fields ------------//

    if (errors.length > 0) {
        res.render('forgotAd', {
            errors,
            email
        });
    } else {
        Admin.findOne({ email: email }).then(admin => {
            if (!admin) {
                //------------ Admin already exists ------------//
                errors.push({ msg: 'Não foi encontrado nenhum Administrador com este email' });
                res.render('forgotAd', {
                    errors,
                    email
                });
            } else {

                const oauth2Client = new OAuth2(
                    "173872994719-pvsnau5mbj47h0c6ea6ojrl7gjqq1908.apps.googleusercontent.com", // ClientID
                    "OKXIYR14wBB_zumf30EC__iJ", // Client Secret
                    "https://developers.google.com/oauthplayground" // Redirect URL
                );

                oauth2Client.setCredentials({
                    refresh_token: "1//04T_nqlj9UVrVCgYIARAAGAQSNwF-L9IrGm-NOdEKBOakzMn1cbbCHgg2ivkad3Q_hMyBkSQen0b5ABfR8kPR18aOoqhRrSlPm9w"
                });
                const accessToken = oauth2Client.getAccessToken()

                const token = jwt.sign({ _id: admin._id }, JWT_RESET_KEY, { expiresIn: '30m' });
                const CLIENT_URL = 'http://' + req.headers.host;
                const output = `
                <h2>Nova senha</h2>
                <p>Para escolher a sua nova senha copie o seginte link:</p>
                <p>${CLIENT_URL}/auth/forgot/${token}</p>
                <p><b>Atenção: </b></p>
                <p>O link vai expirar após  30 minutos.</p>
                `;

                Admin.updateOne({ resetLink: token }, (err, success) => {
                    if (err) {
                        errors.push({ msg: 'Erro na nova senha!' });
                        res.render('forgotAd', {
                            errors,
                            email
                        });
                    }
                    else {
                        const transporter = nodemailer.createTransport({
                            service: 'gmail',
                            auth: {
                                type: "OAuth2",
                                user: "nodejsa@gmail.com",
                                clientId: "173872994719-pvsnau5mbj47h0c6ea6ojrl7gjqq1908.apps.googleusercontent.com",
                                clientSecret: "OKXIYR14wBB_zumf30EC__iJ",
                                refreshToken: "1//04T_nqlj9UVrVCgYIARAAGAQSNwF-L9IrGm-NOdEKBOakzMn1cbbCHgg2ivkad3Q_hMyBkSQen0b5ABfR8kPR18aOoqhRrSlPm9w",
                                accessToken: accessToken
                            },
                        });

                        // send mail with defined transport object
                        const mailOptions = {
                            from: '"Cilit Bang" <nodejsa@gmail.com>',
                            to: email,
                            subject: "Redfinir nova senha",
                            html: output,
                        };

                        transporter.sendMail(mailOptions, (error, info) => {
                            if (error) {
                                console.log(error);
                                req.flash(
                                    'error_msg',
                                    'Algo deu errado, tente de novo.'
                                );
                                res.redirect('/auth/forgotAd');
                            }
                            else {
                                console.log('Mail sent : %s', info.response);
                                req.flash(
                                    'success_msg',
                                    'Sucesso! Confirme o seu email.'
                                );
                                res.redirect('/auth/loginAdmin');
                            }
                        })
                    }
                })

            }
        });
    }
}

exports.gotoResetAdmin = (req, res) => {
    const { token } = req.params;

    if (token) {
        jwt.verify(token, JWT_RESET_KEY, (err, decodedToken) => {
            if (err) {
                req.flash(
                    'error_msg',
                    'Link incorreto ou expirado, tente de novo.'
                );
                res.redirect('/auth/loginAdmin');
            }
            else {
                const { _id } = decodedToken;
                Admin.findById(_id, (err, admin) => {
                    if (err) {
                        req.flash(
                            'error_msg',
                            'Administrador enixestente, por fvor tente de novo'
                        );
                        res.redirect('/auth/loginAdmin');
                    }
                    else {
                        res.redirect(`/auth/resetAdmin/${_id}`)
                    }
                })
            }
        })
    }
    else {
        console.log("Deu erro redefenir a nova senha.")
    }
}


exports.resetAdminPassword = (req, res) => {
    var { password, password2 } = req.body;
    const id = req.params.id;
    let errors = [];

    //------------ Checking password mismatch ------------//
    if (password != password2) {
        req.flash(
            'error_msg',
            'As Passwords não correspondem.'
        );
        res.redirect(`/auth/resetAdmin/${id}`);
    }

    else {
        bcryptjs.genSalt(10, (err, salt) => {
            bcryptjs.hash(password, salt, (err, hash) => {
                if (err) throw err;
                password = hash;

                Admin.findByIdAndUpdate(
                    { _id: id },
                    { password },
                    function (err, result) {
                        if (err) {
                            req.flash(
                                'error_msg',
                                'Erro na confirmação da nova password'
                            );
                            res.redirect(`/auth/resetAdmin/${id}`);
                        } else {
                            req.flash(
                                'success_msg',
                                'Sucesso na confirmação da nova password.'
                            );
                            res.redirect('/auth/loginAdmin');
                        }
                    }
                );

            });
        });
    }
}

exports.loginAdminHandle = (req, res, next) => {
    passport.authenticate('admin', {
        successRedirect: '/dashboard',
        failureRedirect: '/auth/loginAdmin',
        failureFlash: true
    })(req, res, next);
}

//------------ Logout Handle ------------//
exports.logoutAdminHandle = (req, res) => {
    req.logout();
    req.flash('success_msg', 'You are logged out');
    res.redirect('/');
}



exports.getAllAdmins = async (req, res) => {

    console.log("Getting All Admins...");
    try {
        const admins = await Admin.find();
        res.status(200).json(admins);
    } catch (err) {
        res.status(400).json({message: err});
    }
    console.log("Done!");

}

