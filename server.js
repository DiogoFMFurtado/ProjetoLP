const express = require('express');
const mongoose = require('mongoose');
const flash = require('connect-flash');
const session = require('express-session');
const passport = require('passport');

const app = express();

//------------ Passport Configuration ------------//
require('./config/passport')(passport);

//------------ DB Configuration ------------//
const db = require('./config/key').MongoURI;

//------------ Mongo Connection ------------//
mongoose.connect('mongodb+srv://Diogo:121231234a@cluster0.m4vxj.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false })
    .then(() => console.log("Successfully connected to MongoDB"))
    .catch(err => console.log(err));
  

//------------ EJS Configuration ------------//

app.use("/assets", express.static('./assets'));
app.use("/views", express.static('./views'));
app.use("/projeto_main", express.static('./projeto_main'));
app.use("/public", express.static('./public'));
app.use("/docs", express.static('./docs'));
app.set('view engine', 'ejs');

app.use('/assets', express.static(__dirname + '/assets'));
app.use('/views', express.static(__dirname + '/views'));
app.use('/docs', express.static(__dirname + '/docs'));
app.use('/submit', express.static(__dirname + '/public'));




//------------ Bodyparser Configuration ------------//
app.use(express.urlencoded({ extended: false }))

//------------ Express session Configuration ------------//
app.use(
    session({
        secret: 'secret',
        resave: true,
        saveUninitialized: true
    })
);

//------------ Passport Middlewares ------------//
app.use(passport.initialize());
app.use(passport.session());

//------------ Connecting flash ------------//
app.use(flash());

//------------ Global variables ------------//
app.use(function(req, res, next) {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  next();
});
//------------ Routes ------------//
app.use('/', require('./routes/index'));
app.use('/auth', require('./routes/auth'));
app.use('/marcacao', require('./routes/marcacao'));



const PORT = process.env.PORT || 3000;

app.listen(PORT, console.log(`O servidor está a correr na porta ${PORT}`));