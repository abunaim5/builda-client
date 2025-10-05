import { unsplash } from '@/lib/unsplash';
import { Hono } from 'hono';

const DefaultCount = 20;
const DefaultCollectionIDS = ['317099'];

const app = new Hono()
    .get('/', async (c) => {
        const images = await unsplash.photos.getRandom({
            collectionIds: DefaultCollectionIDS,
            count: DefaultCount
        });

        if (images.errors) {
            return c.json({ error: 'Something went wrong' }, 400);
        }

        let res = images.response;

        if (!Array.isArray(res)) {
            res = [res];
        }

        return c.json({ data: res });
    });

export default app;