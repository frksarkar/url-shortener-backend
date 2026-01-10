import swaggerJsdoc from 'swagger-jsdoc';

const base_url = process.env.BASE_URL || 'http://localhost:5000';

const options: swaggerJsdoc.Options = {
	definition: {
		openapi: '3.0.0',
		info: {
			title: 'URL Shortener API',
			version: '1.0.0',
			description: 'A simple URL shortening service with user authentication and click analytics.',
		},
		servers: [{ url: base_url + '/api' }, { url: base_url }],
		tags: [
			{
				name: 'Health',
				description: 'Health check',
			},
			{
				name: 'Auth',
				description: 'User authentication',
			},
			{
				name: 'URLs',
				description: 'URL shortening and analytics',
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
	apis: ['./src/routes/*.ts', './src/controllers/*.ts', './src/app.ts', './src/models/*.ts'], // Path to files with JSDoc annotations
};

export const swaggerSpec = swaggerJsdoc(options);
