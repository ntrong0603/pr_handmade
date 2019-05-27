const publishers = require ('../models/publishers.model');
const categorys = require ('../models/category.model');

module.exports.getCatalog = async (req, res, next) => {
    try{
        let listPublishers = await publishers.find();
        let listCategory = await categorys.find(); 
        res.locals.listPublishers = listPublishers;
        res.locals.listCategory = listCategory;
        next();
    }
    catch(e){
        console.log(e);
    }
    
}