import { Router } from 'express';
import { shortenUrl, redirectUrl, getMyUrls } from '../controllers/url.controller';
import { protect } from '../middleware/auth.middleware';

const router = Router();

// Public route: redirect short URL
router.get('/:shortCode', redirectUrl);

// Protected routes
router.post('/shorten', protect, shortenUrl);
router.get('/me', protect, getMyUrls);

export default router;
