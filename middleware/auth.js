const express = require("express");
const jwt = require("jsonwebtoken");
require("dotenv").config()
const router = express.Router();
router.use(express.json())
router.use(express.urlencoded({ extended: true }))


// async function postAuth(req, res, next) {
//   var authorization = req.headers.authorization
//   var accessToken = authorization.split(" ")[1]
//   try {
//     const verifyToken = jwt.verify(accessToken, process.env.ACCESSTOKENSECRET)
//     if (verifyToken !== undefined) {
//       res.json({ message: "successful" })
//     } else {
//       res.json({ message: "unsuccessful" })
//     }

//   } catch (error) {
//     console.log(error);
//     res.json({ message: "unsuccessful" })
//   }
//   next()
// }
module.exports = {
  // postAuth,
}






