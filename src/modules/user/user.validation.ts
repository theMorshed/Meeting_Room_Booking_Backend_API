import { z } from 'zod';

// Define the role enum
const UserRoleEnum = z.enum(['user', 'admin']);

// Create validation schema for user creation
export const createUserSchema = z.object({
    name: z.string().min(1, 'Name is required'),
    email: z.string().email('Invalid email address'),
    password: z.string().min(6, 'Password must be at least 6 characters long'),    phone: z.string().regex(/^\d{10}$/, 'Phone number must be 10 digits'),
    address: z.string().min(1, 'Address is required'),
    role: UserRoleEnum,
});

// Create validation schema for user update
export const updateUserSchema = z.object({
    name: z.string().optional(),
    email: z.string().email('Invalid email address').optional(),
    password: z.string().min(6, 'Password must be at least 6 characters long').optional(),
    phone: z.string().regex(/^\d{10}$/, 'Phone number must be 10 digits').optional(),
    address: z.string().optional(),
    role: UserRoleEnum.optional(),
});

// Validation schema for login
export const loginSchema = z.object({
    email: z.string().email('Invalid email address'),
    password: z.string().min(6, 'Password must be at least 6 characters long'),
});
