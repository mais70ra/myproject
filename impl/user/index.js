var bus;
module.exports = {
    init: function(b) {
        bus = b;
    },
    findAll: function(msg) {
        return bus.call('db.query', 'user', 'findAll', { 
            offset: msg.page || 0,
            limit: msg.limit || 10
        });
    },
    add: function(msg) {
        msg.loginAttempts = 0;
        return bus.call('db.query', 'user', 'create', msg);
    },
    login: function(msg) {
        return bus.call('db.query', 'user', 'findAll', {
            where: {
                username: msg.username
            }
        })
        .then(resp => {
            if (resp[0]) {
                if (resp[0].status === 'active') {
                    return bus.call('db.query', 'user', 'findAll', {
                        where: {
                            status: 'active',
                            username: msg.username,
                            password: msg.password
                        }
                    })
                    .then(user => {
                        if (user[0]) {
                            return user[0];
                        } else {
                            resp[0].loginAttempts = resp[0].loginAttempts + 1;
                            return bus.call('db.query', 'user', 'update', {
                                loginAttempts: resp[0].loginAttempts,
                                status: resp[0].loginAttempts === bus.config.loginAttempts ? 'locked' : 'active',
                            }, {
                                where: {
                                    username: msg.username
                                }
                            })
                            .then(() => {
                                if (resp[0].loginAttempts === bus.config.loginAttempts) {
                                    throw new Error('reached_login_attempts');
                                } else {
                                    throw new Error('invalid_credentials');
                                }
                            });
                        }
                    });
                } else if (resp[0].status === 'locked') { 
                    throw new Error('user_locked');
                } else { 
                    throw new Error('user_inactive');
                }
            } else {
                throw new Error('invalid_credentials');
            }
        });
    }
};