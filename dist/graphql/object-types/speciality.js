"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SpecialityType = void 0;
const graphql_1 = require("graphql");
// define `Speciality` object type
exports.SpecialityType = new graphql_1.GraphQLObjectType({
    name: 'Speciality',
    fields: () => ({
        id: {
            type: graphql_1.GraphQLString
        },
        name: {
            type: graphql_1.GraphQLString
        },
    })
});
//# sourceMappingURL=speciality.js.map