const express = require("express"),
    router = express.Router(),
    axios = require("axios");
    Iyzipay = require('iyzipay');
require("dotenv").config();


router.get("/", (req, res) => {

    


    var iyzipay = new Iyzipay({
        apiKey: "sandbox-ViZ0LCqQop2Gn2QCnRkdxKUZh43IsK3e",  //process.env.APIKEY,
        secretKey: "AmsmSpXFCtwYi3gXg2vMk3Hahya8on7b",//process.env.SECRETKEY,
        uri: "https://sandbox-api.iyzipay.com" //process.env.URI
    });

    ////// MÜŞTERİ OLUŞTURMA ABONELİK İÇİN////

    var createRequest = {
        // locale: Iyzipay.LOCALE.EN,
        // conversationId: '123456789',
        name: 'Jane',
        surname: 'Doe',
        identityNumber: '11111111111', // TC NUMARASI
        email: 'test321@test.com',
        gsmNumber: '+9005555555555',
        billingAddress: {
            contactName: 'Jane Doe',
            city: 'Istanbul',
            district: 'altunizade',
            country: 'Turkey',
            address: 'Nidakule Göztepe, Merdivenköy Mah. Bora Sok. No:1',
            zipCode: '34742'
        },
        shippingAddress: {
            contactName: 'Jane Doe',
            city: 'Istanbul',
            district: 'altunizade',
            country: 'Turkey',
            address: 'Nidakule Göztepe, Merdivenköy Mah. Bora Sok. No:1',
            zipCode: '34742'
        }
    };

    iyzipay.subscriptionCustomer.create(createRequest, function (err, result) {
        console.log(err, result);
    });













    // ÜRÜN SORGULAMA //////////////////////////////////
    /////////////////////
    // function urunsorgu() {
    //     var retryRequest = {
    //         locale: Iyzipay.LOCALE.TR,
    //         conversationId: '123456789',
    //         referenceCode: 'ba562488-4956-4817-acc5-d67b6c7de0a0'
    //     };

    //     iyzipay.subscriptionPayment.retry(retryRequest, function (err, result) {
    //         console.log(err, result);
    //     });
    // }

    // urunsorgu()
        // ÜRÜN SORGULAMA //////////////////////////////////
    /////////////////////





    // SANAL POST DİREK PARA ÇEKMEK //////////////////////////////////
    /////////////////////
    // var request = {
    //     locale: "tr",
    //     conversationId: '123456789', // SİPARİŞ NUMARASI
    //     price: '100', // SEPET TUTARI
    //     paidPrice: '100.2', // İNDİRİM , KDV, KOMİSYON  EKLENMİŞ TUTAR
    //     currency: "TRY", //ÖDEME CİNSİ TL USD VB
    //     installment: '1', // TAKSİT BİLGİSİ
    //     basketId: 'B67832', // SİPARİŞ NUMARASI
    //     paymentChannel: "WEB", // ÖDEME YAPILACAK CİHAZ YADA ORTAM
    //     paymentGroup: "SUBSCRIPTION",
    //     paymentCard: {
    //         cardHolderName: 'John Doe',
    //         cardNumber: '5890040000000016',
    //         expireMonth: '12',
    //         expireYear: '2030',
    //         cvc: '123',
    //         registerCard: '0' // KART KAYIT EDİLMESİ 
    //     },
    //     buyer: {
    //         id: 'BY789',
    //         name: 'John',
    //         surname: 'Doe',
    //         gsmNumber: '+905350000000', // ZORUNLU DEĞİL
    //         email: 'email@email.com',
    //         identityNumber: '74300864791',
    //         lastLoginDate: '2015-10-05 12:43:35', // ZORUNLU DEĞİL
    //         registrationDate: '2013-04-21 15:12:09', // ZORUNLU DEĞİL
    //         registrationAddress: 'Nidakule Göztepe, Merdivenköy Mah. Bora Sok. No:1',
    //         ip: '85.34.78.112',
    //         city: 'Istanbul',
    //         country: 'Turkey',
    //         zipCode: '34732' // ZORUNLU DEĞİL
    //     },
    //     // FİZİKSEL ÜRÜN OLMADIĞINDAN GEREKLİ DEĞİL//////////////

    //     // shippingAddress: { 
    //     //     contactName: 'Jane Doe',
    //     //     city: 'Istanbul',
    //     //     country: 'Turkey',
    //     //     address: 'Nidakule Göztepe, Merdivenköy Mah. Bora Sok. No:1',
    //     //     zipCode: '34742'
    //     // },
    //     // FİZİKSEL ÜRÜN OLMADIĞINDAN GEREKLİ DEĞİL//////////////

    //     billingAddress: { // FATURA İÇİN BİLGİLER
    //         contactName: 'Jane Doe',
    //         city: 'Istanbul',
    //         country: 'Turkey',
    //         address: 'Nidakule Göztepe, Merdivenköy Mah. Bora Sok. No:1',
    //         zipCode: '34742' // ZORUNLU DEĞİL
    //     },
    //     basketItems: [
    //         {
    //             "id": "BI101",
    //             "price": 30,
    //             "name": "Dükkan aboneliği ve katalog",
    //             "category1": "Abonelik",
    //             "category2": "Urun Girisi",
    //             "itemType": "VIRTUAL"
    //         },
    //         {
    //             "id": "BI102",
    //             "price": 50,
    //             "name": "Listeleme aboneliği",
    //             "category1": "Abonelik",
    //             "category2": "Listeleme",
    //             "itemType": "VIRTUAL"
    //         },
    //         {
    //             "id": "BI103",
    //             "price": 20,
    //             "name": "Servis aboneliği",
    //             "category1": "Abonelik",
    //             "category2": "Hizmet Girisi",
    //             "itemType": "VIRTUAL"
    //         }
    //     ]
    // };

    // iyzipay.payment.create(request, function (err, result) {
    //     console.log(err, result);
    // });

    ////////////// ÜRÜN OLUŞTURMA //////////////////////////////////
    /////////////////////

    // Ürün Referans Kodu: ae1f1d6f-9cbc-40f4-a533-9ff690211762
    // Ödeme Planı Referans Kodu : 098261e6-65ca-4e82-b3c0-61ca5246a3ef
    // var createRequest = {
    //     locale: Iyzipay.LOCALE.EN,
    //     conversationId: '123456789',
    //     name: 'test3 name',
    //     description: 'test description'
    // };

    // iyzipay.subscriptionProduct.create(createRequest, function (err, result) {
    //     console.log(err, result);
    //     should.not.exist(err);
    //     should.exist(result);
    // });

    ////////////// MÜŞTERİ OLUŞTURMA //////////////////////////////////
    /////////////////////
    // referenceCode: 'b42622f9-e482-480e-8428-47db55c19141' oluşturuldu
    // var createRequest = {
    //     // locale: Iyzipay.LOCALE.EN,
    //     // conversationId: '123456789',
    //     name: 'Jane',
    //     surname: 'Doe',
    //     identityNumber: '11111111111', // TC NUMARASI
    //     email: 'test12@test.com',
    //     gsmNumber: '+9005555555555',
    //     billingAddress: {
    //         contactName: 'Jane Doe',
    //         city: 'Istanbul',
    //         district: 'altunizade',
    //         country: 'Turkey',
    //         address: 'Nidakule Göztepe, Merdivenköy Mah. Bora Sok. No:1',
    //         zipCode: '34742'
    //     },
    //     shippingAddress: {
    //         contactName: 'Jane Doe',
    //         city: 'Istanbul',
    //         district: 'altunizade',
    //         country: 'Turkey',
    //         address: 'Nidakule Göztepe, Merdivenköy Mah. Bora Sok. No:1',
    //         zipCode: '34742'
    //     }
    // };

    // iyzipay.subscriptionCustomer.create(createRequest, function (err, result) {
    //     console.log(err, result);
    //     should.not.exist(err);
    //     should.exist(result);
    // });

    ////////////// OLUŞTURULAN MÜŞTERİDEN ABONELİK BAŞLATMA //////////////////////////////////
    /////////////////////


    // var request = {
    //     // locale: Iyzipay.LOCALE.EN,
    //     // conversationId: '123456789',
    //     // callbackUrl: 'callbackUrl',
    //     pricingPlanReferenceCode: '098261e6-65ca-4e82-b3c0-61ca5246a3ef',
    //     // subscriptionInitialStatus: Iyzipay.SUBSCRIPTION_INITIAL_STATUS.PENDING,
    //     paymentCard: {
    //         cardHolderName: 'John Doe',
    //         cardNumber: '5528790000000008',
    //         expireMonth: '12',
    //         expireYear: '2030',
    //         cvc: '123',
    //         registerConsumerCard: true,
    //     },
    //     customer: {
    //         name: 'name',
    //         surname: 'surname',
    //         identityNumber: '11111111111',
    //         email: 'test123@test.com',
    //         gsmNumber: '+9005555555555',
    //         billingAddress: {
    //             contactName: 'Jane Doe',
    //             city: 'Istanbul',
    //             district: 'altunizade',
    //             country: 'Turkey',
    //             address: 'Nidakule Göztepe, Merdivenköy Mah. Bora Sok. No:1',
    //             zipCode: '34742'
    //         },
    //         shippingAddress: {
    //             contactName: 'Jane Doe',
    //             city: 'Istanbul',
    //             district: 'altunizade',
    //             country: 'Turkey',
    //             address: 'Nidakule Göztepe, Merdivenköy Mah. Bora Sok. No:1',
    //             zipCode: '34742'
    //         }
    //     }
    // };

    // iyzipay.subscription.initialize(request, function (err, result) {
    //     console.log(err, result);
    // });
////////İŞLEM SONUCU //////////////////////////////////

// data: {
//     referenceCode: 'f209a8d3-3ccc-4f8c-ac8e-fd89b075a713',
//     parentReferenceCode: 'c868708b-bd51-4852-9311-1a261f6ce294',
//     pricingPlanReferenceCode: '098261e6-65ca-4e82-b3c0-61ca5246a3ef',
//     customerReferenceCode: '82635918-8747-4500-a70f-62e98c1f08d6',
//     subscriptionStatus: 'ACTIVE',
//     trialDays: 0,
//     createdDate: 1675848151598,
//     startDate: 1675848151598
//   }


})




module.exports = router;

