import swaggerJsdoc from 'swagger-jsdoc';


const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Movie Dashboard API',
      version: '1.0.0',
      description: 'A simple Movie Dashboard with Admin Panel documentation',
    },
  },
  apis: [__dirname +'/routes/**.ts'],
};

export const specs = swaggerJsdoc(options);
