const mongoose = require("mongoose")
const abonelikurunsorguSchema = new mongoose.Schema({
    referenceCode: String,//'ae1f1d6f-9cbc-40f4-a533-9ff690211762',
    createdDate: Number,//1675845718790,
    name: String,// 'ÜRÜN YÜKLEME 20 ADET',
    description: String,// 'ÜRÜN YÜKLEME VE GÖSTERİM 20 ADET',
    status: String,// 'ACTIVE',
    pricingPlanSreferenceCode: String,// '098261e6-65ca-4e82-b3c0-61ca5246a3ef',
    pricingPlanScreatedDate: Number,// 1675845781812,
    pricingPlanSname: String,// 'URUN YUKLE / URUN GÖSTERME',
    pricingPlanSprice: Number,// 100,
    pricingPlanSpaymentInterval: String,// 'HOURLY',
    pricingPlanSpaymentIntervalCount: Number,// 1,
    pricingPlanStrialPeriodDays: Number,// 0,
    pricingPlanScurrencyCode: String,// 'TRY',
    pricingPlanSproductReferenceCode: String,// 'ae1f1d6f-9cbc-40f4-a533-9ff690211762',
    pricingPlanSplanPaymentType: String,// 'RECURRING',
    pricingPlanSstatus: String,// 'ACTIVE'
})

module.exports = mongoose.model("abonelikurunsorgu", abonelikurunsorguSchema)