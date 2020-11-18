import express, {Request, Response} from 'express';
import knex from './database/connection';
import multer from 'multer';

import multerConfig from './config/multer';
const upload = multer(multerConfig);

const routes = express.Router();

interface Product{
    images: string;
}

routes.post('/products', upload.array('image'), async (request: Request, response: Response) => {
    const {
        name,
        type,
        description,
        cost,
        disponibility,
        slices,
        image,
    } = request.body;

    const requestImages = request.files as Express.Multer.File[];
    
    const images = requestImages.map(image => {
      return  String(image.filename)
    })

    console.log("----------------------------------------")
    console.log(images)

    const product = {
        name,
        type,
        description,
        cost,
        disponibility,
        images,
        slices
    };

    await knex('products').insert(product);

    return(response.json('Os produtos foram cadastrados com sucesso'));
});

routes.get('/products', async (request: Request, response: Response) => {
    const { type } = request.query;

    const products = await knex('products').where('type', String(type)).select('*');

    const serializedProducts = products.map(product => {        
        var serializedImages = product.images.split(',')


        return {
            ...product,
            splited_images: serializedImages.map((image: string) =>{
                return `http://192.168.8.2:3333/uploads/${image}`
            })
        }
    });

    if(serializedProducts.length == 0){
        return response.status(400).json({message: 'Product not found'});
    }
   
    return response.json(serializedProducts);
})

routes.get('/products/:id', async (request: Request, response: Response) => {
    const {id} = request.params;

    const product = await knex('products').where('id', String(id)).first();
    
    var serializedImages = product.images.split(',')
    
    const serializedProduct = {
        ...product,
        splited_images: serializedImages.map((image: string) =>{
            return `http://192.168.8.2:3333/uploads/${image}`
        })
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