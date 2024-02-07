import Fastify from 'fastify';
import createError from '@fastify/error';

const TestError = createError("TestError", "Something went wrong", 501);

export async function build(opts) {
    const app = Fastify(opts)

    app.get('/', async (request, reply) => {
        reply.send({ hello: 'world' })
    });

    app.get('/login', async (request, reply) => {
        reply.send({ response: "some login response" })
    })

    app.get('/test', async (request, reply) => {
        return { test: "test" }
    })

    app.get('/error', async (request, reply) => {
        throw new TestError();
    })

    app.setErrorHandler(async function (err, request, reply) {
        request.log.error({ err })
        reply.status(err.statusCode || 500);
        return { error: err.message }
    })

    return app;
}