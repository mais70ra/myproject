var bus;
module.exports = {
    init: function(b) {
        bus = b;
    },
    get: function(msg) {
        if (msg && msg.id) {
            return Promise.resolve(users[msg.id]);
        } else {
            return Promise.resolve(users);
        }
    },
    add: function(msg) {
        return bus.call('db.query', 'user', 'create', msg);
    }
};
