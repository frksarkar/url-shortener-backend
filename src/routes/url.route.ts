import { Router } from 'express';
import { protect } from '../middleware';
import { getMyUrls, shortenUrl, redirectUrl } from '../controllers';

const router = Router();

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
router.get('/me', protect, getMyUrls);
router.post('/shorten', protect, shortenUrl);

export default router;
