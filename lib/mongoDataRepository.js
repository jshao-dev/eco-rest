/**
 * Created by jshao on 11/7/15.
 */
var mongo = require('mongodb').MongoClient;

var connection_string = process.env.ECO_MONGODB_URL || 'mongodb://localhost:27017/eco';
var db;
var collection;

mongo.connect(connection_string, function(err, active_db) {
    if(err) {
        console.error("Cannot connect to server" + connection_string + " due to " + err);
        throw err;
    }
    db = active_db;
    collection = db.collection('data');
    collection.createIndex({name: 1, version: -1}, {unique: true}, function(err, indexName){
        if(err){
            console.error(err);
            throw err;
        }
        console.log('Index "' + indexName + '" was created on collection data.');
        console.log('Service is waiting for requests.');
    });
});

var list = function(filter, verbose, func){
    collection.find({name: {$regex: '.*' + filter + '.*'}}, {_id: 0, value: verbose ? 1 : 0})
        .sort({name: 1, version: -1})
        .toArray(func);
}

var get = function(name, version, func){
    collection.findOne({name: name, version: version}, function(err, doc){
        var ex = err;
        if(!ex && !doc) ex = new Error("Cannot find pack of '" + name + "@" + version + "'");
        func(ex, doc && doc.length ? doc.value : doc);
    });
}

var getLatest = function(name, func){
    collection.find({name: name})
        .sort({version: -1})
        .limit(1)
        .toArray(function(err, docs){
            var ex = err;
            var doc = docs && docs.length ? docs[0].value : null;
            if(!ex && !doc) ex = new Error("Cannot find pack of '" + name + "'");
            func(ex, doc);
        });
}

var add = function(name, version, value, func){
    collection.insert({name: name, version: version, value: value}, func);
}

var remove = function(name, version, func){
    collection.deleteOne({name: name, version: version}, func);
}

var closeConnection = function(){
    if(db){
        db.close();
    }
}

module.exports = {
    list: list,
    get: get,
    getLatest: getLatest,
    add: add,
    remove: remove,
    closeConnection: closeConnection
}
