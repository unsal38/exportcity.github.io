const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const user = require("../schema/userSchema");
const siteHeadAyarSchema = require("../schema/siteHeadAyarSchema");
const fs = require('fs');
const Iyzipay = require('iyzipay');
const abonelikurunsorgu = require("../schema/abonelikurunsorguSchema");

router.use(express.json())

require('dotenv').config();

router.get('/abonelikcesitleri/:user/:lang', async function (req, res) {
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
    var iyzipay = new Iyzipay({
        apiKey: process.env.APIKEY,
        secretKey: process.env.SECRETKEY,
        uri: process.env.URI
    });

    // ÜRÜN SORGULAMA //////////////////////////////////
    /////////////////////
    async function urunsorgu() {
        var retrieveRequest = {
            locale: Iyzipay.LOCALE.TR,
            // conversationId: '123456789',
            page: 1,
            count: 10
        };

        iyzipay.subscriptionProduct.retrieveList(retrieveRequest, function (err, result) {
            // console.log(err, result.data);
            // console.log(err, result.data.items[0].pricingPlans);
            const pricingPlans = result.data.items
            pricingPlans.forEach(async element => {
                const referenceCode = element.referenceCode
                const createdDate = element.createdDate
                const name = element.name
                const description = element.description
                const status = element.status
                const pricingPlanSreferenceCode = element.pricingPlans[0].referenceCode
                const pricingPlanScreatedDate = element.pricingPlans[0].createdDate
                const pricingPlanSname = element.pricingPlans[0].name
                const pricingPlanSprice = element.pricingPlans[0].price
                const pricingPlanSpaymentInterval = element.pricingPlans[0].paymentInterval
                const pricingPlanSpaymentIntervalCount = element.pricingPlans[0].paymentIntervalCount
                const pricingPlanStrialPeriodDays = element.pricingPlans[0].trialPeriodDays
                const pricingPlanScurrencyCode = element.pricingPlans[0].currencyCode
                const pricingPlanSproductReferenceCode = element.pricingPlans[0].productReferenceCode
                const pricingPlanSplanPaymentType = element.pricingPlans[0].planPaymentType
                const pricingPlanSstatus = element.pricingPlans[0].status

                const findpricingPlan = (await abonelikurunsorgu.find().where("referenceCode").equals(referenceCode)).length
                if (findpricingPlan === 0) {
                    const ekleurunsorguschema = await abonelikurunsorgu.create({
                        referenceCode: referenceCode,
                        createdDate: createdDate,
                        name: name,
                        description: description,
                        status: status,
                        pricingPlanSreferenceCode: pricingPlanSreferenceCode,
                        pricingPlanScreatedDate: pricingPlanScreatedDate,
                        pricingPlanSname: pricingPlanSname,
                        pricingPlanSprice: pricingPlanSprice,
                        pricingPlanSpaymentInterval: pricingPlanSpaymentInterval,
                        pricingPlanSpaymentIntervalCount: pricingPlanSpaymentIntervalCount,
                        pricingPlanStrialPeriodDays: pricingPlanStrialPeriodDays,
                        pricingPlanScurrencyCode: pricingPlanScurrencyCode,
                        pricingPlanSproductReferenceCode: pricingPlanSproductReferenceCode,
                        pricingPlanSplanPaymentType: pricingPlanSplanPaymentType,
                        pricingPlanSstatus: pricingPlanSstatus,
                    })
                    ekleurunsorguschema.save()
                } else {
                    return
                }
            });

        });
    }
    urunsorgu()
    // ÜRÜN SORGULAMA //////////////////////////////////
    /////////////////////
    try {
        var userData = await user.findById(userid)
        var abonelik = await abonelikurunsorgu.find()
        res.render("abonelikcesitleri",
            {
                user: userData,
                // bilgiEksikUser: bilgiEksikUser,
                path: "abonelikcesitleri",
                lang: lang,
                sitedescription: sitedescription,
                sitetitle: sitetitle,
                langDilJson: langDilJson,
                abonelik : abonelik,
            })
    } catch (err) {
        console.log(err);
    }
});
router.get('/payment/:referencecode/:user/:lang', async (req, res) => {
    var userid = req.params.user
    var lang = req.params.lang
    var plan = req.params.referencecode
    const findpricingPlan = await abonelikurunsorgu.find().where("referenceCode").equals(plan)
    const pricingPlans = findpricingPlan[0].description
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
        res.render("payment",
            {
                user: userData,
                // bilgiEksikUser: bilgiEksikUser,
                path: "abonelikcesitleri",
                lang: lang,
                sitedescription: sitedescription,
                sitetitle: sitetitle,
                langDilJson: langDilJson,
                pricingPlans: pricingPlans,
            })
    } catch (err) {
        console.log(err);
    }
})



module.exports = router;