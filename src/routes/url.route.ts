import { Router } from 'express';
import { protect } from '../middleware';
import { getMyUrls, shortenUrl, deleteUrl } from '../controllers';

const router = Router();

// Protected routes

router.get('/me', protect, getMyUrls);

router.post('/shorten', protect, shortenUrl);

router.delete('/:id', protect, deleteUrl);

export default router;
