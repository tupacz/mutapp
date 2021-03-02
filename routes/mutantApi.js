const express = require('express');
const MutantService = require('../service/MutantService.js');
const GeneticSequence = require('../models/GeneticSequence.js');

const router = express.Router();

router.post("/", (req, res) => {
    if (req.body.dna === undefined) throw new Error("En la solicitud no hay un objeto dna.");
    let isMutantResult = MutantService.isMutant(req.body.dna);
    let geneticSequence = new GeneticSequence(req.body.dna);
    if (isMutantResult) {
        res.status(200).json(geneticSequence);
    } else {
        res.status(403).send(geneticSequence);
    }

});

module.exports = router;
