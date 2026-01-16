import express from 'express';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import swaggerUi from 'swagger-ui-express';
import { connectDB } from './config';

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
const swaggerFile = path.join(process.cwd(), 'swagger.json');
const swaggerData = fs.readFileSync(swaggerFile, 'utf8');
const swaggerDocument = JSON.parse(swaggerData);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Health check

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
		console.log(`🚀 Server running on :${PORT}`);
	});
});

export default app;
