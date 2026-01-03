import swaggerJsdoc from 'swagger-jsdoc';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Disaster Relief & Resource Sharing API',
      version: '1.0.0'
    },
    servers: [{ url: '/api' }]
  },
  apis: ['./routes/*.js']
};

const swaggerSpec = swaggerJsdoc(options);
export default swaggerSpec;
