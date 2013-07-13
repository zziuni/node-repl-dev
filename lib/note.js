var colors = require('colors')
    , _ = require('lodash');

var note = {};
var requiredInfo = [];

note.setRequiredInfo = function( isSuccess, info ){
    var msg = null;
    if( isSuccess ){
        msg = colors.green( info.depName ).bold + "(" + info.version + ") module loaded.\n"
    }else{
        msg = colors.red( info.depName ).bold + "(" + info.version + ") module can't loaded. please npm install\n"
    }
    requiredInfo.push( msg )
}

note.printRequiredInfo = function(){
    var info = [];
    info.push( '\n Loading modules by package.json                  \n'.bold.inverse );
    _( requiredInfo ).forEach( function( msg ){
        info.push( msg );
    } );
    info.push( 'Completed loading\n'.bold );
    info.push( ' You can access each module by the Module\'s names \n'.bold.inverse );

    console.log( info.join( "" ) );
};


module.exports = note;