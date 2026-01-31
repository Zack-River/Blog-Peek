/**
 * App Routes Configuration
 * 
 * Simple routing setup for BlogPeek.
 * Currently a single-route SPA.
 */
import { Routes } from '@angular/router';

export const routes: Routes = [
  // Default route - home page with blog list
  { path: '', redirectTo: '/', pathMatch: 'full' },
  // Catch-all route for 404
  { path: '**', redirectTo: '/' }
];
