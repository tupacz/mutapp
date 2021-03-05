let chai = require('chai');
let chaiHttp = require('chai-http');
const assert = require('chai').assert;

chai.use(chaiHttp);
const url= 'http://localhost:3000';

describe('Tests Stats Api', () => {
    it('Should return status 200', (done) => {
        chai.request(url).get('/stats').end( (err,res) => {
            assert.equal(res.status,200);
            done();    
        })
    }); 
    
    it('Should have property "count_mutant_dna"', (done) => {
        chai.request(url).get('/stats').end( (err,res) => {
            assert.property(res.body,"count_mutant_dna");
            done();    
        })
    });

    it('Should have property "count_human_dna"', (done) => {
        chai.request(url).get('/stats').end( (err,res) => {
            assert.property(res.body,"count_human_dna");
            done();    
        })
    });

    it('Should have property "ratio"', (done) => {
        chai.request(url).get('/stats').end( (err,res) => {
            assert.property(res.body,"ratio");
            done();    
        })
    });
});