import Fastify from 'fastify';
import jwt from '@fastify/jwt';
import createError from '@fastify/error';
import fastifyAutoload from '@fastify/autoload';
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

const TestError = createError("TestError", "Something went wrong", 501);
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

export async function build(opts) {
    const app = Fastify(opts)
    app.register(jwt, {
        secret: process.env.SECRET_KEY
    })

    app.register(fastifyAutoload, {
        dir: join(__dirname, 'plugins')
    })

    app.register(fastifyAutoload, {
        dir: join(__dirname, 'routes')
    })

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