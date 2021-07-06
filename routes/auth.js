const express = require('express');
const router = express.Router();

//------------ Importing Controllers ------------//
const authController = require('../controllers/authController')
const authControllerAdmin = require('../controllers/authControllerAdmin')
const authControllerTrab = require('../controllers/authControllerTrab')
const authControllerMarcacao = require('../controllers/authControllerMarcacao')
const authControllerFeedback = require('../controllers/authControllerFeedback')
const ControllerWorker = require('../controllers/ControllerWorker')
const ControllerClient = require('../controllers/ControllerClient');
const authControllerEquipa = require('../controllers/authControllerEquipa')


//------------ Login Route ------------//
//router.get('/login', (req, res) => res.render('login'));

router.get('/login', (req, res) => res.render('login_registar_user'));

router.get('/loginAd', (req, res) => res.render('loginAdmin'));

router.get('/loginTr', (req, res) => res.render('loginTrab'));


//------------ Forgot Password Route ------------//
router.get('/forgot', (req, res) => res.render('forgot'));

router.get('/forgotAd', (req, res) => res.render('forgotAd'));

router.get('/colegas', (req, res) => res.render('colegas'));

router.get('/colegas2', (req, res) => res.render('colegas2'));

router.get('/welcome', (req, res) => res.render('welcome'));

//------------ Reset Password Route ------------//
router.get('/reset/:id', (req, res) => {
    // console.log(id)
    res.render('reset', { id: req.params.id })
});

router.get('/resetAdmin/:id', (req, res) => {
    // console.log(id)
    res.render('resetAdmin', { id: req.params.id })
});

//------------ Register Route ------------//
//router.get('/register', (req, res) => res.render('register'));

router.get('/login_registar_user', (req, res) => res.render('login_registar_user'));

router.get('/loginAdmin', (req, res) => res.render('loginAdmin'));

router.get('/loginTrab', (req, res) => res.render('loginTrab'));

router.get('/registeradmin', (req, res) => res.render('colegas'));

router.get('/registertrab', (req, res) => res.render('colegas2'));

// Get marcacoes

router.get('/marcacoesGET/:userId', authControllerMarcacao.getMarcacoes);
router.get('/marcacoesGETAll', authControllerMarcacao.getAllMarcacoes);
router.get('/marcGET/:marcacaoId', authControllerMarcacao.getMarcacaoById);
router.put('/evalPUT/:marcacaoId', authControllerMarcacao.giveAval);
router.put('/descripPUT/:marcacaoId', authControllerMarcacao.giveDescrip);



router.get('/getFeedbacks', authControllerFeedback.getFeedbacks);
router.get('/getTrab', authControllerTrab.getTrab);

// Workers Admin Page

router.get('/workersGET', ControllerWorker.getWorkers);
router.delete('/workerFIRE', ControllerWorker.fireWorker);

// Clients Admin Page

router.get('/clientsGET', ControllerClient.getClients);
router.get('/clientGET/:clientId', ControllerClient.getClient);
router.put('/adminPUT/:clientId', ControllerClient.hasAdmin);
router.get('/clientByIdGET/:clientId', ControllerClient.getClientById);




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

router.post('/forgotAd', authControllerAdmin.forgotAdminPassword);

//------------ Reset Password Handle ------------//
router.post('/reset/:id', authController.resetPassword);

router.post('/resetAdmin/:id', authControllerAdmin.resetAdminPassword);

//------------ Reset Password Handle ------------//
router.get('/forgot/:token', authController.gotoReset);
router.get('/forgotAd/:token', authControllerAdmin.gotoResetAdmin);

//------------ Login POST Handle ------------//
//router.post('/login', authController.loginHandle);
router.post('/login', authController.loginHandle);

router.post('/loginAd', authControllerAdmin.loginAdminHandle);

router.post('/loginTr', authControllerTrab.loginTrabHandle);

//------------ Logout GET Handle ------------//
router.get('/logout', authController.logoutHandle);

router.get('/logoutAdmin', authControllerAdmin.logoutAdminHandle);

router.get('/logoutTrab', authControllerTrab.logoutTrabHandle);

// Post Marcacao

router.post('/marcacaoPOST', authControllerMarcacao.registerMarcHandle);
router.put('/avaliacaoPUT/:_id', authControllerMarcacao.clientAval);

//Feedback

router.post('/feedback', authControllerFeedback.registerFeedbackHandle);

router.delete('/apagarfeedback/:_id', authControllerFeedback.deleteFeedback);


//Equipa
router.post('/equipa', authControllerEquipa.registerEquipaHandle);





module.exports = router;