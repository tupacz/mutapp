const assert = require('chai').assert;
const MutantService = require('../service/MutantService'); //imports the Pokemon model.
const mongoose = require('mongoose');

describe('Tests Mutant Service', () => {
    before((done) => {
        var mongoDB = 'mongodb://127.0.0.1:27017/testdb';
        mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })

        var db = mongoose.connection;

        db.on('error', function (err) {
            console.log('connection error', err)
        })

        db.once('open', function () {
            console.log('Connection to DB successful');
            done();
        })
    });

    it('Check if an object without DNA arrives', async() => {
        const mock = {
            "kek": [
                "CCAAGAC",
                "AAGTGGA",
            ]
        }
        const mock2 = {
            "kek": 2
        }
        const mock3 = ""
        try {
            await MutantService.checkValidityAndAdd(mock3);
        } catch (error) {
            assert.isDefined(error.message);
        }
    });

    it('Throw Error if DNA is incorrect 1', async() => {
        const mock = {
            "dna": "TESTESTEST"
        }
        try {
            await MutantService.checkValidityAndAdd(mock);
        } catch (error) {
            assert.isDefined(error.message);
        }
    });

    it('Throw Error if DNA is incorrect 2', async() => {
        const mock = {
            "dna": {}
        }
        try {
            await MutantService.checkValidityAndAdd(mock);
        } catch (error) {
            assert.isDefined(error.message);
        }
    });

    it('Throw Error if DNA is incorrect 3', async() => {
        const mock = {
            "dna": [1,[],{},"3"]
        }
        try {
            await MutantService.checkValidityAndAdd(mock);
        } catch (error) {
            assert.isDefined(error.message);
        }
    });

    it('Throw Error if there is an invalid character', async() => {
        const mock = {
            "dna": [
                "CCAAGAC",
                "AAGCGGA",
                "ATCTCTT",
                "AGAATGG",
                "CGGCATG",
                "TCATTAT",
                "GGGCTG&"
            ]
        }
        try {
            await MutantService.checkValidityAndAdd(mock);
        } catch (error) {
            assert.isDefined(error.message);
        }
    });

    it('Throw Error if Matrix is NxN 1', async() => {
        const mock = {
            "dna": [
                "CCAAGAC",
                "AAGCGGA",
                "ATCTCTT",
                "AGAATGG",
            ]
        }
        try {
            await MutantService.checkValidityAndAdd(mock);
        } catch (error) {
            assert.isDefined(error.message);
        }
    });

    it('Throw Error if Matrix is NxN 2', async() => {
        const mock = {
            "dna": [
                "CCAAGAC",
                "AAGCGGA",
                "ATCTCTT",
                "AGATTTT",
                "CCAAGAC",
                "AAGCGGA",
                "CTT"
            ]
        }
        try {
            await MutantService.checkValidityAndAdd(mock);
        } catch (error) {
            assert.isDefined(error.message);
        }
    });

    it('Throw Error if Matrix do not have the minimum dimensions', async() => {
        const mock = {
            "dna": [
                "CCA",
                "AAG",
                "ATC"
            ]
        }
        try {
            await MutantService.checkValidityAndAdd(mock);
        } catch (error) {
            assert.isDefined(error.message);
        }
    });

    it('Check negative result in sequence', async() => {
        const mock = {
            "dna": [
                "CCAA",
                "AAGC",
                "ATTT",
                "AGAT",
            ]
        }
        const result = await MutantService.checkValidityAndAdd(mock);
        assert.equal(result.isMutant, false);
    });

    it('Check positive result in horizontal sequence', async() => {
        const mock = {
            "dna": [
                "CCAAGAC",
                "AAGCGGA",
                "ATTTTCT",
                "AGATGGT",
                "CGGTTAG",
                "TCACTGG",
                "GGGGTGG"
            ]
        }
        const result = await MutantService.checkValidityAndAdd(mock);
        assert.equal(result.isMutant, true);
    });

    it('Check positive result in vertical sequence', async() => {
        const mock = {
            "dna": [
                "CCAAGAC",
                "AAGCGGA",
                "ATTCTCT",
                "AGACGGG",
                "CGGCTAG",
                "TCATTGG",
                "GGGCTGG"
            ]
        }
        const result = await MutantService.checkValidityAndAdd(mock);
        assert.equal(result.isMutant, true);
    });

    it('Check positive result in diagonal sequence 1', async() => {
        const mock = {
            "dna": [
                "CCAAGAC",
                "AAGCGGA",
                "ATCTCTT",
                "AGAATGG",
                "CGGCATG",
                "TCATTAT",
                "GGGCTGA"
            ]
        }
        const result = await MutantService.checkValidityAndAdd(mock);
        assert.equal(result.isMutant, true);
    });

    it('Check positive result in diagonal sequence 2', async() => {
        const mock = {
            "dna": [
                "CCAAGAC",
                "AAGCGCA",
                "ATCTCTA",
                "AGACTGG",
                "CGGCAGG",
                "TCATGAT",
                "GGCGTGA"
            ]
        }
        const result = await MutantService.checkValidityAndAdd(mock);
        assert.equal(result.isMutant, true);
    });

    it('Check positive result in diagonal sequence 3', async() => {
        const mock = {
            "dna": [
                "CCAAGAC",
                "AAGCGCA",
                "ATCTCTA",
                "AGACTGC",
                "CGGCCGG",
                "TCATGCT",
                "GGCCTGC"
            ]
        }
        const result = await MutantService.checkValidityAndAdd(mock);
        assert.equal(result.isMutant, true);
    });

    it('Check positive result in horizontal, diagonal and vertical sequence', async() => {
        const mock = {
            "dna": [
                "AAAAGAC",
                "TAGCCCA",
                "TTCTCAA",
                "TGACTCA",
                "TGGCCGC",
                "CCATGGT",
                "GGCCTGC"
            ]
        }
        const result = await MutantService.checkValidityAndAdd(mock);
        assert.equal(result.isMutant, true);
    });

    after((done) => {
        mongoose.connection.close(done);
    });

});