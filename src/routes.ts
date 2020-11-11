import express, {Request, Response} from 'express';
import knex from './database/connection';
import multer from 'multer';

import multerConfig from './config/multer';
const upload = multer(multerConfig);

const routes = express.Router();

routes.post('/products', upload.array('images'), async (request: Request, response: Response) => {
    const {
        name,
        type,
        description,
        cost,
        disponibility,
        slices,
        image,
    } = request.body;

    const product = {
        name,
        type,
        description,
        cost,
        disponibility,
        images: request.files,
        slices
    };

    await knex('products').insert(product);

    return(response.json('Os produtos foram cadastrados com sucesso'));
});

routes.get('/products', async (request: Request, response: Response) => {
    const { type } = request.query;

    const products = await knex('products').where('type', String(type)).select('*');

    const serializedProducts = products.map(product => {        
        return {
            ...product,
            image_url: `http://192.168.8.109:3333/uploads/${product.image}`
        };
    });

    if(serializedProducts.length == 0){
        return response.status(400).json({message: 'Product not found'});
    }

    return response.json(serializedProducts);
})

routes.get('/products/:id', async (request: Request, response: Response) => {
    const {id} = request.params;

    const product = await knex('products').where('id', String(id)).first();

    const serializedProduct = {
        ...product,
        image_url: `http://192.168.8.109:3333/uploads/${product.image}`,
    };

    return response.json(serializedProduct)
})

routes.get('/items', async (request: Request, response: Response) => {
    const items = await knex('items').select('*');

    const serializedItems = items.map(item => {
        return {
            id: item.id,
            title: item.title,
            image_url: `http://192.168.8.2:3333/uploads/${item.image}`,
        };
    });

    return response.json(serializedItems);
})

export default routes;