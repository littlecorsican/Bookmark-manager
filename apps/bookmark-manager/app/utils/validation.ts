import { z } from 'zod';

// URL validation schema
export const urlSchema = z.string().url('Invalid URL format');

// Title validation schema
export const titleSchema = z.string()
  .min(1, 'Title is required')
  .max(200, 'Title must be less than 200 characters')
  .trim();

// Description validation schema
export const descriptionSchema = z.string()
  .max(1000, 'Description must be less than 1000 characters')
  .optional()
  .nullable();

// Tag validation schema
export const tagSchema = z.object({
  name: z.string()
    .min(1, 'Tag name is required')
    .max(50, 'Tag name must be less than 50 characters')
    .regex(/^[a-zA-Z0-9\s-_]+$/, 'Tag name can only contain letters, numbers, spaces, hyphens, and underscores')
    .trim()
});

// Bookmark creation schema
export const createBookmarkSchema = z.object({
  title: titleSchema,
  url: urlSchema,
  description: descriptionSchema,
  tags: z.array(tagSchema).optional().default([])
});

// Bookmark update schema
export const updateBookmarkSchema = z.object({
  id: z.number().positive('Invalid bookmark ID'),
  title: titleSchema.optional(),
  description: descriptionSchema,
  tags: z.array(tagSchema).optional()
});

// Pagination schema
export const paginationSchema = z.object({
  page: z.number().min(1, 'Page must be at least 1').default(1),
  limit: z.number().min(1, 'Limit must be at least 1').max(100, 'Limit cannot exceed 100').default(10)
});

// Search filters schema
export const searchFiltersSchema = z.object({
  title: z.string().optional(),
  description: z.string().optional(),
  url: z.string().optional(),
  tags: z.array(z.string()).optional(),
  minVisits: z.number().min(0).optional(),
  maxVisits: z.number().min(0).optional(),
  dateFrom: z.string().datetime().optional(),
  dateTo: z.string().datetime().optional()
});

// Sanitize HTML content
export function sanitizeHtml(html: string): string {
  // Basic HTML sanitization - in production, use a proper library like DOMPurify
  return html
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    .replace(/<iframe\b[^<]*(?:(?!<\/iframe>)<[^<]*)*<\/iframe>/gi, '')
    .replace(/javascript:/gi, '')
    .replace(/on\w+\s*=/gi, '')
    .trim();
}

// Validate and sanitize URL
export function validateAndSanitizeUrl(url: string): string {
  try {
    const parsedUrl = new URL(url);
    
    // Only allow http and https protocols
    if (!['http:', 'https:'].includes(parsedUrl.protocol)) {
      throw new Error('Only HTTP and HTTPS protocols are allowed');
    }
    
    return parsedUrl.toString();
  } catch (error) {
    throw new Error('Invalid URL format');
  }
}

// Extract domain from URL
export function extractDomain(url: string): string {
  try {
    const parsedUrl = new URL(url);
    return parsedUrl.hostname;
  } catch {
    return '';
  }
}

// Validate search query
export function validateSearchQuery(query: string): string {
  return query
    .trim()
    .replace(/[<>]/g, '') // Remove potential HTML tags
    .substring(0, 100); // Limit length
}

// Type exports
export type CreateBookmarkInput = z.infer<typeof createBookmarkSchema>;
export type UpdateBookmarkInput = z.infer<typeof updateBookmarkSchema>;
export type PaginationInput = z.infer<typeof paginationSchema>;
export type SearchFiltersInput = z.infer<typeof searchFiltersSchema>; 