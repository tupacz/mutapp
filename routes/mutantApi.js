const express = require('express');
const MutantService = require('../service/mutantService.js');

const router = express.Router();

router.post("/", async function (req, res, next) {
    try{
        const isMutantResult = await MutantService.checkValidityAndAdd(req.body.dna);
        if (isMutantResult.isMutant) {
            res.status(200).json(isMutantResult);
        } else {
            res.status(403).json(isMutantResult);
        }
    } catch (err) {
        next(err);
    }
})

module.exports = router;
