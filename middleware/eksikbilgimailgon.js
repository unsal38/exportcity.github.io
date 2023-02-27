const mongoose = require('mongoose'),
ls = require("local-storage"),
userSchema = require("../schema/userSchema"),
jwt = require("jsonwebtoken")

module.exports.eksikbilgimailgon = async function eksikbilgimailgon() {
    // var accessToken = ls.get("accessToken")
    // var userData = await jwt.verify(accessToken, process.env.ACCESSTOKENSECRET)
    // try {
    //     const userİd = userData.userid
    //     // var user = await userSchema.findById(userİd).
    //     var user = await userSchema.path
    //     console.log(user);
    // } catch (err) {
    //     console.log(err);
    // }
}