const mongoose = require('mongoose');
const uniqueValidator = require("mongoose-unique-validator");

const PoljoprivrednikSema = mongoose.Schema({
    korisnickoIme: { type: String, required: true, unique: true},
    lozinka:{ type: String, required: true},
    email:{ type: String, required: true},
    odobren:{ type: Number, default: 0}, // 0-nije, 1-jeste
    ime:{ type: String },
    prezime:{ type: String },
    datumRodjenja:{ type: String },
    mestoRodjenja:{ type: String },
    kontakt:{ type: Number }
});

PoljoprivrednikSema.plugin(uniqueValidator);

module.exports = mongoose.model('Poljoprivrednik', PoljoprivrednikSema);