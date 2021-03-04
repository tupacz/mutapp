const mongoose = require('mongoose');
let Schema = mongoose.Schema;

let GeneticSequence = new Schema({
    geneticArray: [],
    isMutant: Boolean
});

module.exports = mongoose.model('geneticsequence', GeneticSequence);