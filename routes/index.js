const express = require('express');
const router = express.Router();
const { ensureAuthenticated, ensureRole } = require('../config/checkAuth')

//------------ Welcome Route ------------//
router.get('/', (req, res) => {
    res.render('welcome');
});

//------------ Dashboard Route ------------//
router.get('/dashboard', ensureAuthenticated, ensureRole('Adminstrador'), (req, res) => res.render('dashboard', {
    name: req.user.name
}));

router.get('/workerpage', ensureAuthenticated, ensureRole('Trabalhador'),(req, res) => res.render('workerpage', {
    name: req.user.name
}));

router.get('/clientpage', ensureAuthenticated, ensureRole('Cliente'),(req, res) => res.render('clientpage', {
    name: req.user.name
}));

router.get('/loginAdmin', ensureAuthenticated, (req, res) => res.render('loginAdmin', {
    name: req.user.name
}));

router.get('/calendario', ensureAuthenticated, ensureRole('Adminstrador'), (req, res) => res.render('calendario', {
    name: req.user.name
}));

router.get('/clientes', ensureAuthenticated, ensureRole('Adminstrador'), (req, res) => res.render('clientes', {
    name: req.user.name
}));

router.get('/trabalhadores', ensureAuthenticated, ensureRole('Adminstrador'), (req, res) => res.render('trabalhadores', {
    name: req.user.name
}));

router.get('/performance', ensureAuthenticated, ensureRole('Adminstrador'), (req, res) => res.render('performance', {
    name: req.user.name
}));

router.get('/colegas', ensureAuthenticated, ensureRole('Adminstrador'), (req, res) => res.render('colegas', {
    name: req.user.name
}));

router.get('/colegas2', ensureAuthenticated, ensureRole('Adminstrador'), (req, res) => res.render('colegas2', {
    name: req.user.name
}));

router.get('/feedbacks', ensureAuthenticated, ensureRole('Adminstrador'), (req, res) => res.render('feedbacks', {
    name: req.user.name
}));

router.get('/icons', ensureAuthenticated, ensureRole('Adminstrador'), (req, res) => res.render('icons', {
    name: req.user.name
}));

router.get('/map', ensureAuthenticated, ensureRole('Adminstrador'), (req, res) => res.render('map', {
    name: req.user.name
}));

router.get('/notifications', ensureAuthenticated, ensureRole('Adminstrador'), (req, res) => res.render('notifications', {
    name: req.user.name
}));

router.get('/user', ensureAuthenticated, ensureRole('Adminstrador'), (req, res) => res.render('user', {
    name: req.user.name
}));

router.get('/tables', ensureAuthenticated, ensureRole('Adminstrador'), (req, res) => res.render('tables', {
    name: req.user.name
}));

router.get('/typography', ensureAuthenticated, ensureRole('Adminstrador'), (req, res) => res.render('typography', {
    name: req.user.name
}));

router.get('/rtl', ensureAuthenticated, ensureRole('Adminstrador'), (req, res) => res.render('rtl', {
    name: req.user.name
}));

router.get('/upgrade', ensureAuthenticated, ensureRole('Adminstrador'), (req, res) => res.render('upgrade', {
    name: req.user.name
}));

router.get('/projmarc', ensureAuthenticated, ensureRole('Adminstrador'), (req, res) => res.render('projmarc', {
    name: req.user.name
}));

router.get('/ver_todos_trabalhadores', ensureAuthenticated, ensureRole('Adminstrador'), (req, res) => res.render('ver_todos_trabalhadores', {
    name: req.user.name
}));

router.get('/ver_projeto', ensureAuthenticated, ensureRole('Adminstrador'), (req, res) => res.render('ver_projeto', {
    name: req.user.name
}));

router.get('/ver_projeto_marcacoes', ensureAuthenticated, ensureRole('Adminstrador'), (req, res) => res.render('ver_projeto_marcacoes', {
    name: req.user.name
}));

router.get('/ver_equipa', ensureAuthenticated, ensureRole('Adminstrador'), (req, res) => res.render('ver_equipa', {
    name: req.user.name
}));

router.get('/ver_cliente', ensureAuthenticated, ensureRole('Adminstrador'), (req, res) => res.render('ver_cliente', {
    name: req.user.name
}));

router.get('/criar_equipa', ensureAuthenticated, ensureRole('Adminstrador'), (req, res) => res.render('criar_equipa', {
    name: req.user.name
}));

router.get('/ver_trabalhador', ensureAuthenticated, ensureRole('Adminstrador'), (req, res) => res.render('ver_trabalhador', {
    name: req.user.name
}));

module.exports = router;