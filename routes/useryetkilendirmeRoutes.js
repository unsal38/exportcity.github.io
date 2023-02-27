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




router.get("/:user/:lang", async (req, res) => {
    var userid = req.params.user
        
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

        try {
            var userData = await user.findById(userid)
            var bilgiEksikUser = await user.find({
                adres: {
                    $exists: false
                }
            })
            res.render("useryetkilendirme",
            {
                user: userData,
                bilgiEksikUser: bilgiEksikUser,
                path: "useryetkilendirme",
                lang: lang,
                sitedescription: sitedescription,
                sitetitle: sitetitle,
                langDilJson: langDilJson,
            })
        } catch (error) {
            
        }

})

module.exports = router;