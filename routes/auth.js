const express = require('express');
const router = express.Router();

//------------ Importing Controllers ------------//
const authController = require('../controllers/authController')
const authControllerAdmin = require('../controllers/authControllerAdmin')
const authControllerTrab = require('../controllers/authControllerTrab')
//const authControllerMarc = require('../controllers/authControllerMarc')
const authControllerMarcacao = require('../controllers/authControllerMarcacao')

//------------ Login Route ------------//
//router.get('/login', (req, res) => res.render('login'));

router.get('/login', (req, res) => res.render('login_registar_user'));

router.get('/loginAd', (req, res) => res.render('loginAdmin'));


//------------ Forgot Password Route ------------//
router.get('/forgot', (req, res) => res.render('forgot'));

router.get('/colegas', (req, res) => res.render('colegas'));

router.get('/colegas2', (req, res) => res.render('colegas2'));

router.get('/welcome', (req, res) => res.render('welcome'));

//------------ Reset Password Route ------------//
router.get('/reset/:id', (req, res) => {
    // console.log(id)
    res.render('reset', { id: req.params.id })
});

//------------ Register Route ------------//
//router.get('/register', (req, res) => res.render('register'));

router.get('/login_registar_user', (req, res) => res.render('login_registar_user'));

router.get('/loginAdmin', (req, res) => res.render('loginAdmin'));

router.get('/registeradmin', (req, res) => res.render('colegas'));

router.get('/registertrab', (req, res) => res.render('colegas2'));

// Get marcacoes

router.get('/marcacoesGET', authControllerMarcacao.getMarcacoes);



//------------ Register POST Handle ------------//
//router.post('/register', authController.registerHandle);

router.post('/registeradmin', authControllerAdmin.registerAdminHandle);

router.post('/registertrab', authControllerTrab.registerTrabHandle);


router.post('/register', authController.registerHandle);

//------------ Email ACTIVATE Handle ------------//
router.get('/activate/:token', authController.activateHandle);

router.get('/activate2/:token', authControllerAdmin.activateAdminHandle);

router.get('/activate3/:token', authControllerTrab.activateTrabHandle);



//------------ Forgot Password Handle ------------//
router.post('/forgot', authController.forgotPassword);

//------------ Reset Password Handle ------------//
router.post('/reset/:id', authController.resetPassword);

//------------ Reset Password Handle ------------//
router.get('/forgot/:token', authController.gotoReset);

//------------ Login POST Handle ------------//
//router.post('/login', authController.loginHandle);
router.post('/login', authController.loginHandle);

router.post('/loginAd', authControllerAdmin.loginAdminHandle);

//------------ Logout GET Handle ------------//
router.get('/logout', authController.logoutHandle);



// Post Marcacao
router.post('/marcacaoPOST', authControllerMarcacao.registerMarcHandle);


module.exports = router;