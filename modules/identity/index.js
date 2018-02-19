var when = require('when');
var bus;
module.exports = {
    init: function(b) {
        bus = b;
    },
    check: function(msg) {
        return bus.call('user.get')
        .then(function(users) {
            var user;
            users.forEach(function(v, k) {
                if (msg.username === v.username && msg.password === v.password) {
                    user = {
                        id: v.id,
                        username: v.username
                    };
                }
            });
            if (user) {
                return when.resolve(user);
            } else {
                return when.reject({
                    success: false,
                    message: 'Ti ne si Dido'
                });
            }
        });
    }
};
