/**
 * Created by jshao on 11/8/15.
 */
var parseName = function(nameWithVersion){
    var regex = /(.+)@(.*)/;
    var groups = regex.exec(nameWithVersion);
    return groups ? {
        name: groups[1],
        version: groups[2]
    } : {
        name: nameWithVersion,
        version: null
    }
}

module.exports = {
    parseName: parseName
}