module.exports.index = (req, res, next) => {
    res.render('admin/products/products');
}

module.exports.create = (req, res, next) => {
    res.render('admin/products/products_add');
}
