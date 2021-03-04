const express = require('express');
const MutantService = require('../service/mutantService.js');

const router = express.Router();

router.post("/", async function (req, res, next) {
    try{
        const isMutantResult = await MutantService.newSequence(req.body.dna);
        if (isMutantResult) {
            res.status(200).json(isMutantResult);
        } else {
            res.status(403).send(isMutantResult);
        }
    } catch (err) {
        next(err);
    }
})

module.exports = router;
