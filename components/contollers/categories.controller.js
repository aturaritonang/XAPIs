'use strict';

const MongoClient = require('mongodb').MongoClient;
const templateCtrl = require('./template.controller');
const model = {
    initial : '',
    name : '', 
    active: 0
}

module.exports = exports = function(server){
    let name = 'categories';
    let dbo;
    
    templateCtrl(server, name);
    server.get('/api/categoryName', (req, res, next) => {
        MongoClient.connect(config.dbconn, function (err, db) {
            if (err) throw err;
            dbo = db.db(config.dbname);
            dbo.collection(name)
                .aggregate([{$project:{initial:1}}])
                .toArray(function (err, response) {
                if (err) throw err;
                res.send(200, response);
                db.close();
            });
        });
    });
}