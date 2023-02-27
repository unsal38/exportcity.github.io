const express = require("express");
const mongoose = require("mongoose");
const siteHeadAyarSchema = require("./schema/siteHeadAyarSchema");
// const router = express.Router();
const fs = require("fs");
const urunSchema = require("./schema/urunSchema");
// const userSchema = require("./schema/userSchema");
//const crypto = require("crypto") // ADMİN USER OLUŞTURMAKTA KULLANDIM


const axios = require('axios').default;
const cheerio = require('cheerio');
const http2 = require("http2")
const https = require("https")
const http = require('http');


require('dotenv').config();


const bodyParser = require('body-parser')
const path = require("path")
const app = express();

//APP CONFİG
app.use("/", express.static(path.join(__dirname, "public")))
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
mongoose.set('strictQuery', true);



mongoose.connect(`mongodb+srv://${process.env.MONGOOSE_KULLANICI_ADI_SIFRE}@cluster0.uefzn.mongodb.net/${process.env.MONGOOSE_DATABASE}?retryWrites=true&w=majority`,
    () => {
        console.log("mongo connect");
    },
    e => {
        console.error(e);
    }, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
})




// ROUTERS


const firmaRoutes = require("./routes/firmabilgiRoutes");
const adminEkle = require("./middleware/adminekle");
const registerRoutes = require("./routes/registerRoutes");
const loginRoutes = require("./routes/loginRoutes");
const authController = require("./routes/authController");
const userRoutes = require("./routes/userRoutes");
const panelRoutes = require("./routes/panelRoutes");
const urunlisteleRoutes = require("./routes/urunlisteleRoutes");
const usereksikbilgiRoutes = require("./routes/usereksikbilgiRoutes");
const useronaybekleyenRoutes = require("./routes/useronaybekleyenRoutes");
const urunonaybekleyenRoutes = require("./routes/urunonaybekleyenRoutes");
const useryetkilendirmeRoutes = require("./routes/useryetkilendirmeRoutes");
const kategoriRoutes = require("./routes/kategoriRoutes");
const iyzipay = require("./routes/iyzicoRoutes");
const abonelikler = require("./routes/aboneliklerRoutes");
// const authJWT = require("./middleware/auth"); // EN SON KOMPLE SİL
// const eksikbilgimailgon = require("./middleware/eksikbilgimailgon")


// adminEkle.ekleurunekle()
// adminEkle.ekleAnakategori()
// adminEkle.anakategori1ekleBirAltKategori()
// adminEkle.anakategori2ekleBirAltKategori()
// adminEkle.anakategori3ekleBirAltKategori()
// adminEkle.anakategori1ekleikiAltKategori()

adminEkle.ekleadmin()
adminEkle.eklepageAdmin()
adminEkle.ekleuserKullanici()
adminEkle.ekleuserKullanici1()





// ROUTER USE
app.use("/abonelikler", abonelikler)
app.use("/payment", iyzipay)
app.use("/kategori", kategoriRoutes)
app.use("/useryetkilendirme", useryetkilendirmeRoutes)
app.use("/urunonaybekleyen", urunonaybekleyenRoutes)
app.use("/useronaybekleyen", useronaybekleyenRoutes)
app.use("/urunlistele", urunlisteleRoutes)
app.use("/firmabilgi", firmaRoutes)
app.use("/login", loginRoutes)
app.use("/authcontroller", authController)
app.use("/usereksikbilgi", usereksikbilgiRoutes)
app.use(registerRoutes)
app.get("/user/*", userRoutes)
app.get("/panelSozlesmeler/*", panelRoutes)
app.get("/panelRedUrunler/*", panelRoutes)
app.get("/mailonayactive/*", panelRoutes)
app.get("/panelDashboard/*", panelRoutes)
app.get("/panelProfilBilgileri/*", panelRoutes)
app.post("/panelProfilBilgileri/*", panelRoutes)
app.get("/panelMailSifreDuzenle/*", panelRoutes)
app.post("/panelMailSifreDuzenle/*", panelRoutes)
app.get("/sifreduzenle/*", panelRoutes)
app.get("/mailduzenle/*", panelRoutes)
app.get("/panelurunekle/*", panelRoutes)
app.post("/panelurunekle/*", panelRoutes)
app.get("/panelOnayBekleyenUrun/*", panelRoutes)



app.get("/:lang", async (req, res) => {
    const siteAyarSchemaArray = await siteHeadAyarSchema.find()
    const description = siteAyarSchemaArray[0].description
    const title = siteAyarSchemaArray[0].title.anasayfa
    var dilJson = JSON.parse(fs.readFileSync("jsonSiteTranslateDil.json"))
    // if (lang === "favicon.ico") {
    //     lang = tr
    // } else {
    //     return
    // }
    var lang = req.params.lang
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
    }else {
        var sitedescription = description.tr
        var sitetitle = title.tr
        var langDilJson = dilJson.tr
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
    } catch (error) {
        console.log(error);
        res.redirect("/")
    }
    ///KONTROL İÇİN SONRA SİLİNECEK //////////////////////////////////

    // const arrayUrun = new Array(urunDbListele)
    // // console.log(arrayUrun);
    // arrayUrun.forEach((v, i) => {
    //     // console.log(v.urunBasligi.tr);
    //     console.log(v);
    // });

    ///KONTROL İÇİN SONRA SİLİNECEK //////////////////////////////////
    res.render("home", {
        user: null,
        lang: lang,
        sitedescription: sitedescription,
        sitetitle: sitetitle,
        langDilJson: langDilJson,
        hizmetUrunDb: urunDbHizmetlistele,
        importUrunDb: urunDbimportlistele,
        exportUrunDb: urunDbexportlistele,
    })

})

app.get("/", async (req, res) => {
    const siteAyarSchemaArray = await siteHeadAyarSchema.find()
    const description = siteAyarSchemaArray[0].description
    const title = siteAyarSchemaArray[0].title.anasayfa
    var dilJson = JSON.parse(fs.readFileSync("jsonSiteTranslateDil.json"))

    // HİZMET OLAN ÜRÜNLER İÇİN FİLTRE

    let urunDbHizmetFilter = {
        urunOnay: true,
        satis: "hizmet",
    }//.where("satis").equals("hizmet")
    let urunDbHizmetlistele = await urunSchema.find(urunDbHizmetFilter)
        .limit(10)
        .sort({ oncelik: -1, createdAt: -1 })

    // HİZMET OLAN ÜRÜNLER İÇİN FİLTRE

    // İMPORT OLAN ÜRÜNLER İÇİN FİLTRE

    let urunDbimportFilter = {
        urunOnay: true,
        satis: "import",
    }//.where("satis").equals("import")
    let urunDbimportlistele = await urunSchema.find(urunDbimportFilter)
        .limit(10)
        .sort({ oncelik: -1, createdAt: -1 })

    // İMPORT OLAN ÜRÜNLER İÇİN FİLTRE

    // EXPORT OLAN ÜRÜNLER İÇİN FİLTRE

    let urunDbexportFilter = {
        urunOnay: true,
        satis: "export",
    }//.where("satis").equals("import")
    let urunDbexportlistele = await urunSchema.find(urunDbexportFilter)
        .limit(10)
        .sort({ oncelik: -1, createdAt: -1 })

    // EXPORT OLAN ÜRÜNLER İÇİN FİLTRE

    res.render("home", {
        user: null,
        lang: "tr",
        sitedescription: description.tr,
        sitetitle: title.tr,
        langDilJson: dilJson.tr,
        hizmetUrunDb: urunDbHizmetlistele,
        importUrunDb: urunDbimportlistele,
        exportUrunDb: urunDbexportlistele,
    })
})




async function doviz() {
    const baseurl = "https://evds2.tcmb.gov.tr/service/evds/series="
    const dolarkuralis = "TP.DK.USD.A"
    const eurokuralis = "TP.DK.EUR.A"// birden fazla ise "-" konularak ayrılıyor
    const startDate = "10-02-2023"
    const endDate = "10-02-2023"
    const type = "&type=json"
    const key = "&key=MOyTma2Ke2"
    /////URL KALIP //////////////////////////////////

    // https://evds2.tcmb.gov.tr/service/evds/series=
    // TP.DK.USD.A-TP.DK.EUR.A-TP.DK.CHF.A-TP.DK.GBP.A-TP.DK.JPY.A
    // &startDate=01-10-2017
    // &endDate=01-11-2017
    // &type=xml
    // &key= XXXXXXX


    /////URL KALIP //////////////////////////////////
    const sorguUrl = `${baseurl}${dolarkuralis}&startDate=${startDate}&endDate=${endDate}${type}${key}`
    // console.log(sorguUrl);
    const url = 'https://www.tcmb.gov.tr/kurlar/today.xml';




    // try {
    //     const response = await axios.get(
    //         "https://www.tcmb.gov.tr/kurlar/today.xml"
    //     )
    //     const $ = cheerio.load(response);

    //     // $('h2.title').text('Hello there!');
    //     // $('h2').addClass('welcome');

    //     $.html();
    // } catch (error) {
    //     console.error(error)
    // }






    // axios({
    //     method: 'get',
    //     url: deneme,
    //     responseType: 'stream',
    //     headers: {
    //         // "Access-Control-Allow-Origin: ": "*",
    //         // "Access-Control-Allow-Methods: ": "GET",
    //         // "Access-Control-Allow-Headers: ": "Authorization",
    //     },
    //   })
    //     .then(function (response) {
    //         const dom = new JSDOM(response);
    //         console.log(dom.window.document);
    //     })
    // .catch(function (error) {
    //     if (error.response) {
    //       // The request was made and the server responded with a status code
    //       // that falls out of the range of 2xx
    //       console.log(error.response.data);
    //       console.log(error.response.status);
    //       console.log(error.response.headers);
    //     } else if (error.request) {
    //       // The request was made but no response was received
    //       // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
    //       // http.ClientRequest in node.js
    //       console.log(error.request);
    //     } else {
    //       // Something happened in setting up the request that triggered an Error
    //       console.log('Error', error.message);
    //     }
    //     console.log(error.config);
    // });
}

doviz() // SONRA SİLİNECEK 






// LİSTEN


const server = app.listen(process.env.PORT, (err) => {
    if (err) {
        console.log(err);
    }
    console.log("app started port number: %d", server.address().port);
});


