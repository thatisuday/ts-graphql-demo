"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const config_1 = __importDefault(require("config"));
const express_graphql_1 = require("express-graphql");
// register module alias (check `package.json`)
const module_alias_1 = __importDefault(require("module-alias"));
module_alias_1.default.addAliases({
    "$db": path_1.default.resolve(__dirname, 'db'),
    "$graphql": path_1.default.resolve(__dirname, 'graphql'),
});
// import GraphQL assets
const _graphql_1 = __importDefault(require("$graphql"));
// get configuration
const VERSION = config_1.default.get('version');
const SERVER_PROTOCOL = config_1.default.get('server.protocol');
const SERVER_HOST = config_1.default.get('server.host');
const SERVER_PORT = config_1.default.get('server.port');
const ENABLE_GRAPHIQL = config_1.default.get('graphql.graphiql');
// create express application
const app = express_1.default();
// enable CORS
app.use(cors_1.default());
// add delay effect (testing purpose only)
app.use((req, res, next) => {
    setTimeout(next, 1000);
});
// default endpoint response
app.get('/', (req, res) => {
    return res.send(`API Version : v${VERSION}`);
});
// GraphQL API endpoint
app.use('/graph', express_graphql_1.graphqlHTTP({
    schema: _graphql_1.default,
    graphiql: ENABLE_GRAPHIQL,
}));
/************************/
// run express application
app.listen(SERVER_PORT, () => {
    const endpoint = `${SERVER_PROTOCOL}://${SERVER_HOST}:${SERVER_PORT}`;
    console.log(`Application started at: ${endpoint}`);
});
//# sourceMappingURL=server.js.map