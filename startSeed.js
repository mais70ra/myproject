var bus = require('./server/bus');
bus.init()
.then(() => {
    require('./seed').init(bus);
});
