const { compareSync } = require('bcryptjs');
const Equipas = require('../models/Equipas');
const Trab = require('../models/Trab');

exports.registerEquipaHandle = async (req, res) => {
    const { teamName, trab1, trab2, trab3 } = req.body;

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
                        });
                        const trabalhador1 = await Trab.findOne({_id: trab1});
                        equipa.trab1 = trabalhador1;
                        const trabalhador2 = await Trab.findOne({_id: trab2});
                        equipa.trab2 = trabalhador2;
                        const trabalhador3 = await Trab.findOne({_id: trab3});
                        equipa.trab3 = trabalhador3;

                        await equipa.save();

                        req.flash(
                            'success_msg',
                            'Equipa Criada'
                        );

                        console.log('Atribuindo Equipa a trabalhador...');

                        trabalhador1.equipa = equipa;
                        await trabalhador1.save();

                        trabalhador2.equipa = equipa;
                        await trabalhador2.save();

                        trabalhador3.equipa = equipa;
                        await trabalhador3.save();

                        console.log('Equipa atribuida.');

                        const worker1 = await Trab.findByIdAndUpdate(trab1, {pequipa: "Sim"}, {useFindAndModify: false});
                        await worker1.save();
                        const worker2 = await Trab.findByIdAndUpdate(trab2, {pequipa: "Sim"}, {useFindAndModify: false});
                        await worker2.save();
                        const worker3 = await Trab.findByIdAndUpdate(trab3, {pequipa: "Sim"}, {useFindAndModify: false});
                        await worker3.save();

                        res.redirect('/auth/criar_equipa');
                        res.status(201).json();
                        console.log("Done!");


                    } catch (err) {
                        res.json({message: err});
                    }
                }
            }         
        }
    }
}

exports.getEquipas = async(req,res) => {
    
    console.log("Getting Teams...");
    try {
        const equipas = await Equipas.find();
        res.status(200).json(equipas);
    } catch (err) {
        res.status(400).json({message: err});
    }
    console.log("Done!");

}

exports.getEquipaById = async(req, res) => {
    console.log("Getting Equipa...")
    try {
        const equipaById = await Equipas.findById(req.params);
        console.log('Equipa', equipaById);
        res.status(200).json(equipaById);
    } catch (err) {
        res.status(404).json({message: err});
    }
    console.log("Done!");
}
