'use strict';

const MongoClient = require('mongodb').MongoClient;
const templateCtrl = require('./template.controller');
const ObjectId = require('mongodb').ObjectID;

module.exports = exports = function (server) {
    let name = 'tables';
    let dbo;

    templateCtrl(server, name);
    //tabresord: tables reservations and orders
    server.get('/api/tablesinfo', (req, res, next) => {
        MongoClient.connect(config.dbconn, function (err, db) {
            if (err) throw err;
            dbo = db.db(config.dbname);
            dbo.collection(name)
                .aggregate([
                    { $lookup: { from: 'reservations', localField: '_id', foreignField: 'tableId', as: 'reservation' } },
                    { $unwind: { path: '$reservation', 'preserveNullAndEmptyArrays': true } },
                    { $lookup: { from: 'orders', localField: 'reservation._id', foreignField: 'reservationId', as: 'orders' } },
                    { $lookup: { from: 'products', localField: 'orders.productId', foreignField: '_id', as: 'products' } },
                    {
                        $project: {
                            '_id': 1,
                            'initial': 1,
                            'description': 1,
                            'reservation._id': 1,
                            'reservation.guest': 1,
                            'orders._id': 1,
                            'orders.status': 1,
                            'orders.quantity': 1,
                            'orders.productId': 1,
                            'products._id': 1,
                            'products.name': 1
                        }
                    },
                ])
                .toArray(function (err, response) {
                    if (err) throw err;
                    res.send(200, response);
                    db.close();
                });
        });
    });

    server.get('/api/tablesinfo/:id', (req, res, next) => {
        MongoClient.connect(config.dbconn, function (err, db) {
            if (err) throw err;
            let id = req.params.id;
            dbo = db.db(config.dbname);
            dbo.collection(name)
                .aggregate([
                    { $lookup: { from: 'reservations', localField: '_id', foreignField: 'tableId', as: 'reservation' } },
                    { $unwind: { path: '$reservation', 'preserveNullAndEmptyArrays': true } },
                    { $lookup: { from: 'orders', localField: 'reservation._id', foreignField: 'reservationId', as: 'orders' } },
                    { $lookup: { from: 'products', localField: 'orders.productId', foreignField: '_id', as: 'products' } },
                    {
                        $project: {
                            '_id': 1,
                            'initial': 1,
                            'description': 1,
                            'reservation._id': 1,
                            'reservation.guest': 1,
                            'orders._id': 1,
                            'orders.status': 1,
                            'orders.quantity': 1,
                            'orders.productId': 1,
                            'products._id': 1,
                            'products.name': 1
                        }
                    },
                    { $match : { _id: ObjectId(id)} }
                ])
                .toArray(function (err, response) {
                    if (err) throw err;
                    res.send(200, response);
                    db.close();
                });
        });
    });
}