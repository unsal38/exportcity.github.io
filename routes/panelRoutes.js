const express = require("express"),
    router = express.Router(),
    authJWT = require("../middleware/auth"),
    user = require("../schema/userSchema"),
    ls = require("local-storage"),
    jwt = require("jsonwebtoken"),
    mailGon = require("../middleware/mail"),
    userSchema = require("../schema/userSchema"),
    multer = require("multer"),
    multerUpload = require("../middleware/multerUpload"),
    siteHeadAyarSchema = require("../schema/siteHeadAyarSchema"),
    urunAnaKategoriSchema = require("../schema/KategoriAnaUrunSchema"),
    urunBirAltKategoriSchema =require("../schema/KategoriBirAltSchema"),
    urunikiAltKategoriSchema = require("../schema/KategoriikiAltSchema"),
    fs = require('fs'),
    bcrypt = require("bcrypt"),
    path = require("path"),
    urunSchema = require("../schema/urunSchema");
require("dotenv").config();
const eksikbilgimailgon = require("../middleware/eksikbilgimailgon");


// ÖNEMLİ NOT !!!!!PATH MENÜDE ACTİVE CLASS VERMEK AMACIYLA YAPILDI SEÇİMİ RENKLENDİRİYOR////////////////////////////////

// PROFİL RESMİNİ GÜNCELLEME //////////////////////////////////////////////

router.post("/panelProfilBilgileri/upload/resim/user", multerUpload.uploadFile) // OK

// PROFİL BİLGİLERİNİ GÜNCELLEME //////////////////////////////////////////////

router.post("/panelProfilBilgileri/update/user", async (req, res) => {
    try {
        const useraccessTokenHeader = req.headers['authorization']
        const accessToken = useraccessTokenHeader.split(' ')[1]
        const useridaccessToken = jwt.verify(accessToken, process.env.ACCESSTOKENSECRET)
        const userDbid = useridaccessToken.userid
        // console.log(userDbid, "panelroutes");
        await user.findById(userDbid, async (err, decoded) => {
            if (err) {
                res.json({ message: "unsuccessfull" })
                console.log(err);
            }
            const userDbacitiveCode = decoded.acitiveCode
            const userDbacitiveCodeString = userDbacitiveCode.toString();
            const userDataacitiveCodeString = req.body.userData.acitiveCode
            // console.log(userDbacitiveCodeString,userDataacitiveCodeString, "çalıştı user panelroute" );
            if (userDbacitiveCodeString === userDataacitiveCodeString) {
                const userSchemaUpdateFilter = {
                    _id: userDbid
                }
                const userData = req.body.userData
                const userSchemaUpdateData = {
                    kullaniciAdi: userData.kullaniciAdi,
                    firmaAdi: userData.firmaAdi,
                    iletisim: userData.iletisim,
                    adres: userData.adres,
                    ulke: userData.ulke,
                    siteDil: userData.siteDil,
                    odemeCinsi: userData.odemeCinsi,
                    mailOnay: true,
                }
                try {
                    await user.findOneAndUpdate(userSchemaUpdateFilter, userSchemaUpdateData) //.clone()
                    res.json({ message: "successfull" })
                } catch (error) {
                    console.log(error);
                    res.json({ message: "unsuccessfull" })
                }
            }
        }).clone()
    } catch (error) {
        console.log(error);
    }



    // const accessToken = ls.get("accessToken");
    // const accessToken = localStorage.getItem("accessToken");
    // const userDataActiveCode = req.body
    // try {
    //     const accessTokenVerify = jwt.verify(accessToken, process.env.ACCESSTOKENSECRET)
    //     const userDbid = accessTokenVerify.userid
    //     console.log(userDbid);
    //     await user.findById(userDbid, async (err, decoded) => {
    //         // if(err) {console.log(err);}  // ERROR VAR MI KONTROL İÇİN BIRAKILACAK
    //         if (decoded.id) {
    //             const userDbacitiveCodeString = decoded.acitiveCode.toString();
    //             const userDataacitiveCodeString = userDataActiveCode.acitiveCode.toString();

    //             if (userDbacitiveCodeString === userDataacitiveCodeString) {

    //                 const userSchemaUpdateFilter = {
    //                     _id: userDbid
    //                 }
    //                 const userSchemaUpdateData = {
    //                     kullaniciAdi: userData.kullaniciAdi,
    //                     firmaAdi: userData.firmaAdi,
    //                     iletisim: userData.iletisim,
    //                     adres: userData.adres,
    //                     ulke: userData.ulke,
    //                     siteDil: userData.siteDil,
    //                     odemeCinsi: userData.odemeCinsi,
    //                     mailOnay: true,
    //                     updatedAt: Date.now(),
    //                     //acitiveCode: Math.floor(Math.random() * 10000),
    //                 }
    //                 try {
    //                     await user.findOneAndUpdate(userSchemaUpdateFilter, userSchemaUpdateData) //.clone()
    //                     activecodeupdate.active(userDbid)
    //                     return res.json({ message: "successful" })
    //                 } catch (error) {
    //                     console.log(error);
    //                 }

    //             }
    //         } else {
    //             return res.json({ message: "unsuccessful" })
    //         }
    //     }).clone()
    // } catch (error) {
    //     console.log(error);
    //     return res.json({ message: "unsuccessful" })
    // }
}) // ok

// ÜRÜN EKLEMEK  //////////////////////////////////////////////

router.post("/panelurunekle/user/:urunekle", multerUpload.multerUrunİmg) //ok

router.post("/panelProfilBilgileri/hesapaskiyaal", async (req, res) => {
    const accessTokenHeader = req.headers["authorization"]
    const accessToken = accessTokenHeader.split(" ")[1]
    const activeCodeClients = req.body.activeCode
    try {
        const accessTokenVerify = jwt.verify(accessToken, process.env.ACCESSTOKENSECRET)
        const userid = accessTokenVerify.userid
        const user = await userSchema.findById(userid)
        const activeCodeDb = user.acitiveCode
        if (activeCodeClients === activeCodeDb.toString()) {
            const user = await userSchema.findById(userid)
            const hesabaskidurumu = user.hesapAskiyaAl.askida
            if (hesabaskidurumu === true) {
                var schemaUpdate = {
                    hesapAskiyaAl: { askida: false, date: Date.now() }
                }
            } else if (hesabaskidurumu === false) {
                var schemaUpdate = {
                    hesapAskiyaAl: { askida: true, date: Date.now() }
                }
            }
            const schemaFilter = {
                _id: userid
            }
            try {
                await userSchema.findByIdAndUpdate(schemaFilter, schemaUpdate, { upsert: true })
                res.json({ message: "successfull" })
            } catch (error) {
                res.json({ message: "unsuccessfull" })
            }

        }
    } catch (error) {
        res.json({ message: "unsuccessfull" })
    }
}) ///ok
router.get("/mailonayactive/:token", async (req, res) => {
    const token = req.params.token
    if (token) {
        try {
            const userData = jwt.verify(token, process.env.REFLESHTOKENSECRET)
            var kullaniciid = userData.filterKullaniciid
            const schemafilter = {
                _id: kullaniciid
            }
            const schemaupdate = {
                mailOnay: true,
                updatedAt: Date.now(),
            }
            await userSchema.findByIdAndUpdate(schemafilter, schemaupdate, { upsert: true });
            var user = await userSchema.findOne({ _id: kullaniciid })
            const siteAyarSchemaArray = await siteHeadAyarSchema.find()
            const description = siteAyarSchemaArray[0].description
            const title = siteAyarSchemaArray[0].title.anasayfa
            var dilJson = JSON.parse(fs.readFileSync("jsonSiteTranslateDil.json"))
            res.render("mailcevapdb",
                {
                    user: user,
                    lang: "tr",
                    sitedescription: description.tr,
                    sitetitle: title.tr,
                    langDilJson: dilJson.tr,
                }
            )
        } catch (error) {
            console.log(error);
            res.redirect("/")
        }
    } else {
        res.redirect("/")
    }
}) // OK
router.get("/panelProfilBilgileri/mailOnayMailGond/:hangibolum", async (req, res) => {
    var neyapılacak = req.params.hangibolum
    if (neyapılacak === "mailactivecodgond") {
        var mailsubject = "E exportcity aktivasyon Kodu"
    } else if (neyapılacak === "mailaktivasyon") {
        var mailsubject = "E exportcity mail aktivasyon işlemi"
    } else if (neyapılacak === "cevapmail") {
        var mailsubject = "E exportcity mail aktivasyon tamamlanmıştır."
    }
    var accessTokenHeader = req.headers['authorization']
    var accessToken = accessTokenHeader.split(' ')[1]

    jwt.verify(accessToken, process.env.ACCESSTOKENSECRET, async (err, decoded) => {
        if (err) {
            throw err,
            res.json({ message: 'token unsuccessfull' })
        } else if (decoded) {
            var userDbid = decoded.userid
            const userData = await userSchema.findById(userDbid),
                user = userData.kullaniciAdi,
                email = userData.kullaniciMail,
                acaktivasyonKodu = userData.acitiveCode,
                siteDil = userData.siteDil,
                subject = mailsubject,
                fromEmail = process.env.MAIL_USERNAME,
                link = "mailonayactive"
            mailGon.maildogrulama(user, email, acaktivasyonKodu, subject, siteDil, fromEmail, link)
            res.json({ message: "successfull" })
        } else if (!decoded) {
            res.json({ message: 'token unsuccessfull' })
        }

    })
}) // USER MAİL kodu İÇİN OK ///////////MAİL ONAYLANMASI İÇİN TOKENLI URL GÖNDERİLMESİ OK///////////// 
router.get("/panelProfilBilgileri/:user/:lang", async (req, res) => {
    try {
        var userData = await user.findById(req.params.user)
        var lang = req.params.lang
        const siteAyarSchemaArray = await siteHeadAyarSchema.find()
        const description = siteAyarSchemaArray[0].description
        const title = siteAyarSchemaArray[0].title.anasayfa
        var dilJson = JSON.parse(fs.readFileSync("jsonSiteTranslateDil.json"))

        if (req.params.lang === "tr") {
            var sitedescription = description.tr
            var sitetitle = title.tr
            var langDilJson = dilJson.tr
        } else if (req.params.lang === "en") {
            var sitedescription = description.en
            var sitetitle = title.en
            var langDilJson = dilJson.en
        } else if (req.params.lang === "fr") {
            var sitedescription = description.fr
            var sitetitle = title.fr
            var langDilJson = dilJson.fr
        } else if (req.params.lang === "ar") {
            var sitedescription = description.ar
            var sitetitle = title.ar
            var langDilJson = dilJson.ar
        }
    } catch (error) {
        console.log(error);
        res.redirect("/")
    }
    res.render("panelProfilBilgileri",
        {
            user: userData,
            path: "panelProfilBilgileri",
            lang: lang,
            sitedescription: sitedescription,
            sitetitle: sitetitle,
            langDilJson: langDilJson,
        }
    )
}); //OK
router.get("/panelDashboard/:user/:lang", async (req, res) => {
    try {
        // SONRASINDA TIKLANINCA ÇALIŞACAK ŞEKİLDE AYARLANACAK PERSONELİN EKSİK BİLGİLERİNİ MAİL YOLUYLA BİLDİRİLECEK /////////////////
        /////////////////
        // eksikbilgimailgon.eksikbilgimailgon() 

        // SONRASINDA TIKLANINCA ÇALIŞACAK ŞEKİLDE AYARLANACAK /////////////////
        /////////////////
        var userid = req.params.user
        var userData = await user.findById(userid)
        var lang = req.params.lang
        const siteAyarSchemaArray = await siteHeadAyarSchema.find()
        const description = siteAyarSchemaArray[0].description
        const title = siteAyarSchemaArray[0].title.anasayfa
        var dilJson = JSON.parse(fs.readFileSync("jsonSiteTranslateDil.json"))
        if (req.params.lang === "tr") {
            var sitedescription = description.tr
            var sitetitle = title.tr
            var langDilJson = dilJson.tr
        } else if (req.params.lang === "en") {
            var sitedescription = description.en
            var sitetitle = title.en
            var langDilJson = dilJson.en
        } else if (req.params.lang === "fr") {
            var sitedescription = description.fr
            var sitetitle = title.fr
            var langDilJson = dilJson.fr
        } else if (req.params.lang === "ar") {
            var sitedescription = description.ar
            var sitetitle = title.ar
            var langDilJson = dilJson.ar
        }
        var bilgiEksikUser = await user.find({
            adres: {
                $exists: false
            }
        })
    } catch (error) {
        console.log(error);
        res.redirect("/")
    }
    res.render("panelDashboard",
        {
            user: userData,
            bilgiEksikUser: bilgiEksikUser,
            path: "panelDashboard",
            lang: lang,
            sitedescription: sitedescription,
            sitetitle: sitetitle,
            langDilJson: langDilJson,
        })
}); // OK
router.get("/panelurunekle/:user/:lang", async (req, res) => {
    try {
        var userData = await user.findById(req.params.user)
        var urunAnaKategori = await urunAnaKategoriSchema.find()
        var urunBirAltkategori = await urunBirAltKategoriSchema.find() 
        var urunikiAltkategori = await urunikiAltKategoriSchema.find()

        var lang = req.params.lang
        const siteAyarSchemaArray = await siteHeadAyarSchema.find()
        const description = siteAyarSchemaArray[0].description
        const title = siteAyarSchemaArray[0].title.anasayfa
        var dilJson = JSON.parse(fs.readFileSync("jsonSiteTranslateDil.json"))
        if (req.params.lang === "tr") {
            var sitedescription = description.tr
            var sitetitle = title.tr
            var langDilJson = dilJson.tr
        } else if (req.params.lang === "en") {
            var sitedescription = description.en
            var sitetitle = title.en
            var langDilJson = dilJson.en
        } else if (req.params.lang === "fr") {
            var sitedescription = description.fr
            var sitetitle = title.fr
            var langDilJson = dilJson.fr
        } else if (req.params.lang === "ar") {
            var sitedescription = description.ar
            var sitetitle = title.ar
            var langDilJson = dilJson.ar
        }
    } catch (error) {
        console.log(error);
        res.redirect("/")
    }

    res.render("panelUrunEkle",
        {
            user: userData,
            path: "panelurunekle",
            lang: lang,
            sitedescription: sitedescription,
            sitetitle: sitetitle,
            langDilJson: langDilJson,
            urunAnaKategori: urunAnaKategori,
            urunBirAltkategori: urunBirAltkategori,
            urunikiAltkategori: urunikiAltkategori,
        }
    );
}); //ok
router.get("/mailduzenle/:token", async (req, res) => {
    // console.log(req.params.token, "panelrouter mailduzenle");
    try {
        const tokenData = jwt.verify(req.params.token, process.env.REFLESHTOKENSECRET)
        // console.log(tokenData, "panelrouter mailduzenle");
        const userid = tokenData.filterKullaniciid
        const newMail = tokenData.newMail

        const checkUniqMail = await userSchema.findOne({ kullaniciMail: newMail })
        // console.log(checkUniqMail, "panelrouter mailduzenle check");
        if (checkUniqMail === null) {
            const userSchemaFilter = {
                _id: userid
            }
            const userSchemaUpdateData = {
                kullaniciMail: newMail
            }
            await userSchema.findByIdAndUpdate(userSchemaFilter, userSchemaUpdateData, { upsert: true })
            var user = await userSchema.findOne({ _id: userid })
            const siteAyarSchemaArray = await siteHeadAyarSchema.find()
            const description = siteAyarSchemaArray[0].description
            const title = siteAyarSchemaArray[0].title.anasayfa
            var dilJson = JSON.parse(fs.readFileSync("jsonSiteTranslateDil.json"))
            res.render("mailcevapdb",
                {
                    user: user,
                    lang: "tr",
                    sitedescription: description.tr,
                    sitetitle: title.tr,
                    langDilJson: dilJson.tr,

                }
            )
        } else {
            res.redirect("/")
        }
    } catch (error) {
        console.log(error);
        res.json({ message: "unsuccessfull" })
    }
})// OK
router.get("/panelMailSifreDuzenle/:change/:user/:lang", async (req, res) => {
    var change = req.params.change
    // console.log(change);
    try {
        let userid = req.params.user
        var userData = await user.findById(userid)
        const siteAyarSchemaArray = await siteHeadAyarSchema.find()
        const description = siteAyarSchemaArray[0].description
        const title = siteAyarSchemaArray[0].title.anasayfa
        var dilJson = JSON.parse(fs.readFileSync("jsonSiteTranslateDil.json"))
        if (req.params.lang === "tr") {
            var sitedescription = description.tr
            var sitetitle = title.tr
            var langDilJson = dilJson.tr
        } else if (req.params.lang === "en") {
            var sitedescription = description.en
            var sitetitle = title.en
            var langDilJson = dilJson.en
        } else if (req.params.lang === "fr") {
            var sitedescription = description.fr
            var sitetitle = title.fr
            var langDilJson = dilJson.fr
        } else if (req.params.lang === "ar") {
            var sitedescription = description.ar
            var sitetitle = title.ar
            var langDilJson = dilJson.ar
        }
        res.render("panelMailDuzenle",
            {
                user: userData,
                lang: "tr",
                sitedescription: description.tr,
                sitetitle: title.tr,
                langDilJson: dilJson.tr,
                changed: change,
            }
        );
    } catch (error) {
        console.log(error);
        res.redirect("/")
    }

}); // ok

router.post("/panelMailSifreDuzenle/:change/:userid/:lang", async (req, res) => {
    const useraccessTokenHeader = req.headers['authorization']
    const accessToken = useraccessTokenHeader.split(' ')[1]
    const mailSifreFilterData = req.params.change
    if (mailSifreFilterData === "mailduzenle") {
        try {
            const userDbid = jwt.verify(accessToken, process.env.ACCESSTOKENSECRET)
            const fromEmailemailData = req.body.emailData
            const userSchemaFilter = {
                kullaniciMail: fromEmailemailData,
            }
            const fromEmailemailDataCheck = await userSchema.findOne(userSchemaFilter)
            // console.log(fromEmailemailData, "fromEmailemailDataCheck");
            // console.log(userSchemaFilter, "fromEmailemailDataCheck");
            // console.log(fromEmailemailDataCheck, "fromEmailemailDataCheck");
            if (fromEmailemailDataCheck === null) {
                // console.log(fromEmailemailDataCheck, "fromEmailemailDataCheck");

                const userData = await userSchema.findById(userDbid.userid),
                    user = userData.kullaniciAdi,
                    email = userData.kullaniciMail,
                    acaktivasyonKodu = userData.acitiveCode,
                    siteDil = userData.siteDil,
                    subject = "E exportcity mail aktivasyon işlemi",
                    fromEmail = fromEmailemailData,
                    link = req.params.change;
                if (req.body.emailData) {
                    var newMailgon = req.body.emailData
                    var newPasswordgon = "null"
                } else if (req.body.sifreData) {
                    var newMailgon = "null"
                    var newPasswordgon = req.body.sifreData
                }
                mailGon.mailsifredegistir(user, email, acaktivasyonKodu, subject, siteDil, fromEmail, link, newMailgon, newPasswordgon) // POSTTAN GELEN MAİL VE ŞİFRE EKLENMESİ GEREKİYOR
                res.json({ message: 'Kayıt İşlemi için mail gönderilmiştir.' })
            } else {
                res.json({ message: 'Kayıtlı Kullanıcı Bulunmaktadır' })
            }

        } catch (error) {
            console.log(error, "panelrouter panelMailSifreDuzenle");
            res.json({ message: "unsuccessfull" })
        }
    } else if (mailSifreFilterData === "sifreduzenle") {
        try {
            const userDbid = jwt.verify(accessToken, process.env.ACCESSTOKENSECRET)

            const userData = await userSchema.findById(userDbid.userid),
                user = userData.kullaniciAdi,
                email = userData.kullaniciMail,
                acaktivasyonKodu = userData.acitiveCode,
                siteDil = userData.siteDil,
                subject = "E exportcity mail aktivasyon işlemi",
                fromEmail = userData.kullaniciMail,
                link = req.params.change;
            if (req.body.emailData) {
                var newMailgon = req.body.emailData
                var newPasswordgon = "null"
            } else if (req.body.sifreData) {
                var newMailgon = "null"
                var newPasswordgon = req.body.sifreData
            }
            mailGon.mailsifredegistir(user, email, acaktivasyonKodu, subject, siteDil, fromEmail, link, newMailgon, newPasswordgon) // POSTTAN GELEN MAİL VE ŞİFRE EKLENMESİ GEREKİYOR
            res.json({ message: 'Kayıt İşlemi için mail gönderilmiştir.' })
        } catch (error) {
            console.log(error, "panelrouter panelMailSifreDuzenle");
            res.json({ message: "unsuccessfull" })
        }
    }




}) // ok

router.get("/sifreduzenle/:token", async (req, res) => {
    // console.log(req.params.token, "panelrouter sifreduzenle");
    try {
        const tokenData = jwt.verify(req.params.token, process.env.REFLESHTOKENSECRET)
        // console.log(tokenData, "panelrouter mailduzenle");
        const userid = tokenData.filterKullaniciid
        const newPassword = tokenData.newPassword

        const saltRounds = 10;
        const password = newPassword
        const salt = bcrypt.genSaltSync(saltRounds);
        const hashPassword = bcrypt.hashSync(password, salt);

        const userSchemaFilter = {
            _id: userid
        }
        const userSchemaUpdateData = {
            password: hashPassword
        }
        await userSchema.findByIdAndUpdate(userSchemaFilter, userSchemaUpdateData)



        var user = await userSchema.findOne({ _id: userid })
        const siteAyarSchemaArray = await siteHeadAyarSchema.find()
        const description = siteAyarSchemaArray[0].description
        const title = siteAyarSchemaArray[0].title.anasayfa
        var dilJson = JSON.parse(fs.readFileSync("jsonSiteTranslateDil.json"))
        res.render("mailcevapdb",
            {
                user: user,
                lang: "tr",
                sitedescription: description.tr,
                sitetitle: title.tr,
                langDilJson: dilJson.tr,
            }
        )
    } catch (error) {
        console.log(error);
        res.json({ message: "unsuccessfull" })
    }
}) // ok


router.get("/panelOnayBekleyenUrun/:user/:lang", async (req, res) => {
  
    try {
        var userData = await user.findById(req.params.user)
        var lang = req.params.lang
        var urunDbFilter = {
            firma_id: req.params.user,
        }
        // var urunDbFilter = {
        //     urunOnay: false,
        // }
        var urunDbListele = await urunSchema.find(urunDbFilter)
        .where({urunOnay: false})
        .sort({ oncelik: -1, createdAt: -1 })
        var arrayUrun = new Array(urunDbListele)
        ///KONTROL İÇİN SONRA SİLİNECEK //////////////////////////////////

        
        // console.log(arrayUrun);
        // arrayUrun.forEach((v, i) => {
        //     // console.log(v.urunBasligi.tr);
        //     // console.log(v[0]);
        //     console.log(v);
        // });

        ///KONTROL İÇİN SONRA SİLİNECEK //////////////////////////////////


        const siteAyarSchemaArray = await siteHeadAyarSchema.find()
        const description = siteAyarSchemaArray[0].description
        const title = siteAyarSchemaArray[0].title.anasayfa
        var dilJson = JSON.parse(fs.readFileSync("jsonSiteTranslateDil.json"))
        
        if (req.params.lang === "tr") {
            var sitedescription = description.tr
            var sitetitle = title.tr
            var langDilJson = dilJson.tr
        } else if (req.params.lang === "en") {
            var sitedescription = description.en
            var sitetitle = title.en
            var langDilJson = dilJson.en
        } else if (req.params.lang === "fr") {
            var sitedescription = description.fr
            var sitetitle = title.fr
            var langDilJson = dilJson.fr
        } else if (req.params.lang === "ar") {
            var sitedescription = description.ar
            var sitetitle = title.ar
            var langDilJson = dilJson.ar
        }
    } catch (error) {
        console.log(error);
        res.redirect("/")
    }
    res.render("panelOnayBekleyenUrun",
        {
            user: userData,
            path: "panelOnayBekleyenUrun",
            lang: lang,
            sitedescription: sitedescription,
            sitetitle: sitetitle,
            langDilJson: langDilJson,
            urunDb: arrayUrun[0],
        }
    )
}); // OK

router.get("/panelRedUrunler/:user/:lang", async (req, res) => {
  
    try {
        var userData = await user.findById(req.params.user)
        var lang = req.params.lang
        var urunDbFilter = {
            firma_id: req.params.user,
        }
        // var urunDbFilter = {
        //     urunOnay: false,
        // }
        var urunDbListele = await urunSchema.find(urunDbFilter)
        // .where({urunOnay: false,})
        .where("urunRedMessage")
        .exists(true)
        // .where({urunRedMessage})
        // .sort({ oncelik: -1, createdAt: -1 })
        var arrayUrun = new Array(urunDbListele)
        ///KONTROL İÇİN SONRA SİLİNECEK //////////////////////////////////

        
        // console.log(arrayUrun);
        // arrayUrun.forEach((v, i) => {
        //     // console.log(v.urunBasligi.tr);
        //     console.log(v[0]);
        //     // console.log(v);
        // });

        ///KONTROL İÇİN SONRA SİLİNECEK //////////////////////////////////


        const siteAyarSchemaArray = await siteHeadAyarSchema.find()
        const description = siteAyarSchemaArray[0].description
        const title = siteAyarSchemaArray[0].title.anasayfa
        var dilJson = JSON.parse(fs.readFileSync("jsonSiteTranslateDil.json"))
        
        if (req.params.lang === "tr") {
            var sitedescription = description.tr
            var sitetitle = title.tr
            var langDilJson = dilJson.tr
        } else if (req.params.lang === "en") {
            var sitedescription = description.en
            var sitetitle = title.en
            var langDilJson = dilJson.en
        } else if (req.params.lang === "fr") {
            var sitedescription = description.fr
            var sitetitle = title.fr
            var langDilJson = dilJson.fr
        } else if (req.params.lang === "ar") {
            var sitedescription = description.ar
            var sitetitle = title.ar
            var langDilJson = dilJson.ar
        }
    } catch (error) {
        console.log(error);
        res.redirect("/")
    }
    res.render("panelRedUrunler",
        {
            user: userData,
            path: "panelRedUrunler",
            lang: lang,
            sitedescription: sitedescription,
            sitetitle: sitetitle,
            langDilJson: langDilJson,
            urunDb: arrayUrun[0],
        }
    )
}); // OK

router.get("/panelSozlesmeler/:user/:lang", async (req, res) => {
    try {
        var userid = req.params.user
        var userData = await user.findById(userid)
        var lang = req.params.lang
        const siteAyarSchemaArray = await siteHeadAyarSchema.find()
        const description = siteAyarSchemaArray[0].description
        const title = siteAyarSchemaArray[0].title.anasayfa
        var dilJson = JSON.parse(fs.readFileSync("jsonSiteTranslateDil.json"))
        if (req.params.lang === "tr") {
            var sitedescription = description.tr
            var sitetitle = title.tr
            var langDilJson = dilJson.tr
        } else if (req.params.lang === "en") {
            var sitedescription = description.en
            var sitetitle = title.en
            var langDilJson = dilJson.en
        } else if (req.params.lang === "fr") {
            var sitedescription = description.fr
            var sitetitle = title.fr
            var langDilJson = dilJson.fr
        } else if (req.params.lang === "ar") {
            var sitedescription = description.ar
            var sitetitle = title.ar
            var langDilJson = dilJson.ar
        }

    } catch (error) {
        console.log(error);
        res.redirect("/")
    }
    res.render("panelSozlesmeler",
    {
        user: userData,
        path: "panelSozlesmeler",
        lang: lang,
        sitedescription: sitedescription,
        sitetitle: sitetitle,
        langDilJson: langDilJson,
    })
});








router.get("/panelMesajlar/user/:id", async (req, res) => {
    let userid = req.params.id
    try {
        var userData = await user.findById(userid)
    } catch (error) {
        console.log(error);
        res.redirect("/")
    }
    res.render("panelMesajlar", { user: userData, path: "panelMesajlar" });
});

router.get("/panelUyeBilgileri", async (req, res) => {
    let userid = req.params.id
    try {
        var userData = await user.findById(userid)
    } catch (error) {
        console.log(error);
        res.redirect("/")
    }
    res.render("panelUyeBilgileri", { user: userData, path: "panelUyeBilgileri" });
});

module.exports = router;



