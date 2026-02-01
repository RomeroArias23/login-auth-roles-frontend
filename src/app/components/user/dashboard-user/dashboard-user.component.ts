import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataService, ApiMessage } from '../../../services/data.service';
import { NavbarComponent } from '../../navbar/navbar.component';

@Component({
  selector: 'app-dashboard-user',
  standalone: true,
  imports: [CommonModule, NavbarComponent],
  templateUrl: './dashboard-user.component.html',
  styleUrls: ['./dashboard-user.component.scss']
})
export class DashboardUserComponent implements OnInit {

  message = signal<string>('loading...');

  constructor(private data: DataService) {}

  ngOnInit(): void {
    this.data.getUserData().subscribe({
      next: (res: ApiMessage) => {
        this.message.set(res.message);
      },
      error: () => {
        this.message.set('ERROR calling backend');
      }
    });
  }
}
