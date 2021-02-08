"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const lodash_1 = __importDefault(require("lodash"));
const graphql_1 = require("graphql");
// import database API
const _db_1 = require("$db");
// import object types
const object_types_1 = require("./object-types");
// create root query
const RootQueryType = new graphql_1.GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        // return a list of companies
        companies: {
            type: graphql_1.GraphQLList(object_types_1.CompanyType),
            args: {
                query: {
                    type: graphql_1.GraphQLString,
                },
                city: {
                    type: graphql_1.GraphQLString,
                },
                specialities: {
                    type: graphql_1.GraphQLList(graphql_1.GraphQLString),
                },
                offset: {
                    type: graphql_1.GraphQLInt,
                },
                limit: {
                    type: graphql_1.GraphQLInt,
                },
            },
            resolve(_parent, args) {
                var _a;
                // get companies from the database
                let results = _db_1.db.get('companies').value();
                // not no args are provided, return all data
                if (!args) {
                    return results;
                }
                /*---------*/
                // filter results based on `search query`
                if (args.query) {
                    results = results.filter(company => company.name.toLowerCase().startsWith(args.query.toLowerCase()));
                }
                // filter results based on `city id`
                if (args.city) {
                    results = results.filter(company => company.city === args.city);
                }
                // filter results based on `speciality id`
                if (((_a = args === null || args === void 0 ? void 0 : args.specialities) === null || _a === void 0 ? void 0 : _a.length) > 0) {
                    results = results.filter(company => lodash_1.default.some(company.specialities, speciality => args.specialities.includes(speciality)));
                }
                // paginate results
                if (!lodash_1.default.isNil(args.offset) && !lodash_1.default.isNil(args.limit)) {
                    results = results.slice(args.offset, args.offset + args.limit);
                }
                return results;
            }
        },
        // find a company by id
        company: {
            type: object_types_1.CompanyType,
            args: {
                id: {
                    type: graphql_1.GraphQLNonNull(graphql_1.GraphQLString),
                }
            },
            resolve(_parent, args) {
                return _db_1.db.get('companies').find({ id: args.id }).value();
            }
        },
        // return a list of cities
        cities: {
            type: graphql_1.GraphQLList(object_types_1.CityType),
            resolve() {
                return _db_1.db.get('cities').value();
            }
        },
        // return a list of specialities
        specialities: {
            type: graphql_1.GraphQLList(object_types_1.SpecialityType),
            resolve() {
                return _db_1.db.get('specialities').value();
            }
        },
    }
});
// export GraphQL schema
exports.default = new graphql_1.GraphQLSchema({
    query: RootQueryType,
});
//# sourceMappingURL=index.js.map