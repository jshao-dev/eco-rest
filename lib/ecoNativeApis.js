/**
 * Created by jshao on 11/7/15.
 */
var repository = require('./mongoDataRepository');
var Promise = require('promise');

var createPromise = function(action){
    var args = Array.prototype.slice.call(arguments).slice(1);
    return new Promise(function(resolve, reject){
        var promiseCallback = function(err, result){
            if(err) {
                reject(err);
            }else{
                resolve(result);
            }
        }
        args.push(promiseCallback);
        action.apply(this, args);
    });
}

var list = function(filter, verbose){
    return createPromise(repository.list, filter, verbose);
}

var get = function(name, version){
    return version ? createPromise(repository.get, name, version).then(function(doc){ return doc.value;}) : createPromise(repository.getLatest, name);
}

var add = function(name, version, value){
    return createPromise(repository.add, name, version, value);
}

var remove = function(name, version){
    return createPromise(repository.remove, name, version);
}

module.exports = {
    list: list,
    get: get,
    add: add,
    remove: remove
}