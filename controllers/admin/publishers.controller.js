const publishers = require ('../../models/publishers.model');
const funcitons =  require ('../../controllers/admin/functions');

module.exports.indexPublishers = async (req, res, next) => {
    try {
        let arrayItems = await publishers.find();

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

        res.render('admin/publishers/publishers', {
            result: result,
            numPage: Math.ceil(arrayItems.length/10),
		    page: page
        });
    } catch (error) {
        console.error(error);
    }
}
module.exports.indexAddPublisher = (req, res, next) => {
    res.render('admin/publishers/publisher_add', {nameAction: 'Add publishers'});
}
module.exports.createPublisher = async (req, res, next) => {
    try {
        let arrayItems = await publishers.find();
        let _id = arrayItems.length > 0 ? arrayItems[arrayItems.length-1]._id + 1 : 1;
        let {name, description, content, serial, hidden} = req.body;
        hidden = hidden ? true : false;
        let link_seo = funcitons.createNameStandardize(name).link;
        name = funcitons.createNameStandardize(name).name;
        let newPublisherItem = new publishers({_id, serial, link_seo, name, description, content, hidden});
        await newPublisherItem.save();
        res.redirect('/admin/publishers');
    } catch (error) {
        console.error(error);
    }
}
module.exports.indexEditPublisher = async (req, res, next) => {
    try {
        let item = await publishers.findById(req.params.id);
        res.render('admin/publishers/publisher_add', {item: item, nameAction: 'Edit publishers'});
    } catch (error) {
        console.error(error);
    }
}
module.exports.saveEditPublisher = async (req, res, next) => {
    try {
        let {name, description, link_seo, content, serial, hidden} = req.body;
        let item = await publishers.findById(req.params.id);

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

        await item.save();
        res.redirect('/admin/publishers');
    } catch (error) {
        console.error(error);
    }
}
module.exports.deletepublisher = async (req, res, next) => {
    try {
        let itemDelete = await publishers.findById(req.params.id);
        await itemDelete.remove();
        res.redirect('/admin/publishers');
    } catch (error) {
        console.error(error);
    }
}