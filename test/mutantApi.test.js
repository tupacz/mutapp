let chai = require('chai');
let chaiHttp = require('chai-http');
const assert = require('chai').assert;

chai.use(chaiHttp);
const url= 'http://localhost:3000';

describe('Tests Mutants Api', () => {

    it('Should return status 403 if isMutant is false', (done) => {
        chai.request(url).post('/mutant')
        .send(
            {
                "dna": [
                    "CCAAGAC",
                    "CAGTGGA",
                    "ATTTGCT",
                    "AGATGGT",
                    "CGGATAG",
                    "TCACTGG",
                    "TGGGTGG"
                ]
            }
        )
        .end( (err,res) => {
            assert.equal(res.status,403);
            done();    
        })
    }); 

    it('Should return status 200 if isMutant is true', (done) => {
        chai.request(url).post('/mutant')
        .send(
            {
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
        )
        .end( (err,res) => {
            assert.equal(res.status,200);
            done();    
        })
    });

    it('Should return Error (status 400)', (done) => {
        chai.request(url).post('/mutant')
        .send(
            {
                "dnas": [
                    "CCAAGAC",
                ]
            }
        )
        .end( (err,res) => {
            assert.equal(res.status,400);
            done();    
        })
    }); 
});