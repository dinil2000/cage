import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { LoadingService } from './loading.service';
import { finalize } from 'rxjs/operators';

export interface Product {
  _id?: string;
  name: string;
  description: string;
  price: number;
  image?: {
    data: string;
    contentType: string;
  };
  specifications: {
    size: string;
    material: string;
    capacity: string;
  };
}

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private baseUrl = 'http://localhost:5000/api/products';

  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private loadingService: LoadingService
  ) { }

  private getHeaders(): HttpHeaders {
    const token = this.authService.getToken();
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  }

  getAllProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.baseUrl, { headers: this.getHeaders() });
  }

  getProduct(id: string): Observable<Product> {
    return this.http.get<Product>(`${this.baseUrl}/${id}`, { headers: this.getHeaders() });
  }

  createProduct(productData: FormData): Observable<Product> {
    return this.http.post<Product>(this.baseUrl, productData, { headers: this.getHeaders() });
  }

  updateProduct(id: string, productData: FormData): Observable<Product> {
    return this.http.put<Product>(`${this.baseUrl}/${id}`, productData, { headers: this.getHeaders() });
  }

  deleteProduct(id: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`, { headers: this.getHeaders() });
  }
}
