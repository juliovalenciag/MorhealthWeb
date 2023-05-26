import { db } from "../db.js";
import express from "express";
import bcrypt from 'bcryptjs';
import jwt from "jsonwebtoken";

export const verifyProfesional = (req, res, next) => {
    const token = req.cookies.token;
    if (!token) {
        return res.json({ Error: "No esta autenticado" });
    } else {
        jwt.verify(token, "jwt-secret-key", (err, decoded) => {
            if (err) {
                return res.json({ Error: "Token erroneo" });
            } else {
                req.name = decoded.name;
                next();
            }
        })
    }
}

export const registerPro = (req, res) => {

    //checar si el profesional ya esta registrado
    const q = "SELECT * FROM professionals WHERE email = ? OR phone = ?"
    //hash a la contraseña por seguridad del usuario

    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);

    db.query(q, [req.body.email, req.body.phone], (err, data) => {
        if (err) return res.status(500).json({ message: "ERROR CONSULTANDO DATOS: ", error: err });
        if (data.length) return res.status(409).json({ message: "El profesional ya esta registrado." });

        const q = "INSERT INTO professionals(`name`, `lastname_p`, `lastname_m`, `location`, `password`, `phone`, `email`, `occupation`) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";

        const values = [
            req.body.name,
            req.body.lastname_p,
            req.body.lastname_m,
            req.body.location,
            hash,
            req.body.phone,
            req.body.email,
            req.body.occupation,

        ];
        db.query(q, values, (err, data) => {
            if (err) return res.status(500).json({ message: "ERROR INSERTANDO DATOS: ", error: err });
            return res.json({ Status: "Exito" });
        })
    })
}

export const loginPro = (req, res) => {
    //checar el profesional
    const q = "SELECT * FROM professionals WHERE email = ?";

    db.query(q, [req.body.email], (err, data) => {
        if (err) return res.json({ Error: "ERROR EN EL SERVIDOR PARA INGRESAR" });
        if (data.length > 0) {
            bcrypt.compare(req.body.password.toString(), data[0].password, (err, response) => {
                if (err) return res.json({ Error: "ERROR EN LA CONTRASEÑA" });
                if (response) {
                    const name = data[0].name;
                    const token = jwt.sign({ name }, "jwt-secret-key", { expiresIn: '1d' });
                    res.cookie('token', token);
                    return res.json({ Status: "Exito" })
                } else {
                    return res.json({ Error: "Contraseña incorrecta" });
                }
            })
        } else {
            return res.json({ Error: "No existe el profesional" });
        }
    })
}


export const logoutPro = (req, res) => {
    res.clearCookie('token');
    return res.json({ Status: "Exito" });
}