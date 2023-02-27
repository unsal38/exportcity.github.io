const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const user = require("../schema/userSchema");
const siteHeadAyarSchema = require("../schema/siteHeadAyarSchema");
const fs = require('fs');
const urunSchema = require("../schema/urunSchema");
const KategoriAnaUrunSchema = require("../schema/KategoriAnaUrunSchema");
const KategoriBirAltSchema = require("../schema/KategoriBirAltSchema");
const KategoriikiAltSchema = require("../schema/KategoriikiAltSchema");
router.use(express.json())

require('dotenv').config();

router.post("/:islem", async (req, res) => {
    var islem = req.params.islem;
    if (islem === "add") {
        try {
            const token = req.headers['authorization']
            const accessToken = token.split(' ')[1]
            const accesstokenData = jwt.verify(accessToken, process.env.ACCESSTOKENSECRET)
            let userid = accesstokenData.userid
            let userData = await user.findById(userid)
            let roleCheck = userData.role
            if (roleCheck === "admin" || roleCheck === "pageadmin") {
                let eklekategoriDataTr = req.body.inputDataTr
                let eklekategoriDataEn = req.body.inputDataEn
                let eklekategoriDataFr = req.body.inputDataFr
                let eklekategoriDataAr = req.body.inputDataAr
                let eklekategoriName = req.body.kategoriName
                let anakategoriid = req.body.anakategoriid
                let biraltkategoriid = req.body.biraltkategoriid
                if (eklekategoriName === "anakategori") {
                    const checkKategoriTr = (await KategoriAnaUrunSchema.find().where("urunAnaKategori.tr").equals(eklekategoriDataTr)).length
                    const checkKategoriEn = (await KategoriAnaUrunSchema.find().where("urunAnaKategori.en").equals(eklekategoriDataEn)).length
                    const checkKategoriFr = (await KategoriAnaUrunSchema.find().where("urunAnaKategori.fr").equals(eklekategoriDataFr)).length
                    const checkKategoriAr = (await KategoriAnaUrunSchema.find().where("urunAnaKategori.ar").equals(eklekategoriDataAr)).length
                    if (checkKategoriTr > 0) {
                        res.json({ message: "Türkçe kategori ekli" })
                    } else if (checkKategoriEn > 0) {
                        res.json({ message: "İngilizce kategori ekli" })
                    } else if (checkKategoriFr > 0) {
                        res.json({ message: "Fransızca kategori ekli" })
                    } else if (checkKategoriAr > 0) {
                        res.json({ message: "Arapça kategori ekli" })
                    } else if (checkKategoriTr === 0) {
                        const ekleanakategori = await KategoriAnaUrunSchema.create({
                            urunAnaKategori: {
                                tr: eklekategoriDataTr,
                                en: eklekategoriDataEn,
                                fr: eklekategoriDataFr,
                                ar: eklekategoriDataAr,
                            },
                        })
                        await ekleanakategori.save().then(
                            res.json({ message: "Kategori kaydedilmiştir" })
                        )

                    } else {
                        res.json({ message: "unsuccessfull" });
                    }
                } else if (eklekategoriName === "biraltkategori") {
                    const checkKategoriTr = (await KategoriBirAltSchema.find().where("urunBirAltkategori.tr").equals(eklekategoriDataTr)).length
                    const checkKategoriEn = (await KategoriBirAltSchema.find().where("urunBirAltkategori.en").equals(eklekategoriDataEn)).length
                    const checkKategoriFr = (await KategoriBirAltSchema.find().where("urunBirAltkategori.fr").equals(eklekategoriDataFr)).length
                    const checkKategoriAr = (await KategoriBirAltSchema.find().where("urunBirAltkategori.ar").equals(eklekategoriDataAr)).length
                    if (checkKategoriTr > 0) {
                        res.json({ message: "Türkçe kategori ekli" })
                    } else if (checkKategoriEn > 0) {
                        res.json({ message: "İngilizce kategori ekli" })
                    } else if (checkKategoriFr > 0) {
                        res.json({ message: "Fransızca kategori ekli" })
                    } else if (checkKategoriAr > 0) {
                        res.json({ message: "Arapça kategori ekli" })
                    } else if (anakategoriid === "null") {
                        res.json({ message: "Ana Kategori Seçiniz" })
                    } else if (checkKategoriTr === 0) {
                        const ekleanakategori = await KategoriBirAltSchema.create({
                            urunBirAltkategori: {
                                tr: eklekategoriDataTr,
                                en: eklekategoriDataEn,
                                fr: eklekategoriDataFr,
                                ar: eklekategoriDataAr,
                            },
                            urunAnaKategori_id: anakategoriid,
                        })
                        await ekleanakategori.save().then(
                            res.json({ message: "Kategori kaydedilmiştir" })
                        )
                    } else {
                        res.json({ message: "unsuccessfull" });
                    }
                } else if (eklekategoriName === "ikialtkategori") {
                    const checkKategoriTr = (await KategoriikiAltSchema.find().where("urunikiAltkategori.tr").equals(eklekategoriDataTr)).length
                    const checkKategoriEn = (await KategoriikiAltSchema.find().where("urunikiAltkategori.en").equals(eklekategoriDataEn)).length
                    const checkKategoriFr = (await KategoriikiAltSchema.find().where("urunikiAltkategori.fr").equals(eklekategoriDataFr)).length
                    const checkKategoriAr = (await KategoriikiAltSchema.find().where("urunikiAltkategori.ar").equals(eklekategoriDataAr)).length
                    const biraltkategoriidTrim = biraltkategoriid.trim()
                    const anakategoriData = await KategoriBirAltSchema.findById(biraltkategoriidTrim)
                    if (checkKategoriTr > 0) {
                        res.json({ message: "Türkçe kategori ekli" })
                    } else if (checkKategoriEn > 0) {
                        res.json({ message: "İngilizce kategori ekli" })
                    } else if (checkKategoriFr > 0) {
                        res.json({ message: "Fransızca kategori ekli" })
                    } else if (checkKategoriAr > 0) {
                        res.json({ message: "Arapça kategori ekli" })
                    } else if (biraltkategoriid === "null") {
                        res.json({ message: "Bir Alt Kategori Seçiniz" })
                    } else if (checkKategoriTr === 0) {
                        console.log(anakategoriData.urunAnaKategori_id);
                        const ekleanakategori = await KategoriikiAltSchema.create({
                            urunikiAltkategori: {
                                tr: eklekategoriDataTr,
                                en: eklekategoriDataEn,
                                fr: eklekategoriDataFr,
                                ar: eklekategoriDataAr,
                            },
                            urunBirAltkategori_id: biraltkategoriid,
                            urunAnaKategori_id: anakategoriData.urunAnaKategori_id,
                        })
                        await ekleanakategori.save().then(
                            res.json({ message: "Kategori kaydedilmiştir" })
                        )
                    } else {
                        res.json({ message: "unsuccessfull" });
                    }
                }
            }
        } catch (err) {
            console.log(err);
            res.json({ message: "unsuccessfull" });
        }

    } else if (islem === "delete") {
        try {
            const token = req.headers['authorization']
            const accessToken = token.split(' ')[1]
            const accesstokenData = jwt.verify(accessToken, process.env.ACCESSTOKENSECRET)
            let userid = accesstokenData.userid
            let userData = await user.findById(userid)
            let roleCheck = userData.role
            if (roleCheck === "admin" || roleCheck === "pageadmin") {
                const kategoriid = req.body.kategoriid
                const kategoriidTrim = kategoriid.trim()
                const anakategori = await KategoriAnaUrunSchema.findById(kategoriidTrim)
                const biraltkategori = await KategoriBirAltSchema.findById(kategoriidTrim)
                const ikialtkategori = await KategoriikiAltSchema.findById(kategoriidTrim)
                if (anakategori !== null) {
                    const checkkategoriurun = (await urunSchema.find().where("urunAnaKategori").equals(anakategori.urunAnaKategori.tr)).length
                    if (checkkategoriurun > 0) {
                        res.json({ message: "Kategoriye Bağlı Ürün olduğundan silinememektedir..." })
                    } else if (checkkategoriurun === 0) {
                        const checkbiraltkategori = (await KategoriBirAltSchema.find().where("urunAnaKategori_id").equals(kategoriidTrim)).length
                        if (checkbiraltkategori > 0) {
                            res.json({ message: "Ürüne Bağlı Bir Alt Kategori Vardır..." })
                        } else if (checkbiraltkategori === 0) {
                            res.json({ message: `${kategoriidTrim} id kategori silinmiştir.` })
                            await KategoriAnaUrunSchema.findByIdAndDelete({ _id: kategoriidTrim }) // silinme işlemi 
                        }
                    }
                } else if (biraltkategori !== null) {
                    const checkkategoriurun = (await urunSchema.find().where("biraltkategori").equals(biraltkategori.urunBirAltkategori.tr)).length
                    if (checkkategoriurun > 0) {
                        res.json({ message: "Kategoriye Bağlı Ürün olduğundan silinememektedir..." })
                    } else if (checkkategoriurun === 0) {
                        const checkikialtkategori = (await urunikiAltKategoriSchema.find().where("urunBirAltkategori_id").equals(kategoriidTrim)).length
                        if (checkikialtkategori > 0) {
                            res.json({ message: "Ürüne Bağlı Bir Alt Kategori Vardır..." })
                        } else if (checkikialtkategori === 0) {
                            res.json({ message: `${kategoriidTrim} id kategori silinmiştir.` })
                            await KategoriBirAltSchema.findByIdAndDelete({ _id: kategoriidTrim }) // silinme işlemi 
                        }
                    }
                } else if (ikialtkategori !== null) {
                    const checkkategoriurun = (await urunSchema.find().where("ikialtkategori").equals(ikialtkategori.urunikiAltkategori.tr)).length
                    if (checkkategoriurun > 0) {
                        res.json({ message: "Kategoriye Bağlı Ürün olduğundan silinememektedir..." })
                    } else if (checkkategoriurun === 0) {
                        res.json({ message: `${kategoriidTrim} id kategori silinmiştir.` })
                        await KategoriAnaUrunSchema.findByIdAndDelete({ _id: kategoriidTrim }) // silinme işlemi 
                    }
                } else {
                    res.json({ message: "Sayfayı Yenileyiniz" })
                }
            }
        } catch (err) {
            console.log(err);
            res.json({ message: "unsuccessfull" });
        }
    } else if (islem === "change") {
        const token = req.headers['authorization']
        const accessToken = token.split(' ')[1]
        const accesstokenData = jwt.verify(accessToken, process.env.ACCESSTOKENSECRET)
        let userid = accesstokenData.userid
        let userData = await user.findById(userid)
        let roleCheck = userData.role
        if (roleCheck === "admin" || roleCheck === "pageadmin") {
            try {
                const kategoriid = req.body.kategoriid
                const kategoriidTrim = kategoriid.trim()
                const anakategori = await KategoriAnaUrunSchema.findById(kategoriidTrim)
                const biraltkategori = await KategoriBirAltSchema.findById(kategoriidTrim)
                const ikialtkategori = await KategoriikiAltSchema.findById(kategoriidTrim)
                var eklekategoriDataTr = req.body.inputDataTr
                let eklekategoriDataEn = req.body.inputDataEn
                let eklekategoriDataFr = req.body.inputDataFr
                let eklekategoriDataAr = req.body.inputDataAr
                if(anakategori !== null){
                    console.log(eklekategoriDataTr);
                    // await anakategori.updateOne
                }else if(biraltkategori !== null){
                    console.log(eklekategoriDataTr);
                    console.log(biraltkategori);
                }else if(ikialtkategori !== null){
                    console.log(eklekategoriDataTr);
                    console.log(ikialtkategori);
                }
                
            } catch (err) {
                console.log(err);
                res.json({ message: "unsuccessfull" });
            }
        }

    } else if (islem === "null") {
        return
    } else {
        res.json({ message: "unsuccessfull" });
    }
})


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
        // var bilgiEksikUser = await user.find({
        //     adres: {
        //         $exists: false
        //     }
        // })
        var AnakategoriData = await KategoriAnaUrunSchema.find()
        var BirAltKategori = await KategoriBirAltSchema.find().sort({ urunAnaKategori_id: -1 })
        var ikiAltKategori = await KategoriikiAltSchema.find().sort({ urunBirAltkategori_id: -1 })

        res.render("kategori",
            {
                user: userData,
                // bilgiEksikUser: bilgiEksikUser,
                path: "kategori",
                lang: lang,
                sitedescription: sitedescription,
                sitetitle: sitetitle,
                langDilJson: langDilJson,
                anakategori: AnakategoriData,
                biraltkategori: BirAltKategori,
                ikialtkategori: ikiAltKategori,
            })
    } catch (error) {

    }

})

module.exports = router;

