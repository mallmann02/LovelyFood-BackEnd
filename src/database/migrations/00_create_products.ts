import Knex from 'knex';

export async function up(knex: Knex){
    //criar tabela
    return knex.schema.createTable('products', table => {
        table.increments('id').primary();
        table.string('image').notNullable();
        table.string('name').notNullable();
        table.decimal('cost').notNullable();
        table.boolean('disponibility').notNullable();
        table.string('type').notNullable();
        table.string('description').notNullable();
        table.integer('slices').nullable();
    });
}

export async function down(knex: Knex){
    //deletar tabela
    return knex.schema.dropTable('products');
}