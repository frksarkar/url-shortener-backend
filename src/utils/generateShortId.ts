import { nanoid } from 'nanoid';

// Generate 6-character short code (e.g., "aB3x9q")
export const generateShortId = (): string => {
	return nanoid(6);
};
