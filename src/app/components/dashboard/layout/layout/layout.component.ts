import { Component, OnInit } from '@angular/core';
import { AppBase } from 'src/assets/js/codebase.app.min.js'
import { HttpClient } from '@angular/common/http';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { App, Rogue, UiService, LogService } from 'src/app/services';
import { config, routes, find, store } from 'src/app/config';
import { filter } from 'rxjs/operators';
import { OnlineStatusService, OnlineStatusType } from 'ngx-online-status';
import { AuthService } from 'src/app/services/auth.service';

declare var $: any;
@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent {
  today: number = Date.now();
  currentUser: any = {
    role:'',
    name: 'Mary Williams',
    fname:'',
    isAdmin: '',
    isSupport: '',
    isStaff: '',
    isEnrollee: ''
  }
  currentRoute: any
  status: OnlineStatusType;
  onlineStatusCheck: any = OnlineStatusType;

  constructor (private fb: FormBuilder,
    private ui: UiService,
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute,
    private logger: LogService,
    private onlineStatusService: OnlineStatusService,
    private authService: AuthService) {

    this.onlineStatusService.status.subscribe((status: OnlineStatusType) => {
      // Retrieve Online status Type
      this.status = status;
    });

    this.currentUser.fname = store.get('firstname')
    this.currentUser.name = store.get('fullName') || this.currentUser.name
    this.currentUser.isAdmin = store.get('isAdmin')
    this.currentUser.isStaff = store.get('isStaff')
    this.currentUser.isEnrollee = store.get('isEnrollee')
    this.currentUser.isSupport = store.get('isSupport')
    this.currentUser.role = store.get('role')

    if (this.currentUser.role !== "Available") {
      // warning
      this.ui.warning(`Please sign in again to access your dashboard.`)
      // sign out user
      this.signOutUser()
      return
    }
    // get current url
    this.subscribeToRouterUrl()
  }

  ngOnInit () {
    AppBase.Init()
  }

  login(){
    this.authService.login
  }
  logout(){
    this.authService.logout
  }
  // watch router events
  subscribeToRouterUrl () {
    // pipe and filter navigation end event to get current route
    this.router.events.pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        this.grabCurrentUrlByLocation()
      });
  }

  // grab current url based on window location
  grabCurrentUrlByLocation () {
    // get url object
    let url = new URL(location.href);

    // get the current route
    this.currentRoute = url.pathname

    // process page context title based on route
    this.identifyActiveNavigationItem()
  }

  // identify active navigation item
  identifyActiveNavigationItem () {
    // get url object
    let url = new URL(location.href)

    // get the current route
    this.currentRoute = url.pathname
    // alert(this.currentRoute)

    // navigation control
    let navigationControl = null

    // timeout
    setTimeout(() => {
      // get control
      navigationControl = find(`.nav-main a.nav-main-link[routerLink="${this.currentRoute}"]`)

      // remove all previous nav styles
      find(`.nav-main .nav-main-item`).removeClass('open')

      // check if sub menu nav
      if (navigationControl.parents('.nav-main-submenu').length) {
        // apply style to parent
        navigationControl.parents('.nav-main-item').addClass('open')
      }

      // remove all previous nav styles
      find(`.nav-main a.nav-main-link`).removeClass('active')

      // apply style to nav control
      navigationControl.addClass('active')
    }, 1)
  }

  // sign out user
  signOutUser () {
    // confirm
    if (!confirm(`Doing this will sign you out of the application.`)) return

    // info
    this.ui.info(`You've been signed out.`)
    
    // clear storage
    store.clear()
    this.logger.log("Clear Now, SignOut")
    // redirect
    this.router.navigate([('/signin')])
  }

}
