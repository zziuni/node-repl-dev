var colors = require('colors')
    , fs = require('fs' )
    , _ = require('lodash')
    , note = require('./note.js');

var loader = {}
    , userArgs = []
    , packageFile = null
    , dependencies = null
    , devDependencies = null
    , modules = []
    , message = [];

var iterator = {};


function setUserArgs(){
    userArgs = process.argv.slice( 2 );
}

function loadPackage(){
    try{
        packageFile = JSON.parse( fs.readFileSync( "./package.json", "utf8" ) );
        dependencies = packageFile.dependencies || {};
        devDependencies = packageFile.devDependencies || {};
    }catch( e ){
        console.log( 'There is not package.json here. Please go to any npm project root'.red );
        process.exit();
    }
}

function genIterator(){
    iterator = dependencies;
}

function requireModules(  ){
    _( iterator ).forEach( function( version, depName ){
        var isSuccess = false;
        try{
            modules.push( {
                name: depName,
                module: require( depName )
            } );
            isSuccess = true;
        }catch( e ){ }

        note.setRequiredInfo( isSuccess, {version: version, depName: depName} );
    } );
    return modules;
}

loader.loadModules = function(){
    return requireModules();
};

loader.getResultMessage = function (  ){
    return message;
};

loader.init = function( ){
    setUserArgs();
    loadPackage();
    genIterator();
};

module.exports  = loader;