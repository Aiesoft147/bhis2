import { Component, OnInit } from "@angular/core";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Router } from "@angular/router";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { App, Rogue, UiService, LogService } from "src/app/services";
import { config, routes, find, store } from "src/app/config";
import { IPasswordStrengthMeterService } from "angular-password-strength-meter";

declare var $: any;

@Component({
  selector: "app-signin",
  templateUrl: "./signin.component.html",
  styleUrls: ["./signin.component.css"],
})
export class SigninComponent implements OnInit {
  date1 = new Date();
  currentYear = this.date1.getUTCFullYear();

  formStaffSignIn: FormGroup;
  password: string;
  result: number;
  userProfile: any = []

  constructor(
    private fb: FormBuilder,
    private ui: UiService,
    private http: HttpClient,
    private router: Router,
    private logger: LogService,
    private passMe: IPasswordStrengthMeterService
  ) {}

  ngOnInit(): void {
    // define form
    this.formStaffSignIn = this.fb.group({
      username: ["", Validators.email],
      password: ["", Validators.required],
    });   
  }

  checkToken(){
    let token = store.get("token");

    if (token === "undefined" || token === null || token.length == 0) {
      this.http
        .post<any>(
          config.base + routes.authentication.refreshtoken,{},
          config.httpOptions()
        )
        .subscribe({
          next: (data: any) => {
            this.logger.log(data);
            if (data !== null && data.success) {
              store.set("token", data.acesss);
            }
          },
          error: (e) => {},
        })
        .add(() => this.ui.blockUiOff());
    }
  }

  signIn(target: any) {
    // form validation
    if (!this.formStaffSignIn.valid) {
      // warning
      this.ui.warning(
        `Please provide a valid email address and password to sign in.`
      );
      return;
    }

    // define payload
    let payload = {
      //  ...this.formStaffSignIn.value
      email: this.formStaffSignIn.value.username,
      password: this.formStaffSignIn.value.password,
    };
    this.logger.log(payload);

    this.ui.blockUiOn(`Signing in... please wait`);
    this.http
      .post<any>(
        config.base + routes.authentication.centrallogin,
        payload,
        config.httpOptionsNoAuth()
      )
      .subscribe({
        next: (data: any) => {
          this.logger.log(data);
          if (data !== null && data.success) {
            this.ui.success(`User-Login: Successful!`);

            this.userProfile = data.data.user         
            // store data
            store.set("id", this.userProfile?.id);
            store.set("email", this.userProfile?.email || payload.email);
            store.set("fullName", this.userProfile?.full_name);
            store.set("firstname", this.userProfile?.first_name);
            store.set("phoneNumber", this.userProfile?.phone);
            store.set("token", data.data.access);
            store.set("refresh", data.data.refresh);
            store.set("role", "Available");
            store.set("isAdmin", this.userProfile?.superuser);
            store.set("isStaff", this.userProfile?.staff);
            store.set("isSupport", this.userProfile?.support);
            store.set("isEnrollee", this.userProfile?.enrollee);

            if (this.userProfile?.superuser == true && this.userProfile?.deactivated == false){
              this.ui.info("Welcome Admin")
              // timeout -> redirect
              setTimeout(() => {
                this.router.navigate(["/dashboard/admin/admindashboard"]);
              }, 1000);
            }
            else if(this.userProfile?.staff == true && this.userProfile?.deactivated == false){
              this.ui.info("Welcome Staff")

              // timeout -> redirect
              setTimeout(() => {
                this.router.navigate(["/dashboard/staff/staffdashboard"]);
              }, 1000);
            }
            else if(this.userProfile?.support == true && this.userProfile?.deactivated == false){
              this.ui.info("Welcome Support")
              // timeout -> redirect
              setTimeout(() => {
                this.router.navigate(["/dashboard/support/supportdashboard"]);
              }, 1000);
            }
            else if(this.userProfile?.enrollee == true && this.userProfile?.deactivated == false){
              this.ui.info("Welcome Enrollee")
              // timeout -> redirect
              setTimeout(() => {
                this.router.navigate(["/dashboard/enrollee/enrolleedashboard"]);
              }, 1000);
            }
            return;
          } else {
            this.ui.warning(
              `Invalid Credentials Supplied,try Again <br> ` + data.details
            );
            return;
          }
        },
        error: (e) => {
          if (e.status === 0 && e.error instanceof ProgressEvent) {
            this.ui.error("Poor or No Internet Connection, Please Check!");
            return;
          } else {
            this.logger.error(e);
            this.ui.error(e.error?.detail);
            return;
          }
        },
      })
      .add(() => this.ui.blockUiOff());
  }

  passMeter(event: any) {
    this.password = this.formStaffSignIn.value.password;
    this.result = this.passMe.score(this.password);
    // this.logger.log("PassMeterScore" + this.result)
  }

  togglePasswordReveal(target: any) {
    // const eye = document.querySelector("#eye")
    const passwordInput = document.querySelector("#pwd");
    // eye.classList.toggle("mdi-eye-off-outline")
    const type =
      passwordInput.getAttribute("type") === "password" ? "text" : "password";
    passwordInput.setAttribute("type", type);
  }
}
