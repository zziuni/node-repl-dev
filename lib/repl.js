var replD = require( "repl" )
    , fs = require( "fs" )
    , colors = require( 'colors' )
    , _ = require( "lodash" )
    , loader = require("./loader.js")
    , note = require("./note.js");

var options = { useGlobal: true, prompt: "Dev>", ignoreUndefined: false }
    , alias = { "jquery": "$" };

loader.init();

var repl = function(){

    var modules = loader.loadModules();

    //print message
    note.printRequiredInfo();

    //Create REPL
    replD = replD.start( options );

    //setting REPL Context
    _( modules ).forEach( function( module ){
        var name = alias[module.name ] || module.name;
        replD.context[ name ] = module.module;
        delete module.module;
    } );

    replD.context["_m"] = modules;

    replD.on( "exit", function(){
        console.log( " Good by ".bold.inverse );
    } );
};

repl.prototype = {};

module.exports = repl;


