const Marcacao = require('../models/Marcacao');
const User = require('../models/User');
const Equipas = require('../models/Equipas');
const Trab = require('../models/Trab');


exports.registerMarcHandle = async (req, res) => {
    
    const { name, email, date, hour, address } = req.body;

    try {
        console.log(req.body);
        const marcacao = new Marcacao({
            name,
            email,
            date,
            hour,
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
        const avaliado_admin = await Marcacao.findByIdAndUpdate(req.params.marcacaoId, {avaliado_admin: "Sim"}, {useFindAndModify: false});
        console.log(req.body);
        await eval_admin.save();
        await avaliado_admin.save();
        res.status(200).json(eval_admin);
    } catch (err) {
        res.status(404).json({message: err})
    }
    console.log("Done!")
}

exports.clientAval = async (req, res) => {
    console.log("Client is giving rating to appointement...");
    console.log(req.params._id);
    try {
        const aval_client = await Marcacao.findByIdAndUpdate(req.params._id, req.body, {useFindAndModify: false});
        console.log(req.body);
        await aval_client.save();
        const isAvaliado = await Marcacao.findByIdAndUpdate(req.params._id, {$set: { avaliado: true }}, {useFindAndModify: false});
        await isAvaliado.save();
        
        res.status(200).json(aval_client);
        
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
        description.save();
        console.log(req.body);
        res.status(200).json(description);
    } catch (err) {
        res.status(404).json({message: err})
    }
    console.log("Done!")
}

exports.terminateMarc = async (req,res) => {

    console.log("Worker is terminating the project...");
    console.log(req.params._id);
    try {
        const terminate = await Marcacao.findByIdAndUpdate(req.params._id, {state: "Terminado"}, {useFindAndModify: false});
        terminate.save();
        res.status(200).json();
        console.log("Done!");
    } catch (err) {
        res.status(404).json({message: err})
    }
}


exports.deleteMarc = async (req,res) => {

    console.log("Deleting Project..");
    console.log(req.params._id);
    console.log(req.params.clientId);
    

    try{

        // Remove a marcação do array do User
        const delProj = await User.findByIdAndUpdate(req.params.clientId,
            { $pull: {
                marcacaoCliente: req.params._id
            }});
        await delProj.save();
        

        await Marcacao.deleteOne({_id: req.params._id});
        res.status(200).json();
            
        console.log("1");

    }catch(err) {
        res.status(400).json({message: err});
    }

}

exports.atribTeam = async(req,res) => {

    console.log("Attributing Team for Project....");
    console.log(req.body);
    console.log(req.params._id2);

    try{

        const equipa = await Equipas.findById(req.body);
        const proj = await Marcacao.findById(req.params._id2);

        //Associação Equipa a Projeto
        proj.team = equipa;
        await proj.save();
        equipa.marcsEquipa.push(proj);
        await equipa.save();
        
        console.log("1");
        
        const equipaTrue = await Marcacao.findByIdAndUpdate(req.params._id2, {equipa: "Sim"}, {useFindAndModify: false});
        await equipaTrue.save();
        
        console.log("1");

        // Associação Projeto a cada Trabalhador
        const worker1 = await Trab.findOne({_id: equipa.trab1});
        worker1.marcTrab.push(proj);
        await worker1.save();
        const worker2 = await Trab.findOne({_id: equipa.trab2});
        worker2.marcTrab.push(proj);
        await worker2.save();
        const worker3 = await Trab.findOne({_id: equipa.trab3});
        worker3.marcTrab.push(proj);
        await worker3.save();
        
        console.log("2");
        
        res.status(201).json()
        console.log("Done!");

    } catch(err) {
        res.status(404).json({message: err})
    }

    
}

exports.disAssEquipa = async(req,res) => {

    console.log("Removing Team for Project....");
    console.log(req.params._id2); // Marcacao
    console.log(req.params._id1); // Equipa

    try {
       
        console.log("1");
        // Retira Projeto Da Equipa
        const equipa = await Equipas.findByIdAndUpdate(req.params._id1, { $pull: {marcsEquipa: req.params._id2}}, {useFindAndModify: false});
        await equipa.save();

        console.log("2");
        // Retira Projeto Dos Trabalhadores
        const worker1 = await Trab.findByIdAndUpdate(equipa.trab1, { $pull: {marcTrab: req.params._id2}});
        await worker1.save();
        const worker2 = await Trab.findByIdAndUpdate(equipa.trab2, { $pull: {marcTrab: req.params._id2}});
        await worker2.save();
        const worker3 = await Trab.findByIdAndUpdate(equipa.trab3, { $pull: {marcTrab: req.params._id2}});
        await worker3.save();
        
        // equipa: não
        const equipaFalse = await Marcacao.findByIdAndUpdate(req.params._id2, {equipa: "Não"}, {useFindAndModify: false});
        await equipaFalse.save();

        console.log("3");

        // Retira equipa do Projeto
        const proj = await Marcacao.findByIdAndUpdate(req.params._id2, {team: null}, {useFindAndModify: false});
        await proj.save();

        console.log("4");
        
        res.status(200).json();
        console.log("Done!");

    } catch (err) {
        res.status(404).json({message: err});
    }
    
}