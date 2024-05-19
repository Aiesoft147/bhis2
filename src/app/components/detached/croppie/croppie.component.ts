import { Component, Input, OnInit } from '@angular/core';
import { CroppieService } from 'src/app/services'

// define template
let template = `croppie.component`

@Component({
  selector: 'app-modal-croppie-image-cropper',
  templateUrl: `${template}.html`,
  styleUrls: [`${template}.css`]
})
export class CroppieImageCropperModalComponent implements OnInit {

  constructor (private croppie: CroppieService) {
  }

  ngOnInit () {}
}
