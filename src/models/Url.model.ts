import { Schema, model } from 'mongoose';

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
