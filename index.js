var options = {useGlobal:true}
    , alias = {
        "jquery": "$"
    }

var replD = require("repl").start( options )
    , fs = require("fs")
    , _ = require("lodash")
    , depandencies, devDepandencies;

var package = require("./package.json");

dependencies = package.dependencies || {};
devDependencies = package.devDependencies || {};

var iterator = [dependencies, devDependencies];
var successedModule = [];

console.log( '===============================' );

_( iterator ).forEach( function( deps ){
    successedModule = _( deps ).filter( function( versionString, moduleName ){
        try{
            var module = alias[moduleName ] || moduleName
            replD.context[ module  ] = require( moduleName );
            console.log( "'" + moduleName + "' " + versionString + " loaded.");
        }catch(e){
            console.log( "'" + moduleName + "' " + versionString + " can't loaded.");
        }
    })
});

console.log( '===============================' );

replD.on("exit", function(){
    console.log( '===============================' );
    console.log("replD is exiting, Good by~");
    console.log( '===============================' );
});
