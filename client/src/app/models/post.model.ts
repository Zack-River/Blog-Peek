/**
 * BlogPost Model
 * 
 * TypeScript interface for blog post data.
 * Matches the backend API response structure.
 */
export interface BlogPost {
  /** Unique post identifier */
  id: number;
  
  /** Post title */
  title: string;
  
  /** Post description/content */
  description: string;
  
  /** ISO 8601 date string (optional) */
  createdAt?: string;
  
  /** Post category (optional) */
  category?: string;
}
