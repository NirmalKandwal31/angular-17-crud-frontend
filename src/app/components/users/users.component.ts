import { Component, OnInit, inject, signal } from '@angular/core';
import { UsersService } from '../../services/users.service';
import { Users } from '../../models/user';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { catchError, of } from 'rxjs';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    RouterLink,
    MatToolbarModule,
  ],
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
})
export class UsersComponent implements OnInit {
  userService = inject(UsersService);

  // Using signals for state management
  users = signal<Users[]>([]);
  errorMessage = signal<string | null>(null);
  displayedColumns = signal<string[]>([
    'name',
    'email',
    'age',
    'address',
    'actions',
  ]);

  ngOnInit(): void {
    this.userService
      .getUsers()
      .pipe(
        catchError((err) => {
          this.errorMessage.set(
            'Failed to load users. Please try again later.'
          );
          console.log(err);
          return of([]);
        })
      )
      .subscribe({
        next: (res) => {
          this.users.set(res);
        },
        error: (err) => {
          this.errorMessage.set(
            'Failed to load users. Please try again later.'
          );
          console.log(err);
        },
        complete: () => {
          console.log('Users loading completed');
        },
      });
  }

  deleteUser(id: string) {
    const isConfirm = confirm('Are you sure?');
    if (isConfirm) {
      this.userService
        .deleteUser(id)
        .pipe(
          catchError((err) => {
            this.errorMessage.set(
              'Failed to delete user. Please try again later.'
            );
            console.log(err);
            return of(null);
          })
        )
        .subscribe({
          next: (res) => {
            this.users.set(this.users().filter((user) => user._id !== id));
          },
          error: (err) => {
            this.errorMessage.set(
              'Failed to delete user. Please try again later.'
            );
            console.log(err);
          },
          complete: () => {
            console.log('User deletion completed');
          },
        });
    }
  }
}
