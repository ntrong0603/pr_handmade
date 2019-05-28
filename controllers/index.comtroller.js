const products = require('../models/products.model');
const functions = require( './admin/functions');

module.exports.indexPage = async (req, res, next) => {
    try{
        let listPublishers = res.locals.listPublishers;
        let listCategory = res.locals.listCategory; 
        let listItems = await products.find({hidden: false}, null, { sort : { serial : -1, _id: -1 }, limit : 10 }).exec();
        let listenItemsHot = await products.find({hot: true, hidden: false}, null, { sort : { serial : -1, _id: -1 }, limit : 10 }).exec();
        let listenItemsView = await products.find({hidden: false}, null, { sort : { view: -1, serial : -1, _id: -1 }, limit : 10 }).exec();

        // bo sung ten nha san xuat va the loai
        listItems = functions.getPublAndCate(listItems, listPublishers, listCategory);
        listenItemsHot = functions.getPublAndCate(listenItemsHot, listPublishers, listCategory);
        listenItemsView = functions.getPublAndCate(listenItemsView, listPublishers, listCategory);
        
        res.render('index', {title: 'Book Store', listItems: listItems, listenItemsHot: listenItemsHot, listenItemsView: listenItemsView});
    }
    catch(e){
        console.log(e);
    }
   
}