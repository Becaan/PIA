const mongoose = require('mongoose');
const uniqueValidator = require("mongoose-unique-validator");

const AdminSema = mongoose.Schema({
    korisnickoIme: { type: String, required: true, unique: true},
    lozinka:{ type: String, required: true}
});

AdminSema.plugin(uniqueValidator);

module.exports = mongoose.model('Admin', AdminSema);