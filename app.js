import Fastify from 'fastify';

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

    return app;
}