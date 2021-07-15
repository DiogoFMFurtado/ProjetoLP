const passport = require('passport');
const bcryptjs = require('bcryptjs');
const nodemailer = require('nodemailer');
const { google } = require("googleapis");
const OAuth2 = google.auth.OAuth2;
const jwt = require('jsonwebtoken');
const JWT_KEY = "jwtactive987";
const JWT_RESET_KEY = "jwtreset987";

const Trab = require('../models/Trab');

//------------ Register Handle ------------//

exports.registerTrabHandle = (req, res) => {
    const { name, email, password, password2 } = req.body;
    let errors = [];

    //------------ Checking password mismatch ------------//
    if (password !== password2) {
        errors.push({ msg: 'As Passwords não correspondem.' });
    }

    if (errors.length > 0) {
        res.render('colegas2', {
            errors,
            name,
            email,
            password,
            password2
        });
    }else {
        //------------ Validation passed ------------//
        Trab.findOne({ email: email }).then(trab => {
            if (trab) {
                //------------ User already exists ------------//
                errors.push({ msg: 'Este email já está registado' });
                res.render('colegas2', {
                    errors,
                    name,
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

                const token = jwt.sign({ name, email, password }, JWT_KEY, { expiresIn: '30m' });
                const CLIENT_URL = 'http://' + req.headers.host;

                const output = `
                <h2>Recebos o seu registo.</h2>
                <p>Para confirmar a sua conta copie o seguinte link:</p>
                <p>${CLIENT_URL}/auth/activate3/${token}</p>
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
                        res.redirect('/auth/colegas2');
                    }
                    else {
                        console.log('Mail sent : %s', info.response);
                        req.flash(
                            'success_msg',
                            'Sucesso! Verifique o seu email.'
                        );
                        res.redirect('/auth/colegas2');
                    }
                })

            }
        });
    } 
}

//------------ Activate Account Handle ------------//
exports.activateTrabHandle = (req, res) => {
    const token = req.params.token;
    let errors = [];
    if (token) {
        jwt.verify(token, JWT_KEY, (err, decodedToken) => {
            if (err) {
                req.flash(
                    'error_msg',
                    'Link incorreto ou expirado, tente de novo.'
                );
                res.redirect('/auth/colegas2');
            }
            else {
                const { name, email, password } = decodedToken;
                Trab.findOne({ email: email }).then(trab => {
                    if (trab) {
                        //------------ User already exists ------------//
                        req.flash(
                            'error_msg',
                            'Email com conta associada, por favor faça o login'
                        );
                        res.redirect('/auth/colegas2');
                    } else {
                        const newTrab = new Trab({
                            name,
                            email,
                            password
                        });

                        bcryptjs.genSalt(10, (err, salt) => {
                            bcryptjs.hash(newTrab.password, salt, (err, hash) => {
                                if (err) throw err;
                                newTrab.password = hash;
                                newTrab
                                    .save()
                                    .then(trab => {
                                        req.flash(
                                            'success_msg',
                                            'Conta criada, já pode fazer login.'
                                        );
                                        res.redirect('/auth/colegas2');
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

exports.forgotTrabPassword = (req, res) => {
    const { email } = req.body;

    let errors = [];

    //------------ Checking required fields ------------//
    if (errors.length > 0) {
        res.render('forgotTrab', {
            errors,
            email
        });
    } else {
        Trab.findOne({ email: email }).then(trab => {
            if (!trab) {
                //------------ User already exists ------------//
                errors.push({ msg: 'Email não encontrado, confirme o seu email' });
                res.render('forgotTrab', {
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

                const token = jwt.sign({ _id: trab._id }, JWT_RESET_KEY, { expiresIn: '30m' });
                const CLIENT_URL = 'http://' + req.headers.host;
                const output = `
                <h2>Nova senha</h2>
                <p>Para escolher a sua nova senha copie o seginte link:</p>
                <p>${CLIENT_URL}/auth/forgotTrab/${token}</p>
                <p><b>Atenção: </b></p>
                <p>O link vai expirar após  30 minutos.</p>
                `;

                Trab.updateOne({ resetLink: token }, (err, success) => {
                    if (err) {
                        errors.push({ msg: 'Erro na nova senha!' });
                        res.render('forgotTrab', {
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
                                res.redirect('/auth/forgotTrab');
                            }
                            else {
                                console.log('Mail sent : %s', info.response);
                                req.flash(
                                    'success_msg',
                                    'Sucesso! Confirme o seu email.'
                                );
                                res.redirect('/auth/forgotTrab');
                            }
                        })
                    }
                })

            }
        });
    }
}

exports.gotoResetTrab = (req, res) => {
    const { token } = req.params;

    if (token) {
        jwt.verify(token, JWT_RESET_KEY, (err, decodedToken) => {
            if (err) {
                req.flash(
                    'error_msg',
                    'Link incorreto ou expirado, tente de novo.'
                );
                res.redirect('/auth/loginTrab');
            }
            else {
                const { _id } = decodedToken;
                Trab.findById(_id, (err, user) => {
                    if (err) {
                        req.flash(
                            'error_msg',
                            'Utilizador enixestente, por fvor tente de novo'
                        );
                        res.redirect('/auth/loginTrab');
                    }
                    else {
                        res.redirect(`/auth/resetTrab/${_id}`)
                    }
                })
            }
        })
    }
    else {
        console.log("Deu erro redefenir a nova senha.")
    }
}


exports.resetTrabPassword = (req, res) => {
    var { password, password2 } = req.body;
    const id = req.params.id;
    let errors = [];

    //------------ Checking required fields ------------//
    if (password != password2) {
        req.flash(
            'error_msg',
            'As Passwords não correspondem.'
        );
        res.redirect(`/auth/resetTrab/${id}`);
    }

    else {
        bcryptjs.genSalt(10, (err, salt) => {
            bcryptjs.hash(password, salt, (err, hash) => {
                if (err) throw err;
                password = hash;

                Trab.findByIdAndUpdate(
                    { _id: id },
                    { password },
                    function (err, result) {
                        if (err) {
                            req.flash(
                                'error_msg',
                                'Erro na confirmação da nova password'
                            );
                            res.redirect(`/auth/resetTrab/${id}`);
                        } else {
                            req.flash(
                                'success_msg',
                                'Sucesso na confirmação da nova password.'
                            );
                            res.redirect('/auth/loginTrab');
                        }
                    }
                );

            });
        });
    }
}

exports.loginTrabHandle = (req, res, next) => {
    passport.authenticate('trabalhador', {
        successRedirect: '/workerpage',
        failureRedirect: '/auth/loginTrab',
        failureFlash: true
    })(req, res, next);
}

//------------ Logout Handle ------------//
exports.logoutTrabHandle = (req, res) => {
    req.logout();
    req.flash('success_msg', 'You are logged out');
    res.redirect('/');
}

exports.getTrab = async (req, res) => {
    try {
        const gettrab = await Trab.find();
        res.status(200).json(gettrab);
    } catch (err) {
        res.status(400).json({message: err});
    }
}

exports.getMarcacoesTrab = async(req, res) => {
    
    try {
        const marcacoes = await Trab.findById(req.user).populate('marcTrab');
        console.log('Marcações do Trabalhador', marcacoes);
        res.status(200).json(marcacoes.marcTrab);
    } catch (err) {
        res.json({message:err});
    }    

}

exports.getTrabById = async(req, res) => {

    console.log("Getting Worker...")
    try {
        console.log("1");
        const worker = await Trab.findById(req.params._id);
        console.log('Worker', worker);
        res.status(200).json(worker);
        console.log('Done!');
    } catch (err) {
        res.status(404).json({message: err});
    }
    
}

exports.getMarcacoesTrab2 = async(req,res) => {
    try {
        const marcacoes = await Trab.findById(req.params._id).populate('marcTrab');
        console.log('Marcações do Trabalhador', marcacoes);
        res.status(200).json(marcacoes.marcTrab);
    } catch (err) {
        res.json({message:err});
    }
}

exports.giveNote = async (req,res) => {

    console.log("Giving Note to Worker...");
    console.log(req.params._id);
    try {
        const note = await Trab.findByIdAndUpdate(req.params._id, req.body, {useFindAndModify: false});
        await note.save();
        console.log(req.body);
        res.status(200).json(note);
    } catch (err) {
        res.status(404).json({message: err})
    }
    console.log("Done!")
}

exports.workerSDisp = async(req, res) => { 

    console.log("Making worker not available for work....")
    try {

        const pequipaD = await Trab.findById(req.params._id);
        if(pequipaD.pequipa == "Sim"){
            res.status(404).json({message: "You can't make a worker not available while he is on a team"});
        }else{
            pequipaD.pequipa = "Não disponível";
            await pequipaD.save();

            const disp = await Trab.findByIdAndUpdate(req.params._id, {disponibilidade: "Não disponível"}, {useFindAndModify: false});
            await disp.save();

            res.status(200).json();
            console.log("Done!");
        }
    } catch (err) {
        res.status(404).json({message: err});
    }

}


exports.workerCDisp = async(req, res) => {

    console.log("Making worker available for work....")
    try {

        const pequipaD = await Trab.findById(req.params._id);
        if(pequipaD.pequipa == "Não disponível" && pequipaD.disponibilidade == "Não disponível"){
            
            pequipaD.pequipa = "Não";
            await pequipaD.save();

            const disp = await Trab.findByIdAndUpdate(req.params._id, {disponibilidade: "Sim"}, {useFindAndModify: false});
            await disp.save();

            res.status(200).json();
            console.log("Done!");
        }else{
            res.status(404).json({message: "Something went wrong...."});
        }

    }catch(err){
        res.status(404).json({message: err});
    }

}
