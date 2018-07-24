'use strict';

const ObjectId = require('mongodb').ObjectID;

module.exports = function(entity){
    if(entity.categoryId){
        entity.categoryId = ObjectId(entity.categoryId);
    } 
    if(entity.userId){
        entity.userId = ObjectId(entity.userId);
    } 
    if(entity.productId){
        entity.productId = ObjectId(entity.productId);
    } 
    if(entity.createBy){
        entity.createBy = ObjectId(entity.createBy);
    } 
    if(entity.modifyBy){
        entity.modifyBy = ObjectId(entity.modifyBy);
    }
}