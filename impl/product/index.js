var bus;
module.exports = {
    init: function(b) {
        bus = b;
    },
    findAll: function(msg) {
        return bus.call('db.query', 'product', 'findAll', {});
    },
    add: function(msg) {
        return bus.call('db.query', 'product', 'create', msg);
    }
};
