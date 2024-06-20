import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Users } from '../models/user';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  apiURL: string = 'http://localhost:3000/api';
  httpClient = inject(HttpClient);

  constructor() {}

  getUsers(): Observable<any> {
    return this.httpClient.get(this.apiURL + '/users');
  }

  getUser(id: string): Observable<any> {
    return this.httpClient.get(this.apiURL + '/users/' + id);
  }

  addUsers(user: Users): Observable<any> {
    return this.httpClient.post(this.apiURL + '/users/', user);
  }

  updateUser(id: string, user: Users): Observable<any> {
    return this.httpClient.put(this.apiURL + '/users/' + id, user);
  }

  deleteUser(id: string): Observable<any> {
    return this.httpClient.delete(this.apiURL + '/users/' + id);
  }
}
