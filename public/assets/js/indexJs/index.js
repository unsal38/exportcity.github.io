// const { default: axios } = require("axios");


$(() => {
    //TEMSİLCİLER BÖLÜMÜ
    var swipertemsilci = new Swiper(".temsilcisection", {
        spaceBetween: 30,
        centeredSlides: true,
        autoplay: {
            delay: 2500,
            disableOnInteraction: false,
        },
        pagination: {
            el: ".swiper-pagination",
            clickable: true,
        },
        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
        },
    });
    // BLOG BÖLÜMÜ
    var swiperblog = new Swiper(".blogswiper", {
        direction: "vertical",
        autoplay: {
            delay: 2500,
            disableOnInteraction: false,
        },
        pagination: {
            el: ".swiper-pagination",
            clickable: true,
        },
    });
    //URUNLER BÖLÜMÜ
    var w = $("html").width();
    if (w < 1200) {
        var slidesPerView = 2
    } else if (w > 1200) {
        var slidesPerView = 3
    }
    var swiperurun = new Swiper(".urunlermySwiper", {
        slidesPerView: slidesPerView,
        spaceBetween: 30,
        pagination: {
            el: ".swiper-pagination",
            clickable: true,
        },
    });
    $(window).resize(function () {
        var w = $("html").width();
        if (w < 1200) {
            var slidesPerView = 2
        } else if (w > 1200) {
            var slidesPerView = 3
        }
        var swiperurun = new Swiper(".urunlermySwiper", {
            slidesPerView: slidesPerView,
            spaceBetween: 30,
            pagination: {
                el: ".swiper-pagination",
                clickable: true,
            },
        });

    });
})///////////SWİPER////////////////////////////////

$(() => {
    $(window).scroll(function () {
        var p = $(window).scrollTop();
        if (p > 55.5) {
            $("#section_1 .navbar-brand").hide();
        } else if (p < 55.5) {
            $("#section_1 .navbar-brand").show();
        }
    });
}) //NAVBAR BRAND HİDE YAPMAK
$(() => {
    var url = window.location.origin
    var userid = window.localStorage.getItem('userid')
    $("a[href='login']").on("click", function (e) {
        e.preventDefault();
        window.location.href = url + "/login"
    });
    $("a[href='panelDashboard']").on("click", function (e) {
        e.preventDefault();
        window.location.href = url + `/panelDashboard/${userid}/tr`
    });


}) //  LİNKLERİ  YÖNLENDİRME







