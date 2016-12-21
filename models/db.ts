import * as Knex from 'knex';
import * as Bookshelf from 'bookshelf';

let knex = Knex({
    client: 'mysql',
    connection: {
        host     : '127.0.0.1',
        user     : 'root',
        password : '',
        database : 'chat',
        charset  : 'utf8'
    }
});

export let bookshelf = Bookshelf(knex);