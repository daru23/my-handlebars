'use strict';

const Hapi=require('hapi');

// Create a server with a host and port
const server=Hapi.server({
    host:'localhost',
    port:8000
});

// handlebars register
const handlebars = require('handlebars');
const strapiHelper = require('./strapi-helper');
handlebars.registerHelper('getContent', strapiHelper.getModelContent);

// Add the route
server.route({
    method:'GET',
    path:'/',
    handler:function(request,h) {

        return  h.view('index', {title: 'My Handlebars', body: 'Hola, como estas?', model: 'post'});
    }
});

// Start the server
async function start() {

    try {
        await server.register(require('vision'));
        server.views({
            engines: {
                html: handlebars
            },
            relativeTo: __dirname,
            path: 'views'
        });
        await server.start();
    }
    catch (err) {
        console.log(err);
        process.exit(1);
    }

    console.log('Server running at:', server.info.uri);
};

start();