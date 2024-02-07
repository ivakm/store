import { build } from './app.js';
import closeWithGrace from "close-with-grace";
import dotenv from 'dotenv';

dotenv.config();

const opts = {
    logger: true
};

if (process.stdout.isTTY) {
    opts.logger = {
        transport: {
            target: 'pino-pretty'
        }
    }
}

const app = await build(opts);

const port = process.env.PORT || 3000;
const host = process.env.HOST || '0.0.0.0';

await app.listen({ port, host })

closeWithGrace(async ({ signal, err }) => {
    if (err) {
        app.log.error({ err }, 'server closing with error')
    } else {
        app.log.info(`${ signal } received, server closing`)
    }
    await app.close()
})