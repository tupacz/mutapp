const assert = require('chai').assert;
const StatsService = require('../service/statsService'); //imports the Pokemon model.
const mongoose = require('mongoose');

describe('Tests de Stats Service', () => {
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

    it('Cálculo de ratio tendiendo a infinito', async () => {
        const stats = StatsService.getStats();
        if (stats.count_human_dna === 0) assert.equal(stats.ratio, 0);
    });

    it('El objeto devuelto debe tener "count_mutant_dna"', async () => {
        const stats = await StatsService.getStats();
        assert.equal(stats.hasOwnProperty('count_mutant_dna'), true);
    });

    it('El objeto devuelto debe tener "count_human_dna"', async () => {
        const stats = await StatsService.getStats();
        assert.equal(stats.hasOwnProperty('count_human_dna'), true);
    });

    it('El objeto devuelto debe tener "ratio"', async () => {
        const stats = await StatsService.getStats();
        assert.equal(stats.hasOwnProperty('ratio'), true);
    });

    it('Todos los elementos deben devolver números', async () => {
        const stats = await StatsService.getStats();
        const typeofProperties = typeof stats.count_mutant_dna === 'number' ||
            typeof stats.count_human_dna === 'number' ||
            typeof stats.ratio === 'number';
        assert.equal(typeofProperties, true);
    })

    it('La división en Ratio debe ser correcta', async () => {
        const stats = await StatsService.getStats();
        const division = stats.count_mutant_dna / stats.count_mutant_dna;
        const ratio = (!isFinite(division) || Number.isNaN(division)) ? 0 : division;
        assert.equal(stats.ratio, ratio);
    });

    after((done) => {
        mongoose.connection.close(done);
    });

});

/*if (stats.ratio === Infinity) {
    throw new Error("El cálculo de ratio es erróneo. Al dividirse por 0, se optó que el resultado también sea 0.");
}

stats.count_human_dna = 0;

if (stats.ratio === Infinity) {
    throw new Error("El cálculo de ratio es erróneo. Al dividirse por 0, se optó que el resultado también sea 0.");
}

stats.count_mutant_dna = 40
stats.count_human_dna = 100

if(stats.ratio !== 0.4) {
    throw new Error("El cálculo del ratio es erróneo");
}*/