
const multer = require('multer'),
    userSchema = require("../schema/userSchema"),
    jwt = require("jsonwebtoken"),
    path = require("path"),
    googleTranslate = require("@google-cloud/translate"),
    uruntranslateText = require("../middleware/googleTranslate"),
    fs = require("fs"),
    urunSchema = require('../schema/urunSchema');
require("dotenv").config();



function multerUrunİmg(req, res) {
    // MULTER FİRMA KULLANICI İMG SETTİNGS //////////////////////////////////////////////////////////////////
    const storageUrunimg = multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, path.join(__dirname, '../public/assets/image/urunimg/normal'))
        },
        filename: function (req, file, cb) {
            const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9) + "." + file.originalname.split(".")[1]
            cb(null, file.fieldname + '-' + uniqueSuffix)
        }
    })
    const uploadPerimg = multer(
        {
            storage: storageUrunimg,
            limits: {
                fileSize: 1024 * 768 * 3
            },
            fileFilter: (req, file, cb) => {
                if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
                    cb(null, true);
                } else {
                    return cb(new Error('Dosya Jpeg veya PNG Olmalıdır'));
                }
            }
        }
    )
    const uploadMultiUrunİmg = uploadPerimg.array('urunimg', 3);
    // MULTER FİRMA KULLANICI İMG SETTİNGS //////////////////////////////////////////////////////////////////
    uploadMultiUrunİmg(req, res, async (err) => {
        if (err instanceof multer.MulterError) {
            var errMessage = err.message
            // return res.json({ message: errMessage })
            console.log(errMessage); // HATA KONTROLÜ İÇİN SİLME 
        } else {
            const usertokenHeader = req.headers['authorization'];
            const accessToken = usertokenHeader.split(' ')[1];
            const userverfytokenid = jwt.verify(accessToken, process.env.ACCESSTOKENSECRET)
            const userdbid = userverfytokenid.userid
            // console.log(...filename, "multerupload");
            // console.log(req.files, "multerupload");
            try {
                if(req.files){
                    filesname = req.files[0].filename
                }
                const urunBasligi = req.body.urunBasligi
                const aciklayiciMetin = req.body.aciklayiciMetin
                const enAzAlimMiktari = req.body.enAzAlimMiktari
                const parcaBasiFiyat = req.body.parcaBasiFiyat
                const urunimg = filesname
                const firma_id = userdbid
                const urunAnaKategori = req.body.anakategoriinputGroupSelect
                const biraltkategori = req.body.biraltinputGroupSelect
                const ikialtkategori = req.body.ikialtinputGroupSelect
                const satis = req.body.satis
                // console.log(urunBasligi, aciklayiciMetin, enAzAlimMiktari, parcaBasiFiyat, urunimg, firma_id, "multerupload");
                // console.log(satis, "2");
                const newurun = await urunSchema.create({
                    enAzAlimMiktari: enAzAlimMiktari,
                    parcaBasiFiyat: parcaBasiFiyat,
                    urunimg: urunimg,
                    firma_id: firma_id,
                    urunAnaKategori: urunAnaKategori,
                    biraltkategori: biraltkategori,
                    ikialtkategori: ikialtkategori,
                    satis:satis,
                })
                await newurun.save();
                const newUrunid = newurun.id

                // urunBasligi ÇEVİRİ

                uruntranslateText.urunTranslate(`${urunBasligi}`, 'en', newUrunid, "urunBasligi");
                uruntranslateText.urunTranslate(`${urunBasligi}`, 'tr', newUrunid, "urunBasligi");
                uruntranslateText.urunTranslate(`${urunBasligi}`, 'fr', newUrunid, "urunBasligi");
                uruntranslateText.urunTranslate(`${urunBasligi}`, 'ar', newUrunid, "urunBasligi");

                // urunBasligi ÇEVİRİ

                // aciklayiciMetin ÇEVİRİ

                uruntranslateText.urunTranslate(`${aciklayiciMetin}`, 'en', newUrunid, "aciklayiciMetin");
                uruntranslateText.urunTranslate(`${aciklayiciMetin}`, 'tr', newUrunid, "aciklayiciMetin");
                uruntranslateText.urunTranslate(`${aciklayiciMetin}`, 'fr', newUrunid, "aciklayiciMetin");
                uruntranslateText.urunTranslate(`${aciklayiciMetin}`, 'ar', newUrunid, "aciklayiciMetin");

                // aciklayiciMetin ÇEVİRİ
               return res.json({message: "successfull"})
            } catch (error) {
                console.log(error);
                res.json({message: "unsuccessfull"})
            }
        }
    })
}






function uploadFile(req, res) {

    const storagePerimg = multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, path.join(__dirname, '../public/assets/image/personelimg')) // ./public/assets/image/personelimg
        },
        filename: function (req, file, cb) {
            const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9) + "." + file.originalname.split(".")[1]
            cb(null, file.fieldname + '-' + uniqueSuffix)
        }
    })
    const upload = multer({
        storage: storagePerimg,
        limits: {
            fileSize: 200 * 200 * 1
        },
        fileFilter: (req, file, cb) => {
            if (file.mimetype == "image/png") { //|| file.mimetype == "image/jpg" || file.mimetype == "image/jpeg"
                cb(null, true);
            } else {
                return cb(new Error('PNG Olmalıdır'));
            }
        },
    }).array('firmayetkilisiimg', 1);

    upload(req, res, async function (err) {
        if (err instanceof multer.MulterError) {
            console.log(err);
        } else if (err) {
            res.json({ message: err })
            //console.log(err.message, "multer upload err"); // HATA KONTROLÜ İÇİN SİLME 
        } else if (!err) {
            try {
                var accessTokenHeader = req.headers['authorization']
                var accessToken = accessTokenHeader.split(' ')[1]
                var dataimgname = req.files[0].filename

                const useraccessToken = jwt.verify(accessToken, process.env.ACCESSTOKENSECRET)
                const userid = useraccessToken.userid

                const userimg = await userSchema.findById(userid)
                const userimgdelete = userimg.firmaYetkilisiImg
                const dosyayolu = process.env.SILINECEKDOSYAYOLU
                const dosya = `/public/assets/image/personelimg/${userimgdelete}`
                fs.unlink(dosyayolu + dosya, function (err) {
                    if (err) {
                        const errMessage = err.code
                        if(errMessage === 'ENOENT') {
                            return 
                        }else{
                            throw err;
                        }
                    }
                    //console.log(`${dosya} deleted.`); // KONTROL İÇİN 
                });
                await userSchema.findByIdAndUpdate({ _id: userid }, { firmaYetkilisiImg: dataimgname }, { upsert: true, new: true }, (err, doc) => {
                    if (err) {
                        console.log(err);
                    } else if (doc) {
                        // res.json({ message: "Kayıt İşleminiz Tamamlandı"})
                        res.json({ message: "Kayıt İşlemi Tamamlandı" })
                    }
                }).clone()
            } catch (err) {
                res.json({ message: "Bir Hata oluştu Tekrar Giriş Yapınız" })
                console.log(err);
            }
        }

        // Everything went fine.
    })
}
module.exports = {
    multerUrunİmg,
    uploadFile,
}

// function multerPerUpload(req, res, next) {
//     console.log(req.body, "multerUpload");
//     // MULTER FİRMA KULLANICI İMG SETTİNGS //////////////////////////////////////////////////////////////////
//     const storagePerimg = multer.diskStorage({
//         destination: function (req, file, cb) {
//             cb(null, path.join(__dirname, '../public/assets/image/personelimg'))
//         },
//         filename: function (req, file, cb) {
//             const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9) + "." + file.originalname.split(".")[1]
//             cb(null, file.fieldname + '-' + uniqueSuffix)
//         }
//     })
//     const uploadPerimg = multer(
//         {
//             storage: storagePerimg,
//             limits: {
//                 fileSize: 200 * 200 * 1
//             },
//             fileFilter: (req, file, cb) => {
//                 if (file.mimetype == "image/png" && file.mimetype == "image/jpg" && file.mimetype == "image/jpeg") {
//                     cb(null, true);
//                 } else {
//                     return cb(new Error('Dosya Jpeg veya PNG Olmalıdır'));
//                 }
//             }
//         }
//     )
//     const uploadMultiPerImage = uploadPerimg.array('firmaYetkilisiimg', 1);
//     // MULTER FİRMA KULLANICI İMG SETTİNGS //////////////////////////////////////////////////////////////////
//     uploadMultiPerImage(req, res, async (err) => {
//         if (err instanceof multer.MulterError) {
//             var errMessage = err.message
//             return res.json({ message: errMessage })
//             // console.log(errMessage); // HATA KONTROLÜ İÇİN SİLME 
//         } else {
//             console.log(req.files, "multerupload");
//             const fileoriginalname = req.files[0].originalname;
//             const filename = req.files[0].filename;
//             const accessTokenHeader = req.headers['authorization']
//             const token = accessTokenHeader.split(' ')[1]
//             const userverfytoken = jwt.verify(token, process.env.ACCESSTOKENSECRET)
//             const userverfytokenid = userverfytoken.userid
//             // try {
//             //     const schemafilter = {
//             //         _id: userverfytokenid
//             //     }
//             //     const schemaupdate = {
//             //         firmaYetkilisiImg: filename,
//             //         updatedAt: Date.now(),
//             //     }
//             //     const newdata = await userSchema.findOneAndUpdate(schemafilter, schemaupdate)
//             //     return res.json({ originalname: req.files[0].originalname })
//             // } catch (error) {
//             //     console.log(error);
//             // }
//         }
//     })
//     next()
// }