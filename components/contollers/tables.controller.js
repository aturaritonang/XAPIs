'use strict';

const MongoClient = require('mongodb').MongoClient;
const templateCtrl = require('./template.controller');

module.exports = exports = function (server) {
    let name = 'tables';
    let dbo;

    templateCtrl(server, name);
    //tabresord: tables reservations and orders
    server.get('/api/tabresord', (req, res, next) => {
        MongoClient.connect(config.dbconn, function (err, db) {
            if (err) throw err;
            //dbo = db.db(config.dbname);
            db.collection(name)
                .aggregate([
                    { $lookup: { 
                        from: 'reservations', 
                        localField: '_id', 
                        foreignField: 'tableId', 
                        as: 'reservation' }},
                    { $unwind: { 
                        path: '$reservation', 
                        'preserveNullAndEmptyArrays': true }},
                    { $lookup: { 
                        from: 'orders', 
                        localField: 'reservation._id', 
                        foreignField: 'reservationId', 
                        as: 'orders' }},
                    {
                        $project: {
                            '_id': 1,
                            'initial': 1,
                            'description': 1,
                            'reservation._id': 1,
                            'reservation.guest': 1,
                            'orders': 1
                        }
                    }
                ])
                .toArray(function (err, response) {
                    if (err) throw err;
                    res.send(200, response);
                    db.close();
                });
        });
    });
}