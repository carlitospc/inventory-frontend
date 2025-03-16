import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';
import { FACTUS_ENDPOINT } from '../../../config/factus';
import { FacturaResponse } from '../../factura/factura/factura.component';

@Injectable({
  providedIn: 'root'
})
export class FacturaService {
  protected base_url = FACTUS_ENDPOINT;

  constructor(private http: HttpClient, private authService: AuthService) { }

  /**
   * get all facturas
   */
  getFacturas(page: number = 1, perPage: number = 10): Observable<FacturaResponse> { console.log(page, perPage);
    const endPoint = `${this.base_url}/v1/bills?page=${page}&per_page=${perPage}`;
    const accessToken = this.authService.obtenerAccessToken();

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    });

    return this.http.get<FacturaResponse>(endPoint, { headers });
  }
}
