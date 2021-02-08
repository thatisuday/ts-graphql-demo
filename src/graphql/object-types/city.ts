import { GraphQLObjectType, GraphQLString } from 'graphql';

// import object types
import { City } from '$db/types/City';

// define `City` object type
export const CityType = new GraphQLObjectType<City>( {
    name: 'City',
    fields: () => ( {
        id: {
            type: GraphQLString
        },
        name: {
            type: GraphQLString
        },
    } )    
} );
