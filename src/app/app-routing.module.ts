import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { routes as AppRoutes } from 'src/app/config'

import { LayoutComponent } from './components/dashboard/layout/layout/layout.component';

import { AdminOverviewComponent } from './components/dashboard/admin/admin-overview/admin-overview.component';
import { StaffoverviewComponent } from './components/dashboard/staff/staffoverview/staffoverview.component';
import { EnrolleeoverviewComponent } from './components/dashboard/enrollee/enrolleeoverview/enrolleeoverview.component';
import { SupportoverviewComponent } from './components/dashboard/support/supportoverview/supportoverview.component';
import { EnrolMenuComponent } from './components/dashboard/admin/enrol-menu/enrol-menu.component';

import { EnrolmentComponent } from './components/dashboard/admin/enrolment/enrolment.component';
import { UserListComponent } from './components/dashboard/admin/user-list/user-list.component'


import { SigninComponent } from './components/signin/signin.component';
import { SignupComponent } from './components/signup/signup.component';
import { ForgotPassComponent } from './components/forgot-pass/forgot-pass.component';
import { NotFoundComponent } from './components/not-found/not-found.component'
import { AuthGuard } from './shared/auth.guard';





const routes: Routes = [
  {
    path: '',
    redirectTo: AppRoutes.frontend.signin,
    pathMatch: 'full'
  },
  
  {
    path: 'signin',
    redirectTo: AppRoutes.frontend.signin,
    pathMatch: 'full'
  },

  { path: AppRoutes.frontend.signin, component: SigninComponent },
  { path: AppRoutes.frontend.signup, component: SignupComponent },
  { path: AppRoutes.frontend.forgotpass, component: ForgotPassComponent },


  {
    path: AppRoutes.frontend.dashboard,
    component: LayoutComponent,
    children: [
      // staff
      {
        path: AppRoutes.frontend.staff,
        children: [
          { path: AppRoutes.frontend.staffoverview, component: StaffoverviewComponent},
        
        ]
      },
      //Enrollee
      {
        path: AppRoutes.frontend.enrollee,
        children: [
          { path: AppRoutes.frontend.enrolleeoverview, component: EnrolleeoverviewComponent},
        
        ]
      },
      //Support
      {
        path: AppRoutes.frontend.support,
        children: [
          { path: AppRoutes.frontend.supportoverview, component: SupportoverviewComponent},
        
        ]
      },

      // admin
      {
        path: AppRoutes.frontend.admin,
        children: [
          // { path: AppRoutes.frontend.adminoverview, component: AdminOverviewComponent, canActivate: [AuthGuard]},
          { path: AppRoutes.frontend.adminoverview, component: AdminOverviewComponent },
          { path: AppRoutes.frontend.enrolmenu, component: EnrolMenuComponent},
          { path: AppRoutes.frontend.enrolment, component: EnrolmentComponent },
          { path: AppRoutes.frontend.userlist, component: UserListComponent },
        ]
      },
    ]
  },
  {
    path: '**',
    component: NotFoundComponent
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
