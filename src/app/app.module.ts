import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './modules/dashboard/pages/dashboard.component';
import { HomeComponent } from './modules/dashboard/components/home/home.component';
import { DashboardModule } from './modules/dashboard/dashboard.module';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { SharedModule } from "./modules/shared/shared.module";
import { KeycloakAngularModule, KeycloakService } from 'keycloak-angular';

/*function initializeKeycloak(keycloak: KeycloakService) {
  return () =>
    keycloak.init({
      config: {
        url: 'http://localhost:8082/',
        realm: 'inventory',
        clientId: 'angular-client'
      },
      initOptions: {
        onLoad: 'login-required',
        flow: "standard",
        silentCheckSsoRedirectUri:
          window.location.origin + '/assets/silent-check-sso.html'
      },
      loadUserProfileAtStartUp: true
    });
}*/

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    HomeComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    DashboardModule,
    SharedModule,
    KeycloakAngularModule
  ],
  providers: [
    provideAnimationsAsync(),
    /*{
      provide: APP_INITIALIZER,
      useFactory: initializeKeycloak,
      multi: true,
      deps: [KeycloakService]
    }*/
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
