const express = require("express");
const router = express.Router();
const fs = require('fs');
const userSchema = require("../schema/userSchema");
const siteHeadAyarSchema = require("../schema/siteHeadAyarSchema");
const jwt = require("jsonwebtoken");
require("dotenv").config();

router.get("/:firmauser/user/:user/:lang", async (req, res) => {
    const siteAyarSchemaArray = await siteHeadAyarSchema.find()
    const description = siteAyarSchemaArray[0].description
    const title = siteAyarSchemaArray[0].title.anasayfa
    var dilJson = JSON.parse(fs.readFileSync("jsonSiteTranslateDil.json"))
    var lang = req.params.lang
    // FİRMA BİLGİSİ İÇİN İD KONTROL BAŞKA FİRMAYA BAKAMASIN

    var firma_id = req.params.firmauser
    
    try {
        const userDb = await userSchema.findById(firma_id)
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
        res.render("firmabilgi", {
            lang: lang,
            sitedescription: sitedescription,
            sitetitle: sitetitle,
            langDilJson: langDilJson,
            userDb: userDb,
        })
    } catch (error) {
        console.log(error);
        res.redirect("/")
    }

})
router.post("/usercheck/:user", async (req, res) => {
    const accessTokenHeader = req.headers['authorization']
    const firmaid = req.body.useridFirma
    try {
        var firma_idcheck = await userSchema.findById(firmaid)
    } catch (error) {
        console.log(error);
        res.json({ message: 'Firmaid not found' })
    }
    try {
        const accessToken = accessTokenHeader.split(" ")[1]
        var userDbid = jwt.verify(accessToken, process.env.ACCESSTOKENSECRET)
    } catch (error) {
        console.log(error);
        res.json({ message: 'unseccessfull' })
    }
    if (firma_idcheck) {
        if (userDbid) {
            try {
                const userid = userDbid.userid
                const userDb = await userSchema.findById(userid)
                const userRole = userDb.role // user
                const userhesapAskiyaAl = userDb.hesapAskiyaAl.askida // false
                const kullaniciOnay = userDb.kullaniciOnay // true
                if (userRole === "user" ||
                    userRole === "pageadmin" ||
                    userRole === "admin") {
                    if (userhesapAskiyaAl === true) {
                        res.json({ message: "Hesabınız askıda olduğundan kullanım yetkiniz yoktur" })
                    } else if (userhesapAskiyaAl === false) {
                        if (kullaniciOnay === false) {
                            res.json({ message: "Hesabınız onaylanmadığından kullanım yetkiniz yoktur" })
                        } else if(kullaniciOnay === true) {
                            res.json({ message: "successfull" })
                        }
                    }
                } else {
                    res.json({ message: "Kullanım yetkiniz bulunmamaktadır." })
                }
            } catch (error) {
                console.log(error);
                res.json({ message: 'unseccessfull' })
            }
        }
    }
})
module.exports = router;