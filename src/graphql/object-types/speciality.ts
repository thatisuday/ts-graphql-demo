import { GraphQLObjectType, GraphQLString } from 'graphql';

// import object types
import { Speciality } from '$db/types/Speciality';

// define `Speciality` object type
export const SpecialityType = new GraphQLObjectType<Speciality>( {
    name: 'Speciality',
    fields: () => ( {
        id: {
            type: GraphQLString
        },
        name: {
            type: GraphQLString
        },
    } )    
} );
