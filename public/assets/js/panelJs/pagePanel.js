// const { default: axios } = require("axios");


$(() => {
    function checkİnputData(e) {
        e.preventDefault()
        let inputValue = $(this).val();
        if (inputValue.length > 2) {
            $(this).closest("li").children("span").addClass("bg-success").removeClass("bg-danger");
            $(this).closest("li").children("span").children(".bx-check").removeClass("d-none");
            $(this).closest("li").children("span").children(".bx-minus").addClass("d-none");
        }
        if (inputValue.length < 2) {
            $(this).closest("li").children("span").addClass("bg-danger").removeClass("bg-success");
            $(this).closest("li").children("span").children(".bx-minus").removeClass("d-none");
            $(this).closest("li").children("span").children(".bx-check").addClass("d-none");
        }
    }
    function kategoridegis(e) {
        e.preventDefault()
        let token = localStorage.getItem("accessToken")
        let kategoriid = $(this).attr('id')
        let selectOptions = $(this).children("option:selected").not("select#ikialtkategori").val()
        axios.defaults.headers.post['Authorization'] = `Bearer ${token}`
        axiosData = {
            kategoriid: kategoriid,
        }
        axios.post(`/kategori/${selectOptions}`, axiosData).then((req, res) => {
            let alert = req.data.message
            if(alert === "unsuccessfull"){
                yetkisizGiris()
            }else {
                $("div#alert").addClass("show d-block")
                $("div#alert div.modal-body div.row").append(`<h3 class="text-capitalize">${alert}</h3>`);
                // var degis = $(this)[0].selectedOptions
                $(this)[0].selectedOptions[0].selected = false; // option RESETLEME
                // console.log(degis);
            }
        })

    }
    // ALERT MODAL CLOSE
    function alertmodalclose() {
        $("div#alert").removeClass("show d-block")
        $("div#alert div.modal-body div.row h3").remove()
        // console.log("çalştı");
    }
    $("div#alert button.btn-close").on("click", alertmodalclose)
    // ALERT MODAL CLOSE
    // REG DATA MESSAGE UNCESSFULL OLDUĞUNDA
    function yetkisizGiris() {
        var alert = "Yetkiniz bulunmamaktadır."
        $("div#alert").addClass("show d-block")
        $("div#alert div.modal-body div.row").append(`<h3 class="text-capitalize">${alert}</h3>`);
    }
    // REG DATA MESSAGE UNCESSFULL OLDUĞUNDA
    function kategoributton(e) {
        e.preventDefault()
        var buttonClick = $(this).attr('id')
        var inputDataTr = $(`input[name='${buttonClick}tr']`).val()
        var inputDataEn = $(`input[name='${buttonClick}en']`).val()
        var inputDataFr = $(`input[name='${buttonClick}fr']`).val()
        var inputDataAr = $(`input[name='${buttonClick}ar']`).val()
        var anakategoriid = $("select#anakategorisec option:selected").val()
        var biraltkategoriid = $("select#biraltkategorisec option:selected").val()
        var token = localStorage.getItem("accessToken")
        if (inputDataTr.length > 2 &&
            inputDataEn.length > 2 &&
            inputDataFr.length > 2 &&
            inputDataAr.length > 2) {
            axios.defaults.headers.post['Authorization'] = `Bearer ${token}`
            console.log(buttonClick, "pagepane js");
            if (buttonClick === "anakategori") {
                axiosData = {
                    kategoriName: buttonClick,
                    inputDataTr: inputDataTr,
                    inputDataEn: inputDataEn,
                    inputDataFr: inputDataFr,
                    inputDataAr: inputDataAr,
                }
                axios.post("/kategori/add", axiosData).then((req, res) => {
                    let check = req.data.message
                    if (check === "unsuccessfull") {
                        yetkisizGiris()
                    } else {
                        var alert = req.data.message
                        $("div#alert").addClass("show d-block")
                        $("div#alert div.modal-body div.row").append(`<h3 class="text-capitalize">${alert}</h3>`);
                    }
                })
            } else if (buttonClick === "biraltkategori") {
                axiosData = {
                    kategoriName: buttonClick,
                    inputDataTr: inputDataTr,
                    inputDataEn: inputDataEn,
                    inputDataFr: inputDataFr,
                    inputDataAr: inputDataAr,
                    anakategoriid: anakategoriid,
                }
                axios.post("/kategori/add", axiosData).then((req, res) => {
                    let check = req.data.message
                    if (check === "unsuccessfull") {
                        yetkisizGiris()
                    } else {
                        var alert = req.data.message
                        $("div#alert").addClass("show d-block")
                        $("div#alert div.modal-body div.row").append(`<h3 class="text-capitalize">${alert}</h3>`);
                    }
                })
            } else if (buttonClick === "ikialtkategori") {
                axiosData = {
                    kategoriName: buttonClick,
                    inputDataTr: inputDataTr,
                    inputDataEn: inputDataEn,
                    inputDataFr: inputDataFr,
                    inputDataAr: inputDataAr,
                    biraltkategoriid: biraltkategoriid,
                }
                axios.post("/kategori/add", axiosData).then((req, res) => {
                    let check = req.data.message
                    if (check === "unsuccessfull") {
                        yetkisizGiris()
                    } else {
                        var alert = req.data.message
                        $("div#alert").addClass("show d-block")
                        $("div#alert div.modal-body div.row").append(`<h3 class="text-capitalize">${alert}</h3>`);
                    }
                })
            }
        } else {
            var alert = "Boş Alan Bırakmayınız"
            $("div#alert").addClass("show d-block")
            $("div#alert div.modal-body div.row").append(`<h3 class="text-capitalize">${alert}</h3>`);
        } // ALERT BOŞ ALAN BIRAKMAYINIZ
    }
    $("div#accordionOne input").on("keyup", checkİnputData)
    $("div#accordionTwo input").on("keyup", checkİnputData)
    $("div#accordionThree input").on("keyup", checkİnputData)

    $("#kategori .form-select:not(#biraltkategorisec):not(#anakategorisec)").on("change", kategoridegis)
    $("#kategori button[name='kategoriekle']").on("click", kategoributton)

    function selectform(e) {
        e.preventDefault()
        var formSelect = $(this)
        var formSelectid = $(formSelect).attr("id")
        // console.log(formSelectid);
        if (formSelectid === "anakategoriinputGroupSelect") {
            // BİR ALT KATEGORİ BUNA GÖRE FİLTRE UYGULANIYOR
            const anakategori = $("form#formurun select[name='anakategoriinputGroupSelect'] option:selected").attr("data-id")
            // BİR ALT KATEGORİ BUNA GÖRE FİLTRE UYGULANIYOR
            const biraltkategori = $("form#formurun select[name='biraltinputGroupSelect'] option")
            $(biraltkategori).each(function (i, v) {
                $(v)[0].selected = false;
            });
            const ikialtkategori = $("form#formurun select[name='ikialtinputGroupSelect'] option")
            $(ikialtkategori).each(function (i, v) {
                $(v)[0].selected = false;
            });
            if (anakategori === undefined) {
                const biraltkategori = $("form#formurun select[name='biraltinputGroupSelect'] option")
                $(biraltkategori).each(function (i, v) {
                    $(v)[0].selected = false;
                    $(v).filter(`[data-anakategori`).hide()
                });
            } else {
                const biraltkategori = $("form#formurun select[name='biraltinputGroupSelect'] option")
                $(biraltkategori).each(function (i, v) {
                    $(v).filter(`[data-anakategori`).hide()
                    $(v).filter(`[data-anakategori=${anakategori}]`).show()
                });

            }
        } else if (formSelectid === "biraltinputGroupSelect") {
            const anakategoriDeger = $("form#formurun select[name='anakategoriinputGroupSelect'] option:selected")[0].dataset.id
            const ikialtkategori = $("form#formurun select[name='ikialtinputGroupSelect'] option")
            $(ikialtkategori).each(function (i, v) {
                $(v)[0].selected = false;
            });
            // console.log(anakategoriDeger);  
            if (anakategoriDeger === undefined) {
                alert("Ana Kategori Seçiniz")
                const biraltkategori = $("form#formurun select[name='biraltinputGroupSelect'] option")
                $(biraltkategori).each(function (i, v) {
                    $(v)[0].selected = false;
                });
            } else {
                // kategorinin id
                const biraltkategoriDeger = $("form#formurun select[name='biraltinputGroupSelect'] option:selected").attr("data-kategoriid");
                // kategorinin id
                // console.log(biraltkategoriDeger);
                const biraltkategori = $("form#formurun select[name='ikialtinputGroupSelect'] option")

                $(biraltkategori).each(function (i, v) {
                    $(v).filter("[data-biraltkategori]").hide()
                    $(v).filter(`[data-biraltkategori=${biraltkategoriDeger}]`).show()
                });
            }

        } else if (formSelectid === "ikialtinputGroupSelect") {
            const biraltkategoriDeger = $("form#formurun select[name='biraltinputGroupSelect'] option:selected")[0].dataset.kategoriid
            // console.log(biraltkategoriDeger);
            if (biraltkategoriDeger === "null") {
                alert("Bir üst Kategoriyi seçiniz")
            }
        }
    }

    $("form#formurun select").on("change", selectform)


})// KATEGORİ DÜZENLEME // YAPILACAK


$(() => {
    function onayaski() {
        const selectOption = $("select#hesapaskiselect option:selected")[0].value
        const activeCode = $("form#formAccountactivation input[name = 'acitiveCode']") // KOD ALANI VAR MI KONTROL ETMEK İÇİN
        var accessToken = localStorage.getItem("accessToken");
        // var localStorageuserid = localStorage.getItem("userid");

        if (activeCode.length === 0) {
            if (selectOption === "pasif" || selectOption === "aktif" || selectOption === "kodgonder") {
                if (selectOption === "kodgonder") {
                    const checkKontrol = $("form#formAccountactivation input[name = 'sitekurlcheck']")[0].checked
                    if (checkKontrol === false) {
                        $("div#alert").children().remove()
                        alertMessage = "Site Kurallarını Onaylayınız"
                        $("div#alert").show() // ALERT DİVİ BUTTON HİDE İÇİN MESAJ GELİNCE GÖSTERİLİYOR
                        $("div#alert").append(`<div class="alert alert-danger alert-dismissible">${alertMessage}<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>`);

                    } else {
                        if (accessToken) {
                            axios.defaults.headers.post['Authorization'] = `Bearer ${accessToken}`
                            axios.get("/panelProfilBilgileri/mailOnayMailGond/mailaktivasyon").then((req, res) => {
                                if (req.data.message === "successfull") {
                                    $("div#alert").children().remove()
                                    alertMessage = "Mail adresindeki link'e tıklayarak işlemi tamamlayınız"
                                    $("div#alert").show() // ALERT DİVİ BUTTON HİDE İÇİN MESAJ GELİNCE GÖSTERİLİYOR
                                    $("div#alert").append(`<div class="alert alert-danger alert-dismissible">${alertMessage}<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>`);

                                }
                            })
                        } else {
                            $("div#alert").children().remove()
                            alertMessage = "Tekrar Giriş Yapınız"
                            $("div#alert").show() // ALERT DİVİ BUTTON HİDE İÇİN MESAJ GELİNCE GÖSTERİLİYOR
                            $("div#alert").append(`<div class="alert alert-danger alert-dismissible">${alertMessage}<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>`);
                            window.location.href = window.location.origin
                        }

                    }

                }
            } else {
                $("div#alert").children().remove()
                alertMessage = "Lütfen Seçim Yapınız"
                $("div#alert").show() // ALERT DİVİ BUTTON HİDE İÇİN MESAJ GELİNCE GÖSTERİLİYOR
                $("div#alert").append(`<div class="alert alert-danger alert-dismissible">${alertMessage}<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>`);

            }
        } else {
            if (selectOption === "kodgonder") {
                axios.defaults.headers.post['Authorization'] = `Bearer ${accessToken}`
                axios.get("/panelProfilBilgileri/mailOnayMailGond/mailactivecodgond").then((req, res) => {
                    if (req.data.message === "successfull") {
                        const message = "Mailinizi kontrol ediniz"
                        $("div#alert").show() // ALERT DİVİ BUTTON HİDE İÇİN MESAJ GELİNCE GÖSTERİLİYOR
                        $("div#alert").append(`<div class="alert alert-info alert-dismissible">${message}<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>`);

                    } else {
                        const message = "Mail gönderilememiştir. Site yöneticileri ile görüşünüz"
                        $("div#alert").show() // ALERT DİVİ BUTTON HİDE İÇİN MESAJ GELİNCE GÖSTERİLİYOR
                        $("div#alert").append(`<div class="alert alert-info alert-dismissible">${message}<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>`);

                    }
                })
            } else if (selectOption === "pasif" || selectOption === "aktif") {
                const activeCode = $("form#formAccountactivation input[name = 'acitiveCode']")[0].value
                const sitekurlcheck = $("form#formAccountactivation input[name = 'sitekurlcheck']")[0].checked
                $("div#alert").children().remove()
                $("form#formAccountactivation input[name = 'acitiveCode']").removeAttr("style")
                if (sitekurlcheck === true) {
                    if (activeCode) {
                        const axiosData = {
                            activeCode: activeCode
                        }
                        axios.defaults.headers.post['Authorization'] = `Bearer ${accessToken}`
                        axios.post("/panelProfilBilgileri/hesapaskiyaal", axiosData).then((req, res) => {
                            console.log(req.data, "pagepanel js");
                            $("div#alert").children().remove()
                            const message = req.data.message
                            if (message === "successfull") {
                                if (selectOption === "pasif") {
                                    alertMessage = "Hesabınız askıya alınmıştır. 15 gün sonunda hesabınız silinecektir."
                                    $("div#alert").show() // ALERT DİVİ BUTTON HİDE İÇİN MESAJ GELİNCE GÖSTERİLİYOR
                                    $("div#alert").append(`<div class="alert alert-danger alert-dismissible">${alertMessage}<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>`);

                                } else if (selectOption === "aktif") {
                                    alertMessage = "Hesabınız aktif edilmiştir.."
                                    $("div#alert").show() // ALERT DİVİ BUTTON HİDE İÇİN MESAJ GELİNCE GÖSTERİLİYOR
                                    $("div#alert").append(`<div class="alert alert-danger alert-dismissible">${alertMessage}<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>`);

                                }

                            } else if (message === "unsuccessfull") {
                                localStorage.clear()
                            }
                        })
                    } else {
                        $("form#formAccountactivation input[name = 'acitiveCode']").attr("style", "border-color: red")
                        alertMessage = "Alanları boş bırakmayınız"
                        $("div#alert").show() // ALERT DİVİ BUTTON HİDE İÇİN MESAJ GELİNCE GÖSTERİLİYOR
                        $("div#alert").append(`<div class="alert alert-danger alert-dismissible">${alertMessage}<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>`);

                    }
                } else {
                    alertMessage = "Sözleşmeyi onaylayınız"
                    $("div#alert").show() // ALERT DİVİ BUTTON HİDE İÇİN MESAJ GELİNCE GÖSTERİLİYOR
                    $("div#alert").append(`<div class="alert alert-danger alert-dismissible">${alertMessage}<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>`);

                }
            }
        }









        // if (selectOption === "pasif") {
        //     if (checkKontrol === true) {
        //         if (activeCode) {
        //             $("div#alert").children().remove()
        //             const axiosData = {
        //                 userid: localStorageuserid,
        //             }
        //             axios.defaults.headers.post['Authorization'] = `Bearer ${accessToken}`
        //             axios.post("/panelProfilBilgileri/hesapAskiyaAl/pasif", axiosData).then((req, res) => {
        //                 if (req.data.message) {
        //                     if (req.data.message === "successful") {
        //                         axios.post("/panelProfilBilgileri/hesapAskiyaAl/pasif", axiosData).then((req, res) => {
        //                             if (req.data.message) {
        //                                 if (req.data.message === "successful") {
        //                                     const axiosData = {
        //                                         userSuccessful: "successful",
        //                                         activeCode: activeCode,
        //                                     }
        //                                     axios.post("/panelProfilBilgileri/hesapAskiyaAl/pasif", axiosData).then((req, res) => {
        //                                         if (req.data.message === "successful") {
        //                                             alertMessage = "Hesabınız askıya alınmıştır. 15 gün sonunda hesabınız silinecektir."
        //                                             $("div#alert").show() // ALERT DİVİ BUTTON HİDE İÇİN MESAJ GELİNCE GÖSTERİLİYOR
        //                                             $("div#alert").append(`<div class="alert alert-danger alert-dismissible">${alertMessage}<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>`);
        //                                         } else if (req.data.message === "unsuccessful") {
        //                                             alertMessage = "Aktivasyon kodunuz hatalı."
        //                                             $("div#alert").show() // ALERT DİVİ BUTTON HİDE İÇİN MESAJ GELİNCE GÖSTERİLİYOR
        //                                             $("div#alert").append(`<div class="alert alert-danger alert-dismissible">${alertMessage}<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>`);

        //                                         }
        //                                     })
        //                                 }
        //                             }
        //                         })
        //                     }
        //                 }
        //             })
        //         } else {
        //             $("div#alert").children().remove()
        //             alertMessage = "Aktivleştirme kodunu giriniz"
        //             $("div#alert").show() // ALERT DİVİ BUTTON HİDE İÇİN MESAJ GELİNCE GÖSTERİLİYOR
        //             $("div#alert").append(`<div class="alert alert-info alert-dismissible">${alertMessage}<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>`);
        //         }
        //     } else {
        //         $("div#alert").children().remove()
        //         alertMessage = "Kuralları kabul ediniz"
        //         $("div#alert").show() // ALERT DİVİ BUTTON HİDE İÇİN MESAJ GELİNCE GÖSTERİLİYOR
        //         $("div#alert").append(`<div class="alert alert-info alert-dismissible">${alertMessage}<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>`);
        //     }
        // } else if (selectOption === "aktif") {
        //     if (checkKontrol === true) {
        //         if (activeCode) {
        //             $("div#alert").children().remove()
        //             const axiosData = {
        //                 userid: localStorageuserid,
        //             }
        //             axios.defaults.headers.post['Authorization'] = `Bearer ${accessToken}`
        //             axios.post("/panelProfilBilgileri/hesapAskiyaAl/aktif", axiosData).then((req, res) => {
        //                 if (req.data.message) {
        //                     if (req.data.message === "successful") {
        //                         axios.post("/panelProfilBilgileri/hesapAskiyaAl/aktif", axiosData).then((req, res) => {
        //                             if (req.data.message) {
        //                                 if (req.data.message === "successful") {
        //                                     const axiosData = {
        //                                         userSuccessful: "successful",
        //                                         activeCode: activeCode,
        //                                     }
        //                                     axios.post("/panelProfilBilgileri/hesapAskiyaAl/aktif", axiosData).then((req, res) => {
        //                                         if (req.data.message === "successful") {
        //                                             alertMessage = "Hesabınız aktifleştirilmiştir."
        //                                             $("div#alert").show() // ALERT DİVİ BUTTON HİDE İÇİN MESAJ GELİNCE GÖSTERİLİYOR
        //                                             $("div#alert").append(`<div class="alert alert-danger alert-dismissible">${alertMessage}<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>`);

        //                                         } else if (req.data.message === "unsuccessful") {
        //                                             alertMessage = "Aktivasyon kodunuz hatalı."
        //                                             $("div#alert").show() // ALERT DİVİ BUTTON HİDE İÇİN MESAJ GELİNCE GÖSTERİLİYOR
        //                                             $("div#alert").append(`<div class="alert alert-danger alert-dismissible">${alertMessage}<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>`);

        //                                         }
        //                                     })
        //                                 }
        //                             }
        //                         })
        //                     }
        //                 }
        //             })
        //         } else {
        //             $("div#alert").children().remove()
        //             alertMessage = "Aktivasyon kodunu giriniz"
        //             $("div#alert").show() // ALERT DİVİ BUTTON HİDE İÇİN MESAJ GELİNCE GÖSTERİLİYOR
        //             $("div#alert").append(`<div class="alert alert-info alert-dismissible">${alertMessage}<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>`);
        //         }
        //     } else {
        //         $("div#alert").children().remove()
        //         alertMessage = "Kuralları kabul ediniz"
        //         $("div#alert").show() // ALERT DİVİ BUTTON HİDE İÇİN MESAJ GELİNCE GÖSTERİLİYOR
        //         $("div#alert").append(`<div class="alert alert-info alert-dismissible">${alertMessage}<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>`);
        //     }
        // } else if (selectOption === "kodgonder") {
        //     const axiosData = {
        //         userid: localStorageuserid,
        //     }
        //     axios.post("/panelProfilBilgileri/hesapAskiyaAl/activecode", axiosData).then((req, res) => {
        //         if (req.data.message) {
        //             if (req.data.message === "successful") {
        //                 const axiosData = {
        //                     userSuccessful: "successful",
        //                 }
        //                 axios.post("/panelProfilBilgileri/hesapAskiyaAl/activecode", axiosData).then((req, res) => {
        //                     if (req.data.message === "successful") {
        //                         alertMessage = "Kod Gönderilmiştir. Mailinizi kontrol Ediniz"
        //                         $("div#alert").show() // ALERT DİVİ BUTTON HİDE İÇİN MESAJ GELİNCE GÖSTERİLİYOR
        //                         $("div#alert").append(`<div class="alert alert-info alert-dismissible">${alertMessage}<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>`);

        //                     } else {
        //                         alertMessage = "Kod gönderilememiştir. Site yöneticileri ile görüşün"
        //                         $("div#alert").show() // ALERT DİVİ BUTTON HİDE İÇİN MESAJ GELİNCE GÖSTERİLİYOR
        //                         $("div#alert").append(`<div class="alert alert-info alert-dismissible">${alertMessage}<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>`);

        //                     }
        //                 })
        //             }
        //         }
        //     })
        // }
    }

    $("button[name='hesapaskibutton']").on("click", onayaski);
}) // HESABI ASKIYA ALMA VEYA AKTİFLEŞTİRME ok
$(() => {
    function urunyukle(e) {
        e.preventDefault();
        var accessToken = localStorage.getItem('accessToken')
        // var userid = localStorage.getItem('userid')

        var urunBasligi = $("#formurun input[name='urunBasligi']").val()
        var aciklayiciMetin = $("#formurun input[name='aciklayiciMetin']").val()
        var enAzAlimMiktari = $("#formurun input[name='enAzAlimMiktari']").val()
        var parcaBasiFiyat = $("#formurun input[name='parcaBasiFiyat']").val()
        var urunimg = $("#formurun input[name='urunimg']").val()
        var anakategoriinputGroupSelect = $("#formurun select#anakategoriinputGroupSelect option:selected").val()
        var biraltinputGroupSelect = $("#formurun select#biraltinputGroupSelect option:selected").val()
        var ikialtinputGroupSelect = $("#formurun select#ikialtinputGroupSelect option:selected").val()
        var satis = $("#formurun select#satis option:selected").val()
        // console.log(anakategoriinputGroupSelect, biraltinputGroupSelect, ikialtinputGroupSelect);
        // console.log(parcaBasiFiyat, enAzAlimMiktari, "urunyuklejs çalıştı");

        // console.log(satis, "1");

        if (satis === "null") {
            const messageAlertUnsuccessful = "Satış Çeşidi bölümündeki İmport / Export / Hizmet türlerinden birini seçerek başlayınız."
            $("div#alert").children().remove()
            $("form#formurun input").removeAttr("style");
            $("div#alert").show() // ALERT DİVİ BUTTON HİDE İÇİN MESAJ GELİNCE GÖSTERİLİYOR
            $("div#alert").append(`<div class="alert alert-info alert-dismissible uppercase">${messageAlertUnsuccessful}<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>`);

        } else if (satis === "import" ||
            satis === "export" ||
            satis === "hizmet") {

            if (urunBasligi.length === 0 ||
                aciklayiciMetin.length === 0 ||
                enAzAlimMiktari.length === 0 ||
                parcaBasiFiyat.length === 0 ||
                urunimg.length === 0 ||
                anakategoriinputGroupSelect === "null") {
                const messageAlertUnsuccessful = "Boş alan bırakmayınız"
                $("div#alert").children().remove()
                $("form#formurun input").removeAttr("style");
                $("div#alert").show() // ALERT DİVİ BUTTON HİDE İÇİN MESAJ GELİNCE GÖSTERİLİYOR
                $("div#alert").append(`<div class="alert alert-info alert-dismissible uppercase">${messageAlertUnsuccessful}<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>`);

            } else {
                $("div#alert").children().remove()
                $("form#formurun input").removeAttr("style");
                if (urunBasligi.length < 5) {
                    $("input[name='urunBasligi']").css("border-color", "red");
                    const messageAlertUnsuccessful = "en az 5 karakter giriniz"
                    $("div#alert").show() // ALERT DİVİ BUTTON HİDE İÇİN MESAJ GELİNCE GÖSTERİLİYOR
                    $("div#alert").append(`<div class="alert alert-info alert-dismissible uppercase">${messageAlertUnsuccessful}<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>`);
                } else if (urunBasligi.length > 20) {
                    $("input[name='urunBasligi']").css("border-color", "red");
                    const messageAlertUnsuccessful = "en fazla 20 karakter giriniz"
                    $("div#alert").show() // ALERT DİVİ BUTTON HİDE İÇİN MESAJ GELİNCE GÖSTERİLİYOR
                    $("div#alert").append(`<div class="alert alert-info alert-dismissible uppercase">${messageAlertUnsuccessful}<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>`);
                } else {
                    $("form#formurun input").removeAttr("style");
                    if (aciklayiciMetin.length < 5) {
                        $("input[name='aciklayiciMetin']").css("border-color", "red");
                        const messageAlertUnsuccessful = "en az 5 karakter giriniz"
                        $("div#alert").show() // ALERT DİVİ BUTTON HİDE İÇİN MESAJ GELİNCE GÖSTERİLİYOR
                        $("div#alert").append(`<div class="alert alert-info alert-dismissible uppercase">${messageAlertUnsuccessful}<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>`);

                    } else if (aciklayiciMetin.length > 180) {
                        $("input[name='aciklayiciMetin']").css("border-color", "red");
                        const messageAlertUnsuccessful = "en fazla 180 karakter giriniz"
                        $("div#alert").show() // ALERT DİVİ BUTTON HİDE İÇİN MESAJ GELİNCE GÖSTERİLİYOR
                        $("div#alert").append(`<div class="alert alert-info alert-dismissible uppercase">${messageAlertUnsuccessful}<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>`);
                    } else {
                        $("form#formurun input").removeAttr("style");
                        if (enAzAlimMiktari < 0) {
                            $("input[name='enAzAlimMiktari']").css("border-color", "red");
                            const messageAlertUnsuccessful = "eksi değer girmeyiniz"
                            $("div#alert").show() // ALERT DİVİ BUTTON HİDE İÇİN MESAJ GELİNCE GÖSTERİLİYOR
                            $("div#alert").append(`<div class="alert alert-info alert-dismissible uppercase">${messageAlertUnsuccessful}<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>`);

                        } else if (enAzAlimMiktari.length > 10) {
                            $("input[name='enAzAlimMiktari']").css("border-color", "red");
                            const messageAlertUnsuccessful = "eksi değer girmeyiniz"
                            $("div#alert").show() // ALERT DİVİ BUTTON HİDE İÇİN MESAJ GELİNCE GÖSTERİLİYOR
                            $("div#alert").append(`<div class="alert alert-info alert-dismissible uppercase">${messageAlertUnsuccessful}<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>`);

                        } else {
                            $("form#formurun input").removeAttr("style");
                            if (parcaBasiFiyat < 0) {
                                $("input[name='parcaBasiFiyat']").css("border-color", "red");
                                const messageAlertUnsuccessful = "eksi değer girmeyiniz"
                                $("div#alert").show() // ALERT DİVİ BUTTON HİDE İÇİN MESAJ GELİNCE GÖSTERİLİYOR
                                $("div#alert").append(`<div class="alert alert-info alert-dismissible uppercase">${messageAlertUnsuccessful}<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>`);

                            } else if (parcaBasiFiyat.length > 10) {
                                $("input[name='parcaBasiFiyat']").css("border-color", "red");
                                const messageAlertUnsuccessful = "en fazla 10 uzunlukta olmalı"
                                $("div#alert").show() // ALERT DİVİ BUTTON HİDE İÇİN MESAJ GELİNCE GÖSTERİLİYOR
                                $("div#alert").append(`<div class="alert alert-info alert-dismissible uppercase">${messageAlertUnsuccessful}<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>`);

                            } else {
                                $("div#alert").children().remove()
                                $("form#formurun input").removeAttr("style");

                                const form = document.getElementById("formurun")
                                const axiosDataForm = new FormData(form);
                                // console.log([...axiosDataForm]); // SONRA SİL KONTROL İÇİN

                                axios.defaults.headers.post['Authorization'] = `Bearer ${accessToken}`
                                axios.post("/panelurunekle/user/:urunekle", axiosDataForm).then((req, res) => {
                                    // console.log(req.data, "pagepanel");
                                    const checkedpostmessage = req.data.message
                                    if (checkedpostmessage === "unsuccessfull") {
                                        localStorage.clear()
                                    } else if (checkedpostmessage === "successfull") {
                                        const messageAlertUnsuccessful = "Ürün yüklenmiştir."
                                        $("div#alert").show() // ALERT DİVİ BUTTON HİDE İÇİN MESAJ GELİNCE GÖSTERİLİYOR
                                        $("div#alert").append(`<div class="alert alert-info alert-dismissible uppercase">${messageAlertUnsuccessful}<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>`);

                                    }

                                })


                            }
                        }
                    }
                }
            }
        }
    }
    function satisselect(e) {
        e.preventDefault();
        var satisData = $("select#satis option:selected").val()
        $("form#formurun div.fiyat label:nth-child(2)").addClass("close")
        $("form#formurun div.fiyat label:nth-child(1)").addClass("close")
        $("form#formurun div.fiyat").addClass("close")
        $("form#formurun div.miktar label:nth-child(2)").addClass("close")
        $("form#formurun div.miktar label:nth-child(1)").addClass("close")
        $("form#formurun div.miktar").addClass("close")
        if (satisData === "hizmet") {
            $("form#formurun div.fiyat label:nth-child(2)").removeClass("close")
            $("form#formurun div.fiyat").removeClass("close")
            $("form#formurun div.miktar label:nth-child(2)").removeClass("close")
            $("form#formurun div.miktar").removeClass("close")
        } else if (satisData === "import" || satisData === "export") {
            $("form#formurun div.fiyat label:nth-child(1)").removeClass("close")
            $("form#formurun div.fiyat").removeClass("close")
            $("form#formurun div.miktar label:nth-child(1)").removeClass("close")
            $("form#formurun div.miktar").removeClass("close")
        }
        // console.log(satisData);
    }


    $("form#formurun button[name='urunyukle']").on("click", urunyukle);
    $("form#formurun select#satis").on("change", satisselect);

}) // ÜRÜN YÜKLEME ok
$(() => {
    function formProfilBilgiPost(e) {
        e.preventDefault();
        var kullaniciAdi = $("#formProfilBilgi input[name='kullaniciAdi']").val()
        var firmaAdi = $("#formProfilBilgi input[name='firmaAdi']").val()
        var iletisim = $("#formProfilBilgi input[name='iletisim']").val()
        var adres = $("#formProfilBilgi input[name='adres']").val()

        var ulke = $("#formProfilBilgi select#country option:selected")[0].value
        var siteDil = $("#formProfilBilgi select#language option:selected")[0].value
        var acitiveCode = $("#formProfilBilgi input[name='mailOnay']").val()
        var odemeCinsi = $("#formProfilBilgi select#currency option:selected")[0].value

        var accessToken = localStorage.getItem('accessToken')

        if (kullaniciAdi && firmaAdi && iletisim && adres && ulke && siteDil && acitiveCode && odemeCinsi) {
            // $("div#alert").children().remove()
            var axiosData = {
                kullaniciAdi: kullaniciAdi,
                firmaAdi: firmaAdi,
                iletisim: iletisim,
                adres: adres,
                ulke: ulke,
                siteDil: siteDil,
                acitiveCode: acitiveCode,
                odemeCinsi: odemeCinsi,
            }
            axios.defaults.headers.post['Authorization'] = `Bearer ${accessToken}`
            axios.post("/panelProfilBilgileri/update/user", { userData: axiosData }).then((req, res) => {
                const message = req.data.message
                if (message === "successfull") {
                    messageAlertUnsuccessful = "Bilgileriniz Güncellendi"
                    $("div#alert").show() // ALERT DİVİ BUTTON HİDE İÇİN MESAJ GELİNCE GÖSTERİLİYOR
                    $("div#alert").append(`<div class="alert alert-info alert-dismissible">${messageAlertUnsuccessful}<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>`);
                } else if (message === "unsuccessfull") {
                    localStorage.clear()
                }
            })
        } else {
            messageAlertUnsuccessful = "Boş Alanları Doldurunuz"
            $("div#alert").children().remove()
            $("div#alert").show() // ALERT DİVİ BUTTON HİDE İÇİN MESAJ GELİNCE GÖSTERİLİYOR
            $("div#alert").append(`<div class="alert alert-info alert-dismissible">${messageAlertUnsuccessful}<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>`);
        }
    }
    $("#formProfilBilgi button[name='uyebilgipost']").on("click", formProfilBilgiPost);
})// ÜYE BİLGİ FORM BİLGİSİ GÖNDERME  ok
$(() => {
    $("div#alert").hide() // ALERT DİVİ BUTTON HİDE İÇİN MESAJ GELİNCE GÖSTERİLİYOR
    async function mailOnay() {
        $("div#alert").children().remove()
        const accessToken = localStorage.getItem('accessToken');
        axios.defaults.headers.post['Authorization'] = `Bearer ${accessToken}`;
        axios.get("/panelProfilBilgileri/mailOnayMailGond/mailactivecodgond").then((req, res) => {
            if (req.data.message === "successfull") {
                const message = "Mailinizi kontrol ediniz"
                $("div#alert").show() // ALERT DİVİ BUTTON HİDE İÇİN MESAJ GELİNCE GÖSTERİLİYOR
                $("div#alert").append(`<div class="alert alert-info alert-dismissible">${message}<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>`);

            } else {
                const message = "Mail gönderilememiştir. Site yöneticileri ile görüşünüz"
                $("div#alert").show() // ALERT DİVİ BUTTON HİDE İÇİN MESAJ GELİNCE GÖSTERİLİYOR
                $("div#alert").append(`<div class="alert alert-info alert-dismissible">${message}<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>`);

            }
        })
    }
    $("#mailOnay button[name='mailonay']").on("click", mailOnay);
})// MAİL GÖNDERME ACTİVASYON KODU ok
$(() => {
    async function uploadimg(e) {
        e.preventDefault();
        var form = document.getElementById("formProfilPersonelimg")
        var imgsize = $("#upload")[0].files[0].size //document.getElementById("upload")
        // console.log("pagepanel", imgsize);
        var accessToken = localStorage.getItem("accessToken");
        var formData = new FormData(form)
        //formData.append("imgDataFiles",imgDataFiles); // başka dosya eklenecek ise
        const axiosConfigResimSingle = {
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'content-type': 'multipart/form-data',
            },
            // baseURL: window.location.origin
        }

        $("div#alert").children().remove()
        if (imgsize < 40500) {
            const url = "/panelProfilBilgileri/upload/resim/user"
            //console.log(...formData, "pagepanel"); // DOSYA KONTROLÜ İÇİN
            await axios.post(url, formData, axiosConfigResimSingle).then((req, res) => {
                var alert = req.data.message
                if (alert) {
                    $("div#alert").show() // ALERT DİVİ BUTTON HİDE İÇİN MESAJ GELİNCE GÖSTERİLİYOR
                    $("div#alert").append(`<div class="alert alert-info alert-dismissible">${alert}<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>`);

                }
            })
        } else if (imgsize > 40500) {
            alertMessage = "Fotoğraf Boyutu Büyük"
            $("div#alert").show() // ALERT DİVİ BUTTON HİDE İÇİN MESAJ GELİNCE GÖSTERİLİYOR
            $("div#alert").append(`<div class="alert alert-info alert-dismissible">${alertMessage}<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>`);

        }





    }
    $("button[type='submitimg']").on("click", uploadimg);
}) //UPLOAD İMAGE PERSONEL RESMİ ok
$(() => {
    const url = window.location.origin
    const userid = localStorage.getItem('userid');
    $("a[href='panelDashboard']").on("click", function (e) {
        e.preventDefault();
        window.location.href = url + `/panelDashboard/${userid}/tr`
    });
    $("a[href='panelProfilBilgileri']").on("click", function (e) {
        e.preventDefault();
        window.location.href = url + `/panelProfilBilgileri/${userid}/tr`
    });
    $("a[href='panelurunekle']").on("click", function (e) {
        e.preventDefault();
        window.location.href = url + `/panelurunekle/${userid}/tr`
    });
    $("a[href='panelMailDuzenle/mail']").on("click", function (e) {
        e.preventDefault();
        window.location.href = url + `/panelMailSifreDuzenle/mailduzenle/${userid}/tr`
    });
    $("a[href='panelMailDuzenle/sifre']").on("click", function (e) {
        e.preventDefault();
        window.location.href = url + `/panelMailSifreDuzenle/sifre/${userid}/tr`
    });
    $("a[href='panelOnayBekleyenUrun']").on("click", function (e) {
        e.preventDefault();
        window.location.href = url + `/panelOnayBekleyenUrun/${userid}/tr`
    });
    $("a[href='panelRedUrunler']").on("click", function (e) {
        e.preventDefault();
        window.location.href = url + `/panelRedUrunler/${userid}/tr`
    });
    $("a[href='panelSozlesmeler']").on("click", function (e) {
        e.preventDefault();
        window.location.href = url + `/panelSozlesmeler/${userid}/tr`
    });
    $("a[href='usereksikbilgi']").on("click", function (e) {
        e.preventDefault();
        window.location.href = url + `/usereksikbilgi/${userid}/tr`
    });
    $("a[href='useronaybekleyen']").on("click", function (e) {
        e.preventDefault();
        window.location.href = url + `/useronaybekleyen/${userid}/tr`
    });
    $("a[href='urunonaybekleyen']").on("click", function (e) {
        e.preventDefault();
        window.location.href = url + `/urunonaybekleyen/${userid}/tr`
    });
    $("a[href='useryetkilendirme']").on("click", function (e) {
        e.preventDefault();
        window.location.href = url + `/useryetkilendirme/${userid}/tr`
    });
    $("a[href='kategori']").on("click", function (e) {
        e.preventDefault();
        window.location.href = url + `/kategori/${userid}/tr`
    });
    $("a[href='abonelikler/abonelikcesitleri']").on("click", function (e) {
        e.preventDefault();
        window.location.href = url + `/abonelikler/abonelikcesitleri/${userid}/tr`
    });
    $("a[href='payment']").on("click", function (e) {
        e.preventDefault();
        const abonelik = $(this).attr("data-abonelik")
        window.location.href = url + `/abonelikler/payment/${abonelik}/${userid}/tr`
    });


}) //  LİNKLERİ  YÖNLENDİRME ok

$(() => {
    var sifrechangeval = $("input#sifre")
    var pwdLength = /^.{6,16}$/;
    var pwdUpper = /[A-Z]+/;
    var pwdLower = /[a-z]+/;
    var pwdNumber = /[0-9]+/;
    var pwdSpecial = /[!@#$%^&()'[\]"?+-/*={}.,;:_]+/;
    $("input#sifre").keyup(function (e) {

        var pwdLengthCheck = pwdLength.test(sifrechangeval.val())
        var pwdUpperCheck = pwdUpper.test(sifrechangeval.val())
        var pwdLowerCheck = pwdLower.test(sifrechangeval.val())
        var pwdNumberCheck = pwdNumber.test(sifrechangeval.val())
        var pwdSpecialCheck = pwdSpecial.test(sifrechangeval.val())
        if (pwdLengthCheck === true) {
            $("li#pwdLength").removeClass("text-danger").addClass("text-secondary");
            $("li#pwdLength i").removeClass("bx-shield-x").addClass("bx-check-shield").addClass("text-success");
        } else if (pwdLengthCheck === false) {
            $("li#pwdLength").removeClass("text-secondary").addClass("text-danger");
            $("li#pwdLength i").removeClass("bx-check-shield").addClass("bx-shield-x").removeClass("text-success");
        }

        if (pwdUpperCheck === true) {
            $("li#pwdUpper").removeClass("text-danger").addClass("text-secondary");
            $("li#pwdUpper i").removeClass("bx-shield-x").addClass("bx-check-shield").addClass("text-success");
        } else if (pwdUpperCheck === false) {
            $("li#pwdUpper").removeClass("text-secondary").addClass("text-danger");
            $("li#pwdUpper i").removeClass("bx-check-shield").addClass("bx-shield-x").removeClass("text-success");
        }

        if (pwdLowerCheck === true) {
            $("li#pwdLower").removeClass("text-danger").addClass("text-secondary");
            $("li#pwdLower i").removeClass("bx-shield-x").addClass("bx-check-shield").addClass("text-success");
        } else if (pwdLowerCheck === false) {
            $("li#pwdLower").removeClass("text-secondary").addClass("text-danger");
            $("li#pwdLower i").removeClass("bx-check-shield").addClass("bx-shield-x").removeClass("text-success");
        }
        if (pwdNumberCheck === true) {
            $("li#pwdNumber").removeClass("text-danger").addClass("text-secondary");
            $("li#pwdNumber i").removeClass("bx-shield-x").addClass("bx-check-shield").addClass("text-success");
        } else if (pwdNumberCheck === false) {
            $("li#pwdNumber").removeClass("text-secondary").addClass("text-danger");
            $("li#pwdNumber i").removeClass("bx-check-shield").addClass("bx-shield-x").removeClass("text-success");
        }
        if (pwdSpecialCheck === true) {
            $("li#pwdSpecial").removeClass("text-danger").addClass("text-secondary");
            $("li#pwdSpecial i").removeClass("bx-shield-x").addClass("bx-check-shield").addClass("text-success");
        } else if (pwdSpecialCheck === false) {
            $("li#pwdSpecial").removeClass("text-secondary").addClass("text-danger");
            $("li#pwdSpecial i").removeClass("bx-check-shield").addClass("bx-shield-x").removeClass("text-success");
        }



    });

    function resetlink(e) {
        e.preventDefault();
        // console.log("çalıştı RESET LİNK");
        const emailchangeval = $("input#email")
        const userid = localStorage.getItem("userid")
        const accessToken = localStorage.getItem("accessToken")
        axios.defaults.headers.post['Authorization'] = `Bearer ${accessToken}`
        $("div#alert").children().remove()
        if (emailchangeval.length > 0) {
            var emailchange = emailchangeval.val()
            var regex = /^([a-zA-Z0-9_\.\-\+])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
            var emailtest = regex.test(emailchange)
            // console.log(emailtest, "pagepanel js");
            if (emailtest == false) {
                alertMessage = "Hatalı email adresi"
                $("div#alert").show() // ALERT DİVİ BUTTON HİDE İÇİN MESAJ GELİNCE GÖSTERİLİYOR
                $("div#alert").append(`<div class="alert alert-info alert-dismissible">${alertMessage}<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>`);

            } else {
                axios.post(`/panelMailSifreDuzenle/mailduzenle/${userid}/tr`, { emailData: emailchange }).then((req, res) => {
                    console.log(req.data, "pagepanel");
                    if (req.data.message === "unsuccessfull") {
                        localStorage.clear()
                        window.location.href = window.location.origin
                    } else {
                        alertMessage = req.data.message
                        $("div#alert").show() // ALERT DİVİ BUTTON HİDE İÇİN MESAJ GELİNCE GÖSTERİLİYOR
                        $("div#alert").append(`<div class="alert alert-info alert-dismissible">${alertMessage}<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>`);

                    }
                })
            }
        }
        var pwdLengthCheck = pwdLength.test(sifrechangeval.val())
        var pwdUpperCheck = pwdUpper.test(sifrechangeval.val())
        var pwdLowerCheck = pwdLower.test(sifrechangeval.val())
        var pwdNumberCheck = pwdNumber.test(sifrechangeval.val())
        var pwdSpecialCheck = pwdSpecial.test(sifrechangeval.val())
        if (sifrechangeval.length > 0 &&
            pwdLengthCheck === true &&
            pwdUpperCheck === true &&
            pwdLowerCheck === true &&
            pwdNumberCheck === true &&
            pwdSpecialCheck === true
        ) {
            // console.log("başarılı sifre gonder page panel");
            const sifrechange = sifrechangeval.val()
            axios.post(`/panelMailSifreDuzenle/sifreduzenle/${userid}/tr`, { sifreData: sifrechange }).then((req, res) => {

                alertMessage = req.data.message
                $("div#alert").show() // ALERT DİVİ BUTTON HİDE İÇİN MESAJ GELİNCE GÖSTERİLİYOR
                $("div#alert").append(`<div class="alert alert-info alert-dismissible">${alertMessage}<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>`);

            })
        }



    }
    $("form#formAuthentication button[name='resetlink']").on("click", resetlink);
})// ŞİFRE EMAİL DEĞİŞTİRME

$(() => {
    function width100(e) {
        e.preventDefault();
        var targetclick = $(this)[0].dataset.bsTarget
        var element = targetclick.split("#")[1]
        $($(`div#collapse${element}`)).toggleClass("col-12");
    }
    $("div#eksikbilgirow div.collapse button[data-bs-toggle='collapse']").on("click", width100)
})// KULLANICI EKSİK BİLGİLERİ GÖR GENİŞLİK 100% YAPMAK

$(() => {
    function withyuz(e) {
        e.preventDefault()
        $(this).closest("div.col-md-3").toggleClass("col-md-12 col-sm-12")
    }
    $("div#kategori button.accordion-button").on("click", withyuz);
}) //KULLANICI yetkilendirme GÖR GENİŞLİK 100% YAPMAK


















