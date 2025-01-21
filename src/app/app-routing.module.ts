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
import { ForgottenPasswordComponent } from './components/forgotten-password/forgotten-password.component';
import { NewPasswordComponent } from './components/new-password/new-password.component';
import { Game2Component } from './components/game-2/game-2.component';
import { ResultsComponent } from './components/results/results.component';

const routes: Routes = [
  { path: '', component: HomeComponent,canActivate: [noAuthGuard]},
  { path: 'login', component: LoginComponent, canActivate: [noAuthGuard]},
  { path: 'register', component: RegisterComponent, canActivate: [noAuthGuard]},
  { path: 'mainMenu', component: MainMenuComponent, canActivate: [authGuard]},
  { path: 'game-1', component: Game1Component, canActivate: [authGuard]},
  { path: 'game-2', component: Game2Component, canActivate: [authGuard]},
  { path: 'userProfile', component: UserProfileComponent, canActivate: [authGuard]},
  { path: 'changePassword', component: ChangePasswordComponent, canActivate: [authGuard]},
  { path: 'forgotten-password', component: ForgottenPasswordComponent, canActivate: [noAuthGuard]},
  { path: 'new-password', component: NewPasswordComponent, canActivate: [noAuthGuard]},
  { path: 'result', component: ResultsComponent, canActivate: [authGuard]},
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
