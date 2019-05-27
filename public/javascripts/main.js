
// info
var info = document.getElementById('info');
var acc_setting = document.getElementById('acc-setting');
//if exists element info
if(info){
    info.onclick = (e) => {
        e.stopPropagation();
        acc_setting.classList.toggle('active');
    }
}
parseInt
// menu
var btn_open_menu = document.getElementById('open-menu');
var btn_close_menu = document.getElementById('close-menu');
var menu = document.getElementById('left');
btn_open_menu.onclick = (e) => {
    e.stopPropagation();
    menu.classList.toggle('active');
}
btn_close_menu.onclick = (e) => {
    menu.classList.remove('active');
}
menu.onclick = (e) => {
    e.stopPropagation();
}
document.addEventListener('click', () => {
    if(acc_setting){
        acc_setting.classList.remove('active');
    }
    menu.classList.remove('active');
});

$(document).ready(function(){
    $('#slider').slick({
        arrows: true,
        autoplay: true,
        autoplaySpeed: 4000
    });
});