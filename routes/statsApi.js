const express = require('express');
const StatsService = require('../service/statsService');

const router = express.Router();

router.get("/", async function (req, res, next) {
    try{
        res.status(200).json(await StatsService.getStats());
    } catch (err) {
        next(err);
    }
})

module.exports = router;
