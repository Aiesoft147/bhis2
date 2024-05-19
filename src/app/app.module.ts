import { NgModule } from '@angular/core';
import { DatePipe } from '@angular/common';

import { BrowserModule } from '@angular/platform-browser';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule }    from '@angular/common/http';
import { OnlineStatusModule } from 'ngx-online-status';

import { OnlineStatusComponent } from './components/online-status/online-status.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SigninComponent } from './components/signin/signin.component';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PasswordStrengthMeterModule } from 'angular-password-strength-meter';
import { SignupComponent } from './components/signup/signup.component';
import { LayoutComponent } from './components/dashboard/layout/layout/layout.component';
import { AdminOverviewComponent } from './components/dashboard/admin/admin-overview/admin-overview.component';
import { StaffoverviewComponent } from './components/dashboard/staff/staffoverview/staffoverview.component';
import { AdminMenuComponent } from './components/dashboard/layout/admin-menu/admin-menu.component';
import { StaffMenuComponent } from './components/dashboard/layout/staff-menu/staff-menu.component';
import { ForgotPassComponent } from './components/forgot-pass/forgot-pass.component';
import { EnrolmentComponent } from './components/dashboard/admin/enrolment/enrolment.component';
import { CroppieImageCropperModalComponent } from './components/detached/croppie/croppie.component';
import { UserListComponent } from './components/dashboard/admin/user-list/user-list.component';
import { NotFoundComponent } from './components/not-found/not-found.component'
import { AuthService } from './services/auth.service';
import { EnrolleeMenuComponent } from './components/dashboard/layout/enrollee-menu/enrollee-menu.component';
import { HcpMenuComponent } from './components/dashboard/layout/hcp-menu/hcp-menu.component';
import { EnrolleeoverviewComponent } from './components/dashboard/enrollee/enrolleeoverview/enrolleeoverview.component';
import { SupportoverviewComponent } from './components/dashboard/support/supportoverview/supportoverview.component';
import { EnrolMenuComponent } from './components/dashboard/admin/enrol-menu/enrol-menu.component';




@NgModule({
  declarations: [
    AppComponent,
    OnlineStatusComponent,
    SigninComponent,
    SignupComponent,
    LayoutComponent,
    AdminOverviewComponent,
    StaffoverviewComponent,
    AdminMenuComponent,
    StaffMenuComponent,
    ForgotPassComponent,
    EnrolmentComponent,
    CroppieImageCropperModalComponent,
    UserListComponent,
    NotFoundComponent,
    EnrolleeMenuComponent,
    HcpMenuComponent,
    EnrolleeoverviewComponent,
    SupportoverviewComponent,
    EnrolMenuComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    OnlineStatusModule,
    NgbModule,
    BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot({
      enableHtml: true,
      preventDuplicates: true,
      includeTitleDuplicates: true
    }), // ToastrModule added
    PasswordStrengthMeterModule.forRoot()
  ],
  providers: [DatePipe, AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
