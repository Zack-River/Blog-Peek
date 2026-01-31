/**
 * Posts Service
 * 
 * Angular service for communicating with the BlogPeek API.
 * Handles HTTP requests and error handling.
 */
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, BehaviorSubject } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { BlogPost } from '../models/post.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PostsService {
  /** API base URL from environment */
  private readonly apiUrl = environment.apiUrl;
  
  /** Cache of posts for quick access */
  private postsCache: BlogPost[] = [];
  
  /** Loading state observable */
  private loadingSubject = new BehaviorSubject<boolean>(false);
  public loading$ = this.loadingSubject.asObservable();
  
  /** Error state observable */
  private errorSubject = new BehaviorSubject<string | null>(null);
  public error$ = this.errorSubject.asObservable();

  constructor(private http: HttpClient) {}

  /**
   * Fetch all blog posts from API
   * @returns Observable of BlogPost array
   */
  getPosts(): Observable<BlogPost[]> {
    this.loadingSubject.next(true);
    this.errorSubject.next(null);
    
    return this.http.get<BlogPost[]>(`${this.apiUrl}/posts`).pipe(
      tap(posts => {
        this.postsCache = posts;
        this.loadingSubject.next(false);
      }),
      catchError(this.handleError.bind(this))
    );
  }

  /**
   * Get a single post by ID (from cache or API)
   * @param id Post ID
   * @returns Observable of BlogPost
   */
  getPostById(id: number): Observable<BlogPost> {
    // Check cache first
    const cached = this.postsCache.find(p => p.id === id);
    if (cached) {
      return new Observable(observer => {
        observer.next(cached);
        observer.complete();
      });
    }
    
    return this.http.get<BlogPost>(`${this.apiUrl}/posts/${id}`).pipe(
      catchError(this.handleError.bind(this))
    );
  }

  /**
   * Handle HTTP errors
   * @param error HttpErrorResponse
   * @returns Observable error
   */
  private handleError(error: HttpErrorResponse): Observable<never> {
    this.loadingSubject.next(false);
    
    let errorMessage = 'An unknown error occurred';
    
    if (error.error instanceof ErrorEvent) {
      // Client-side error
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side error
      errorMessage = error.error?.error?.message || 
                     `Server Error: ${error.status} - ${error.statusText}`;
    }
    
    this.errorSubject.next(errorMessage);
    console.error('PostsService Error:', errorMessage);
    
    return throwError(() => new Error(errorMessage));
  }
}
