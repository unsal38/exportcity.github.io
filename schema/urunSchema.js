const mongoose = require("mongoose")
mongoose.SchemaTypes.String.set('trim', true);
const urunSchema = new mongoose.Schema({
    urunBasligi: {
        tr: {
            type: String,
            default: "null",
        },
        en: {
            type: String,
            default: "null",
        },
        fr: {
            type: String,
            default: "null",
        },
        ar: {
            type: String,
            default: "null",
        }
    },
    aciklayiciMetin: {
        tr: {
            type: String,
            default: "null",
        },
        en: {
            type: String,
            default: "null",
        },
        fr: {
            type: String,
            default: "null",
        },
        ar: {
            type: String,
            default: "null",
        }
    },
    enAzAlimMiktari: {
        type: String,
        max: [10000, "Maxinum 10000 girilebilir"],
        required: true
    },
    parcaBasiFiyat: {
        type: String,
        max: [10000, "Maxinum 10000 girilebilir"],
        required: true
    },
    oncelik: {
        type: String,
        default: "1",
    },
    urunAnaKategori: {
        type: String,
        lowercase: true,
    },
    biraltkategori: {
        type: String,
        lowercase: true,
    },
    ikialtkategori: {
        type: String,
        lowercase: true,
    },
    satis: String, //import export hizmet
    urunimg: String,
    firma_id: String, // MONGOOSE FİLTRE YAPABİLMEK İÇİN
    oncelik: {
        type: String,
        default: "0",
    },
    oncelikfinishDate: Date,  // ÖNCELİK TANIMLANDIĞINDA SONA ERME SÜRESİ
    urunOnay: {
        type: Boolean,
        default: false,
    },
    urunRedMessage: String,
    createdAt: {
        type: Date,
        default: () => Date.now(),
    },
    updatedAt: {
        type: Date,
        default: () => Date.now(),
    },
})

urunSchema.pre("save", async function (next) {
    console.log(this);
    let date = new Date();
    date.setDate(date.getDate() + 90);
    this.oncelikfinishDate = date
    next()
})

module.exports = mongoose.model("urundata", urunSchema)