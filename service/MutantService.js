const comb = ['A', 'C', 'G', 'T'];
const nLettersToFind = 4;
const nFinds = 2;
const cardinals = [
    {y: 0, x: 1}, {y: 1, x: 1}, {y: 1, x: 0}, {y: 1, x: -1}
]

function checkIllegalChars(matrix) {
    for (let i = 0; i < matrix.length; i++) {
        for (let j = 0; j < matrix[0].length; j++) {
            isCharPossible(matrix[i][j]);
        }
    }
}

function hasSameDirection(matrix, di, dj, i, j, maxLoop) {
    if (maxLoop === 0) return true;
    if (matrix[i + di] === undefined || matrix[i + di][j + dj] === undefined) return false;
    if (matrix[i + di][j + dj] === matrix[i][j]) return hasSameDirection(matrix, di, dj, i + di, j + dj, maxLoop - 1);
}

function isCharPossible(c) {
    for (let i = 0; i < comb.length; i++) {
        if (c === comb[i]) return true;
    }
    throw new Error("Hay un caracter dentro del código genético enviado que no es aceptable: " + c);
}

class MutantService {
    static isMutant(geneticSequence) {
        if (geneticSequence === undefined) throw new Error("En la solicitud no hay un objeto dna.");
        if (geneticSequence.length !== geneticSequence[0].length) throw new Error("La matriz enviada no es NxN");
        if (nLettersToFind > geneticSequence.length) throw new Error("La matriz no tiene las dimensiones adecuadas para ser verificada");
        checkIllegalChars(geneticSequence);
        
        let count = 0
        for (let i = 0; i < geneticSequence.length; i++) {
            for (let j = 0; j < geneticSequence[i].length; j++) {
                for (let k = 0; k < cardinals.length; k++) {
                    if (count == nFinds) return true;
                    count = hasSameDirection(geneticSequence, cardinals[k].y, cardinals[k].x, i, j, nLettersToFind - 1) ? count + 1 : count;
                }
            }
        }
        return false;
    }
}

module.exports = MutantService;