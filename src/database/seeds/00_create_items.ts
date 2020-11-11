import Knex from 'knex';

export async function seed(knex: Knex) {
    await knex('items').insert([
        {title: 'Muffin', image: 'cake-photo.png'},
        {title: 'Torta', image: 'cupcake.png'},
        {title: 'Pizza', image: 'pizzaColorfull.png'},
        {title: 'Donnuts', image: 'cupcake.png'},
    ])
}