const mongoose = require("mongoose")
const urunBirAltKategoriSchema = new mongoose.Schema({
    urunBirAltkategori: {
        tr: String,
        en: String,
        fr: String,
        ar: String,
    },
    urunAnaKategori_id: String,
})
module.exports = mongoose.model("urunBirAltkategori", urunBirAltKategoriSchema)