const mongoose = require("mongoose")


const odemeBilgisiData = new mongoose.Schema({
    firmaid : String,
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

module.exports = mongoose.model("userodemebilgisiSchema", odemeBilgisiData)

 // odemebilgisi: [
    //     {
    //         firmaAdi: {
    //             type: String,
    //             required: true,
    //         },
    //         hesapNumarasi: {
    //             type: String,
    //             required: true,
    //         },
    //         para: {
    //             type: Number,
    //             required: true,
    //         },
    //         dovizCinsi: {
    //             type: String,
    //             required: true,
    //         },
    //         tamamlandiBilgisi: {
    //             type: Boolean,
    //             default: false,
    //         }, // ÖDEME İŞLEMLERİ TAMAMLANINCA TRUE
    //         bilgilendirmeCheck: {
    //             type: Boolean,
    //             default: false,
    //         },
    //         sozlesme1: {
    //             type: Boolean,
    //             default: false,
    //             createdAt: {
    //                 type: Date,
    //                 default: () => Date.now(),
    //             },
    //             updatedAt: {
    //                 type: Date,
    //                 default: () => Date.now(),
    //             },
    //         },
    //     }
    // ],