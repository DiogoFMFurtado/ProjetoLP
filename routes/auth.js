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

router.get('/criar_equipa', (req, res) => res.render('criar_equipa'));

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
router.delete('/projDEL/:_id/:clientId', authControllerMarcacao.deleteMarc);
router.put('/teamAttr/:_id2', authControllerMarcacao.atribTeam);
router.put('/disAssE/:_id2/:_id1', authControllerMarcacao.disAssEquipa);





// Workers Admin Page

router.get('/workersGET', ControllerWorker.getWorkers);
router.delete('/workerFIRE', ControllerWorker.fireWorker);

// Clients Admin Page

router.get('/clientsGET', ControllerClient.getClients);
router.get('/clientGET/:clientId', ControllerClient.getClient);
router.put('/adminPUT/:clientId', ControllerClient.hasAdmin);
router.get('/clientByIdGET/:clientId', ControllerClient.getClientById);
router.put('/adminNPUT/:admin/:client', ControllerClient.disAssAdmin);




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

//Marcacao

router.post('/marcacaoPOST', authControllerMarcacao.registerMarcHandle);
router.put('/avaliacaoPUT/:_id', authControllerMarcacao.clientAval);
router.put('/endProject/:_id', authControllerMarcacao.terminateMarc);

//Feedback

router.post('/feedback', authControllerFeedback.registerFeedbackHandle);
router.post('/feedbackT', authControllerFeedback.postFeedT);
router.get('/getUserFeedback/:_id', authControllerFeedback.getFeedBacksById);
router.get('/getWorkerFeedback/:_id', authControllerFeedback.getFeedBacksByIdT);
router.delete('/apagarfeedback/:_id/:client', authControllerFeedback.deleteFeedback);
router.get('/getFeedbacks', authControllerFeedback.getFeedbacks);



//Equipa
router.post('/equipa', authControllerEquipa.registerEquipaHandle);
router.get('/equipasGET', authControllerEquipa.getEquipas);
router.get('/equipaGET/:_id', authControllerEquipa.getEquipaById);
router.delete('/deleteTeam/:trab1/:trab2/:trab3/:_id', authControllerEquipa.delEquipa);
router.get('/marcEquipaGET/:teamId', authControllerEquipa.getMarcEquipa);


// Trab
router.get('/getTrab', authControllerTrab.getTrab);
router.get('/marcsTrabGET/:_id', authControllerTrab.getMarcacoesTrab);
router.get('/marcsTrabGET2/:_id', authControllerTrab.getMarcacoesTrab2);
router.get('/trabByIdGET/:_id', authControllerTrab.getTrabById);
router.put('/giveNote/:_id', authControllerTrab.giveNote);
router.put('/trabNDisp/:_id', authControllerTrab.workerSDisp);
router.put('/trabCDisp/:_id', authControllerTrab.workerCDisp);
router.delete('/deleteFeedbackT/:_id/:workerId', authControllerFeedback.deleteFeedbackT);


router.get('/allAdminsGET', authControllerAdmin.getAllAdmins);

module.exports = router;