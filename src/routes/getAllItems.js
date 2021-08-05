'use strict';

const mockDBCalls = require('../database/index.js');

const getAllItemsHandler = async  (req, res,next) =>{
    try{
        const itemSet = await mockDBCalls.getAllItems();
        return res.status(200).send(JSON.stringify(itemSet));
    }
    catch (err){
        return next(err);
    }
}

module.exports = (app) =>{
    app.get('/items', getAllItemsHandler);
}

