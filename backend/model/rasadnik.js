const mongoose = require('mongoose');

const rasadnikSema = mongoose.Schema({
    naziv: { type: String, required: true},
    mesto:{ type: String, required: true},
    zasadjeneSadnice:{ type: String, required: true},
    slobodnaMesta:{ type: String, required: true},
    voda:{ type: String, required: true},
    temperatura:{ type: String, required: true},
    sadnice:[{ naziv: String, proizvodjac: String }],
    colArray:{ type: [Number], required: true},
    rowArray:{ type: [Number], required: true}
});

module.exports = mongoose.model('Rasadnik', rasadnikSema);