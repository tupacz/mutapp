const GeneticSequence = require("../models/GeneticSequence");

const comb = ['A', 'C', 'G', 'T'];
const nLettersToFind = 4;
const nFinds = 2;

function isCharPossible(c) {
    for (let i = 0; i < comb.length; i++) {
        if (c === comb[i]) return true;
    }
    throw {message:"Hay un caracter dentro del código genético enviado que no es aceptable: " + c, status: 400};
}

function hasSameDirection(matrix, di, dj, i, j, maxLoop) {
    if (maxLoop === 0) return true;
    if (matrix[i + di] === undefined || matrix[i + di][j + dj] === undefined) return false;
    if (matrix[i + di][j + dj] === matrix[i][j]) return hasSameDirection(matrix, di, dj, i + di, j + dj, maxLoop - 1);
}

async function isMutant(geneticSequence) {   
    let count = 0
    for (let i = 0; i < geneticSequence.length; i++) {
        for (let j = 0; j < geneticSequence[i].length; j++) {
            isCharPossible(geneticSequence[i][j]);
            if (count >= nFinds) continue;
            if (hasSameDirection(geneticSequence, 0, 1, i, j, nLettersToFind - 1)) count++;
            if (hasSameDirection(geneticSequence, 1, 1, i, j, nLettersToFind - 1)) count++;
            if (hasSameDirection(geneticSequence, 1, 0, i, j, nLettersToFind - 1)) count++;
            if (hasSameDirection(geneticSequence, 1, -1, i, j, nLettersToFind - 1)) count++;
        }
    }
    if (count >= nFinds) return true;
    return false;
}

exports.checkValidityAndAdd = async function (geneticSequence) {
    if (geneticSequence === undefined || geneticSequence.length === undefined) throw {message: "En la solicitud no hay un objeto dna o array válido", status: 400};
    geneticSequence.forEach(x => { if(x.length !== geneticSequence.length) throw {message: "La matriz enviada no es NxN", status: 400}});
    if (nLettersToFind > geneticSequence.length) throw {message: "La matriz no tiene las dimensiones adecuadas para ser verificada.", status: 400};

    const [elementDb, isMutantResult] = await Promise.all([
        GeneticSequence.findOne({geneticArray: geneticSequence}),
        isMutant(geneticSequence)
    ]);

    let Result = {geneticArray: geneticSequence, isMutant: isMutantResult};
    
    if (elementDb == null) {
        new GeneticSequence(Result).save();
    } else if (elementDb.isMutant !== isMutantResult) {
        elementDb.isMutant = isMutantResult;
        elementDb.save();
    }

    return Result;
}