import { Component, OnInit, inject, signal } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { UsersService } from '../../../services/users.service';
import { Users } from '../../../models/user';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-user-add',
  standalone: true,
  imports: [MatInputModule, MatButtonModule, ReactiveFormsModule],
  templateUrl: './user-add.component.html',
  styleUrl: './user-add.component.css',
})
export class UserAddComponent implements OnInit {
  formBuilder = inject(FormBuilder);
  userService = inject(UsersService);
  router = inject(Router);
  route = inject(ActivatedRoute);
  editUserId = signal<string | null>(null);

  userForm: FormGroup = this.formBuilder.group({
    name: ['', Validators.required],
    email: ['', Validators.required],
    age: [' '],
    address: [''],
    password: ['', [Validators.required, Validators.minLength(8)]],
  });

  ngOnInit() {
    const userId = this.route.snapshot.params['id'];
    if (userId) {
      this.editUserId.set(userId);
      this.userService.getUser(userId).subscribe((res) => {
        this.userForm.patchValue(res);
      });
    }
  }

  addUser() {
    if (this.userForm.invalid) {
      alert('Please fill the mandatory fields');
      return;
    }
    const user: Users = this.userForm.value;
    this.userService.addUsers(user).subscribe((res) => {
      console.log('user added');
      this.router.navigateByUrl('/');
    });
  }
  updateUser() {
    if (this.userForm.invalid) {
      alert('Please fill the mandatory fields');
      return;
    }
    const user: Users = this.userForm.value;
    const editUserId = this.editUserId();
    if (editUserId) {
      this.userService.updateUser(editUserId, user).subscribe((res) => {
        console.log('Updated Successfully');
        this.router.navigateByUrl('/');
      });
    }
  }

  navigateToBack() {
    this.router.navigateByUrl('/');
  }
}
