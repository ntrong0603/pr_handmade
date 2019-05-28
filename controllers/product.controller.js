const products = require('../models/products.model');
const publishers = require ('../models/publishers.model');
const categorys = require ('../models/category.model');
const functions = require( './admin/functions');



module.exports.index = async (req, res, next) => {
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
        
        res.render('products', {title: 'Products', listItems: listItems, listenItemsHot: listenItemsHot, listenItemsView: listenItemsView});
    }
    catch(e){
        console.log(e);
    }
}

module.exports.indexTheLoai = async (req, res, next) => {
    try {
        let listPublishers = res.locals.listPublishers;
        let listCategory = res.locals.listCategory; 

        let idCategory = req.params.id.split("_")[1];
        let category = await categorys.findById(idCategory);
        
        let listItems = await products.find({hidden: false, category_id: idCategory}, null, { sort : { serial : -1, _id: -1 }}).exec();
        listItems = functions.getPublAndCate(listItems, listPublishers, listCategory);

        res.render('category', {listItems: listItems, category: category});
    } catch (error) {
        console.log(error);
    }
}
module.exports.indexNXB = async (req, res, next) => {
    try {
        let listPublishers = res.locals.listPublishers;
        let listCategory = res.locals.listCategory; 

        let idPublis = req.params.id.split("_")[1];
        let publis = await publishers.findById(idPublis);

        let listItems = await products.find({hidden: false, publishing_id: idPublis}, null, { sort : { serial : -1, _id: -1 }}).exec();
        listItems = functions.getPublAndCate(listItems, listPublishers, listCategory);

        res.render('publisher', {listItems: listItems, publis: publis});
    } catch (error) {
        console.log(error);
    }
}
module.exports.search = async (req, res, next) => {
    try {
        let listPublishers = res.locals.listPublishers;
        let listCategory = res.locals.listCategory; 

        let query = req.query.q;

        let listItems = await products.find({hidden: false, name: { $regex: query, $options: 'i' }});
        listItems = functions.getPublAndCate(listItems, listPublishers, listCategory);

        res.render('search', {listItems: listItems, querySearch: query});
    } catch (error) {
        console.log(error);
    }
}
module.exports.indexDetail = async (req, res, next) => {
    try {
        let listPublishers = res.locals.listPublishers;
        let listCategory = res.locals.listCategory; 
        let idProducts = req.params.id.split("_")[1];

        let item = await products.findById(idProducts);
        let category = await categorys.findById(item.category_id);
        let publisher = await publishers.findById(item.publishing_id);

        let itemsCategory = await products.find({category_id: {$eq: item.category_id}}, null, { sort : { serial : -1, _id: -1 }});
        itemsCategory = functions.getPublAndCate(itemsCategory, listPublishers, listCategory);

        let itemsPublisher = await products.find({publishing_id: {$eq: item.publishing_id}}, null, { sort : { serial : -1, _id: -1 }});
        itemsPublisher = functions.getPublAndCate(itemsPublisher, listPublishers, listCategory);
        
        res.render('detail', {item: item, category: category, publisher: publisher, itemsCategory: itemsCategory, itemsPublisher: itemsPublisher});
    } catch (error) {
        console.log(error);
    }
}