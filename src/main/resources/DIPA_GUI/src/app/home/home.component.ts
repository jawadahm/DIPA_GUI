import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ApiService } from '../api.service';
import { catchError, of } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit{

  products: any;
  constructor(private apiService: ApiService, private authService: AuthService) { }

  ngOnInit(): void {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'

    });

    this.apiService.getProducts()
      .pipe(
        catchError(error => {
          console.error('Error fetching posts:', error);
          return of([]);  // Return an empty array on error
        })
      )
      .subscribe(data => {
        this.products = data;
        console.log(this.products);
      });
  }

  logout() : void {
    this.authService.doLogout();
  }

}
