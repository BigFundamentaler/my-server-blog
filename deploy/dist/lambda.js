"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = void 0;
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const serverless_express_1 = require("@vendia/serverless-express");
let server;
async function bootstrap() {
    process.env.PRISMA_QUERY_ENGINE_BINARY = '/opt/nodejs/node_modules/.prisma/client/libquery_engine-linux-arm64-openssl-3.0.x.so.node';
    const app = await core_1.NestFactory.create(app_module_1.AppModule, {
        logger: ['error', 'warn', 'log'],
    });
    app.enableCors({
        origin: true,
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
        credentials: true,
    });
    await app.init();
    const expressApp = app.getHttpAdapter().getInstance();
    return (0, serverless_express_1.default)({ app: expressApp });
}
const handler = async (event, context, callback) => {
    if (!server) {
        server = await bootstrap();
    }
    return server(event, context, callback);
};
exports.handler = handler;
//# sourceMappingURL=lambda.js.map