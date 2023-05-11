import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './login/login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './shared/material.module';
import { RouterModule, Routes } from '@angular/router';
import { MonitorComponent } from './monitor/monitor.component';
import { AdminUserComponent } from './admin-user/admin-user.component';
import { AuthGuardService } from './servicios/api/guards/auth-guard.service';
import { UsersComponent } from './admin-user/modals/users/users.component';

const appRoutes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'adminuser', component: AdminUserComponent, canActivate:[AuthGuardService] }
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MonitorComponent,
    AdminUserComponent,
    UsersComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MaterialModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
