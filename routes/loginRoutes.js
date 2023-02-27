const express = require("express")
const router = express.Router();
const jwt = require("jsonwebtoken")
const user = require("../schema/userSchema");
// const mailGond = require("../middleware/mail");
const bcrypt = require('bcrypt')
require("dotenv").config()
// const authJWT = require("../middleware/auth");

const siteHeadAyarSchema = require("../schema/siteHeadAyarSchema");
const fs = require("fs");


/////*****************************
//YAPILACAKLAR///////
// REFLESH TOKEN SÜRESİ BİTTİĞİNDE YAPILACAK İŞLEMLER MAİL ONAY ÜZERİNDEN HALLET
// ÜRÜNLERİN ANA SAYFADA GÖSTERİLMESİ
// ŞİFREMİ UNUTTUM BÖLÜMÜ YAPILACAK
// FİRMA TANITIM VİDEOSUNU BİZ KİMİZ BÖLÜMÜNE EKLE
// ÖDEME ALERT YAPILACAK
// MAİL VE PASSWORD DEĞİŞİMİ MAİL ÜZERİNDEN YAPILACAK
// FONTLAR ÇALIŞMIYOR KONTROL
// PANEL MENÜ DARALDIĞINDA YOK OLUYOR 
// dash bord da exit işini ayarla
// UPDATE İŞLEMLERİ SCHEMA ÜZERİNDEN YAPILACAK DİĞERLERİNİ SİL
// BİLGİLERİ UPDATE EDERKEN SORGULAMA YAPMIYOR KULLANICI

// SİTE İLK GİRİŞTE SİTEDİL AR VB İSE ROUTE DOSYASINDAN DEĞİŞTİRİLECEK SİTE ÜZERİNDEN DİL SEÇİLİRSE JQUERY DEĞİŞTİRECEK HEADER
//     NE GÜRÜYORSA ONU YAPACAK

// ÜRÜN GİRİŞ MİKTARI SINIRLANACAK EN DÜŞÜK BEŞ OLACAK ŞEKİLDE DATABASE KAYDETTİK
// KULLANICI ONLİNE OFFLİNE DURUMU HESAP ASKIDA HESAP ONAYLI DEĞİL GÖRE RENKLENDİRME COR.CSS AVATAR ONLİNE AVATAR OFFLİNE DA VAR
    // DÜZENLENECEK
// 1 YIL SONUNDA HİÇ GİRİŞ OLMAZSA REFLESH SİLİNECEK VE URUNLER GÖRÜNMEYECEK
// GİRİŞ YAPILMADAN DİL ÇEVİRİSİ YAPILMIYOR KONTROL EDİLECEK

// FİRMA ÖDEME BİLGİ GİRİŞİ SAYFASI YAPILACAK





///****** GELİŞTİRME AŞAMASINDA YAPILACAKLAR */
// LOGİN GİRİŞİNE ANA SAYFA YÖNLENDİRME BUTONU EKLE
// DİL SEÇİMİ İÇİN ROUTER AYARLANACAK /USER/TR USER/FR GİBİ 
// token üreteci 4000 portundan yap
// ****************************/

router.get("/", async (req, res) => {
    const siteAyarSchemaArray = await siteHeadAyarSchema.find()
    const description = siteAyarSchemaArray[0].description
    const title = siteAyarSchemaArray[0].title.anasayfa
    var dilJson = JSON.parse(fs.readFileSync("jsonSiteTranslateDil.json"))
    res.render("login", {
        user: null,
        lang: "tr",
        sitedescription: description.tr,
        sitetitle: title.tr,
        langDilJson: dilJson.tr,
    })
})

router.get("/:lang", async (req, res) => {
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
    res.render("login", {
        user: null,
        lang: req.params.lang,
        sitedescription: sitedescription,
        sitetitle: sitetitle,
        langDilJson: langDilJson,
    })
})


router.post("/", async (req, res) => {
    const userData = req.body
    var users = await user.findOne({ kullaniciMail: userData.kullaniciMail })
    if (users === null) {
        return res.json({ message: `${userData.kullaniciMail} Mail Kayıtlı Değildir` })
    } else {
        const dataPassword = userData.password
        const hashPassword = users.password
        const match = await bcrypt.compare(dataPassword, hashPassword);
        if (match === false) {
            return res.json({
                message: `Parolanınızı kontrol ediniz`
            })
        } else if (match === true) {
            try {
                const userRefleshToken = await jwt.verify(users.refleshToken, process.env.REFLESHTOKENSECRET)
                const newRefleshTokenData = {
                    kullaniciAdi: userRefleshToken.kullaniciAdi,
                    kullaniciMail: userRefleshToken.kullaniciMail,
                    role: userRefleshToken.role
                }
                const newRefleshToken = await jwt.sign(newRefleshTokenData, process.env.REFLESHTOKENSECRET, { expiresIn: "180 days" })
                await user.findOneAndUpdate({ kullaniciMail: users.kullaniciMail }, { refleshToken: newRefleshToken })
                await user.findOneAndUpdate({ kullaniciMail: users.kullaniciMail }, { updatedAt: Date.now() })
                const accessTokenData = {
                    userid: users.id
                }
                var accessToken = await jwt.sign(accessTokenData, process.env.ACCESSTOKENSECRET, { expiresIn: "60m" })

                // ls.set("accessToken", accessToken)
                res
                .setHeader('Authentication', `Bearer ${accessToken}`)
                .json({
                        message: "successfull",
                        userid : users.id,
                    })
                    
            } catch (error) {
                res.json({ message: "unsuccessfull" })
                console.log(error);
            }
        }
    }


})




module.exports = router;