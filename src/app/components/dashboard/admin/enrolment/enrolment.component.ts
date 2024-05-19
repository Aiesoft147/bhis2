import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { App, Rogue, UiService, LogService,CroppieService } from 'src/app/services';
import { config, routes, find, store, modal } from 'src/app/config';

@Component({
  selector: 'app-enrolment',
  templateUrl: './enrolment.component.html',
  styleUrls: ['./enrolment.component.css']
})
export class EnrolmentComponent {
  formEnrollment: FormGroup
  stepOneFlag: boolean = true
  stepTwoFlag: boolean = false
  stepThreeFlag: boolean = false
  stepFourFlag: boolean = false

  constructor(private fb: FormBuilder,
    private ui: UiService,
    private http: HttpClient,
    private router: Router,
    private logger: LogService,
    private croppie: CroppieService
  ) { }

    ngOnInit(): void {

    // initialize
    this.croppie.init({
      component: this,
      form: 'formStudentProfile',
      photoControl: 'passport'
    })

    // define form
      this.formEnrollment = this.fb.group({
        firstName: ['', Validators.required],
        surname: ['', Validators.required],
        otherNames: [''],
        phoneNumber: [''],
        email: ['', Validators.email],
        homeAddress: [''],
        dateOfBirth: [''],
      })


    }

    proceedStepTwo(){
      this.stepOneFlag = false
      this.stepTwoFlag = true
      this.ui.info(`<strong>Step Two </strong> <br> Sponsors Page`)
    }
    proceedStepThree(){
      this.stepTwoFlag = false
      this.stepThreeFlag = true
      this.ui.info(`<strong>Step Three </strong> <br> Dependant/Principle Page`)
    }
    proceedStepFour(){
      this.stepFourFlag = true
      this.stepThreeFlag = false
      this.ui.info(`<strong>Biometric Page</strong> <br> Under-Development`)
    }

    prevStep(){
      this.stepOneFlag = true
      this.stepTwoFlag = false
    }
    prevStep2(){
      this.stepTwoFlag = true
      this.stepThreeFlag = false
    }
    prevStep3(){
      this.stepThreeFlag = true
      this.stepFourFlag = false
    }

    addDependant(){
      modal.show(`#modal-add-dependant`);
    }

}
