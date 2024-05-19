import { Component, OnInit } from "@angular/core";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Router } from "@angular/router";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { App, Rogue, UiService, LogService } from "src/app/services";
import { config, routes, find, store } from "src/app/config";
import { IPasswordStrengthMeterService } from "angular-password-strength-meter";

@Component({
  selector: "app-signup",
  templateUrl: "./signup.component.html",
  styleUrls: ["./signup.component.css"],
})
export class SignupComponent {
  formStaffSignUp: FormGroup;
  password: string;
  result: number;
  date1 = new Date();
  currentYear = this.date1.getUTCFullYear();
  token: string = store.get("token");

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
    this.formStaffSignUp = this.fb.group({
      firstname: ["", Validators.required],
      surname: ["", Validators.required],
      password: ["", Validators.required],
      username: ["", Validators.email],
      phonenum: ["", Validators.required],
    });

    // this.checkAccessStatus()
  }

  checkAccessStatus() {
    if (
      this.token === "undefined" ||
      this.token === null ||
      this.token.length == 0
    ) {
      this.http
        .post<any>(
          config.base + routes.authentication.refreshtoken,
          {},
          config.httpOptions()
        )
        .subscribe({
          next: (data: any) => {
            this.logger.log(data);
            if (data !== null && data.success) {
              store.set("token", data.acesss);
              this.token = data;
              setTimeout(() => {
                this.router.navigate(["/signup"]);
              }, 1000);
            }
          },
          error: (e) => {},
        })
        .add();
    }
  }

  signUp(target: any) {
    // form validation
    if (!this.formStaffSignUp.valid || this.result <= 2) {
      // warning
      this.ui.warning(
        `One or More Required Field is Empty or <br> Password Strength is Low! <br> Check Again!`
      );
      return;
    }

    // define payload
    let payload = {
      //  ...this.formStaffSignUp.value
      first_name: this.formStaffSignUp.value.firstname,
      middle_name: null,
      last_name: this.formStaffSignUp.value.surname,
      email: this.formStaffSignUp.value.username,
      phone: this.formStaffSignUp.value.phonenum,
      alt_phone: null,
      password: this.formStaffSignUp.value.password,
      password_confirmation: this.formStaffSignUp.value.password,
    };

    // log data
    this.logger.log(payload);

    this.ui.blockUiOn(`Creating UserAccount... please wait`);
    this.http
      .post<any>(
        config.base + routes.authentication.accountsignup,
        payload,
        config.httpOptionsNoAuth()
      )
      .subscribe({
        next: (data: any) => {
          this.logger.log(data);
          if (data !== null || data.success) {
            this.ui.success(
              `UserAccount Created Successful! <br> Proceed to Login after Redirect`
            );
            this.resetSignUpForm();
            this.router.navigate(["/signin"]);
          } else {
            this.ui.error(`Something went Wrong,TryAgain! <br>` + data.details);
            return;
          }
        },
        error: (e) => {
          if (e.status === 0 && e.error instanceof ProgressEvent) {
            this.ui.error("Poor or No Internet Connection, Please Check!");
            return;
          } else if (e.status === 401) {
            setTimeout(() => {
              this.router.navigate(["/signin"]);
            }, 1000);
            // this.checkAccessStatus()
          } else {
            this.logger.error(e);
            this.ui.error(e.message);
            return;
          }
        },
      })
      .add(() => this.ui.blockUiOff());
  }

  passMeter(event: any) {
    this.password = this.formStaffSignUp.value.password;
    this.result = this.passMe.score(this.password);
  }

  togglePasswordReveal(target: any) {
    // const eye = document.querySelector("#eye")
    const passwordInput = document.querySelector("#pwd");
    // eye.classList.toggle("mdi-eye-off-outline")
    const type =
      passwordInput.getAttribute("type") === "password" ? "text" : "password";
    passwordInput.setAttribute("type", type);
  }

  resetSignUpForm() {
    // reset
    this.formStaffSignUp.reset();
    this.formStaffSignUp.patchValue({
      firstname: "",
      surname: "",
      password: "",
      username: "",
      phonenum: "",
    });
  }
}
