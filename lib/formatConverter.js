var _ = require('underscore');

var flattenObject = function(obj){
    var ret = _.clone(obj);
    var needsLoop = true;
    while(needsLoop){
        needsLoop = false;
        Object.keys(ret).forEach(function(k){
            var value = ret[k];
            if(_.isObject(value) || _.isArray(value)){
                delete ret[k];
                Object.keys(value).forEach(function(subKey){
                    ret[k + '.' + subKey] = value[subKey];
                });
                needsLoop = true;
            }
        });
    }
    return ret;
}


var ps1Converter = function(obj){
    var flat = flattenObject(obj);
    var list = Object.keys(flat).map(function(k){
        var ps1Value = (flat[k] + '').replace("'", "`'");
        return "${env:" + k + "}='" + ps1Value + "';";
    })
    return list.join("\n");
}

var batConverter = function(obj){
    var flat = flattenObject(obj);
    return flat;
}

var rubyConverter = function(obj){
    var flat = flattenObject(obj);
    return flat;
}

var nodeConverter = function(obj){
    var flat = flattenObject(obj);
    var list = Object.keys(flat).map(function(k){
        var ps1Value = (flat[k] + '').replace("'", "\'");
        return "process.env['" + k + "']='" + ps1Value + "';";
    })
    return list.join("\n");
}

module.exports = {
    ps1: ps1Converter,
    bat: batConverter,
    rb: rubyConverter,
    node: nodeConverter
}