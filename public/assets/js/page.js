
// const { default: axios } = require("axios")


$(() => {
    var baseURL = window.location.origin
    var userid = localStorage.getItem("userid")
    const accessToken = localStorage.getItem("accessToken");
    function home(e) {
        e.preventDefault()
        const kontrol = window.location

        // var baseURL = window.location.origin
        var UrlHome = baseURL + "/user/" + userid + "/tr"
        window.location.href = UrlHome
        // console.log(UrlHome);
    }
    function pagehome(e) {
        e.preventDefault()
        var baseURL = window.location.origin
        // console.log(baseURL + geturl);
        window.location.href = baseURL + "/panelDashboard/" + userid + "/tr"
    }
    function firmabilgi(e) {
        e.preventDefault();
        const firmauserid = $(this)[0].dataset.id
        $('div#alertmodal').removeClass("d-block").removeClass("d-none");
        $('div#alertmodal p#modalalert')[0].innerHTML = ""
        $('div#alertmodal button.close').on('click', function () {
            $('div#alertmodal').removeClass("d-block").removeClass("d-none");
        })
        if (accessToken) {
            axios.defaults.headers.post['Authorization'] = `Bearer ${accessToken}`;
            axiospostdata = {
                useridFirma: firmauserid
            }
            axios.post(`/firmabilgi/usercheck/${userid}`, axiospostdata).then((req, res) => {
                const alertMessage = req.data.message
                if (alertMessage !== "successfull") {
                    $('div#alertmodal').addClass("d-block").removeClass("d-none");
                    $('div#alertmodal p#modalalert').append(`${alertMessage}`);
                } else {
                    const url = window.location.origin
                    const userid = localStorage.getItem("userid")
                    let hrefUrl = url + `/firmabilgi/${firmauserid}/user/${userid}/tr`
                    window.location.href = hrefUrl
                }

            })

        } else if (!accessToken || accessToken === null || accessToken === undefined) {
            $('div#alertmodal').addClass("d-block");
            $('div#alertmodal p#modalalert').append("Üye Girişi Yapınız");
        }



    }
    function urunlistele(e) {
        e.preventDefault();
        $('div#alertmodal').removeClass("d-block").removeClass("d-none");
        $('div#alertmodal p#modalalert')[0].innerHTML = ""
        $('div#alertmodal button.close').on('click', function () {
            $('div#alertmodal').removeClass("d-block").removeClass("d-none");
        })
        const accessToken = window.localStorage.getItem('accessToken');
        if (!accessToken || accessToken === null || accessToken === undefined) {
            $('div#alertmodal').addClass("d-block");
            $('div#alertmodal p#modalalert').append("Üye Girişi Yapınız");
        } else {
            var url = window.location.origin
            const userid = window.localStorage.getItem('userid')
            window.location.href = url + `/urunlistele/${userid}/tr`
        }
    }
    // $("a[href]:not(a[href='login']):not(a[href='javascript:void(0)']):not(a[href='home']):not(a[href='javascript:void(0);'])").on("click", getData);
    $("a[href='home']").on("click", home);
    $("a[href='pagehome']").on("click", pagehome);
    $("a[href='firmabilgi']").on("click", firmabilgi);
    $("a[href='urunlistele']").on("click", urunlistele);


})// PAGEHOME HOME FİRMA BİLGİ(role KONTROLÜ SONRASINDA FİRMA BİLGİLERİ AÇILACAK)  CLİCK ok
$(() => {
    function exit(e) {
        e.preventDefault();
        localStorage.clear()
        window.location.href = window.location.origin

    }
    $("a#exit").on("click", exit);

})  //////LOG OUT ////////////////////////////////// ok
$(() => {
    function reset(e) {
        e.preventDefault();
        var formdata = $(this).closest("form").attr("id")
        var forminputdatavalue = $(`form#${formdata} input:not([readonly])`)
        // forminputdatavalue.value = ""
        $.each(forminputdatavalue, function (i, val) {
            var clear = $(forminputdatavalue)[i]
            clear.value = ""
        });
        // SONRA SİLİNECEK////////////////////////////////////////////////////////////////
        // console.log(`${formdata} form verisi temizleme çalıştı PAGE.JS LOG`);
        // SONRA SİLİNECEK////////////////////////////////////////////////////////////////

    }
    $("[name='reset']").on("click", reset);
})// FORM VERİLERİNİ TEMİZLEME ok
$(() => {
    $("[lang='ar']:not(html[lang='ar'])").css("direction", "rtl");
    function dilsecanasayfa() {
        // console.log("çalıştı");
        const urlorgin = window.location.origin
        const urlpath = window.location.pathname
        
        const lang = $("[name='dilsec'] option:selected").val()
        if(urlpath === "/login"){
            // console.log("login");
            window.location.href = urlorgin + urlpath + `/${lang}`
        }else{
            const urlpathSplit = urlpath.slice(0, (urlpath.length - 3))
            window.location.href = urlorgin + urlpathSplit + `/${lang}`
        }
        // console.log(urlorgin, urlpathSplit + `/${lang}`);
        // console.log(urlpath);
    }
    $("[name='dilsec']").on("change", dilsecanasayfa);
})// DİL SEÇ BÖLÜMÜ paneldeki yapılacak
$(() => {
    var accessToken = localStorage.getItem("accessToken")
    var userid = localStorage.getItem("userid")
    axios.defaults.baseURL = window.location.origin
    axios.defaults.headers.common['authorization'] = `Bearer ${accessToken}`
    const axiosData = {
        client: userid,
    }
    const baseUrl = window.location.origin
    const siteurl = window.location.href
    const anasayfaUrl = baseUrl + "/"
    const loginsayfaUrl = baseUrl + "/login"
    if (siteurl === anasayfaUrl ||
        siteurl === anasayfaUrl + "tr" ||
        siteurl === anasayfaUrl + "en" ||
        siteurl === anasayfaUrl + "fr" ||
        siteurl === anasayfaUrl + "ar" ||
        siteurl === loginsayfaUrl ||
        siteurl === loginsayfaUrl + "/tr"||
        siteurl === loginsayfaUrl + "/en"||
        siteurl === loginsayfaUrl + "/fr"||
        siteurl === loginsayfaUrl + "/ar"
        ) {
        return
    } else {
        if (accessToken === null) {
            localStorage.clear()
            return window.location.href = window.location.origin
        } else if (accessToken.length < 0) {
            localStorage.clear()
            return window.location.href = window.location.origin
        } else if (accessToken.length > 0) {
            axios.post("/authcontroller", axiosData).then((req, res) => {
                const tokenControl = req.data.message
                // console.log(tokenControl, "page js");
                if (tokenControl === "token not found") {
                    localStorage.clear()
                    localStorage.setItem("tokenControl", "token not found");
                    const path = window.location.pathname
                    // console.log(path, "page js");
                    if (path !== "/anasayfa/tr") {
                        if (path !== "/login/tr") {
                            window.location.href = window.location.origin + "/"
                        }

                    }
                } else if (tokenControl === "token successfull") {
                    localStorage.setItem("tokenControl", "token successfull");
                } else if (tokenControl === "authentication fail") {
                    localStorage.clear()
                    localStorage.setItem("tokenControl", "authentication fail");
                    const path = window.location.pathname
                    // console.log(path, "page js");
                    if (path !== "/anasayfa/tr") {
                        if (path !== "/login/tr") {
                            window.location.href = window.location.origin + "/"
                        }

                    }
                }
            })
        }
    }
})// TOKENCONTROL ok

