/** @type {import('fastify').FastifyPluginAsync<>} */
export default async function login(app, opts) {
    app.post('/login', {
        schema: {
            body: {
                type: 'object',
                properties: {
                    login: { type: 'string' },
                    password: { type: 'string' }
                },
                required: ['login', 'password']
            }
        }
    }, async (request, reply) => {
        return await reply.jwtSign(request.body);
        //const user = await app.db.auth.create({login, password});
    })
}