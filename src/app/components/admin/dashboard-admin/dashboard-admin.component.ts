import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataService, ApiMessage } from '../../../services/data.service';
import { NavbarComponent } from '../../navbar/navbar.component';

@Component({
  selector: 'app-dashboard-admin',

  // Standalone component (no NgModule required)
  standalone: true,

  // Modules and components required by this view
  imports: [CommonModule, NavbarComponent],

  // Component template
  templateUrl: './dashboard-admin.component.html',

  // Component styles
  styleUrls: ['./dashboard-admin.component.scss']
})
export class DashboardAdminComponent implements OnInit {

  /**
   * Reactive UI state using Angular Signals.
   * Holds the message returned by the backend.
   */
  message = signal<string>('loading...');

  // Inject DataService to communicate with backend API
  constructor(private data: DataService) {}

  /**
   * Lifecycle hook executed once the component is initialized.
   * Fetches admin-only data from the backend.
   */
  ngOnInit(): void {

    // Call protected admin endpoint
    this.data.getAdminData().subscribe({

      // Successful API response
      next: (res: ApiMessage) => {
        this.message.set(res.message);
      },

      // Error handling (e.g. unauthorized or server error)
      error: () => {
        this.message.set('ERROR calling backend');
      }
    });
  }
}