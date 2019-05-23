const products = require('../../models/products.model');
const publishers = require ('../../models/publishers.model');
const categorys = require ('../../models/category.model');
const fs = require ('fs');

module.exports.indexProducts = async (req, res, next) => {
    try {
        let arrayItems = await products.find();

        let page = parseInt(req.query.page) || 1;
        let start = 0;
        if(page){
            start = (page - 1) * 2;
        }
        else{
            start = 0;
        }
        let end = start + 2;
        let result = arrayItems.slice(start, end);

        res.render('admin/products/products', {
            result: result,
            numPage: Math.ceil(arrayItems.length/2),
		    page: page
        });
    } catch (error) {
        console.error(error);
    }
    
}
module.exports.hiddenProduct = async (req, res, next) => {
    try {
        let item = await products.findById(req.params.id);
        item.hidden = !item.hidden;
        await item.save();
        res.redirect('/admin/products');
    } catch (error) {
        console.error(error);
    }
}
module.exports.indexAddProductItem = async (req, res, next) => {
    try {
        let publisher = await publishers.find();
        let category = await categorys.find();
        res.render('admin/products/products_add', {nameAction: 'Add Products', publishers: publisher, categorys: category});
    } catch (error) {
        console.error(error);
    }
    
}
module.exports.createProductItem = async (req, res, next) => {
    try {
        let arrayItems = await products.find();
        let _id = arrayItems.length > 0 ? arrayItems[arrayItems.length-1]._id + 1 : 1;
        let {category_id, publishing_id, name, price, count, description, content, serial, hidden} = req.body;
        let avata = req.file.path.split("\\").slice(1).join("/");
        hidden = hidden ? true : false;
        let newProductItem = new products({_id, serial, name, avata, price, count, description, content, category_id, publishing_id, hidden});
        
        await newProductItem.save();
        
        res.redirect('/admin/products');
    } catch (error) {
        console.error(error);
    }
}
module.exports.indexEditProductItem = async (req, res, next) => {
    try {
        let publisher = await publishers.find();
        let category = await categorys.find();
        let item = await products.findById(req.params.id);
        res.render('admin/products/products_add', {item: item, nameAction: 'Edit Products', publishers: publisher, categorys: category});
    } catch (error) {
        console.error(error);
    }
}
module.exports.saveEditProductItem = async (req, res, next) => {
    try {
        let {category_id, publishing_id, name, price, count, description, content, serial, hidden} = req.body;
        let item = await products.findById(req.params.id);
        
        hidden = hidden ? true : false;
        if(req.file){
            let avata = req.file.path.split("\\").slice(1).join("/");
            item.avata = avata;
        }
        item.category_id = category_id;
        item.publishing_id = publishing_id;
        item.name = name;
        item.price = price;
        item.count = count;
        item.description = description;
        item.content = content;
        item.serial = serial;
        item.hidden = hidden;

        await item.save();
        res.redirect('/admin/products');
    } catch (error) {
        console.error(error);
    }
}
module.exports.deleteProduct = async (req, res, next) => {
    try {
        let itemDelete = await products.findById(req.params.id);
        fs.unlinkSync('./uploads/' + itemDelete.avata);
        await itemDelete.remove();
        res.redirect('/admin/products');
    } catch (error) {
        console.error(error);
    }
}
