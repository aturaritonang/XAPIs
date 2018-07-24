'use strict';

const restify = require('restify');
const corsMidWare = require('restify-cors-middleware');

const server = restify.createServer({
    name: 'X Kitchen API',
    version: '1.0.0'
})

server.use(restify.plugins.bodyParser());

const cors = corsMidWare({
    origins: ['*'],
    allowHeaders: ['X-App-Version'],
    exposeHeaders: []
});

server.pre(cors.preflight);
server.use(cors.actual);

server.get('/', (req, res, next) => {
    var body = '<html><body>X Kitchen API Web Service with Restify. Enjoy javascript...</body></html>';
    res.writeHead(200, {
        'Content-Length' : Buffer.byteLength(body),
        'Content-Type' : 'text/html'
    });
    res.write(body);
    res.end();
})

global.config = require('./components/configurations/config');

//users router
require('./components/contollers/users.controller')(server);

//category router
require('./components/contollers/categories.controller')(server);

//product router
require('./components/contollers/products.controller')(server);

//test router
require('./components/contollers/template.controller')(server, 'tests');

server.listen(config.port, function(){
    console.log('%s listen at  %s', server.name, server.url);
})