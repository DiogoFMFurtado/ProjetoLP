//------------ Routing via Auth ------------//

function ensureAuthenticated(req, res, next) {
    if (!req.isAuthenticated()) {
        return res.redirect('/');
    }
     return next();
}
function ensureRole(role){
    return (req, res, next)=>{
        if (req.user.role !== role){
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
};