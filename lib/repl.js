var replD = require( "repl" )
    , fs = require( "fs" )
    , loader = require("./loader.js")
    , colors = require( 'colors' )
    , _ = require( "lodash" );

var options = { useGlobal: true, prompt: "Dev >", ignoreUndefined: false }
    , alias = { "jquery": "$" };

loader.init();

var repl = function(){

    var modules = loader.loadModules();
    var resultMessage = loader.getResultMessage();

    //print message
    var info = [];
    info.push( '\nLoading modules by package.json\n'.bold.inverse );
    _( resultMessage ).forEach( function( msg ){
        info.push( msg );
    } );
    info.push( '\nCompleted loading\n'.bold );
    info.push( 'You can access each module by the Module\'s names\n'.bold.inverse );
    console.log( info.join( "" ) );

    //Create REPL
    replD = replD.start( options );

    //setting REPL Context
    _( modules ).forEach( function( module ){
        var name = alias[module.name ] || module.name;
        replD.context[ name ] = module.module;
    } );

    replD.on( "exit", function(){
        console.log( "Good by".bold.inverse );
    } );
};

repl.prototype = {};

module.exports = repl;


