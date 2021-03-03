const express = require('express');
const MutantService = require('../service/mutantService.js');
const GeneticSequence = require('../models/GeneticSequence.js');

const router = express.Router();

router.post("/", (req, res) => {
    let isMutantResult = MutantService.isMutant(req.body.dna);
    let geneticSequence = new GeneticSequence(req.body.dna);
    if (isMutantResult) {
        res.status(200).json(geneticSequence);
    } else {
        res.status(403).send(geneticSequence);
    }

});

module.exports = router;
