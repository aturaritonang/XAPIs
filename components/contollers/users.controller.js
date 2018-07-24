'use strict';

const MongoClient = require('mongodb').MongoClient;
const templateCtrl = require('./template.controller');

module.exports = exports = function (server) {
    let name = 'users';
    let dbo;

    templateCtrl(server, name);

    server.post('/api/login', (req, res, next) => {
        MongoClient.connect(config.dbconn, async function (err, db) {
            if (err) throw err;
            let userName = req.body.userName;
            let password = req.body.password;
            dbo = db.db(config.dbname);
            await dbo.collection(name)
                .findOne(
                    { 'userName': userName, 'password': password },
                    function (err, response) {
                        if (err) throw err;
                        delete response.password;
                        delete response.createDate;
                        delete response.modifyDate;
                        res.send(200, response);
                        db.close();
                    });
        });
    });
}