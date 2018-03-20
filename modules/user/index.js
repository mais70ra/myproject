var bus;
var CryptoJS = require('crypto-js');

module.exports = {
    init: function(b) {
        bus = b;
    },
    checkSession: function(msg) {
        return Promise.resolve(msg);
    },
    findAll: function(msg) {
        msg.paging.pageSize = msg.paging.pageSize || 5;
        msg.paging.pageNumber = msg.paging.pageNumber || 1;
        return bus.call('db.send', 'user', 'findAndCountAll', {
            where: {
                username: msg.username
            }
        })
        .then(data => {
            let pages = Math.ceil(data.count / msg.paging.pageSize);
            let offset = msg.paging.pageSize * (msg.paging.pageNumber - 1);
            return bus.call('db.send', 'user', 'findAll', {
                offset: offset,
                limit: msg.paging.pageSize
            })
            .then(results => {
                return {
                    results: results,
                    pagination: {
                        pagesTotal: pages,
                        recordsTotal: data.count,
                        pageNumber: msg.paging.pageNumber
                    }
                };
            });
        });
    },
    create: function(msg) {
        msg.loginAttempts = 0;
        msg.password = CryptoJS.MD5(msg.password).toString();
        return bus.call('db.send', 'user', 'create', msg)
        .then((user) => {
            user.password = undefined;
            return user;
        });
    },
    login: function(msg) {
        return bus.call('db.send', 'user', 'findAll', {
            where: {
                username: msg.username
            }
        })
        .then(resp => {
            if (resp[0]) {
                if (resp[0].status === 'active') {
                    return bus.call('db.send', 'user', 'findAll', {
                        where: {
                            status: 'active',
                            username: msg.username,
                            password: CryptoJS.MD5(msg.password).toString()
                        }
                    })
                    .then(user => {
                        if (user[0]) {
                            return {
                                data: {
                                    user: user[0]
                                },
                                response: {
                                    resultCode: 0
                                }
                            };
                        } else {
                            resp[0].loginAttempts = resp[0].loginAttempts + 1;
                            return bus.call('db.send', 'user', 'update', {
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
