const md5 = require('md5');
const User = require('../models/users.model');

module.exports.index = (req, res, next) => {
    try {
        res.render('users/user', {title: 'User'})
    } catch (error) {
        console.log(error);
    }
}
module.exports.signIn = async (req, res, next) => {
    try {
        let {user_name, password} = req.body;
        let error;
        user_name = user_name.toLowerCase();
        password = md5(password);

        let user = await User.findOne({user_name: {$eq: user_name}, password: {$eq: password}});
        if(!user){
            error = 'Tài khoản không tồn tại hoặc sai mật khẩu';
            res.render('users/user', {title: 'User', error: error})
            return;
        }

        res.cookie('user_name', user.user_name);
        res.cookie('password', user.password, {signed: true});
        res.cookie('role', user.role);
        res.redirect('/');
    } catch (error) {
        console.log(error);
    }
}
module.exports.signUp = async (req, res, next) => {
    try {
        res.render('users/user', {title: 'User', sign: 'signup'})
    } catch (error) {
        console.log(error);
    }
}
module.exports.createAcc = async (req, res, next) => {
    try {
        let {user_name, email, password} = req.body;
        let arrayItems = await User.find();
        let _id = arrayItems.length > 0 ?  arrayItems[arrayItems.length-1]._id + 1 : 1;
        user_name = user_name.toLowerCase();
        password = md5(password);
        let checkUser, error;
        checkUser = await User.find({user_name: {$eq: user_name}});

        if(checkUser.length > 0){
            error = 'Tài khoản đã tồn tại';
            res.render('users/user', {title: 'User', sign: 'signup', error: error})
            return;
        }

        let newUser = new User({_id, user_name, password, email});
        await newUser.save();

        res.cookie('user_name', user_name);
        res.cookie('password', password, {signed: true});
        res.cookie('role', '0');

        res.redirect('/');
    } catch (error) {
        console.log(error);
    }
}
module.exports.logOut = (req, res, next) => {
    try {
        res.cookie('user_name', '');
        res.cookie('password', '');
        res.cookie('role', '');
        res.redirect('/');
    } catch (error) {
        console.log(error);
    }
}