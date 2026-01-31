/**
 * Post List Component
 * 
 * Displays the list of blog post titles.
 * Emits events when a post is selected.
 */
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BlogPost } from '../../models/post.model';

@Component({
  selector: 'app-post-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './post-list.component.html',
  styleUrl: './post-list.component.scss'
})
export class PostListComponent {
  /** List of posts to display */
  @Input() posts: BlogPost[] = [];
  
  /** Currently selected post ID */
  @Input() selectedPostId: number | null = null;
  
  /** Loading state */
  @Input() isLoading = false;
  
  /** Event emitted when a post is selected */
  @Output() postSelected = new EventEmitter<BlogPost>();

  /**
   * Handle post selection
   * @param post Selected post
   */
  onSelectPost(post: BlogPost): void {
    this.postSelected.emit(post);
  }

  /**
   * Check if a post is currently selected
   * @param post Post to check
   * @returns true if selected
   */
  isSelected(post: BlogPost): boolean {
    return this.selectedPostId === post.id;
  }

  /**
   * TrackBy function for ngFor performance
   * @param index Array index
   * @param post BlogPost item
   * @returns Post ID for tracking
   */
  trackByPostId(index: number, post: BlogPost): number {
    return post.id;
  }
}
