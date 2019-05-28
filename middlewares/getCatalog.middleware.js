const publishers = require ('../models/publishers.model');
const categorys = require ('../models/category.model');

module.exports.getCatalog = async (req, res, next) => {
    try{
        let listPublishers = await publishers.find();
        let listCategory = await categorys.find(); 
        res.locals.listPublishers = listPublishers;
        res.locals.listCategory = listCategory;
        let username = req.cookies.user_name;
        res.locals.login = false;
        if(username && username != ''){
            res.locals.login = true;
            res.locals.role = req.cookies.role;
            res.locals.username = username;
        }
        
        next();
    }
    catch(e){
        console.log(e);
    }
    
}