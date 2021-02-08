"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CompanyType = void 0;
const graphql_1 = require("graphql");
// import database API
const _db_1 = require("$db");
// import GraphQL types
const city_1 = require("./city");
const speciality_1 = require("./speciality");
// define `Company` object type
exports.CompanyType = new graphql_1.GraphQLObjectType({
    name: 'Company',
    fields: () => ({
        id: {
            type: graphql_1.GraphQLString
        },
        name: {
            type: graphql_1.GraphQLString
        },
        logo: {
            type: graphql_1.GraphQLString
        },
        email: {
            type: graphql_1.GraphQLString
        },
        phone: {
            type: graphql_1.GraphQLString
        },
        address: {
            type: graphql_1.GraphQLString
        },
        about: {
            type: graphql_1.GraphQLString
        },
        registered: {
            type: graphql_1.GraphQLString
        },
        // populate `City` objects 
        city: {
            type: city_1.CityType,
            resolve(parent) {
                return _db_1.db.get('cities').find({ id: parent.city }).value();
            }
        },
        // populate `Speciality` objects
        specialities: {
            type: graphql_1.GraphQLList(speciality_1.SpecialityType),
            resolve(parent) {
                const ids = parent.specialities || [];
                return _db_1.db.get('specialities').filter(item => ids.includes(item.id)).value();
            }
        }
    }),
});
//# sourceMappingURL=company.js.map