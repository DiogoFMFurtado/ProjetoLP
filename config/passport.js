const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');

//------------ Local User Model ------------//
const User = require('../models/User');
const Trab = require('../models/Trab');
const Admin = require('../models/Admin');

module.exports = function (passport) {
    passport.use('admin',
        new LocalStrategy({ usernameField: 'email' }, (email, password, done) => {
            
            //------------ User Matching ------------//
            Admin.findOne({
                email: email
            }).then(user => {
                if (!user) {
                    return done(null, false, { message: 'This email ID is not registered' });
                }

                //------------ Password Matching ------------//
                bcrypt.compare(password, user.password, (err, isMatch) => {
                    if (err) throw err;
                    if (isMatch) {
                        return done(null, user);
                    } else {
                        return done(null, false, { message: 'Password incorrect! Please try again.' });
                    }
                });
            });
        })
    );
   passport.use('cliente',
       new LocalStrategy({ usernameField: 'email' }, (email, password, done) => {

           //------------ User Matching ------------//
           User.findOne({
               email: email
           }).then(user => {
               if (!user) {
                   return done(null, false, { message: 'This email ID is not registered' });
               }

               //------------ Password Matching ------------//
               bcrypt.compare(password, user.password, (err, isMatch) => {
                   if (err) throw err;
                   if (isMatch) {
                       return done(null, user);
                   } else {
                       return done(null, false, { message: 'Password incorrect! Please try again.' });
                   }
               });
           });
       })
   );
   passport.use('trabalhador',
       new LocalStrategy({ usernameField: 'email' }, (email, password, done) => {

           //------------ User Matching ------------//
           Trab.findOne({
               email: email
           }).then(user => {
               if (!user) {
                   return done(null, false, { message: 'This email ID is not registered' });
               }

               //------------ Password Matching ------------//
               bcrypt.compare(password, user.password, (err, isMatch) => {
                   if (err) throw err;
                   if (isMatch) {
                       return done(null, user);
                   } else {
                       return done(null, false, { message: 'Password incorrect! Please try again.' });
                   }
               });
           });
       })
   );

    passport.serializeUser((user, done) => {
        done(null, { _id: user.id, role: user.role });
    });

    passport.deserializeUser( (login, done) =>{
        if (login.role === 'Adminstrador') {
            Admin.findById(login, (err, admin) => {
                if (admin)
                    done(null, admin);
                else
                    done(err, { message: 'Administrador não encontrado' })
            });
        }else if (login.role === 'Cliente') {
            User.findById(login, (err, user) => {
                if (user)
                    done(null, user);
                else
                    done(err, { message: 'Cliente não encontrado' })
            });
        }else if (login.role === 'Trabalhador') {
            Trab.findById(login, (err, trab) => {
                if (trab)
                    done(null, trab);
                else
                    done(err, { message: 'Trabalhador não encontrado' })
            });
        }
    });
};


