const md5 = require('md5');

module.exports.login = (req, res, next) => {
    res.render('admin/login/login');
}
module.exports.postLogin = (req, res, next) => {
    try{
        let username = req.body.username;
        let password = md5(req.body.password);
        let user = username === "trongktvn";
        if(!user){
            res.render('admin/login',{
                errors: [
                    'User not exist'
                ]
            });
            return;
        }
        if(password !== md5("123456")){
            res.render('admin/login',{
                errors: [
                    'Wrong password'
                ]
            });
            return;
        }
        res.cookie('login', true);
        res.cookie('username', username);
        res.cookie('password', password, {signed: true});
       
        res.redirect('/admin');
    }catch(error){
        console.error(error);
    }
}