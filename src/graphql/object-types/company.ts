import { GraphQLObjectType, GraphQLString, GraphQLList } from 'graphql';

// import database API
import { db } from '$db';

// import object types
import { Company } from '$db/types/Company';

// import GraphQL types
import { CityType } from './city';
import { SpecialityType } from './speciality';

// define `Company` object type
export const CompanyType = new GraphQLObjectType<Company>( {
    name: 'Company',
    fields: () => ( {
        id: {
            type: GraphQLString
        },
        name: {
            type: GraphQLString
        },
        logo: {
            type: GraphQLString
        },
        email: {
            type: GraphQLString
        },
        phone: {
            type: GraphQLString
        },
        address: {
            type: GraphQLString
        },
        about: {
            type: GraphQLString
        },
        registered: {
            type: GraphQLString
        },
        
        // populate `City` objects 
        city: {
            type: CityType,
            resolve( parent ) {
                return db.get( 'cities' ).find( { id: parent.city } ).value();
            }
        },

        // populate `Speciality` objects
        specialities: {
            type: GraphQLList( SpecialityType ),
            resolve( parent ) {
                const ids = parent.specialities || [];
                return db.get( 'specialities' ).filter( item => ids.includes( item.id ) ).value();
            }
        }
    } ),
} );