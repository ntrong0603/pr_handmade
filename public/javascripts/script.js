const menu = document.getElementById("catalog-nav");
document.getElementById("header-center-nav").addEventListener("click", function(e){
    e.stopPropagation();
    menu.classList.add("show-nav");
});
document.getElementById("close-menu").addEventListener("click", function(){
    menu.classList.remove("show-nav");
});
document.addEventListener("click", function(){
    if (menu.classList.contains("show-nav")) {
      menu.classList.remove("show-nav");
    }
});

let heightHeader = $("#header").height();  
$( window ).scroll(function(){
    let scrollnew = $(window).scrollTop();
    if(scrollnew > heightHeader ){
        heightHeader = scrollnew;
        $("#header").addClass('hidden');
    }
    else{
        heightHeader = scrollnew;
        $("#header").removeClass('hidden')
    }
});

$(document).ready(function(){
    $(".slider").slick({
        dots: true,
        arrows: true,
        autoplay: true,
        autoplaySpeed: 3000,
    });
    $("#logo-doitac").slick({
        dots: false,
        arrows: false,
        autoplay: false,
        autoplaySpeed: 500,
        slidesToShow: 8,
        slidesToScroll: 8,
        responsive: [
        {
            breakpoint: 1024,
            settings: {
                slidesToShow: 6,
                slidesToScroll: 6,
                infinite: true,
            }
        },
        {
            breakpoint: 600,
            settings: {
                slidesToShow: 4,
                slidesToScroll: 4
            }
        },
        {
            breakpoint: 480,
            settings: {
                slidesToShow: 2,
                slidesToScroll: 2
            }
        }]
    });
    $(".products-slider-top-find").slick({
        dots: false,
        arrows: true,
        slidesToShow: 6,
        slidesToScroll: 6,
        autoplay: true,
        autoplaySpeed: 2000,
        responsive: [
        {
            breakpoint: 1200,
            settings: {
                slidesToShow: 4,
                slidesToScroll: 4,
                infinite: true,
            }
        },
        {
            breakpoint: 1024,
            settings: {
                slidesToShow: 4,
                slidesToScroll: 4,
                infinite: true,
            }
        },
        {
            breakpoint: 600,
            settings: {
                slidesToShow: 2,
                slidesToScroll: 2
            }
        },
        {
            breakpoint: 480,
            settings: {
                slidesToShow: 1,
                slidesToScroll: 1
            }
        }]
    });
    $("label").click(function(){
        $(this).parent().find("label").removeClass('active');
        $(this).addClass('active');
    });
    shortenP('.products-content .title h3', {length: 40});
});

var shortenP = function(getElement, options) {
    options = $.extend({
        length: 400,
        ellipsis: '...',
        moreClass: '',
        moreText: ''
    }, options);
    $(getElement).each(function() {
        var $p = $(this);
        var text = $p.text();
        if(text.length > options.length){
            var shortString = text.substring(0, options.length) + options.ellipsis;
        }
        else{
            var shortString = text;
        }
        $p.data('shorttext', shortString);
        $p.data('fulltext', text);
        $p.text(shortString);
        $p.addClass('shortened');
        $p.next().click(function(e) {
            if($p.hasClass('shortened')) {
                $p.text($p.data('fulltext'));
                $p.removeClass('shortened');
                $p.next().text('Thu gọn');
                $p.next().removeClass('arrow_hoidap');
                $p.next().addClass('arrow_hoidap2');
            } else {
                $p.text($p.data('shorttext'));
                $p.addClass('shortened');
                $p.next().text('Xem thêm');
                $p.next().removeClass('arrow_hoidap2');
                $p.next().addClass('arrow_hoidap');
            }
            e.preventDefault();
        });
  
    });
  
  };