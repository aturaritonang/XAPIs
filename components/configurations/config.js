'use strict';

module.exports = {
    port: process.env.PORT || 8000,
    dbconn: process.env.PORT ? 'mongodb://admin:admin1234@ds145921.mlab.com:45921/xdatabase' : 'mongodb://localhost:27017/xdatabase',
    dbname: 'xdatabase'
}
// dbconn: 'mongodb://localhost:27017/xdb',
// dbname: 'xdb'
// dbconn: 'mongodb://admin:admin1234@ds145921.mlab.com:45921/xdatabase',
// dbname: 'xdatabase'
