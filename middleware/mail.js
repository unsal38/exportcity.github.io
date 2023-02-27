require("dotenv").config();
const nodemailer = require("nodemailer"),
 ejs = require("ejs"),
 jwt = require("jsonwebtoken"),
 siteHeadAyarSchema = require("../schema/siteHeadAyarSchema"),
 fs = require('fs');
const userSchema = require("../schema/userSchema");


async function maildogrulama(username, email, aktivasyonKodu, subject, siteDil, fromEmail, link) {
  const user = await userSchema.findOne({kullaniciMail: email})
  // console.log(user);
  mailTokenData = {
    filterKullaniciid: user.id,
    aktivasyonKodu: aktivasyonKodu,
  }
  var token = jwt.sign(mailTokenData, process.env.REFLESHTOKENSECRET, { expiresIn: '24h' })
  var tokenLink = `http://localhost:3000/${link}/${token}`

  const siteAyarSchemaArray = await siteHeadAyarSchema.find()
  const description = siteAyarSchemaArray[0].description
  const title = siteAyarSchemaArray[0].title.anasayfa
     var dilJson = JSON.parse(fs.readFileSync("jsonSiteTranslateDil.json"))
        if (siteDil === "tr") {
            var sitedescription = description.tr
            var sitetitle = title.tr
            var langDilJson = dilJson.tr
        } else if (siteDil === "en") {
            var sitedescription = description.en
            var sitetitle = title.en
            var langDilJson = dilJson.en
        } else if (siteDil === "fr") {
            var sitedescription = description.fr
            var sitetitle = title.fr
            var langDilJson = dilJson.fr
        } else if (siteDil === "ar") {
            var sitedescription = description.ar
            var sitetitle = title.ar
            var langDilJson = dilJson.ar
        }
  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.MAIL_USERNAME,
      pass: process.env.MAIL_GMAIL_SIFRE,
    },
  });
  if(subject === "E exportcity aktivasyon Kodu" ){
    var renderfile = "mailactivecodgond"
  }else if(subject === "E exportcity mail aktivasyon işlemi"){
    var renderfile = "maildogrulama"
  }else if(subject === "E exportcity mail aktivasyon tamamlanmıştır."){
    var renderfile = "mailcevapdb"
  }
    
  ejs.renderFile(`./views/${renderfile}.ejs`, {
    aktivasyonKodu: aktivasyonKodu,
    user: username,
    refleshtoken: tokenLink,
    lang: siteDil,
    sitedescription: sitedescription,
    sitetitle: sitetitle,
    langDilJson: langDilJson,
    dilJson: dilJson,

  }, (err, data) => {
    if (err) {
      console.log(err);
    } else {
      var mailOptions = {
        from: fromEmail,
        to: email,
        subject: subject,
        html: data
      };

      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          return console.log(error);
        }
        console.log('Message sent: %s', info.messageId); // MESSAGE OLARAK GÖNDERİLMESİ DAHA DOĞRU OLUR
      });
    }
  }); 
}

async function mailsifredegistir(username, email, aktivasyonKodu, subject, siteDil, fromEmail, link, newMailgon,newPasswordgon ) {// POSTTAN GELEN MAİL VE ŞİFRE EKLENMESİ GEREKİYOR
  const user = await userSchema.findOne({kullaniciMail: email})
  // console.log(user);
  mailTokenData = {
    filterKullaniciid: user.id,
    aktivasyonKodu: aktivasyonKodu,
    newMail : newMailgon,
    newPassword: newPasswordgon,
  }
  var token = jwt.sign(mailTokenData, process.env.REFLESHTOKENSECRET, { expiresIn: '24h' })
  var tokenLink = `http://localhost:3000/${link}/${token}`

  const siteAyarSchemaArray = await siteHeadAyarSchema.find()
  const description = siteAyarSchemaArray[0].description
  const title = siteAyarSchemaArray[0].title.anasayfa
     var dilJson = JSON.parse(fs.readFileSync("jsonSiteTranslateDil.json"))
        if (siteDil === "tr") {
            var sitedescription = description.tr
            var sitetitle = title.tr
            var langDilJson = dilJson.tr
        } else if (siteDil === "en") {
            var sitedescription = description.en
            var sitetitle = title.en
            var langDilJson = dilJson.en
        } else if (siteDil === "fr") {
            var sitedescription = description.fr
            var sitetitle = title.fr
            var langDilJson = dilJson.fr
        } else if (siteDil === "ar") {
            var sitedescription = description.ar
            var sitetitle = title.ar
            var langDilJson = dilJson.ar
        }
  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.MAIL_USERNAME,
      pass: process.env.MAIL_GMAIL_SIFRE,
    },
  });
  if(subject === "E exportcity aktivasyon Kodu" ){
    var renderfile = "mailactivecodgond"
  }else if(subject === "E exportcity mail aktivasyon işlemi"){
    var renderfile = "maildogrulama"
  }else if(subject === "E exportcity mail aktivasyon tamamlanmıştır."){
    var renderfile = "mailcevapdb"
  }
    
  ejs.renderFile(`./views/${renderfile}.ejs`, {
    aktivasyonKodu: aktivasyonKodu,
    user: username,
    refleshtoken: tokenLink,
    lang: siteDil,
    sitedescription: sitedescription,
    sitetitle: sitetitle,
    langDilJson: langDilJson,
    dilJson: dilJson,

  }, (err, data) => {
    if (err) {
      console.log(err);
    } else {
      var mailOptions = {
        from: fromEmail,
        to: email,
        subject: subject,
        html: data
      };

      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          return console.log(error);
        }
        console.log('Message sent: %s', info.messageId); // MESSAGE OLARAK GÖNDERİLMESİ DAHA DOĞRU OLUR
      });
    }
  }); 
}
module.exports = {
  maildogrulama,
  mailsifredegistir,
}



