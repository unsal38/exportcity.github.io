const mongoose = require("mongoose")
const urunAnaKategoriSchema = new mongoose.Schema({
    urunAnaKategori: {
        tr: String,
        en: String,
        fr: String,
        ar: String,
    }
})

module.exports = mongoose.model("urunAnaKategori", urunAnaKategoriSchema)
