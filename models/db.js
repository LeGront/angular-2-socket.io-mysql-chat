"use strict";
var Knex = require('knex');
var Bookshelf = require('bookshelf');
var knex = Knex({
    client: 'mysql',
    connection: {
        host: '127.0.0.1',
        user: 'root',
        password: '',
        database: 'chat',
        charset: 'utf8'
    }
});
exports.bookshelf = Bookshelf(knex);
