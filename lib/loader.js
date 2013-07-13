var colors = require('colors')
    , fs = require('fs' )
    , _ = require('lodash')
    , logErrors = require( 'log-errors' );

var loader = {}
    , userArgs = []
    , packageFile = null
    , dependencies = null
    , devDependencies = null
    , logProd = logErrors.production
    , logDev = logErrors.development
    , modules = []
    , message = [];

var iterator = {};


function setMessage( isSuccess, info ){
    var msg = null;
    if( isSuccess ){
        msg = colors.green( info.depName ).bold + "(" + info.version + ") module loaded.\n"
    }else{
        msg = colors.red( info.depName ).bold + "(" + info.version + ") module can't loaded. please npm install\n"
    }
    message.push( msg )
}

function setUserArgs(){
    userArgs = process.argv.slice( 2 );
}

function loadPackage(){
    try{
        packageFile = JSON.parse( fs.readFileSync( "./package.json", "utf8" ) );
        dependencies = packageFile.dependencies || {};
        devDependencies = packageFile.devDependencies || {};
    }catch( e ){
        logDev( e );
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
        }catch( e ){
        }

        setMessage( isSuccess, {version: version, depName: depName} );
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