var express   = require( 'express' )
  , args      = require( 'yargs' ).argv;

var PORT = args.p || args.port || 8001
  , app = express();

app.use( express.static( './client/' ) );

app.listen( PORT, function () {
    console.log( 'Server started at port ', PORT );
});
