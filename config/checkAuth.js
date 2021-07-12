//------------ Routing via Auth ------------//

 function ensureAuthenticated(req, res, next) {
    if (!req.isAuthenticated()) {
        return res.redirect('/');
    }
     return next();
}
function ensureRole(role){
    return (req, res, next)=>{
       //if (req.user.role === role){
       //    return res.redirect('')
       //}
        return next()
    }
}



module.exports = {
    ensureRole,
    ensureAuthenticated
};