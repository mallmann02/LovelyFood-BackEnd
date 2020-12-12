import Knex from 'knex';

export async function up(knex: Knex){
    //criar tabela
    return knex.schema.createTable('administrators', table => {
        table.increments('id').primary();
        table.string('email').notNullable();
        table.string('password').notNullable();
        table.string('name').notNullable();
    });
}

export async function down(knex: Knex){
    //deletar tabela
    return knex.schema.dropTable('administrators');
}