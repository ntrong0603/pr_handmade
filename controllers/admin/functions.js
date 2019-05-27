
module.exports.createNameStandardize = (name) => {   
    // Loại bỏ các ký tự không phải chữ hay số
    name = name.replace(/[^0-9a-zàáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹđ\s]/gi, '');

    // Gộp 2 khoảng trống trở lên thành 1 khoảng trống
    name = name.replace(/\s+/g, ' ');

    // xóa khoảng trống đầu cuối chuỗi
    name = name.trim();
    link = name.toLowerCase();;
    // chuyển các chữ có dầu thành không dấu
    link = link.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ|À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g, "a");
    link = link.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ|È|É|Ẹ|Ẻ|Ẽ|Ề|Ế|Ệ|Ể|Ễ/g, "e");
    link = link.replace(/ì|í|ị|ỉ|ĩ|Ì|Í|Ị|Ỉ|Ĩ/g, "i");
    link = link.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ|Ò|Ó|Ọ|Ỏ|Õ|Ồ|Ố|Ộ|Ổ|Ỗ|Ờ|Ớ|Ợ|Ở|Ỡ/g, "o");
    link = link.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ|Ù|Ú|Ụ|Ủ|Ũ/g, "u");
    link = link.replace(/ỳ|ý|ỵ|ỷ|ỹ|Ỳ|Ý|Ỵ|Ỷ|Ỹ/g, "y");
    link = link.replace(/đ|Đ/g, "d");

    // name = name.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
    // name = name.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
    // name = name.replace(/ì|í|ị|ỉ|ĩ/g, "i");
    // name = name.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
    // name = name.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
    // name = name.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
    // name = name.replace(/đ/g, "d");
    // name = name.replace(/À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g, "A");
    // name = name.replace(/È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g, "E");
    // name = name.replace(/Ì|Í|Ị|Ỉ|Ĩ/g, "I");
    // name = name.replace(/Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g, "O");
    // name = name.replace(/Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g, "U");
    // name = name.replace(/Ỳ|Ý|Ỵ|Ỷ|Ỹ/g, "Y");
    // name = name.replace(/Đ/g, "D");

    //thay khoảng trống bằng dấu '-'
    link = link.replace(/\s/g, '-');
    
    return {name: name, link: link};
}
module.exports.getPublAndCate = (arrItems, arrPubl, arrCate) => {
    let listItems = arrItems.map( (element) => {
        //tim nha san xuat
        let item = Object.assign({}, element._doc);
        for (i =0 ; i < arrPubl.length; i++){
            if(item.publishing_id == arrPubl[i]._id){
                item.name_publis = arrPubl[i].name;
                break;
            }
        }
        //tim the loai
        for (i =0 ; i < arrCate.length; i++){
            if(item.category_id == arrCate[i]._id){
                item.name_category = arrCate[i].name;
                break;
            }
        }
        return item;
    });
    return listItems;
}