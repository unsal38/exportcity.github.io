const mongoose = require("mongoose"),
express = require("express"),
userSchema = require("../schema/userSchema");

var validateEmail = function (email) {
    var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email)
};


const userShema = new mongoose.Schema({
    kullaniciAdi: {
        type: String,
        trim: true,
        uppercase: true,
        minLength: [4, 'Kullanıcı Adını Minimum 4 karakter Giriniz'],
        maxLength: [20, 'Kullanıcı Adını Maksimum 20 karakter Giriniz'],
        required: [true, 'Kullanıcı Adını Kullanıcı İsmini Giriniz']

    },
    kullaniciMail: {
        type: String,
        lowercase: true,
        minLength: [8, 'Mail Hatalı'],
        maxLength: [50, 'Mail Hatalı'],
        required: [true, 'Lütfen Mail Adresinizi Giriniz'],
        unique: [true, 'Mail adresi daha önce kaydedilmiştir.'],
        validate: [validateEmail, 'Hatalı mail kontrol ediniz'],
        // match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Hatalı mail kontrol ediniz']
    },
    password: {
        type: String,
        required: [true, 'Şifre Giriniz'],
        minLength: [8, "Minimum 8 Karakter Giriniz"]
    },
    acitiveCode: {
        type: Number,
        default: Math.floor(Math.random() * 10000)
    },
    createdAt: {
        type: Date,
        default: () => Date.now(),
    },// default
    updatedAt: {
        type: Date,
        default: () => Date.now(),
    },// default
    mailOnay: {
        type: Boolean,
        default: false,
        // max:  // BELLİ SÜREDE MAİL ONAYINI YAPMASI GEREKİYOR
    },
    kullaniciOnay: {
        type: Boolean,
        default: false,
    }, // ÜRÜNLERİN BİLGİLERİNİN GÖRÜNÜR OLMASI İÇİN TRUE GEREK
    role: {
        type: String,
        default: 'user',
    },// admin - pageadmin -user - askıda (eklenecek)
    refleshToken: String,
    iletisim: {
        type: [Number, "sayılar arasında boşluk bırakmayınız"],
        trim: true,
        minLength: [4, "minimum 2 karakter giriniz"],
        maxLength: [10, "maximum 10 karakter giriniz"],
    },
    adres: {
        type: String,
        maxLength: [180, "maximum 180 karakter giriniz"]
    },
    siteDil: String, // DİL BÖLÜMÜ Panel dilini belirleyecek
    refcod: String,
    firmaAdi: {
        type: String,
        maxLength: [180, "maximum 180 karakter giriniz"]
    },
    firmaYetkilisiImg: String,
    ulke: String,
    odemeCinsi: String, // ÖDEME SEÇENEĞİ BÖLÜMÜ
    hesapAskiyaAl: {
        askida: {
            type: Boolean,
            default: false,
        },
        date: {
            type: Date,
            default: Date.now(),
        }
    },
    urunmiktari: {
        type: String,
        default: "5",
    } // SİSTEME YÜKLEYEBİLECEĞİ ÜRÜN MİKTARI
   
})



userShema.pre('findOneAndUpdate', function (next) {
    this.updatedAt = ()=> Date.now();
    next()
})

userShema.pre('findOneAndUpdate', function (next) {
    const userid = this._conditions._id
    this.update({_id: userid},{acitiveCode: Math.floor(Math.random() * 10000)})
    
    next()
})
module.exports = mongoose.model("user", userShema)


