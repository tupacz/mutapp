const GeneticSequence = require("../models/GeneticSequence");

exports.getStats = async function () {
    const [totalMutants, totalHumans] = await Promise.all([
        GeneticSequence.countDocuments({ isMutant: true }),
        GeneticSequence.countDocuments({ isMutant: false })
    ]);

    return {
        count_mutant_dna: totalMutants,
        count_human_dna: totalHumans,
        ratio: totalHumans !== 0 ? totalMutants/totalHumans : 0
    };
}