const category = require ('../../models/category.model');
const funcitons =  require ('../../controllers/admin/functions');

module.exports.indexCategorys = async (req, res, next) => {
    try {
        let arrayItems = await category.find();

        let page = parseInt(req.query.page) || 1;
        let start = 0;
        if(page){
            start = (page - 1) * 10;
        }
        else{
            start = 0;
        }
        let end = start + 10;
        let result = arrayItems.slice(start, end);

        res.render('admin/categorys/categorys', {
            result: result,
            numPage: Math.ceil(arrayItems.length/10),
		    page: page
        });
    } catch (error) {
        console.error(error);
    }
}
module.exports.indexAddCategory = (req, res, next) => {
    res.render('admin/categorys/category_add', {nameAction: 'Add Category'});
}
module.exports.createCategory = async (req, res, next) => {
    try {
        let arrayItems = await category.find();
        let _id = arrayItems.length > 0 ? arrayItems[arrayItems.length-1]._id + 1 : 1;
        let {name, description, content, serial, hidden} = req.body;
        hidden = hidden ? true : false;
        let link_seo = funcitons.createNameStandardize(name).link;
        name = funcitons.createNameStandardize(name).name;
        let newCategoryItem = new category({_id, serial, link_seo, name, description, content, hidden});
        await newCategoryItem.save();
        res.redirect('/admin/categorys');
    } catch (error) {
        console.error(error);
    }
}
module.exports.indexEditCategory = async (req, res, next) => {
    try {
        let item = await category.findById(req.params.id);
        res.render('admin/categorys/category_add', {item: item, nameAction: 'Edit Category'});
    } catch (error) {
        console.error(error);
    }
}
module.exports.saveEditCategiry = async (req, res, next) => {
    try {
        let {name, description, link_seo, content, serial, hidden} = req.body;
        let item = await category.findById(req.params.id);

        hidden = hidden ? true : false;
        if(link_seo == ''){
            item.link_seo = funcitons.createNameStandardize(name).link;
        }else{
            item.link_seo = link_seo;
        }
        item.name = funcitons.createNameStandardize(name).name;
        item.description = description;
        item.content = content;
        item.serial = serial;
        item.hidden = hidden;
        item.day_edit = Date.now();

        await item.save();
        res.redirect('/admin/categorys');
    } catch (error) {
        console.error(error);
    }
}
module.exports.deleteCategory = async (req, res, next) => {
    try {
        let itemDelete = await category.findById(req.params.id);
        await itemDelete.remove();
        res.redirect('/admin/categorys');
    } catch (error) {
        console.error(error);
    }
}