const express = require('express');
const Rasadnik = require('../model/rasadnik');
const checkAuth = require("../middleware/check-auth");

const router = express.Router();

router.post("", checkAuth, (req, res, next) =>{
    const rasadnik = new Rasadnik({
        naziv: req.body.naziv,
        mesto: req.body.mesto,
        zasadjeneSadnice: req.body.zasadjeneSadnice,
        slobodnaMesta: req.body.slobodnaMesta,
        voda: req.body.voda,
        temperatura: req.body.temperatura,
        sadnice: req.body.sadnice,
        colArray: req.body.colArray,
        rowArray: req.body.rowArray
    });
    rasadnik.save().then(createdRasadnik =>{
        res.status(201).json({
            message: "Rasadnik added successfully",
            rasadnikId: createdRasadnik._id
        });
    });
    
});

router.get("", (req, res, next) => { ///////////////////////TREBA DODATI CHECKAUTH I DA VIDIMO SAMO NASE RASADNIKE
    
    Rasadnik.find().then((documents) =>{
        res.status(200).json(
            {
                poruka:"Rasadnici fetched succesfully!",
                rasadnici:documents
            }
        );
    });
   
});

router.delete("/:id", checkAuth, (req, res, next) =>
{
    Rasadnik.deleteOne({_id: req.params.id}).then(result =>{
        console.log(result);
        res.status(200).json({message: "Post deleted!"});
    });
})

module.exports = router;