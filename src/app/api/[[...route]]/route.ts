import { Hono } from 'hono';
import { handle } from 'hono/vercel';
import user from './user'

export const runtime = 'nodejs'

const app = new Hono().basePath('/api');

export const routes = app
    .route('/user', user)

export const GET = handle(app);

export type AppType = typeof routes;