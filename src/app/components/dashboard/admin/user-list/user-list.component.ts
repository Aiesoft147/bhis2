import { Component, OnInit } from "@angular/core";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Router } from "@angular/router";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import {
  App,
  Rogue,
  UiService,
  LogService,
  DataTablesService,
} from "src/app/services";
import { config, routes, find, store } from "src/app/config";

@Component({
  selector: "app-user-list",
  templateUrl: "./user-list.component.html",
  styleUrls: ["./user-list.component.css"],
})
export class UserListComponent {
  formProfileEdit: FormGroup;
  allUser: any = []

  constructor(
    private fb: FormBuilder,
    private ui: UiService,
    private http: HttpClient,
    private router: Router,
    private logger: LogService,
    private table: DataTablesService
  ) {}

  ngOnInit(): void {
    this.table.init();
    this.formProfileEdit = this.fb.group({
      firstname: ["", Validators.required],
      surname: ["", Validators.required],
      password: ["", Validators.required],
      username: ["", Validators.email],
      phonenum: ["", Validators.required],
    });

    this.fetchAllUserList();
  }

  fetchAllUserList() {
    this.ui.blockUiOn(`Fetching List ... please wait`);

    //network call
    this.http
      .get<any>(
        config.base + routes.profiles.getAllUser,
        config.httpOptions()
      )
      .subscribe({
        next: (data: any) => {
          this.logger.log(data);
          this.table.destroy(`user-list`);
          if (data !== null && data.success) {
            this.allUser = data.data;
            this.ui.info(`Fetched successfully!`);
            this.table.reInit(`user-list`);
          } else {
            this.ui.error(`No Records Returned`);
          }
        },
        error: (e) => {
          if (e.status === 0 && e.error instanceof ProgressEvent) {
            this.ui.error('Poor or No Internet Connection, Please Check!');
            return;
          } else {
            this.ui.error(e.error?.detail);
            return;
          }
        },
      })
      .add(() => this.ui.blockUiOff());
  }
}
