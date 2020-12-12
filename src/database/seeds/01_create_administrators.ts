import Knex from 'knex';

export async function seed(knex: Knex) {
    await knex('administrators').insert([
        {email: 'mallmann2002@hotmail.com', password: 'mallmann_admin', name: 'Leonardo'},
        {email: 'gillete@hotmail.com', password: 'gillete_admin', name: 'Guilherme'},
        {email: 'maedogilete@hotmail.com', password: 'maedogilete_admin', name: 'Sandra'},
    ])
}