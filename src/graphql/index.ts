import _ from 'lodash';
import { GraphQLSchema, GraphQLObjectType, GraphQLString, GraphQLList, GraphQLNonNull, GraphQLInt } from 'graphql';

// import database API
import { db } from '$db';

// import object types
import { Company } from '$db/types/Company';

// import object types
import { CompanyType, CityType, SpecialityType } from './object-types';

// create root query
const RootQueryType = new GraphQLObjectType( {
    name: 'RootQueryType',
    fields: {

        // return a list of companies
        companies: {
            type: GraphQLList( CompanyType ),
            args: {
                query: {
                    type: GraphQLString,
                },
                city: {
                    type: GraphQLString,
                },
                specialities: {
                    type: GraphQLList( GraphQLString ),
                },
                offset: {
                    type: GraphQLInt,
                },
                limit: {
                    type: GraphQLInt,
                },
            },
            resolve( _parent: Company, args ) {

                // get companies from the database
                let results = db.get( 'companies' ).value();

                // not no args are provided, return all data
                if( ! args ) {
                    return results;
                }

                /*---------*/

                // filter results based on `search query`
                if( args.query ) {
                    results = results.filter( company => company.name.toLowerCase().startsWith( args.query.toLowerCase() ) );
                }

                // filter results based on `city id`
                if( args.city ) {
                    results = results.filter( company => company.city === args.city );
                }

                // filter results based on `speciality id`
                if( args?.specialities?.length > 0 ) {
                    results = results.filter( company => _.some(
                        company.specialities,
                        speciality => args.specialities.includes( speciality ) ),
                    );
                }

                // paginate results
                if( ! _.isNil( args.offset ) && ! _.isNil( args.limit ) ) {
                    results = results.slice( args.offset, args.offset + args.limit );
                }

                return results;
            }
        },

        // find a company by id
        company: {
            type: CompanyType,
            args: {
                id: {
                    type: GraphQLNonNull( GraphQLString ),
                }
            },
            resolve( _parent: Company, args ) {
                return db.get( 'companies' ).find( { id: args.id } ).value();
            }
        },

        // return a list of cities
        cities: {
            type: GraphQLList( CityType ),
            resolve() {
                return db.get( 'cities' ).value();
            }
        },

        // return a list of specialities
        specialities: {
            type: GraphQLList( SpecialityType ),
            resolve() {
                return db.get( 'specialities' ).value();
            }
        },
    }
} );

// export GraphQL schema
export default new GraphQLSchema( {
    query: RootQueryType,
} );
