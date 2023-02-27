const mongoose = require("mongoose")

const urunikiAltKategoriSchema = new mongoose.Schema({
    urunikiAltkategori: {
        tr: String,
        en: String,
        fr: String,
        ar: String,
    },
    urunBirAltkategori_id: String,
    urunAnaKategori_id: String,
})
module.exports = mongoose.model("urunikiAltkategori", urunikiAltKategoriSchema)