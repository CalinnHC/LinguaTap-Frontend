import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private baseUrl = 'http://localhost:8081';
  username: string = '';
  private userIdKey = 'userID';
  userid = new BehaviorSubject<number>(this.getStoredidStatus());
  isLoggedInSubject = new BehaviorSubject<boolean>(this.getStoredLoggedInStatus());

  constructor(private http: HttpClient) {}

  login(username: string, password: string): Observable<any> {
    const body = { username, password };
    return this.http.post<any>(`${this.baseUrl}/login`, body);
  }

  changePassword(currentPassword: String, newPassword: string): Observable<any> {
    const id = this.userid.value;
    const body = { id, currentPassword, newPassword };
    return this.http.get<any>(`${this.baseUrl}/changePassword/${id}/${currentPassword}/${newPassword}`);
  }

  getUser(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/user/${this.userid.value}`);
  }

  newUser(username: String, password: String, email: String, country: Number): Observable<any> {
    const id_type: Number = 2;
    const body = {username, password, email, country,id_type};
    console.log(body);
    return this.http.post<any>(`${this.baseUrl}/user`, body);
  }

  newScore(id_game: number, score: number): Observable<any> {
    const user_id = this.userid.value;
    const body = { id_game, user_id, score };
    console.log(body);
    return this.http.post<any>(`${this.baseUrl}/score`, body);
  }

  loginSuccess() {
    this.isLoggedInSubject.next(true);
    if (this.isBrowser()) {
      sessionStorage.setItem('isLoggedIn', 'true');
    }
  }

  logout() {
    this.isLoggedInSubject.next(false);
    if (this.isBrowser()) {
      sessionStorage.removeItem('userID');
      sessionStorage.removeItem('isLoggedIn');
    }
  }

  getLoggedInStatus(): Observable<boolean> {
    return this.isLoggedInSubject.asObservable();
  }

  private getStoredLoggedInStatus(): boolean {
    if (this.isBrowser()) {
      return sessionStorage.getItem('isLoggedIn') === 'true';
    }
    return false;
  }


  private isBrowser(): boolean {
    return typeof window !== 'undefined' && typeof sessionStorage !== 'undefined';
  }
  private getStoredidStatus(): number {
    if (typeof sessionStorage !== 'undefined') {
      const storedId = sessionStorage.getItem(this.userIdKey);
      return storedId ? parseInt(storedId, 10) : 0;
    }
    return 0; 
  }

  updateUserId(id: number): void {
    if (typeof sessionStorage !== 'undefined') {
      sessionStorage.setItem(this.userIdKey, id.toString());
    }
    this.userid.next(id);
  }

  clearUserId(): void {
    if (typeof sessionStorage !== 'undefined') {
      sessionStorage.removeItem(this.userIdKey);
    }
    this.userid.next(0);
  }
}
