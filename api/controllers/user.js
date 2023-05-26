import express from "express";
import { db } from "../db.js";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';



export const verifyUser = (req,res, next) => {
    const token = req.cookies.token;
    if(!token){
        return res.json({Error: "No esta autenticado"});
    } else {
        jwt.verify(token, "jwt-secret-key", (err, decoded) =>{
            if(err){
                return res.json({Error: "Token erroneo"});
            } else {
                req.name = decoded.name;
                next();
            }
        })
    }
}

export const register = (req, res) => {

    //Checar si el usuario ya esta registrado
    const q = "SELECT * FROM users WHERE email = ? OR username = ?"

    //hash a la contraseña por seguridad del usuario
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);

    db.query(q, [req.body.email, req.body.username], (err, data) => {
        if (err) return res.json(err);
        if (data.length) return res.status(409).json("El usuario ya existe.");

        const q = "INSERT INTO users(`username`, `name`, `lastname_p`, `lastname_m`, `gender`, `age`, `email`, `password`) VALUES (?)"
        const values = [
            req.body.username,
            req.body.name,
            req.body.lastname_p,
            req.body.lastname_m,
            req.body.gender,
            req.body.age,
            req.body.email,
            hash
        ];
        db.query(q, [values], (err, data) => {
            if (err) return res.json("ERROR INSERTANDO DATOS: " , err);
            return res.json({Status: "Exito"});
        })
    })
}

export const login = (req, res) => {

    //Checar el usuario
    const q = "SELECT * FROM users WHERE username = ?";

    db.query(q, [req.body.username], (err,data) =>{
        if(err) return res.json({Error: "EROR EN EL SERVIDO PARA INGRESAR"});
        if(data.length > 0){
            bcrypt.compare(req.body.password.toString(), data[0].password, (err , response) =>{
                if(err) return res.json({Error: "ERROR EN LA CONTRASEÑA"});
                if(response) {
                    const name = data[0].name;
                    const token = jwt.sign({name}, "jwt-secret-key" , {expiresIn: '1d'});
                    res.cookie('token', token);
                    return res.json({Status: "Exito"})
                } else {
                    return res.json({Error: "Contraseña incorrecta"});
                }
            })
        } else {
            return res.json({Error: "No existe el usuario"});
        }
    })
}


export const logout = (req, res) => {
    res.clearCookie('token');
    return res.json({Status: "Exito"});
}