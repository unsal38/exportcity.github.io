const express = require("express");
const router = express.Router();
require('dotenv').config();
const jwt = require("jsonwebtoken");
const user = require("../schema/userSchema");
// const siteHeadAyarSchema = require("../schema/siteHeadAyarSchema");
// const fs = require('fs');
// const urunSchema = require("../schema/urunSchema");

router.post("/", (req, res) => {
    const authHeader = req.headers['authorization']
    // console.log(authHeader, "authcontrol");
    if (authHeader === "Bearer null") {
        res.json({ message: "token not found" })
    } else if (authHeader !== "Bearer null") {
        try {
            const token = authHeader.split(' ')[1]
            const user = jwt.verify(token, process.env.ACCESSTOKENSECRET)
            const useridAccessToken = user.userid
            const clientUserid = req.body.client
            const urlMatch = req.headers['referer'].match(useridAccessToken)
            if (useridAccessToken === clientUserid) {
                if (urlMatch === null) {
                    res.json({ message: "authentication fail" })
                } else {
                    res.json({ message: "token successfull" })
                }
            }else {
                res.json({ message: "authentication fail" })
            }
        } catch (error) {
            res.json({ message: "authentication fail" })
            console.log(error);
        }
    }
})


module.exports = router;