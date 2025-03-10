import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideHttpClient } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { RegisterComponent } from './components/register/register.component';
import { MainMenuComponent } from './components/main-menu/main-menu.component';
import { Game1Component } from './components/game1/game1.component';
import { FormsModule } from '@angular/forms';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { ChangePasswordComponent } from './components/change-password/change-password.component';
import { ForgottenPasswordComponent } from './components/forgotten-password/forgotten-password.component';
import { NewPasswordComponent } from './components/new-password/new-password.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { Game2Component } from './components/game-2/game-2.component';
import { ResultsComponent } from './components/results/results.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { Game3Component } from './components/game-3/game-3.component';
import { DictionaryComponent } from './components/dictionary/dictionary.component';
import { IrregularVerbsComponent } from './components/irregular-verbs/irregular-verbs.component';
import { ErrorReportComponent } from './components/error-report/error-report.component';
import { error } from 'console';
import { TermsAndConditionsComponent } from './legal/terms-and-conditions/terms-and-conditions.component';
import { ContactComponent } from './legal/contact/contact.component';
import { PrivacyPolicyComponent } from './legal/privacy-policy/privacy-policy.component';
import { Game4Component } from './components/game-4/game-4.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    RegisterComponent,
    MainMenuComponent,
    Game1Component,
    UserProfileComponent,
    ChangePasswordComponent,
    ForgottenPasswordComponent,
    NewPasswordComponent,
    SidebarComponent,
    Game2Component,
    ResultsComponent,
    DashboardComponent,
    Game3Component,
    DictionaryComponent,
    IrregularVerbsComponent,
    ErrorReportComponent,
    TermsAndConditionsComponent,
    ContactComponent,
    PrivacyPolicyComponent,
    Game4Component
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [
    provideHttpClient()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
