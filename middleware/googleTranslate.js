

const { Translate } = require('@google-cloud/translate').v2,
    userSchema = require("../schema/userSchema"),
    urunSchema = require('../schema/urunSchema'),
    ls = require("local-storage"),
    jwt = require("jsonwebtoken");
require('dotenv').config();

function urunTranslate(metin, dil, id, dbkayit) {
    // Your credentials
    const CREDENTIALS = JSON.parse(process.env.CREDENTIALS)

    // Configuration for the client
    const translate = new Translate({
        credentials: CREDENTIALS,
        projectId: CREDENTIALS.project_id
    });

    const detectLanguage = async (text) => {
        try {
            let response = await translate.detect(text);
            return response[0].language;
        } catch (error) {
            console.log(`Error at detectLanguage --> ${error}`);
            return 0;
        }
    }
    // Dil hangi dil olduğunu öğrenmek için 
    // detectLanguage("C'est lundi aujourd'hui")
    //     .then((res) => {
    //         console.log(res);
    //     })
    //     .catch((err) => {
    //         console.log(err);
    //     });

    const translateText = async (text, targetLanguage) => {
        try {
            let [response] = await translate.translate(text, targetLanguage);
            return response;
        } catch (error) {
            console.log(`Error at translateText --> ${error}`);
            return 0;
        }
    };
    translateText(metin, dil, id, dbkayit)
        .then(async (res) => {
            // console.log(res); // kontrol için sonra silinebilir
            // console.log(metin); // kontrol için sonra silinebilir

            if (dbkayit === "urunBasligi") {
                try {
                    if (dil === "en") {
                        const newenuruntext = await urunSchema.updateOne(
                            {
                                _id: id,
                            },
                            {
                                $set: {
                                    "urunBasligi.en": res
                                }
                            },
                            { new: true, upsert: true }
                        )
                        console.log(newenuruntext);
                    } else if (dil === "tr") {
                        const newenuruntext = await urunSchema.updateOne(
                            {
                                _id: id,
                            },
                            {
                                $set: {
                                    "urunBasligi.tr": res
                                }
                            },
                            { new: true, upsert: true }
                        )
                        console.log(newenuruntext);
                    } else if (dil === "fr") {
                        const newenuruntext = await urunSchema.updateOne(
                            {
                                _id: id,
                            },
                            {
                                $set: {
                                    "urunBasligi.fr": res
                                }
                            },
                            { new: true, upsert: true }
                        )
                        console.log(newenuruntext);
                    } else if (dil === "ar") {
                        const newenuruntext = await urunSchema.updateOne(
                            {
                                _id: id,
                            },
                            {
                                $set: {
                                    "urunBasligi.ar": res
                                }
                            },
                            { new: true, upsert: true }
                        )
                        console.log(newenuruntext);
                    }
                } catch (error) { console.log(error) }
            }
            if (dbkayit === "aciklayiciMetin") {
                try {
                    if (dil === "en") {
                        const newenuruntext = await urunSchema.updateOne(
                            {
                                _id: id,
                            },
                            {
                                $set: {
                                    "aciklayiciMetin.en": res
                                }
                            },
                            { new: true, upsert: true }
                        )
                        console.log(newenuruntext);
                    } else if (dil === "tr") {
                        const newenuruntext = await urunSchema.updateOne(
                            {
                                _id: id,
                            },
                            {
                                $set: {
                                    "aciklayiciMetin.tr": res
                                }
                            },
                            { new: true, upsert: true }
                        )
                        console.log(newenuruntext);
                    } else if (dil === "fr") {
                        const newenuruntext = await urunSchema.updateOne(
                            {
                                _id: id,
                            },
                            {
                                $set: {
                                    "aciklayiciMetin.fr": res
                                }
                            },
                            { new: true, upsert: true }
                        )
                        console.log(newenuruntext);
                    } else if (dil === "ar") {
                        const newenuruntext = await urunSchema.updateOne(
                            {
                                _id: id,
                            },
                            {
                                $set: {
                                    "aciklayiciMetin.ar": res
                                }
                            },
                            { new: true, upsert: true }
                        )
                        console.log(newenuruntext);
                    }
                } catch (error) { console.log(error) }
            }
        })
        .catch((err) => {
            console.log(err);
        });
}


module.exports = {
    urunTranslate
}











// ORJİNAL KODLAR////////////////////////////////
////////////////////////////////////////////////////////////////


//     const { Translate } = require('@google-cloud/translate').v2;
// require('dotenv').config();


// // Your credentials
// const CREDENTIALS = JSON.parse(process.env.CREDENTIALS)

// // Configuration for the client
// const translate = new Translate({
//     credentials: CREDENTIALS,
//     projectId: CREDENTIALS.project_id
// });

// const detectLanguage = async (text) => {
//     try {
//         let response = await translate.detect(text);
//         return response[0].language;
//     } catch (error) {
//         console.log(`Error at detectLanguage --> ${error}`);
//         return 0;
//     }
// }

// // detectLanguage("C'est lundi aujourd'hui")
// //     .then((res) => {
// //         console.log(res);
// //     })
// //     .catch((err) => {
// //         console.log(err);
// //     });

// const translateText = async (text, targetLanguage) => {

//     try {
//         let [response] = await translate.translate(text, targetLanguage);
//         return response;
//     } catch (error) {
//         console.log(`Error at translateText --> ${error}`);
//         return 0;
//     }
// };

// translateText("today is monday", 'fr')
//     .then((res) => {
//         console.log(res);
//     })
//     .catch((err) => {
//         console.log(err);
//     });