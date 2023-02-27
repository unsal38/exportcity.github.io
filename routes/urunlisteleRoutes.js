const express = require("express");
const router = express.Router();
const fs = require('fs');
const userSchema = require("../schema/userSchema");
const urunSchema = require("../schema/urunSchema");
const siteHeadAyarSchema = require("../schema/siteHeadAyarSchema");
const jwt = require("jsonwebtoken");
const anaKategori = require("../schema/KategoriAnaUrunSchema")
const biraltKategori = require("../schema/KategoriBirAltSchema")
const ikialtKategori = require("../schema/KategoriikiAltSchema")
require("dotenv").config();

router.get("/:user/:lang", async (req, res) => {
    const userid = req.params.user 
    const lang = req.params.lang  
    const siteAyarSchemaArray = await siteHeadAyarSchema.find()
    const description = siteAyarSchemaArray[0].description
    const title = siteAyarSchemaArray[0].title.anasayfa
    var dilJson = JSON.parse(fs.readFileSync("jsonSiteTranslateDil.json"))

    if (lang === "tr") {
        var sitedescription = description.tr
        var sitetitle = title.tr
        var langDilJson = dilJson.tr
    } else if (lang === "en") {
        var sitedescription = description.en
        var sitetitle = title.en
        var langDilJson = dilJson.en
    } else if (lang === "fr") {
        var sitedescription = description.fr
        var sitetitle = title.fr
        var langDilJson = dilJson.fr
    } else if (lang === "ar") {
        var sitedescription = description.ar
        var sitetitle = title.ar
        var langDilJson = dilJson.ar
    }
    try {
        var urunDbFilter = {
            urunOnay: true,
        }
        var urunDbListele = await urunSchema.find(urunDbFilter)
            .limit(10)
            .sort({ oncelik: -1, createdAt: -1 })


        var anaKategoriDb = await anaKategori.find()    
        var biraltKategoriDb = await biraltKategori.find() 
        var ikialtKategoriDb = await ikialtKategori.find() 
        //// DENEME AMACIYLA SONRA SİL

        // biraltKategoriDb.forEach(v => {
        //     console.log(v);
        // });


         //// DENEME AMACIYLA SONRA SİL

    } catch (error) {
        console.log(error);
        res.redirect("/")
    }
    res.render("urunlistele", {
        lang: lang,
        sitedescription: sitedescription,
        sitetitle: sitetitle,
        langDilJson: langDilJson,
        anakategori: anaKategoriDb,
        biraltKategori: biraltKategoriDb,
        ikialtKategori: ikialtKategoriDb,
        urunDb: urunDbListele,
    })
})


module.exports = router;