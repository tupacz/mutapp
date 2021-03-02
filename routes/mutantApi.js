const express = require('express');
const GeneticSequence = require('../entities/GeneticSequence.js');

const router = express.Router();
const comb = ['A','C','G','T'];
const nCoincidences = 4;

const isMutant = (geneticSequence) => {
    if (geneticSequence.length !== geneticSequence[0].length) throw new Error("La matriz enviada no es NxN");
    if (nCoincidences > geneticSequence.length) throw new Error("La matriz no tiene las dimensiones adecuadas para ser verificada");
    
    var count = 0
    for (let i = 0; i < geneticSequence.length; i++) {
        for (let j = 0; j < geneticSequence[i].length; j++) {
            isCharPossible(geneticSequence[i][j]);
            if (hasSameDirection(geneticSequence, 0, 1, i, j, nCoincidences - 1)) count++;
            if (hasSameDirection(geneticSequence, 1, 1, i, j, nCoincidences - 1)) count++;
            if (hasSameDirection(geneticSequence, 1, 0, i, j, nCoincidences - 1)) count++;
            if (hasSameDirection(geneticSequence, 1, -1, i, j, nCoincidences - 1)) count++;
            if (count > 1) return true;
        }
    }
    return false;
}

function hasSameDirection(matrix, di, dj, i, j, maxLoop) {
    if (maxLoop === 0) return true;
    isCharPossible(matrix[i][j]);
    if (matrix[i+di] === undefined || matrix[i+di][j+dj] === undefined) return false;
    if (matrix[i+di][j+dj] === matrix[i][j]) return hasSameDirection(matrix, di, dj, i+di, j+dj, maxLoop - 1);
}

function isCharPossible(c) {
    for (let i = 0; i < comb.length; i++) {
        if (c === comb[i]) return true;
    }
    throw new Error("Hay un caracter dentro del código genético enviado que no es aceptable: " + c);
}

router.post("/", (req, res) => {
    if (req.body.dna === undefined) throw new Error("En la solicitud no hay un objeto dna.");
    let geneticSequence = new GeneticSequence(req.body.dna);
    if (isMutant(req.body.dna)) {
        res.status(200).json(geneticSequence);
    } else {
        res.status(403).send(geneticSequence);
    }

});

module.exports = router;
