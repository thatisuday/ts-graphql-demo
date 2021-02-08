"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CityType = void 0;
const graphql_1 = require("graphql");
// define `City` object type
exports.CityType = new graphql_1.GraphQLObjectType({
    name: 'City',
    fields: () => ({
        id: {
            type: graphql_1.GraphQLString
        },
        name: {
            type: graphql_1.GraphQLString
        },
    })
});
//# sourceMappingURL=city.js.map