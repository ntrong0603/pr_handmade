const md5 = require('md5');
module.exports.requireLogin = (req, res, next) => {
    try {
        let username = req.cookies.username;
        let password = req.signedCookies.password;
        if(!req.cookies.login){
            res.redirect('/admin/login');
            return;
        }
        let user = username === "trongktvn";
        if(!user){
            res.redirect('/admin/login');
            return;
        }
        if(password !== md5("123456")){
            res.redirect('/admin/login');
            return;
        }
        res.locals.user = username;
        next();
    } catch (error) {
        console.error(error);
    }
}