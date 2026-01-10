import { Schema, model } from 'mongoose';

/**
 * @swagger
 * components:
 *   schemas:
 *     Url:
 *       type: object
 *       properties:
 *         originalUrl:
 *           type: string
 *         shortCode:
 *           type: string
 *         clicks:
 *           type: number
 *         createdBy:
 *           type: string
 *         createdAt:
 *           type: string
 *         updatedAt:
 *           type: string
 *       required:
 *         - originalUrl
 *         - shortCode
 *         - createdBy
 *
 */

const urlSchema = new Schema(
	{
		originalUrl: { type: String, required: true },
		shortCode: { type: String, required: true, unique: true },
		clicks: { type: Number, default: 0 },
		createdBy: { type: Schema.Types.ObjectId, ref: 'User', required: true },
	},
	{ timestamps: true }
);

export default model('Url', urlSchema);
