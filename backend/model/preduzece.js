const mongoose = require('mongoose');
const uniqueValidator = require("mongoose-unique-validator");

const PreduzeceSema = mongoose.Schema({
    korisnickoIme: { type: String, required: true, unique: true},
    lozinka:{ type: String, required: true},
    email:{ type: String, required: true},
    odobren:{ type: Number, default: 0}, // 0-nije, 1-jeste
    nazivPreduzeca:{ type: String },
    skraceniNazivPreduzeca:{ type: String, unique: true},
    datumOsnivanjaPreduzeca:{ type: String },
    mestoPreduzeca:{ type: String }
});

PreduzeceSema.plugin(uniqueValidator);

module.exports = mongoose.model('Preduzece', PreduzeceSema);