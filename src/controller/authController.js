const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../model/user');
const res = require('express/lib/response');
const { where } = require('sequelize');
const req = require('express/lib/request');


//controller register
exports.register = async (req, res) => {
    try{

        const {name, email, password, role} = req.body;

        //validasi input
        const exist = await User.findOne({
            where: {email}
        });
        if(exist){
            return res.status(400).json({
                massage:"Email sudah terdaftar"
            });
        }

        //jika belum terdaftar maka lanjut hash password
        const hashed = await bcrypt.hash(password,10);

        //simpan user ke db
        const user = User.create(
            {
                name,
                email,
                password: hashed,
                role
            }
        );
        
        //kembalikan response
        res.status(200).json({
            massage: "Register Berhasil", 
            user : {
                name : user.name,
                email: user.email
            }
        })

    } catch (err) {
        res.status(500).json(
            {
                massage: "Error Server", err
            }
        );
    }
};


exports.login = async (req, res) => {
    try{
        //mengambil email dan password
        const {email, password} = req.body;

        //query user dengan index email
        const user = await User.findOne({
            where: {email}
        });

        if(!user){
            return res.status(400).json({
                massage: "Email tidak ditemukan"
            })
        };

        //validasi password
        const match_password = await bcrypt.compare(password, user.password);
        if(!match_password){
            return res.status(400).json({
                massage: "Password salah"
            })
        };

        //assign token
        const token = jwt.sign(
            {id:user.id, role:user.role},
            process.env.JWT_SECRET,
            {expiresIn: "1h"}
        );

        res.status(200).json({
            massage: "Login success",
            token,
            user:{name: user.name, email:user.email, role:user.role}
        })

    } catch (err) {
        res.status(500).json({
            massage: "Error Server", err
        })
    }
};