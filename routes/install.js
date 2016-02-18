var express = require('express');
var router = express.Router();
var eco = require('../lib/ecoNativeApis');
var nameParser = require('../lib/nameParser');
var _ = require('underscore');
var Promise = require('promise');


/**
 * Lists all packages.
 */
router.get('/ps1', function(req, res, next) {

});


module.exports = router;