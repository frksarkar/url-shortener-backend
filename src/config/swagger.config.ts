import swaggerJsdoc from 'swagger-jsdoc';

const options: swaggerJsdoc.Options = {
	definition: {
		openapi: '3.0.0',
		info: {
			title: 'URL Shortener API',
			version: '1.0.0',
			description: 'A simple URL shortening service with user authentication and click analytics.',
		},
		servers: [
			{
				url: 'http://localhost:5000/api', // Base URL for API
			},
		],
		components: {
			securitySchemes: {
				bearerAuth: {
					type: 'http',
					scheme: 'bearer',
					bearerFormat: 'JWT',
				},
			},
		},
		security: [{ bearerAuth: [] }], // Apply globally (optional)
	},
	apis: ['./src/routes/*.ts', './src/controllers/*.ts'], // Path to files with JSDoc annotations
};

const swaggerSpec = swaggerJsdoc(options);

export default swaggerSpec;
