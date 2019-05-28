const User = require('../models/users.model');

module.exports.requireLogin = async (req, res, next) => {
    try {
        let username = req.cookies.user_name;
        let password = req.signedCookies.password;
        let role = req.cookies.role;
        username = username.toLowerCase();
        let user = await User.findOne({user_name: {$eq: username}, password: {$eq: password}});
        if(!user){
            res.redirect('/');
            return;
        }
        if(user.role == role && user.role == 1){
            res.locals.user = username;
            next();
        }
        else{
            res.redirect('/');
            return;
        }
        
    } catch (error) {
        console.error(error);
    }
}

module.exports.kiemTraTonTaiDangNhap = async (req, res, next) => {
    try {
        let username = req.cookies.user_name;
        let password = req.signedCookies.password;
        if(username == ''){
            next();
            return;
        }
        let user = await User.findOne({user_name: {$eq: username}, password: {$eq: password}});
        if(!user){
            next();
        }   
        else{
            res.cookie('user_name', '');
            res.cookie('password', '');
            res.cookie('role', '');
            res.redirect('/');
            return;
        }  
    } catch (error) {
        console.error(error);
    }
}