var express = require('express');
var router = express.Router();
var eco = require('../lib/ecoNativeApis');
var promise = require('promise');

var defaulThenCatch = function(promise, res){
    promise.then(function(result){
            res.send(result);
        })
        .catch(function(err){
            res.statusCode = 500;
            res.send(err);
        });
}

/**
 * Lists all packages.
 */
router.get('/', function(req, res, next) {
    var filter = req.query.filter || '';
    var verbose = !!req.query.verbose;
    var p = eco.list(filter, verbose);
    defaulThenCatch(p, res);
});

/**
 * Gets the latest version of the package.
 */
router.get('/:name', function(req, res, next){
    var name = req.params.name;
    var p = eco.get(name);
    defaulThenCatch(p, res);
});

/**
 * Gets specific version of the pacakge.
 */
router.get('/:name/:version', function(req, res, next){
    var name = req.params.name;
    var version = req.params.version;
    var p = eco.get(name, version);
    defaulThenCatch(p, res);
});

/**
 * Adds a new package with specific version, which is required.
 */
router.put('/:name/:version', function(req, res, next){
    var name = req.params.name;
    var version = req.params.version;
    var p = eco.add(name, version, req.body);
    defaulThenCatch(p, res);
});

/**
 * Removes a specific version of the package.
 */
router.delete('/:name/:version', function(req, res, next){
    var name = req.params.name;
    var version = req.params.version;
    var p = eco.remove(name, version);
    defaulThenCatch(p, res);
});

module.exports = router;
