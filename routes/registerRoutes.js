const express = require("express");
const userSchema = require("../schema/userSchema")
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const ls = require("local-storage");
const mailGond = require("../middleware/mail");
const router = express.Router();


router.post("/register", async (req, res) => {
    try {
        
        const userData = req.body
        const userKayitli = await userSchema.findOne({ kullaniciMail: userData.kullaniciMail })
        
        if (userKayitli !== null) {
            return res.json({ message: "Kayıtlı Kullanıcı" })
        } else {
            
            const saltRounds = 10;
            const password = userData.password
            const salt = bcrypt.genSaltSync(saltRounds);
            const hashPassword = bcrypt.hashSync(password, salt);
            let kullaniciMailSplitSıra = userData.kullaniciMail.indexOf("@")
            let kullaniciMailSplit = userData.kullaniciMail.slice(0, kullaniciMailSplitSıra)
            let refcod = Math.floor(Math.random() * 10000) + kullaniciMailSplit
            const refleshTokenOption = {
                expiresIn: "180 days"
            }
            var refleshToken = jwt.sign(userData.kullaniciAdi, process.env.REFLESHTOKENSECRET);
            const newuser = await userSchema.create({
                kullaniciAdi: userData.kullaniciAdi,
                password: hashPassword,
                kullaniciMail: userData.kullaniciMail,
                refcod: refcod,
                refleshToken: refleshToken,
            })
            newuser.save()
            res.json({message: "successful"})
            
        }
        
    } catch (e) {
        function message(message) {
            var errorMessage = message.errors
            res.json({ errorMessage })

        }
        message(e)
    }
    
})



module.exports = router