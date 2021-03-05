const assert = require('chai').assert;
const StatsService = require('../service/statsService'); //imports the Pokemon model.
const mongoose = require('mongoose');

describe('Tests Stats Service', () => {
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

    it('If Ratio calculation tends to infinity, get 0 as value', async () => {
        const stats = await StatsService.getStats();
        if (stats.count_human_dna === 0) assert.equal(stats.ratio, 0);
    });

    it('The returned object must have property "count_mutant_dna"', async () => {
        const stats = await StatsService.getStats();
        assert.property(stats,"count_mutant_dna");
    });

    it('The returned object must have property "count_human_dna"', async () => {
        const stats = await StatsService.getStats();
        assert.property(stats,"count_human_dna");
    });

    it('The returned object must have property "ratio"', async () => {
        const stats = await StatsService.getStats();
        assert.property(stats,"ratio");
    });

    it('All properties must return numbers ', async () => {
        const stats = await StatsService.getStats();
        const typeofProperties = typeof stats.count_mutant_dna === 'number' ||
            typeof stats.count_human_dna === 'number' ||
            typeof stats.ratio === 'number';
        assert.equal(typeofProperties, true);
    })

    it('Ratio division must be correct', async () => {
        const stats = await StatsService.getStats();
        const division = stats.count_mutant_dna / stats.count_human_dna;
        const ratio = (!isFinite(division) || Number.isNaN(division)) ? 0 : division;
        assert.equal(stats.ratio, ratio);
    });

    after((done) => {
        mongoose.connection.close(done);
    });

});