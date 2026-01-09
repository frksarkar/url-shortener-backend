import { Router } from 'express';
import { shortenUrl, redirectUrl, getMyUrls } from '../controllers/url.controller';
import { protect } from '../middleware/auth.middleware';

const router = Router();

// Public route: redirect short URL
router.get('/:shortCode', redirectUrl);

// Protected routes
/**
 * @swagger
 * tags:
 *   name: URLs
 *   description: URL shortening and analytics
 */

/**
 * @swagger
 * /url/shorten:
 *   post:
 *     summary: Create a short URL
 *     tags: [URLs]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - originalUrl
 *             properties:
 *               originalUrl:
 *                 type: string
 *                 example: "https://google.com"
 *     responses:
 *       201:
 *         description: Short URL created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                 originalUrl:
 *                   type: string
 *                 shortUrl:
 *                   type: string
 *                 shortCode:
 *                   type: string
 *                 clicks:
 *                   type: number
 *       400:
 *         description: Invalid URL
 *       401:
 *         description: Unauthorized
 */
router.post('/shorten', protect, shortenUrl);
router.get('/me', protect, getMyUrls);

export default router;
