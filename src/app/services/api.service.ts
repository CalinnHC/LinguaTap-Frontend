import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { jwtDecode } from 'jwt-decode';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private baseUrl = 'http://localhost:8081';
  constructor(private http: HttpClient) {}

  //Login Service
  login(username: string, password: string): Observable<any> {
    const body = { username, password };
    return this.http.post<any>(`${this.baseUrl}/login`, body);
  }
  
  saveToken(token: string): void {
    if (this.isBrowser()) {
      localStorage.setItem('jwtToken', token);
    }
  }
  
  getToken(): string | null {
    return this.isBrowser() ? localStorage.getItem('jwtToken') : null;
  }
  
  logout(): void {
    if (this.isBrowser()) {
      localStorage.removeItem('jwtToken');
    }
  }
  
  isLoggedIn(): boolean {
    return !!this.getToken();
  }
  
  //Profile Service
  changePassword(currentPassword: String, newPassword: string): Observable<any> {
    const id = this.getUserId();
    const body = { id, currentPassword, newPassword };
    return this.http.get<any>(`${this.baseUrl}/changePassword/${id}/${currentPassword}/${newPassword}`);
  }

  getUser(): Observable<any> {
    const user_id = this.getUserId();
    if (user_id == null){
      return of(null);
    }
    return this.http.get<any>(`${this.baseUrl}/user/${this.getUserId()}`);
  }

  newUser(username: String, password: String, email: String, country: Number): Observable<any> {
    const id_type: Number = 2;
    const body = {username, password, email, country,id_type};
    console.log(body);
    return this.http.post<any>(`${this.baseUrl}/user`, body);
  }

  newScore(id_game: number, score: number): Observable<any> {
    const user_id = this.getUserId();
    if (user_id == null){
      return of(null);
    }
    const body = { id_game, user_id, score };
    console.log(body);
    return this.http.post<any>(`${this.baseUrl}/score`, body);
  }


  private isBrowser(): boolean {
    return typeof window !== 'undefined' && typeof window.localStorage !== 'undefined';
  }


  getUserId(): number | null {
    const token = this.getToken();
    if (token) {
      try {
        const decodedToken: any = jwtDecode(token);
        console.log(decodedToken.sub);
        
        // Verifica si 'sub' es un número y retorna ese valor, o maneja el caso si no es válido.
        const userId = Number(decodedToken.sub);
        if (!isNaN(userId)) {
          return userId;  // Retorna el ID como número
        } else {
          console.error('El ID de usuario no es un número válido');
          return null;  // Maneja el caso en que el ID no es válido
        }
        
      } catch (error) {
        console.error('Error al decodificar el token:', error);
        return null;
      }
    }
    return null;
  }

  sendForgottenPasswordEmail(email: string): Observable<string> { 
    const url = `${this.baseUrl}/forgottenPasswordEmail`;
    const params = { email };
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.get<string>(url, { params, headers, responseType: 'text' as 'json' });
  }

  confirmNewPasswordToken(token: string): Observable<string> {
    const url = `${this.baseUrl}/confirmNewPassword`;
    const params = { token };
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  
    return this.http.get<string>(url, { params, headers });
  }

  updatePassword(token: string, newPassword: string): Observable<string> {
    const url = `${this.baseUrl}/NewPassword`;
    const params = { token, newPassword };
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    console.log("Sending: " + token + " and " + newPassword);
  
    return this.http.get<string>(url, { params, headers });
  }

}
