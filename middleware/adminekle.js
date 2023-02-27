
const userSchema = require("../schema/userSchema");
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const userodemebilgisi = require("../schema/userodemebilgisiSchema");
const urunSchema = require("../schema/urunSchema");
const urunAnaKategoriSchema = require("../schema/KategoriAnaUrunSchema");
const urunBirAltKategoriSchema = require("../schema/KategoriBirAltSchema");
const urunikiAltKategoriSchema = require("../schema/KategoriikiAltSchema");
const siteHeadAyarSchema = require("../schema/siteHeadAyarSchema");





const ekleadmin = async function admin() {
    //let accessTokenSecret = crypto.randomBytes(64).toString("hex") // SONRA SİLİNECEK
    const admin = await userSchema.find({ kullaniciMail: process.env.KULLANICIMAIL })
    const pass = process.env.PASSWORD
    const saltRounds = 10;
    const myPlaintextPassword = pass;
    const salt = bcrypt.genSaltSync(saltRounds);
    const hash = bcrypt.hashSync(myPlaintextPassword, salt);
    if (admin[0] === undefined) {
        const admin = {
            kullaniciAdi: process.env.KULLANICIADI,
            kullaniciMail: process.env.KULLANICIMAIL,
            role: process.env.ROLE
        }
        const adminData = await userSchema.create({
            kullaniciAdi: process.env.KULLANICIADI,
            kullaniciMail: process.env.KULLANICIMAIL,
            password: hash,
            acitiveCode: Math.floor(Math.random() * 10000), // 0 ve 9999 arasında sayı üretir.
            mailOnay: process.env.MAIL_ONAY,
            kullaniciOnay: process.env.KULLANICI_ONAY,
            role: process.env.ROLE,
            refleshToken: jwt.sign(admin, process.env.REFLESHTOKENSECRET, { expiresIn: '365d' }),
            iletisim: process.env.ILETISIM,
            adres: process.env.ADRES,
            siteDil: process.env.SITEDIL,
            refcod: process.env.REFCOD,
            firmaAdi: process.env.FIRMA_ADI,
            firmaYetkilisiİmg: process.env.FIRMA_YETKILI_IMG,
            ulke: process.env.ULKE,
            odemeCinsi: process.env.ODEME_CINSI,
            // hesapAskiyaAl[hesapAskiyaAl]: process.env.HESAPASKIYAAL,
        })
        adminData.save()
        // const sitehead = siteHeadAyarSchema.create({})
        // sitehead.save()
    }
}
const eklepageAdmin = async function pageAdmin() {
    const pageAdmin = await userSchema.find({ kullaniciMail: process.env.PAGE_ADMIN_KULLANICIMAIL })
    const pass = process.env.PAGE_ADMIN_PASSWORD
    const saltRounds = 10;
    const myPlaintextPassword = pass;
    const salt = bcrypt.genSaltSync(saltRounds);
    const hash = bcrypt.hashSync(myPlaintextPassword, salt);
    if (pageAdmin[0] === undefined) {
        const pageAdmin = {
            kullaniciAdi: process.env.PAGE_ADMIN_KULLANICIADI,
            kullaniciMail: process.env.PAGE_ADMIN_KULLANICIMAIL,
            role: process.env.PAGE_ADMIN_ROLE
        }
        const pageAdminData = await userSchema.create({
            kullaniciAdi: process.env.PAGE_ADMIN_KULLANICIADI,
            kullaniciMail: process.env.PAGE_ADMIN_KULLANICIMAIL,
            password: hash,
            acitiveCode: Math.floor(Math.random() * 10000), // 0 ve 9999 arasında sayı üretir.
            mailOnay: process.env.PAGE_ADMIN_MAIL_ONAY,
            kullaniciOnay: process.env.PAGE_ADMIN_KULLANICI_ONAY,
            role: process.env.PAGE_ADMIN_ROLE,
            iletisim: process.env.PAGE_ADMIN_ILETISIM,
            refcod: process.env.PAGE_ADMIN_REFCOD,
            refleshToken: jwt.sign(pageAdmin, process.env.REFLESHTOKENSECRET, { expiresIn: '365d' }),
            firmaAdi: process.env.PAGE_ADMIN_FIRMA_ADI,
            firmaYetkilisiİmg: process.env.PAGE_ADMIN_FIRMA_YETKILI_IMG,
            ulke: process.env.PAGE_ADMIN_ULKE,
            odemeCinsi: process.env.PAGE_ADMIN_ODEME_CINSI
        })
        pageAdminData.save()
    }
}
const ekleuserKullanici = async function userKullanici() {
    const userKullanici = await userSchema.find({ kullaniciMail: process.env.PAGE_KULLANICIMAIL })
    const pass = process.env.PAGE_PASSWORD
    const saltRounds = 10;
    const myPlaintextPassword = pass;
    const salt = bcrypt.genSaltSync(saltRounds);
    const hash = bcrypt.hashSync(myPlaintextPassword, salt);
    if (userKullanici[0] === undefined) {
        const userKullaniciData = {
            kullaniciAdi: process.env.PAGE_KULLANICIADI,
            kullaniciMail: process.env.PAGE_KULLANICIMAIL,
            role: process.env.PAGE_ROLE
        }
        const userKullanici = await userSchema.create({
            kullaniciAdi: process.env.PAGE_KULLANICIADI,
            kullaniciMail: process.env.PAGE_KULLANICIMAIL,
            password: hash,
            acitiveCode: Math.floor(Math.random() * 10000), // 0 ve 9999 arasında sayı üretir.
            mailOnay: process.env.PAGE_MAIL_ONAY,
            kullaniciOnay: process.env.PAGE_KULLANICI_ONAY,
            role: process.env.PAGE_ROLE,
            iletisim: process.env.PAGE_ILETISIM,
            refcod: process.env.PAGE_REFCOD,
            refleshToken: jwt.sign(userKullaniciData, process.env.REFLESHTOKENSECRET, { expiresIn: '365d' }),
            firmaAdi: process.env.PAGE_FIRMA_ADI,
            firmaYetkilisiİmg: process.env.PAGE_FIRMA_YETKILI_IMG,
            ulke: process.env.PAGE_ULKE,
            odemeCinsi: process.env.PAGE_ODEME_CINSI
        })
        userKullanici.save()
    }
}
const ekleuserKullanici1 = async function userKullanici1() {
    const userKullanici = await userSchema.find({ kullaniciMail: process.env.PAGE_KULLANICIMAIL })
    const pass = process.env.PAGE_KULLANICI1PASSWORD
    const saltRounds = 10;
    const myPlaintextPassword = pass;
    const salt = bcrypt.genSaltSync(saltRounds);
    const hash = bcrypt.hashSync(myPlaintextPassword, salt);
    if (userKullanici[0] === undefined) {
        const userKullaniciData = {
            kullaniciAdi: process.env.PAGE_KULLANICI1ADI,
            kullaniciMail: process.env.PAGE_KULLANICI1MAIL,
            role: process.env.PAGE_KULLANICI1ROLE
        }
        const userKullanici1 = await userSchema.create({
            kullaniciAdi: process.env.PAGE_KULLANICI1ADI,
            kullaniciMail: process.env.PAGE_KULLANICI1MAIL,
            password: hash,
            acitiveCode: Math.floor(Math.random() * 10000), // 0 ve 9999 arasında sayı üretir.
            mailOnay: process.env.PAGE_KULLANICI1MAIL_ONAY,
            kullaniciOnay: process.env.PAGE_KULLANICI1_ONAY,
            role: process.env.PAGE_KULLANICI1ROLE,
            iletisim: process.env.PAGE_KULLANICI1ILETISIM,
            refcod: process.env.PAGE_KULLANICI1REFCOD,
            refleshToken: jwt.sign(userKullaniciData, process.env.REFLESHTOKENSECRET, { expiresIn: '365d' }),
            firmaAdi: process.env.PAGE_KULLANICI1FIRMA_ADI,
            firmaYetkilisiİmg: process.env.PAGE_KULLANICI1FIRMA_YETKILI_IMG,
            ulke: process.env.PAGE_KULLANICI1ULKE,
            odemeCinsi: process.env.PAGE_KULLANICI1ODEME_CINSI
        })
        userKullanici1.save()
    }
}

const ekleurunekle = async function urunekle() {


    // kafesciemel ÜRÜN GİRİŞİ

    // ürün 1 //TRUE
    const urunBasligi1 = {
        "tr": "ürün1 kırmızı1 ayakkabı1",
        "en": "blue shoes1",
        "fr": "chaussures bleues1",
        "ar": "حذاء أزرق 1"
    }
    const aciklayiciMetin1 = {
        "tr": "ürün1 ayakkabı",
        "en": "blue shoes",
        "fr": "chaussures bleues",
        "ar": "حذاء ازرق"
    }
    const enAzAlimMiktari1 = "12"
    const parcaBasiFiyat1 = "12"
    const urunimg1 = "urunimg-1673499775513-757358292.jpg"
    const firma_id1 = "63bf1182d46acce9aad2a986"
    const urunOnay1 = true
    const urunAnaKategori1 = "AnaKategori1"
    const biraltkategori1 = "BirAltKategori2"
    const ikialtkategori1 = "yok"
    // ürün 1
    // ürün 2 FALSE

    const urunBasligi2 = {
        "tr": "ürün2 kırmızı ayakkabı1",
        "en": "ürün2 blue shoes1",
        "fr": "chaussures bleues1",
        "ar": "حذاء أزرق 1"
    }
    const aciklayiciMetin2 = {
        "tr": "ürün2 mavi ayakkabı",
        "en": "ürün2 blue shoes",
        "fr": "chaussures bleues",
        "ar": "حذاء ازرق"
    }
    const enAzAlimMiktari2 = "12"
    const parcaBasiFiyat2 = "12"
    const urunimg2 = "urunimg-1673499775513-757358292.jpg"
    const firma_id2 = "63bf1182d46acce9aad2a986"
    const urunOnay2 = false
    const urunAnaKategori2 = "AnaKategori2"
    const biraltkategori2 = "BirAltKategori3"
    const ikialtkategori2 = "ikiAltKategori2"
    // ürün 2

    // yesno_38 ÜRÜN GİRİŞİ

    // URUN 3
    const urunBasligi3 = {
        "tr": "ürün3 kırmızı ayakkabı1",
        "en": "blue shoes1",
        "fr": "chaussures bleues1",
        "ar": "حذاء أزرق 1"
    }
    const aciklayiciMetin3 = {
        "tr": "ürün3 mavi ayakkabı",
        "en": "blue shoes",
        "fr": "chaussures bleues",
        "ar": "حذاء ازرق"
    }
    const enAzAlimMiktari3 = "12"
    const parcaBasiFiyat3 = "12"
    const urunimg3 = "urunimg-1673498391939-135199467.jpg"
    const firma_id3 = "63bf1182d46acce9aad2a984"
    const urunOnay3 = true
    const urunAnaKategori3 = "AnaKategori3"
    const biraltkategori3 = "BirAltKategori1"
    const ikialtkategori3 = "ikiAltKategori3"
    // URUN 3
    // URUN 4
    const urunBasligi4 = {
        "tr": "ürün4 kırmızı ayakkabı1",
        "en": "blue shoes1",
        "fr": "chaussures bleues1",
        "ar": "حذاء أزرق 1"
    }
    const aciklayiciMetin4 = {
        "tr": "ürün4 mavi ayakkabı",
        "en": "blue shoes",
        "fr": "chaussures bleues",
        "ar": "حذاء ازرق"
    }
    const enAzAlimMiktari4 = "12"
    const parcaBasiFiyat4 = "12"
    const urunimg4 = "urunimg-1673498391939-135199467.jpg"
    const firma_id4 = "63bf1182d46acce9aad2a984"
    const urunOnay4 = true
    const urunAnaKategori4 = "AnaKategori2"
    const biraltkategori4 = "BirAltKategori3"
    const ikialtkategori4 = "yok"
    // URUN 4
    // kafesciemel ÜRÜN GİRİŞİ

    // URUN 5

    const urunBasligi5 = {
        "tr": "ürün5 kırmızı ayakkabı1",
        "en": "blue shoes1",
        "fr": "chaussures bleues1",
        "ar": "حذاء أزرق 1"
    }
    const aciklayiciMetin5 = {
        "tr": "ürün5 mavi ayakkabı",
        "en": "blue shoes",
        "fr": "chaussures bleues",
        "ar": "حذاء ازرق"
    }
    const enAzAlimMiktari5 = "12"
    const parcaBasiFiyat5 = "12"
    const urunimg5 = "urunimg-1673498391939-135199467.jpg"
    const firma_id5 = "63bf1182d46acce9aad2a986"
    const urunOnay5 = false
    const urunAnaKategori5 = "AnaKategori1"
    const biraltkategori5 = "BirAltKategori3"
    const ikialtkategori5 = "ikiAltKategori3"
    // URUN 5
    // URUN 6
    const urunBasligi6 = {
        "tr": "ürün6 kırmızı ayakkabı1",
        "en": "blue shoes1",
        "fr": "chaussures bleues1",
        "ar": "حذاء أزرق 1"
    }
    const aciklayiciMetin6 = {
        "tr": "ürün6 mavi ayakkabı",
        "en": "blue shoes",
        "fr": "chaussures bleues",
        "ar": "حذاء ازرق"
    }
    const enAzAlimMiktari6 = "12"
    const parcaBasiFiyat6 = "12"
    const urunimg6 = "urunimg-1673498391939-135199467.jpg"
    const firma_id6 = "63bf1182d46acce9aad2a986"
    const urunOnay6 = false
    const urunAnaKategori6 = "AnaKategori1"
    const biraltkategori6 = "BirAltKategori2"
    const ikialtkategori6 = "ikiAltKategori1"
    // URUN 6


    // yesno_38 ÜRÜN GİRİŞİ

    // URUN 7
    const urunBasligi7 = {
        "tr": "ürün7 kırmızı ayakkabı1",
        "en": "blue shoes1",
        "fr": "chaussures bleues1",
        "ar": "حذاء أزرق 1"
    }
    const aciklayiciMetin7 = {
        "tr": "ürün7 mavi ayakkabı",
        "en": "blue shoes",
        "fr": "chaussures bleues",
        "ar": "حذاء ازرق"
    }
    const enAzAlimMiktari7 = "12"
    const parcaBasiFiyat7 = "12"
    const urunimg7 = "urunimg-1673498391939-135199467.jpg"
    const firma_id7 = "63bf1182d46acce9aad2a984"
    const urunOnay7 = false
    const urunAnaKategori7 = "AnaKategori1"
    const biraltkategori7 = "BirAltKategori2"
    const ikialtkategori7 = "ikiAltKategori1"
    // URUN 7
    // URUN 8
    const urunBasligi8 = {
        "tr": "ürün8 kırmızı ayakkabı1",
        "en": "blue shoes1",
        "fr": "chaussures bleues1",
        "ar": "حذاء أزرق 1"
    }
    const aciklayiciMetin8 = {
        "tr": "ürün8 mavi ayakkabı",
        "en": "blue shoes",
        "fr": "chaussures bleues",
        "ar": "حذاء ازرق"
    }
    const enAzAlimMiktari8 = "12"
    const parcaBasiFiyat8 = "12"
    const urunimg8 = "urunimg-1673498391939-135199467.jpg"
    const firma_id8 = "63bf1182d46acce9aad2a984"
    const urunOnay8 = false;
    const urunAnaKategori8 = "AnaKategori1"
    const biraltkategori8 = "BirAltKategori1"
    const ikialtkategori8 = "ikiAltKategori1"
    const urunredmessage8 = "resim uygun değildir"
    // URUN 8

    const urunData1 = await urunSchema.create({
        urunBasligi: urunBasligi1,
        aciklayiciMetin: aciklayiciMetin1,
        enAzAlimMiktari: enAzAlimMiktari1,
        parcaBasiFiyat: parcaBasiFiyat1,
        urunimg: urunimg1,
        firma_id: firma_id1,
        urunOnay: urunOnay1,
        urunAnaKategori: urunAnaKategori1,
        biraltkategori: biraltkategori1,
        ikialtkategori: ikialtkategori1,
    })
    await urunData1.save()

    const urunData2 = await urunSchema.create({
        urunBasligi: urunBasligi2,
        aciklayiciMetin: aciklayiciMetin2,
        enAzAlimMiktari: enAzAlimMiktari2,
        parcaBasiFiyat: parcaBasiFiyat2,
        urunimg: urunimg2,
        firma_id: firma_id2,
        urunOnay: urunOnay2,
        urunAnaKategori: urunAnaKategori2,
        biraltkategori: biraltkategori2,
        ikialtkategori: ikialtkategori2,
    })
    await urunData2.save()

    const urunData3 = await urunSchema.create({
        urunBasligi: urunBasligi3,
        aciklayiciMetin: aciklayiciMetin3,
        enAzAlimMiktari: enAzAlimMiktari3,
        parcaBasiFiyat: parcaBasiFiyat3,
        urunimg: urunimg3,
        firma_id: firma_id3,
        urunOnay: urunOnay3,
        urunAnaKategori: urunAnaKategori3,
        biraltkategori: biraltkategori3,
        ikialtkategori: ikialtkategori3,
    })
    await urunData3.save()

    const urunData4 = await urunSchema.create({
        urunBasligi: urunBasligi4,
        aciklayiciMetin: aciklayiciMetin4,
        enAzAlimMiktari: enAzAlimMiktari4,
        parcaBasiFiyat: parcaBasiFiyat4,
        urunimg: urunimg4,
        firma_id: firma_id4,
        urunOnay: urunOnay4,
        urunAnaKategori: urunAnaKategori4,
        biraltkategori: biraltkategori4,
        ikialtkategori: ikialtkategori4,
    })
    await urunData4.save()

    const urunData5 = await urunSchema.create({
        urunBasligi: urunBasligi5,
        aciklayiciMetin: aciklayiciMetin5,
        enAzAlimMiktari: enAzAlimMiktari5,
        parcaBasiFiyat: parcaBasiFiyat5,
        urunimg: urunimg5,
        firma_id: firma_id5,
        urunOnay: urunOnay5,
        urunAnaKategori: urunAnaKategori5,
        biraltkategori: biraltkategori5,
        ikialtkategori: ikialtkategori5,
    })
    await urunData5.save()

    const urunData6 = await urunSchema.create({
        urunBasligi: urunBasligi6,
        aciklayiciMetin: aciklayiciMetin6,
        enAzAlimMiktari: enAzAlimMiktari6,
        parcaBasiFiyat: parcaBasiFiyat6,
        urunimg: urunimg6,
        firma_id: firma_id6,
        urunOnay: urunOnay6,
        urunAnaKategori: urunAnaKategori6,
        biraltkategori: biraltkategori6,
        ikialtkategori: ikialtkategori6,

    })
    await urunData6.save()

    const urunData7 = await urunSchema.create({
        urunBasligi: urunBasligi7,
        aciklayiciMetin: aciklayiciMetin7,
        enAzAlimMiktari: enAzAlimMiktari7,
        parcaBasiFiyat: parcaBasiFiyat7,
        urunimg: urunimg7,
        firma_id: firma_id7,
        urunOnay: urunOnay7,
        urunAnaKategori: urunAnaKategori7,
        biraltkategori: biraltkategori7,
        ikialtkategori: ikialtkategori7,
    })
    await urunData7.save()

    const urunData8 = await urunSchema.create({
        urunBasligi: urunBasligi8,
        aciklayiciMetin: aciklayiciMetin8,
        enAzAlimMiktari: enAzAlimMiktari8,
        parcaBasiFiyat: parcaBasiFiyat8,
        urunimg: urunimg8,
        firma_id: firma_id8,
        urunOnay: urunOnay8,
        urunAnaKategori: urunAnaKategori8,
        biraltkategori: biraltkategori8,
        ikialtkategori: ikialtkategori8,
        urunRedMessage: urunredmessage8,
    })
    await urunData8.save()
}

const ekleodemeBilgisi = async function ekleodemebilgisi() {
    const odemebilgisi1 = await userodemebilgisi.create({
        firmaid: "63bf1182d46acce9aad2a984",
        firmaAdi: {
            type: String,
            required: true,
        },
        hesapNumarasi: {
            type: String,
            required: true,
        },
        para: {
            type: Number,
            required: true,
        },
        dovizCinsi: {
            type: String,
            required: true,
        },
        tamamlandiBilgisi: {
            type: Boolean,
            default: false,
        }, // ÖDEME İŞLEMLERİ TAMAMLANINCA TRUE
        bilgilendirmeCheck: {
            type: Boolean,
            default: false,
        },  // KULLANICIYA MESAJ ATILINCA TRUE
        sozlesmeCheck: {
            odemeSozlesme: {
                type: Boolean,
                default: false,
            },
            createdAt: {
                type: Date,
                default: () => Date.now(),
            },
            updatedAt: {
                type: Date,
                default: () => Date.now(),
            },
        },
    })
    const odemebilgisi2 = await userodemebilgisi.create({
        anaKategori: "AnaKategori1",
    })
    // odemebilgisi1.save()
    // odemebilgisi2.save()
}



const ekleAnakategori = async function kategoriler() {
    const anakategori1 = await urunAnaKategoriSchema.create({
        urunAnaKategori: {
             tr: "AnaKategori1" ,
             en: "MainCategory1",
             fr: "Catégorie principale1",
             ar: "الرئيسيةالفئة 1"
            }, // 63c9a236ebc367d69818b647
    })

    const anakategori2 = await urunAnaKategoriSchema.create({
        urunAnaKategori: {
            tr: "AnaKategori2" ,
            en: "MainCategory2",
            fr: "Catégorie principale2",
            ar: "الرئيسيةالفئة 2",
           }, // 63c9a237ebc367d69818b653
    })

    const anakategori3 = await urunAnaKategoriSchema.create({
        urunAnaKategori: {
            tr: "AnaKategori3" ,
            en: "MainCategory3",
            fr: "Catégorie principale3",
            ar: "الرئيسيةالفئة 3"
           }, // 63c9a237ebc367d69818b655
    })
    await anakategori1.save()
    await anakategori2.save()
    await anakategori3.save()
}

const anakategori1ekleBirAltKategori = async function kategoriler() {
    const biraltkategori1 = await urunBirAltKategoriSchema.create({
        urunBirAltkategori: {
            tr: "biraltkategori1-1",
            en: "a subcategory1-1",
            fr: "une sous-catégorie1-1",
            ar: "فئة فرعية1-1",
        },
        urunAnaKategori_id: "63c9a236ebc367d69818b647",
    })
    const biraltkategori2 = await urunBirAltKategoriSchema.create({
        urunBirAltkategori: {
            tr: "biraltkategori1-2",
            en: "a subcategory1-2",
            fr: "une sous-catégorie1-2",
            ar: "فئة فرعية1-2",
        },
        urunAnaKategori_id: "63c9a236ebc367d69818b647",
    })

    const biraltkategori3 = await urunBirAltKategoriSchema.create({
        urunBirAltkategori: {
            tr: "biraltkategori1-3",
            en: "a subcategory1-3",
            fr: "une sous-catégorie1-3",
            ar: "فئة فرعية1-3",
        },
        urunAnaKategori_id: "63c9a236ebc367d69818b647",
    })
    await biraltkategori1.save()
    await biraltkategori2.save()
    await biraltkategori3.save()
}
const anakategori2ekleBirAltKategori = async function kategoriler() {
    const biraltkategori4 = await urunBirAltKategoriSchema.create({
        urunBirAltkategori: {
            tr: "biraltkategori2-1",
            en: "a subcategory2-1",
            fr: "une sous-catégorie2-1",
            ar: "فئة فرعية 2-1",
        },
        urunAnaKategori_id: "63c9a237ebc367d69818b653"
    })

    const biraltkategori5 = await urunBirAltKategoriSchema.create({
        urunBirAltkategori: {
            tr: "biraltkategori2-2",
            en: "a subcategory2-2",
            fr: "une sous-catégorie2-2",
            ar: "فئة فرعية 2-2",
        },
        urunAnaKategori_id: "63c9a237ebc367d69818b653"
    })

    const biraltkategori6 = await urunBirAltKategoriSchema.create({
        urunBirAltkategori: {
            tr: "biraltkategori2-3",
            en: "a subcategory2-3",
            fr: "une sous-catégorie2-3",
            ar: "أ فئة فرعية2-3",
        },
        urunAnaKategori_id: "63c9a237ebc367d69818b653"
    })
    await biraltkategori4.save()
    await biraltkategori5.save()
    await biraltkategori6.save()
}
const anakategori3ekleBirAltKategori = async function kategoriler() {
    const biraltkategori7 = await urunBirAltKategoriSchema.create({
        urunBirAltkategori: {
            tr: "biraltkategori3-1",
            en: "a subcategory3-1",
            fr: "une sous-catégorie3-1",
            ar: "فئة فرعية 3-1",
        },
        urunAnaKategori_id: "63c9a237ebc367d69818b655"
    })

    const biraltkategori8 = await urunBirAltKategoriSchema.create({
        urunBirAltkategori: {
            tr: "biraltkategori3-2",
            en: "a subcategory3-2",
            fr: "une sous-catégorie3-2",
            ar: "أ فئة فرعية 3-2",
        },
        urunAnaKategori_id: "63c9a237ebc367d69818b655"
    })

    const biraltkategori9 = await urunBirAltKategoriSchema.create({
        urunBirAltkategori: {
            tr: "biraltkategori3-3",
            en: "a subcategory3-3",
            fr: "une sous-catégorie3-3",
            ar: "فئة فرعية 3-3",
        },
        urunAnaKategori_id: "63c9a237ebc367d69818b655"
    })
    await biraltkategori7.save()
    await biraltkategori8.save()
    await biraltkategori9.save()
}
const anakategori1ekleikiAltKategori = async function kategoriler() {
    const ikialtkategori1 = await urunikiAltKategoriSchema.create({
        urunikiAltkategori: {
            tr: "ikiAltKategori1",
            en: "two Sub-Category 1",
            fr: "deux sous-catégorie 1",
            ar: "اثنان فئة فرعية 1",
        },
        urunBirAltkategori_id: "63c9a58bf7b35ae9d7a7dc27",
        urunAnaKategori_id: "63c9a236ebc367d69818b647",
    })

    const ikialtkategori2 = await urunikiAltKategoriSchema.create({
        urunikiAltkategori: {
            tr: "ikiAltKategori2",
            en: "two Sub-Category 2",
            fr: "deux sous-catégorie 2",
            ar: "اثنان فئة فرعية 2",
        },
        urunBirAltkategori_id: "63c9a58bf7b35ae9d7a7dc26",
        urunAnaKategori_id: "63c9a236ebc367d69818b647",
    })

    const ikialtkategori3 = await urunikiAltKategoriSchema.create({
        urunikiAltkategori: {
            tr: "ikiAltKategori3",
            en: "two Sub-Category 3",
            fr: "deux sous-catégorie ",
            ar: "اثنان فئة فرعية 3",
        },
        urunBirAltkategori_id: "63c9a58bf7b35ae9d7a7dc28",
        urunAnaKategori_id: "63c9a236ebc367d69818b647",
    })
    ikialtkategori1.save()
    ikialtkategori2.save()
    ikialtkategori3.save()
}
module.exports = {
    ekleadmin,
    eklepageAdmin,
    ekleuserKullanici,
    ekleuserKullanici1,
    ekleAnakategori,
    anakategori1ekleBirAltKategori,
    anakategori2ekleBirAltKategori,
    anakategori3ekleBirAltKategori,
    anakategori1ekleikiAltKategori,
    // ekleodemeBilgisi,

    // ekleurunekle,

}



