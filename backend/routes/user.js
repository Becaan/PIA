const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");

const Poljoprivrenik = require("../model/poljoprivrednik");
const Preduzece = require("../model/preduzece");
const Admin = require('../model/admin');

const router = express.Router();

router.post("/signup/poljoprivrednik", (req, res, next) =>{
    bcrypt.hash(req.body.lozinka, 10)
        .then(hash =>{
            const poljoprivrednik = new Poljoprivrenik({
                korisnickoIme: req.body.korisnickoIme,
                lozinka: hash,
                email:req.body.email,
                odobren: 0,
                ime: req.body.ime,
                prezime: req.body.prezime,
                datumRodjenja: req.body.datumRodjenja,
                mestoRodjenja: req.body.mestoRodjenja,
                kontakt: req.body.kontakt
            });
            poljoprivrednik.save()
            .then(result =>{
                res.status(201).json({
                    message:"User created!",
                    result:result
                });
            })
            .catch(err =>{
                res.status(500).json({
                    error:err
                });
            });
        });
    
});

router.post("/signup/preduzece", (req, res, next) =>{
    bcrypt.hash(req.body.lozinka, 10)
        .then(hash =>{
            const preduzece = new Preduzece({
                korisnickoIme: req.body.korisnickoIme,
                lozinka: hash,
                email:req.body.email,
                odobren: 0,
                nazivPreduzeca: req.body.nazivPreduzeca,
                skraceniNazivPreduzeca: req.body.skraceniNazivPreduzeca,
                datumOsnivanjaPreduzeca: req.body.datumOsnivanjaPreduzeca,
                mestoPreduzeca: req.body.mestoPreduzeca
            });
            preduzece.save()
            .then(result =>{
                res.status(201).json({
                    message:"User created!",
                    result:result
                });
            })
            .catch(err =>{
                res.status(500).json({
                    error:err
                });
            });
        });
});

router.post("/login/poljoprivrednik", (req, res, next) =>{
    let fetchedPoljoprivrednik;
    Poljoprivrenik.findOne({korisnickoIme:req.body.korisnickoIme}).then(poljoprivrednik =>{
        if(!poljoprivrednik){
            return res.status(401).json({
                message:"Poljoprivrednik auth failed!"
            });
        }
        fetchedPoljoprivrednik=poljoprivrednik;
        return bcrypt.compare(req.body.lozinka, poljoprivrednik.lozinka);
    })
    .then(result =>{
        if(!result){
            return res.status(401).json({
                message:"Poljoprivrednik auth failed!"
            });
        }
        const token = jwt.sign({korisnickoIme:fetchedPoljoprivrednik.korisnickoIme, poljoprivrednikId:fetchedPoljoprivrednik._id}, "very_long_secret", {expiresIn:"1h"});
        res.status(200).json({
            token:token,
            expiresIn: 3600
        });
    })
    .catch(err =>{
        return res.status(401).json({
            message:"Error: Poljoprivrednik auth failed!"
        });
    })
});

router.post("/login/preduzece", (req, res, next) =>{
    let fetchedPreduzece;
    Preduzece.findOne({korisnickoIme:req.body.korisnickoIme}).then(preduzece =>{
        if(!preduzece){
            return res.status(401).json({
                message:"Preduzece auth failed!"
            });
        }
        fetchedPreduzece=preduzece;
        return bcrypt.compare(req.body.lozinka, preduzece.lozinka);
    })
    .then(result =>{
        if(!result){
            return res.status(401).json({
                message:"Preduzece auth failed!"
            });
        }
        const token = jwt.sign({korisnickoIme:fetchedPreduzece.korisnickoIme, preduzeceId:fetchedPreduzece._id}, "very_long_secret", {expiresIn:"1h"});
        res.status(200).json({
            token:token,
            expiresIn: 3600
        });
    })
    .catch(err =>{
        return res.status(401).json({
            message:"Error: Preduzece auth failed!"
        });
    })
});

router.post("/login/admin", (req, res, next) =>{
    let fetchedAdmin;
    Admin.findOne({korisnickoIme:req.body.korisnickoIme}).then(admin =>{
        if(!admin){
            return res.status(401).json({
                message:"Admin auth failed!"
            });
        }
        fetchedAdmin=admin;
        return bcrypt.compare(req.body.lozinka, admin.lozinka);
    })
    .then(result =>{
        if(!result){
            return res.status(401).json({
                message:"Admin auth failed!"
            });
        }
        const token = jwt.sign({korisnickoIme:fetchedAdmin.korisnickoIme, preduzeceId:fetchedAdmin._id}, "very_long_secret", {expiresIn:"1h"});
        res.status(200).json({
            token:token,
            expiresIn: 3600
        });
    })
    .catch(err =>{
        return res.status(401).json({
            message:"Error: Admin auth failed!"
        });
    })
});

module.exports = router;