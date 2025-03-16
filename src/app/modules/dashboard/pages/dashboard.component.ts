import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../shared/services/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
  token: string = '';

  constructor(private authService: AuthService) { }

  ngOnInit() {

    this.authService.obtenerToken().subscribe({
      next: (response) => {
        console.log('Token obtenido:', response.access_token);
        this.authService.guardarTokens(response.access_token, response.refresh_token, response.expires_in);
      },
      error: (error) => {
        console.error('Error al obtener el token:', error);
      },
      complete: () => {
      }
    });
  }
}
