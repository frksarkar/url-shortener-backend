import { Schema, model } from 'mongoose';
import bcrypt from 'bcrypt';

/**
 * @swagger
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *         email:
 *           type: string
 *         password:
 *           type: string
 *         createdAt:
 *           type: string
 *         updatedAt:
 *           type: string
 *       required:
 *         - name
 *         - email
 *         - password
 */

const userSchema = new Schema(
	{
		name: { type: String, required: true },
		email: { type: String, required: true, unique: true },
		password: { type: String, required: true },
	},
	{ timestamps: true }
);

// Hash password before saving
userSchema.pre('save', async function (next: any) {
	if (!this.isModified('password')) return next();
	this.password = await bcrypt.hash(this.password, 12);
	next();
});

// Compare password method
userSchema.methods.comparePassword = async function (candidate: string): Promise<boolean> {
	return bcrypt.compare(candidate, this.password);
};

export default model('User', userSchema);
