import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { MainMenuComponent } from './components/main-menu/main-menu.component';
import { Game1Component } from './components/game1/game1.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { ChangePasswordComponent } from './components/change-password/change-password.component';
import { authGuard } from './guards/auth.guard';
import { noAuthGuard } from './guards/no-auth.guard';

const routes: Routes = [
  { path: '', component: HomeComponent,canActivate: [noAuthGuard]},
  { path: 'login', component: LoginComponent, canActivate: [noAuthGuard]},
  { path: 'register', component: RegisterComponent, canActivate: [noAuthGuard]},
  { path: 'mainMenu', component: MainMenuComponent, canActivate: [authGuard]},
  { path: 'game1', component: Game1Component, canActivate: [authGuard]},
  { path: 'userProfile', component: UserProfileComponent, canActivate: [authGuard]},
  { path: 'changePassword', component: ChangePasswordComponent, canActivate: [authGuard]},
  { path: '**', redirectTo: 'mainMenu' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
