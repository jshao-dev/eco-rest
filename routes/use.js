var express = require('express');
var router = express.Router();
var eco = require('../lib/ecoNativeApis');
var nameParser = require('../lib/nameParser');
var _ = require('underscore');
var Promise = require('promise');
var formater = require('../lib/formatConverter');

var merge = function(chain){
    var result = {};
    chain.forEach(function(c){
        result = _.extend(result, c);
    });
    return result;
}

/**
 * Lists all packages.
 */
router.get('/*', function(req, res, next) {
    var segments = _.filter(req.path.split('/'), function(s){return !!s;});
    var names = _.map(segments, function(s){
        return nameParser.parseName(s);
    });
    var promiseList = _.map(names, function(n){
        return eco.get(n.name, n.version);
    });
    var converter = formater[req.query.format];
    Promise.all(promiseList)
        .then(function(result){
            var merged = merge(result);
            if(converter){
                console.dir(converter);
                merged = converter(merged);
            }
            res.send(merged);
        })
        .catch(function(err){
            res.send(err);
        });
});


module.exports = router;