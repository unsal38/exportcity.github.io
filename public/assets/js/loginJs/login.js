
$(() => {
    function singUp() {
        const kullaniciAdi = $("#userReg").val()
        const kullaniciPassword = $("#passReg").val()
        const kullaniciRepeatPassword = $("#passRegcheck").val()
        const kullaniciMail = $("#emailReg").val()
        const sozRegcheck = $("#sozRegcheck")[0].control.checked
        $("#alert").children().remove()
        if (kullaniciPassword !== kullaniciRepeatPassword) {
            return $("#alert").append("<p class='text-capitalize text-danger'>şifre alanları aynı değil</p>");
        } else if (sozRegcheck === false) {
            return $("#alert").append("<p class='text-capitalize text-danger'>Kullanıcı Sözleşmesini Kabul Ediniz</p>");
        } else {

            axiosData = {
                kullaniciAdi: kullaniciAdi,
                kullaniciMail: kullaniciMail,
                password: kullaniciPassword,
            }
            axiosConfig = {
                baseURL: window.location.origin
            }
            axios.post("/register", axiosData)
                .then(async (req, res) => {
                    var errorMessage = req.data.message
                    if (errorMessage !== undefined && errorMessage !== "successful") {
                        $("#alert").append(`<p class='text-capitalize text-danger'>${errorMessage}</p>`);
                    } else if (errorMessage === "successful") {
                        window.location.href = window.location.origin
                    }
                    var mongooseErrorMessage = req.data.errorMessage
                    if (mongooseErrorMessage) {
                        $.each(mongooseErrorMessage, function (i, val) {
                            $("#alert").append(`<p class='text-capitalize text-danger'>${val.message}</p>`);
                        });
                    }
                })
        }
    }
    $("#registerkullaniciform [type=submit]").on("click", singUp);
}) // REGİSTER
$(() => {
    function login(e) {
        e.preventDefault()
        const kullaniciMail = $("#maillog").val()
        const kullaniciPassword = $("#passlog").val()
        axiosConfig = {
            baseURL: window.location.origin
        }
        axiosData = {
            kullaniciMail: kullaniciMail,
            password: kullaniciPassword,
        }
        axios.post("/login", axiosData, axiosConfig).then(async (req, res) => {
            const loginSuccess = req.data.message
            const userid = req.data.userid
            if (loginSuccess === "successfull") {
                // console.log("çalıştı login js");
                const authenticationHeader = req.headers.authentication
                const accessToken = authenticationHeader.split(" ")[1]
                localStorage.setItem("accessToken", accessToken)
                localStorage.setItem("userid", userid)
                // const url = window.location.origin
                const url = window.location.origin + `/user/${userid}/tr`
                window.location.href = url
                // console.log(url, "login js");
            } else {
                $("#alertlogin").children().remove()
                $("#alertlogin").append(`<p class='text-capitalize text-danger'>${loginSuccess}</p>`);
                localStorage.clear()
            }
        })}
    $("#loginkullaniciform [type=submit]").on("click", login);
}) // LOGİN
$(() => {
    function yonlendir() {
        const userid = localStorage.getItem("userid");
        const urlVar = window.location.pathname
        // console.log(urlVar + "/" + userid);
        if (urlVar === "/login/tr") {
            if (userid) {
                window.location.replace(`/user/${userid}/tr`)
            }
        }
    }
    yonlendir()
})// TOKEN VARSA YÖNLENDİRME
