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

// Middlewares
app.use(helmet());
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

// Routes
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
app.get('/:shortCode', redirectUrl);

const PORT = process.env.PORT || 5000;

connectDB(() => {
	app.listen(PORT, () => {
		console.log(`🚀 Server running on ${process.env.BASE_URL}:${PORT}`);
	});
});

export default app;
