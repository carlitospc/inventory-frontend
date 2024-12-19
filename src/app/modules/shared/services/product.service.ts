import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

const base_url = "http://localhost:8080/api/v1"

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }

    /**
   * get all products
   * @returns 
   */
    getProducts() {
      const endPoint = `${base_url}/products`;
      return this.http.get(endPoint)
    }
}
