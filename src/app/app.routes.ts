import { Routes } from '@angular/router';
import { UsersComponent } from './components/users/users.component';
import { UserAddComponent } from './components/users/user-add/user-add.component';

export const routes: Routes = [
  {
    path: '',
    component: UsersComponent,
  },
  {
    path: 'users',
    component: UsersComponent,
  },
  {
    path: 'users/add-users',
    component: UserAddComponent,
  },
  {
    path: 'users/:id',
    component: UserAddComponent,
  },
];
