import { Schema, model } from 'mongoose';
import bcrypt from 'bcrypt';

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
