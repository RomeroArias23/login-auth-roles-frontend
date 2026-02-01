import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataService, ApiMessage } from '../../../services/data.service';
import { NavbarComponent } from '../../navbar/navbar.component';

@Component({
  selector: 'app-dashboard-advisor',

  // Standalone component (no NgModule required)
  standalone: true,

  // Modules and shared components used by this view
  imports: [CommonModule, NavbarComponent],

  // Component HTML template
  templateUrl: './dashboard-advisor.component.html',

  // Component scoped styles
  styleUrls: ['./dashboard-advisor.component.scss']
})
export class DashboardAdvisorComponent implements OnInit {

  /**
   * Reactive UI state using Angular Signals.
   * Stores the message returned by the advisor backend endpoint.
   */
  message = signal<string>('loading...');

  // Inject DataService to communicate with backend API
  constructor(private data: DataService) {}

  /**
   * Lifecycle hook executed once the component is initialized.
   * Fetches advisor-specific data from the backend.
   */
  ngOnInit(): void {

    // Call protected advisor endpoint
    this.data.getAdvisorData().subscribe({

      // Successful API response
      next: (res: ApiMessage) => {
        this.message.set(res.message);
      },

      // Error handling (e.g. forbidden, unauthorized, server error)
      error: () => {
        this.message.set('ERROR calling backend');
      }
    });
  }
}
