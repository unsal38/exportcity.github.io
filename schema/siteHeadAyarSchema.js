const mongoose = require("mongoose");

const siteHeadAyarSchema = new mongoose.Schema({
    description: {
        tr: {
            type: String,
            default: "yurt içi yurt dışı ticaret"
        },
        en: {
            type: String,
            default: "domestic and foreign trade"
        },
        fr: {
            type: String,
            default: "commerce intérieur et extérieur"
        },
        ar: {
            type: String,
            default: "التجارة الداخلية والخارجية"
        },
    },
    title: {
        anasayfa:{
            tr: {
                type: String,
                default: "E- Export City Anasayfa",
            },
            en: {
                type: String,
                default: "E- Export City HomePage",
            },
            fr: {
                type: String,
                default: "E- Export City Page d'accueil",
            },
            ar: {
                type: String,
                default: "ه- الصفحة الرئيسية لمدينة التصدير",
            },
        },
        kullanicipanel: {
            tr: {
                type: String,
                default: "E- Export City Kullanıcı Panel",
            },
            en: {
                type: String,
                default: "E- Export City User Panel",
            },
            fr: {
                type: String,
                default: "E- Panneau d'utilisateur de la ville d'exportation",
            },
            ar: {
                type: String,
                default: "ه- لوحة مستخدم تصدير المدينة",
            },
        },
        urunlisteleme: {
            tr: {
                type: String,
                default: "E- Export City Ürünler",
            },
            en: {
                type: String,
                default: "E- Export City Products",
            },
            fr: {
                type: String,
                default: "E- Export City Produits",
            },
            ar: {
                type: String,
                default: "ه- منتجات مدينة التصدير",
            },
        }
    },
})
module.exports = mongoose.model("siteayar", siteHeadAyarSchema)