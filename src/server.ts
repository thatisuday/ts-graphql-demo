import path from 'path';
import express from 'express';
import cors from 'cors';
import config from 'config';
import { graphqlHTTP } from 'express-graphql';

// register module alias (check `package.json`)
import moduleAlias from 'module-alias';
moduleAlias.addAliases( {
    "$db": path.resolve( __dirname, 'db' ),
    "$graphql": path.resolve( __dirname, 'graphql' ),
} );

// import GraphQL assets
import graphQLSchema from '$graphql';

// get configuration
const VERSION = config.get<string>( 'version' );
const SERVER_PROTOCOL = config.get<string>( 'server.protocol' );
const SERVER_HOST = config.get<string>( 'server.host' );
const SERVER_PORT = config.get<string>( 'server.port' );
const ENABLE_GRAPHIQL = config.get<boolean>( 'graphql.graphiql' );

// create express application
const app = express();

// enable CORS
app.use( cors() );

// add delay effect (testing purpose only)
app.use( ( req, res, next ) => {
    setTimeout( next, 1000 );
} );

// default endpoint response
app.get( '/', ( req, res ) => {
    return res.send( `API Version : v${VERSION}` );
} );

// GraphQL API endpoint
app.use( '/graph', graphqlHTTP( {
    schema: graphQLSchema,
    graphiql: ENABLE_GRAPHIQL, // enable GraphQL GUI
} ) );

/************************/

// run express application
app.listen( SERVER_PORT, () => {
    const endpoint = `${SERVER_PROTOCOL}://${SERVER_HOST}:${SERVER_PORT}`;
    console.log( `Application started at: ${endpoint}` );
} );
