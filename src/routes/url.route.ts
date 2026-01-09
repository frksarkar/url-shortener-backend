import { Router } from 'express';
import { protect } from '../middleware';
import { getMyUrls, shortenUrl, redirectUrl } from '../controllers';

const router = Router();

// Protected routes

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: User authentication
 */

/**
 * @swagger
 * /url/me:
 *   get:
 *     summary: Get all URLs created by the logged-in user
 *     tags: [URLs]
 *     responses:
 *       200:
 *         description: List of URLs with analytics
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 totalLinks:
 *                   type: number
 *                 totalClicks:
 *                   type: number
 *                 urls:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                       originalUrl:
 *                         type: string
 *                       shortUrl:
 *                         type: string
 *                       clicks:
 *                         type: number
 *                       shortCode:
 *                         type: string
 *                       createdAt:
 *                         type: string
 *               required:
 *                 - totalLinks
 *                 - totalClicks
 *                 - urls
 *                 - urls[].id
 *                 - urls[].originalUrl
 *                 - urls[].shortUrl
 *                 - urls[].clicks
 *                 - urls[].shortCode
 *                 - urls[].createdAt
 *       500:
 *         description: Server error
 *
 *       401:
 *         description: Unauthorized
 *
 */

router.get('/me', protect, getMyUrls);

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

export default router;
