import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import swaggerUi from 'swagger-ui-express';
import { swaggerSpec, connectDB } from './config';

// Routes
import { authRoutes, urlRoutes } from './routes';
import { redirectUrl } from './controllers';

dotenv.config();
const app = express();
const options: cors.CorsOptions = {
	origin: process.env.CLIENT_URL || 'http://localhost:3000',
	credentials: true,
	methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
	allowedHeaders: ['Content-Type', 'Authorization'],
};

// Middlewares
app.use(cors(options));
app.use(helmet());
app.use(morgan('dev'));
app.use(express.json());

// Routes
app.get('', (req, res) => {
	res.json({
		message: 'Welcome to URL Shortener API',
	});
});
// Swagger Docs
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Health check
/**
 * @swagger
 * tags:
 *   name: Health
 *   description: URL shortening and analytics
 */

/**
 * @swagger
 * /health:
 *   get:
 *     summary: Check server health
 *     tags: [Health]
 *     description: Check if the server is healthy
 *     security: []
 *     responses:
 *       200:
 *         description: Server is healthy
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                 timestamp:
 *                   type: string
 *                   format: date-time
 */

app.get('/api/health', (req, res) => {
	res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

app.use('/api/auth', authRoutes);
app.use('/api/url', urlRoutes);

// Public route: redirect short URL
/**
 * @openapi
 * /{shortCode}:
 *   get:
 *     summary: Redirect to original URL
 *     responses:
 *       '302':
 *         description: Redirect to original URL
 */
app.get('/:shortCode', redirectUrl);

const PORT = process.env.PORT || 5000;

connectDB(() => {
	app.listen(PORT, () => {
		console.log(`🚀 Server running on :${PORT}`);
	});
});

export default app;
