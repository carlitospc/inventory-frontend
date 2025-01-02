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

  /**
    * save products
    * @param body save products
    */
  saveProduct(body: any) {
    const endPoint = `${base_url}/products`;
    return this.http.post(endPoint, body);
  }

  /**
   * update products
   * @param body 
   * @param id 
   */
  updateProduct(body: any, id: any) {
    const endPoint = `${base_url}/products/${id}`;
    return this.http.put(endPoint, body, id);
  }

  /**
   * delete products
   * @param id 
   */
  deleteProduct(id: any) {
    const endPoint = `${base_url}/products/${id}`;
    return this.http.delete(endPoint);
  }

 /**
  * get product by id
  * @param id 
  */
  getProductById(id: any) {
    const endPoint = `${base_url}/products/${id}`;
    return this.http.get(endPoint);
  }
}
