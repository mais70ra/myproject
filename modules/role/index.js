var bus;
module.exports = {
    init: function(b) {
        bus = b;
    },
    get: function(msg) {
        return bus.call('db.query', 'role', 'create', msg);
    },
    add: function(msg) {
        return bus.call('db.query', 'role', 'create', msg);
    }
};
