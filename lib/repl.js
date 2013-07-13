var replD = require( "repl" )
    , fs = require( "fs" )
    , colors = require( 'colors' )
    , logErrors = require( 'log-errors' )
    , _ = require( "lodash" )
    , $ = require( "jquery" )
    , d3 = require( "d3" )
    , dependencies = []
    , devDependencies = []
    , packageFile = null

var options = {
        useGlobal: true,
        prompt: "Dev >",
        ignoreUndefined: false
    }
    , alias = {
        "jquery": "$"
    }
    , logProd = logErrors.production
    , logDev = logErrors.development;

try{
    packageFile = JSON.parse( fs.readFileSync( "./package.json", "utf8" ) );
    dependencies = packageFile.dependencies || {};
    devDependencies = packageFile.devDependencies || {};
}catch( e ){
    logDev( e );
    process.exit();
}

var repl = function(){

    var iterator = dependencies;
    var modules = [];
    var message = [];

    function setMessage( isSuccess, info ){
        var msg = null;
        if( isSuccess ){
            msg = colors.green( info.depName ).bold + "(" + info.version + ") module loaded."
        }else{
            msg = colors.red( info.depName ).bold + "(" + info.version + ") module can't loaded. please npm install"
        }
        message.push( msg )
    }

    //generate module.
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

    //print message
    console.log( '\nLoading modules by package.json'.bold.inverse );
    _( message ).forEach( function( msg ){
        console.log( msg );
    } );
    console.log( '\nCompleted loading'.bold  );
    console.log( 'You can access each module by the Module\'s names\n'.bold.inverse );

    //Create REPL
    replD = replD.start( options );

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


