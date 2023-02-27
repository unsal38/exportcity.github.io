const express = require("express");
const router = express.Router();

// const jwt = require("jsonwebtoken");
const user = require("../schema/userSchema");
const siteHeadAyarSchema = require("../schema/siteHeadAyarSchema");
const fs = require('fs');
const urunSchema = require("../schema/urunSchema");
// const panelRoutes = require("../routes/panelRoutes");
// const { json } = require("body-parser");
router.use(express.json())

router.get("/user/:user/:lang", async (req, res) => {

    // console.log(req.userid, "userRouter");

    const userid = req.params.user //req.userid // "63b14b266c7cd03d4b6ce793" // req.params.user
    const lang = req.params.lang  //req.lang // "tr"
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
    // HİZMET OLAN ÜRÜNLER İÇİN FİLTRE

    let urunDbHizmetFilter = {
        urunOnay: true,
        satis: "hizmet",
    }//.where("satis").equals("hizmet")
    var urunDbHizmetlistele = await urunSchema.find(urunDbHizmetFilter)
        .limit(10)
        .sort({ oncelik: -1, createdAt: -1 })

    // HİZMET OLAN ÜRÜNLER İÇİN FİLTRE

    // İMPORT OLAN ÜRÜNLER İÇİN FİLTRE

    let urunDbimportFilter = {
        urunOnay: true,
        satis: "import",
    }//.where("satis").equals("import")
    var urunDbimportlistele = await urunSchema.find(urunDbimportFilter)
        .limit(10)
        .sort({ oncelik: -1, createdAt: -1 })

    // İMPORT OLAN ÜRÜNLER İÇİN FİLTRE

    // EXPORT OLAN ÜRÜNLER İÇİN FİLTRE

    let urunDbexportFilter = {
        urunOnay: true,
        satis: "export",
    }//.where("satis").equals("import")

    var urunDbexportlistele = await urunSchema.find(urunDbexportFilter)
        .limit(10)
        .sort({ oncelik: -1, createdAt: -1 })

    // EXPORT OLAN ÜRÜNLER İÇİN FİLTRE
        var userData = await user.findById(userid)
        var roleData = userData.role
    } catch (error) {
        console.log(error);
        res.redirect("/")
    }
    

    res.render("home", {
        user: userData,
        lang: lang,
        sitedescription: sitedescription,
        sitetitle: sitetitle,
        langDilJson: langDilJson,
        hizmetUrunDb: urunDbHizmetlistele,
        importUrunDb: urunDbimportlistele,
        exportUrunDb: urunDbexportlistele,
        role: roleData,
    })



})

module.exports = router;