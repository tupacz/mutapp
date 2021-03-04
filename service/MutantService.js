const GeneticSequence = require("../models/GeneticSequence");

const comb = ['A', 'C', 'G', 'T'];
const nLettersToFind = 4;
const nFinds = 2;

function checkIllegalChars(matrix) {
    for (let i = 0; i < matrix.length; i++) {
        for (let j = 0; j < matrix[0].length; j++) {
            isCharPossible(matrix[i][j]);
        }
    }
}

function isCharPossible(c) {
    for (let i = 0; i < comb.length; i++) {
        if (c === comb[i]) return true;
    }
    throw {message:"Hay un caracter dentro del código genético enviado que no es aceptable: " + c, status: 400};
}

function isMutant(geneticSequence) {   
    let count = 0
    for (let i = 0; i < geneticSequence.length; i++) {
        for (let j = 0; j < geneticSequence[i].length; j++) {
            if (hasSameDirection(geneticSequence, 0, 1, i, j, nLettersToFind - 1)) count++;
            if (hasSameDirection(geneticSequence, 1, 1, i, j, nLettersToFind - 1)) count++;
            if (hasSameDirection(geneticSequence, 1, 0, i, j, nLettersToFind - 1)) count++;
            if (hasSameDirection(geneticSequence, 1, -1, i, j, nLettersToFind - 1)) count++;
            if (count >= nFinds) return true;
        }
    }
    return false;
}

function hasSameDirection(matrix, di, dj, i, j, maxLoop) {
    if (maxLoop === 0) return true;
    if (matrix[i + di] === undefined || matrix[i + di][j + dj] === undefined) return false;
    if (matrix[i + di][j + dj] === matrix[i][j]) return hasSameDirection(matrix, di, dj, i + di, j + dj, maxLoop - 1);
}

exports.newSequence = async function (geneticSequence) {
    if (geneticSequence === undefined || geneticSequence.length === undefined) throw {message: "En la solicitud no hay un objeto dna o array válido", status: 400};
    geneticSequence.forEach(x => { if(x.length !== geneticSequence.length) throw {message: "La matriz enviada no es NxN", status: 400}});
    if (nLettersToFind > geneticSequence.length) throw {message: "La matriz no tiene las dimensiones adecuadas para ser verificada.", status: 400};
    checkIllegalChars(geneticSequence);

    await GeneticSequence.findOne({geneticArray: geneticSequence}, (err, element) => {
        if (!element) {
            new GeneticSequence({
                geneticArray: geneticSequence,
                isMutant: isMutant(geneticSequence)
            }).save((error) => {
                if (error) {
                    console.log(error);
                } else {
                    console.log('Saved');
                    return geneticSequence;
                }
            });
        }
    });
    return geneticSequence;
}