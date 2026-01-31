/**
 * BlogPeek App Component
 * 
 * Root component with split-view layout.
 * Manages post selection state and API communication.
 */
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostListComponent } from './components/post-list/post-list.component';
import { PostPreviewComponent } from './components/post-preview/post-preview.component';
import { PostsService } from './services/posts.service';
import { BlogPost } from './models/post.model';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, PostListComponent, PostPreviewComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  /** Application title */
  title = 'BlogPeek';
  
  /** List of blog posts */
  posts: BlogPost[] = [];
  
  /** Currently selected post */
  selectedPost: BlogPost | null = null;
  
  /** Loading state */
  isLoading = false;
  
  /** Error message */
  errorMessage: string | null = null;
  
  /** Mobile view - show preview panel */
  showMobilePreview = false;

  constructor(private postsService: PostsService) {}

  ngOnInit(): void {
    this.loadPosts();
  }

  /**
   * Load posts from API
   */
  loadPosts(): void {
    this.isLoading = true;
    this.errorMessage = null;
    
    this.postsService.getPosts().subscribe({
      next: (posts) => {
        this.posts = posts;
        this.isLoading = false;
        // Auto-select first post on desktop
        if (posts.length > 0 && window.innerWidth >= 768) {
          this.selectedPost = posts[0];
        }
      },
      error: (error) => {
        this.errorMessage = error.message || 'Failed to load posts';
        this.isLoading = false;
      }
    });
  }

  /**
   * Handle post selection
   * @param post Selected post
   */
  onPostSelected(post: BlogPost): void {
    this.selectedPost = post;
    // Show preview on mobile
    if (window.innerWidth < 768) {
      this.showMobilePreview = true;
    }
  }

  /**
   * Go back to list on mobile
   */
  onMobileBack(): void {
    this.showMobilePreview = false;
  }

  /**
   * Retry loading posts
   */
  onRetry(): void {
    this.loadPosts();
  }
}
