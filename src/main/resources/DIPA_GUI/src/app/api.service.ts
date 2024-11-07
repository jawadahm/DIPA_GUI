import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private apiUrl = `${environment.HOST_API}/api/v1`;

  constructor(private http: HttpClient) { }

  // GET request to fetch data
  getProducts(): Observable<any> {
    const token = localStorage.getItem('access_token');  // Retrieve the token from storage
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
    return this.http.get(this.apiUrl+'/products', {headers});
  }
}
