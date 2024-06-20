import { Component, OnInit, inject } from '@angular/core';
import { UsersService } from '../../services/users.service';
import { Users } from '../../models/user';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';

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
  users: Users[] = [];
  displayedColumns: string[] = ['name', 'email', 'age', 'address', 'actions'];

  ngOnInit(): void {
    this.userService.getUsers().subscribe((res) => {
      this.users = res;
    });
  }

  deleteUser(id: string) {
    const isConfirm = confirm('Are you sure?');
    if (isConfirm) {
      this.userService.deleteUser(id).subscribe((res) => {
        this.users = this.users.filter((user) => user._id != id);
      });
    }
  }
}
