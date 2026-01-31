/**
 * Post Preview Component
 * 
 * Displays the selected blog post content.
 * Shows in the right panel of the split-view layout.
 */
import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BlogPost } from '../../models/post.model';

@Component({
  selector: 'app-post-preview',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './post-preview.component.html',
  styleUrl: './post-preview.component.scss'
})
export class PostPreviewComponent {
  /** Post to display */
  @Input() post: BlogPost | null = null;

  /**
   * Format the date for display
   * @param dateString ISO date string
   * @returns Formatted date or empty string
   */
  formatDate(dateString?: string): string {
    if (!dateString) return '';
    
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }
}
