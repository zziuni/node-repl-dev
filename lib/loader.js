var colors = require('colors')
    , fs = require('fs' )
    , _ = require('lodash')
    , note = require('./note.js');

var loader = {}
    , userArgs = []
    , packageFile = null
    , modules = []
    , message = [];

var moduleIterator = {}
    , diciderIterator = [
        hasDependencies,
        hasDevDependencies,
        hasJquery,
        hasD3
    ]
    , CON = {
        OPTION: {
            DEV: "-dev",
            JQUERY: "-jquery",
            D3: "-d3"
        }
    };


function setUserArgs(){
    userArgs = process.argv.slice( 2 );
}

function hasDependencies( arg ){
    moduleIterator = _.assign( moduleIterator, packageFile.dependencies );
    return true;
}

function hasDevDependencies( arg ){
    if( arg !== CON.OPTION.DEV ){ return false; }
    moduleIterator = _.assign( moduleIterator, packageFile.devDependencies );
    return true;
}

function hasJquery( arg ){
    if( arg !== CON.OPTION.JQUERY ){ return false; }
//    moduleIterator = _.assign( moduleIterator, { "jquery": "~1.8.3" } );
    moduleIterator = { "jquery": "~1.8.3" };
    return true;
}

function hasD3( arg ){
    if( arg !== CON.OPTION.D3 ){ return false; }
//    moduleIterator = _.assign( moduleIterator, { "d3": "~3.2.5" } );
    moduleIterator = { "d3": "~3.2.5" };
    return true;
}

function loadPackage(){
    try{
        packageFile = JSON.parse( fs.readFileSync( "./package.json", "utf8" ) );
    }catch( e ){
        console.log( 'There is not package.json here. Please go to any npm project root'.red );
        process.exit();
    }
}

function genModuleIterator(){
    diciderIterator.forEach( function( dicider ){
        return dicider( userArgs[0] );
    });
}

function requireModules(  ){
    _( moduleIterator ).forEach( function( version, depName ){
        var isSuccess = false;
        try{
            modules.push( {
                name: depName,
                version: version,
                module: require( depName )
            } );
            isSuccess = true;
        }catch( e ){
//            console.log( "ERROR ".red + e.name + " : "+ e.message  );
        }

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
    genModuleIterator();
};

module.exports  = loader;