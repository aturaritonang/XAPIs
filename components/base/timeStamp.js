'use strict';

module.exports = function(entity, req){
    if(req.method === 'POST'){
        entity.createDate = new Date();
        entity.modifyDate = new Date();
    } else if(req.method === 'PUT'){
        entity.modifyDate = new Date();
    }
}