import Fastify from 'fastify';
import jwt from '@fastify/jwt'
import createError from '@fastify/error';
import main from './routes/main.js'
import login from "./routes/login.js";

const TestError = createError("TestError", "Something went wrong", 501);

export async function build(opts) {
    const app = Fastify(opts)
    app.register(jwt, {
        secret: "additionalTextForDecoding",
        verify: { extractToken: (request) => request.headers.customauth }
    })

    app.register(main);
    app.register(login);


    app.get('/error', async (request, reply) => {
        throw new TestError();
    })

    app.get('/send-to-not-found', (request, reply) => {
        request.log.info('sending to not found');
        reply.callNotFound();
    })

    app.setErrorHandler(async function (err, request, reply) {
        request.log.error({ err })
        reply.code(err.statusCode || 500);
        return { error: err.message }
    })

    app.setNotFoundHandler(async (request, reply) => {
        reply.code(404);
        return { error: 'Not found' }
    })

    return app;
}