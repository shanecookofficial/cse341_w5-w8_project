const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'Libarary API',
    description: 'Library API'
  },
  host: 'https://cse341-w5-w8-project.onrender.com',
  schemes: ['https']
};

const outputFile = './swagger.json';
const endpointsFiles = ['./src/routes/index.js'];

swaggerAutogen(outputFile, endpointsFiles, doc);

swaggerAutogen(outputFile, endpointsFiles, doc).then(async () => {
   await import('./app.js');
 });