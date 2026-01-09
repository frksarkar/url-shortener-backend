import { Request, Response } from 'express';
import { generateShortId } from '../utils';
import { Url } from '../models';

// @desc    Create short URL
// @route   POST /api/url/shorten
// @access  Private
export const shortenUrl = async (req: Request, res: Response) => {
	try {
		const { originalUrl } = req.body;
		const userId = (req as any).user.id;

		if (!originalUrl) {
			return res.status(400).json({ message: 'Original URL is required' });
		}

		// Optional: validate URL format
		try {
			new URL(originalUrl);
		} catch (e) {
			return res.status(400).json({ message: 'Invalid URL' });
		}

		const shortCode = generateShortId();

		const url = await Url.create({
			originalUrl,
			shortCode,
			createdBy: userId,
		});

		res.status(201).json({
			id: url._id,
			originalUrl: url.originalUrl,
			shortUrl: `${process.env.BASE_URL}/${url.shortCode}`,
			shortCode: url.shortCode,
			clicks: url.clicks,
		});
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: 'Server error' });
	}
};

// @desc    Redirect to original URL and track click
// @route   GET /:shortCode
// @access  Public
export const redirectUrl = async (req: Request, res: Response) => {
	try {
		const { shortCode } = req.params;
		const url = await Url.findOne({ shortCode });

		if (!url) {
			return res.status(404).json({ message: 'URL not found' });
		}

		// Increment click count
		url.clicks += 1;
		await url.save();

		// Redirect (302 for temporary redirect)
		res.redirect(302, url.originalUrl);
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: 'Server error' });
	}
};

// @desc    Get all URLs created by user + analytics
// @route   GET /api/url/me
// @access  Private
export const getMyUrls = async (req: Request, res: Response) => {
	try {
		const userId = (req as any).user.id;

		const urls = await Url.find({ createdBy: userId }).sort({ createdAt: -1 });

		const totalLinks = urls.length;
		const totalClicks = urls.reduce((sum, url) => sum + url.clicks, 0);

		res.json({
			totalLinks,
			totalClicks,
			urls: urls.map((url) => ({
				id: url._id,
				originalUrl: url.originalUrl,
				shortUrl: `${process.env.BASE_URL}/${url.shortCode}`,
				shortCode: url.shortCode,
				clicks: url.clicks,
				createdAt: url.createdAt,
			})),
		});
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: 'Server error' });
	}
};
