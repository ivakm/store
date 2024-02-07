/** @type {import('fastify').FastifyPluginAsync<>} */
export default async function main(app, opts) {
    app.get('/', async (request, reply) => {
        reply.send({ hello: 'world' })
    });
}