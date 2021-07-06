const Equipas = require('../models/Equipas');
const Trab = require('../models/Trab');

exports.registerEquipaHandle = async (req, res) => {
    const { teamName, trab1, trab2, trab3 } = req.body;
    let errors = [];

    if (trab1 == "Primeiro Trabalhador") {
        req.flash(
            'error_msg',
            'Selecione todos os Trabalhadores.'
        );
        res.redirect('/auth/criar_equipa');
    }else{
        if (trab2 == "Segundo Trabalhador") {
            req.flash(
                'error_msg',
                'Selecione todos os Trabalhadores.'
            );
            res.redirect('/auth/criar_equipa');
        }else{
            if (trab3 == "Terceiro Trabalhador") {
                req.flash(
                    'error_msg',
                    'Selecione todos os Trabalhadores.'
                );
                res.redirect('/auth/criar_equipa');
            }else{
                if (!teamName) {
                    req.flash(
                        'error_msg',
                        'Indique um nome para a Equipa.'
                    );
                    res.redirect('/auth/criar_equipa');
                }else{
                    console.log("Posting Team...");
                    try {
                        console.log(req.body);
                        const equipa = new Equipas({
                            teamName,
                            trab1,
                            trab2,
                            trab3
                        });
                        await equipa.save();
                        req.flash(
                            'success_msg',
                            'Equipa Criada'
                        );
                        res.status(201).json();
                        console.log("Done!");

                    } catch (err) {
                        res.json({message: err});
                    }
                    res.redirect('/auth/criar_equipa');
                }
            }         
        }
    }
}