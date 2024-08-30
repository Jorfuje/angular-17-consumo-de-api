import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IUsers, User } from '../models/users';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private readonly http = inject(HttpClient); 
  
  private baseUrl: string = 'http://127.0.0.1:8000/api/users/';

  getUsers(): Observable<IUsers>{
    return this.http.get<IUsers>(this.baseUrl);
  }

  getUser(id: number | string): Observable<{ message: string, user: User }> {
    return this.http.get<{ message: string, user: User }>(`${this.baseUrl}${id}`);
  }

  newUser(user: User): Observable<{ message: string, user: User }> {
    return this.http.post<{ message: string, user: User }>(`${this.baseUrl}`, user);
  }

  updateUser(id: number | string, user: User): Observable<{ message: string, user: User }> {
    return this.http.put<{ message: string, user: User }>(`${this.baseUrl}${id}`, user);
  }

  deleteUser(id: number | string): Observable<{ message: string, user: User }> {
    return this.http.delete<{ message: string, user: User }>(`${this.baseUrl}${id}`);
  }

}
