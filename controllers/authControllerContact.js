const nodemailer = require('nodemailer');

exports.contactoHandle = (req, res) => {

    let contactName = document.getElementsByName(contact_name);
    let contactEmail = document.getElementsByName(contact_email);
    let contactMessage = document.getElementsByName(contact_message);

    let formdat ={
        contactName = contactName.value,
        contactEmail = contactEmail.value,
        contactMessage = contactMessage.value
    }

    const {contactName, contactEmail, contactMessage} = req.body;

    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth:{
            user: 'nodejsa@gmail.com',
        }
    });

    let mailOptions={
        from: contact_email,
        to: 'limpeza.mania.servicos@gmail.com',
        subject: `Contacte-nos, do Sr: ${contact_name}`,
        text: contact_message
    };

    transporter.sendMail(mailOptions, (error, info) =>{
        if (error) {
            console.log(error);
            req.flash(
                'error_msg',
                'Ocorreu um erro, por favor, tente de novo.'
            );
            res.redirect('/auth/welcome');
        }
        else {
            console.log('Mail sent : %s', info.response);
            req.flash(
                'success_msg',
                'A sua dúvida foi enviada.'
            );
            res.redirect('/auth/welcome');
        }
    });
}