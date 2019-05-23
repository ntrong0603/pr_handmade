const publishers = require ('../../models/publishers.model');

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
        let newPublisherItem = new publishers({_id, serial, name, description, content, hidden});
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
        let {name, description, content, serial, hidden} = req.body;
        let item = await publishers.findById(req.params.id);

        hidden = hidden ? true : false;

        item.name = name;
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