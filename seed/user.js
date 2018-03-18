'use strict';
let seeds = [
    {
        method: 'user.create',
        params: {
            username: 'admin',
            password: '123',
            email: 'admin@admin.bg',
            phone: '088888888',
            firstName: 'Admin',
            lastName: 'Admin',
            middleName: 'Admin'
        }
    }
];
for (var i = 0; i < 100; i++) {
    seeds.push({
        method: 'user.create',
        params: {
            username: 'admin' + i,
            password: '123',
            email: 'admin' + i + '@admin.bg',
            phone: '0888888' + i,
            firstName: 'Admin' + i,
            lastName: 'Admin' + i,
            middleName: 'Admin' + i
        }
    });
}
module.exports = seeds;
