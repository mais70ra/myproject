let seeds = [];
seeds = seeds.concat(require('./user'));

module.exports = {
    init: function(bus) {
        let promises = [];
        seeds.forEach(function(seed) {
            promises.push(bus.call(seed.method, seed.params));
        });
        Promise.all(promises)
        .then(() => {
            console.log('Successful seed!');
            process.exit();
        })
        .catch(e => {
            console.log(e);
            process.exit();
        });
    }
}
