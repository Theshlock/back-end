const swaggerAutogen = require('swagger-autogen')()
const config = require('./config_production.json');

const outputFile = './swagger_output.json'
const endpointsFiles = ['./quiz/quizs.controller.js']//['./server.js']//
const doc = {
    info: {
        version: "1.0.0",
        title: "Flipic API",
        description: "Documentation automatically generated by the <b>swagger-autogen</b> module."
    },
    host: config.base_url,
    basePath: config.base_endpoint,
    schemes: ['http', 'https'],
    consumes: ['application/json'],
    produces: ['application/json'],
    tags: [
        {
            "name": "Quiz",
            "description": "Endpoints"
        }
    ],
    securityDefinitions: {
        apiKeyAuth:{
            type: "apiKey",
            in: "header",       // can be "header", "query" or "cookie"
            name: "X-API-KEY",  // name of the header, query parameter or cookie
            description: "any description..."
        }
    },
    definitions: {
        Item: {
            name: "Item name",
            icon: "Icon name"
        },
        Quiz: {
            name: "Quiz Name",
            hash: "Quiz Hash",
            items: [{
                $ref: '#/definitions/Item'
            }]
        },
        QuizItemIds:{
            quizId: "Quiz Id",
            itemId: "Item Id"
        }
    }
}

swaggerAutogen(outputFile, endpointsFiles, doc).then(() => {
    require('./server.js')
})