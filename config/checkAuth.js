//------------ Routing via Auth ------------//

function ensureAuthenticated(req, res, next) {
    if (!req.isAuthenticated()) {
        return res.redirect('/');
    }else if(req.isAuthenticated()){

    }
     return next();
}
function ensureRole(role){
    return (req, res, next)=>{
        if (req.user.role !== role){
            //res.status(403)
            if (req.user.role === 'Cliente') {
                return res.redirect('/clientpage')
            } else if(req.user.role === 'Trabalhador'){
                return res.redirect('/workerpage')
            }
        }
        return next()
    }
}



module.exports = {
    ensureRole,
    ensureAuthenticated
    //forwardAuthenticated: function (req, res, next) {
    //    if (!req.isAuthenticated()) {
    //        return next();
    //    }
    //    res.redirect('/dashboard.ejs');
    //}
};