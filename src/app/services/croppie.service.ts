import { Injectable } from '@angular/core';
import { find } from 'src/app/config'

@Injectable({ providedIn: 'root' })
export class CroppieService {
	// context stores
  __image: any = null
  __form: any = null
  __container: any = null
  __orient: number = 1

	// activate the image cropper
  init (hostOptions?: any){
    // get object
    var obj = hostOptions

    // timeout
    setTimeout (() => {
	    // check if element exists
	    if(find('.mine-picture-image-demo').length){
	    	// get croppie controls container
    		this.__container = find('.mine-picture-image-demo').parents('.modal')

	      // reload croppie control
	      this.reloadCroppie();

	      // step 1
	      // when the select profile photo control is clicked
	      find('span[data-control-id="app-section-onboarding-profile-photo-select"]')
	      .on('click', (e: any) => {
	        try{
	        	// get form
	      		this.__form = find(e.target).parents('form')

	          // -- Reset controls
	          this.__container.find('#-profile-picture-image-picture, #-profile-picture-image-picture-').val('');
	          this.__container.find('.cr-boundary, .cr-slider-wrap').remove();

	          // reset photo value
	        //   if (obj) obj.component[obj.form].get(obj.photoControl).setValue('')

	          // reoad croppie
	          this.reloadCroppie();
	          // trigger click on the file control
	          this.__container.find('#-profile-picture-image-picture').trigger('click');
	        }catch(err){ console.log(err) }
	      })

	      // setp 2
	      // when the file control has received a file
	      this.__container.find('#-profile-picture-image-picture').on('change', (e: any) => {
	        // make appear the rotation controls
	        this.__container.find('.rotate-button-90, .rotate-button-180, .rotate-button--90, .rotate-button').css({
	          'display' : 'inline-block'
	        });
	        // pass the file object to variable
	        this.__image = e.target;
	        // read the data url of the image into croppie control
	        this.readFile(e.target);
	        // bring up the modal containing the croppie control
	        this.__container.modal('show')
	      });

	      // step 3
	      // when the crop photo button is clicked
	      this.__container.find('.picture-image-upload-save').on('click', (e) => {
	        // get result from croppie control
	        this.__container.find('.mine-picture-image-demo').croppie('result', {
	            type: 'canvas',
	            size: 'viewport'
	        }).then((resp: any) => {
	          // check the control to hold the cropped image is available
	          if(this.__container.find('#-profile-picture-image-picture-').length){
	            // place the image data in control
	            this.__container.find('#-profile-picture-image-picture-').val(resp);
	          }

	          // set profile photo
	        //   if (obj) obj.component[obj.form].get(obj.photoControl).setValue(resp.toString())

	          // place image in the photo container
	          this.__form.find('img#app-section-onboarding-profile-photo-container')
	            .attr('src', resp.toString())

	          // dismiss the photo box
	          this.__container.modal('hide');
	        });
	        // prevent default
	        e.preventDefault();
	      });

	      // rotate 90
	      this.__container.find('.rotate-button-90').on('click', () => {
	        this.__orient = 6;
	        this.readFile(this.__image);
	      });
	      // rotate 180
	      this.__container.find('.rotate-button--90').on('click', () => {
	        this.__orient = 8;
	        this.readFile(this.__image);
	      });
	      // rotate 90 anti-clockwise
	      this.__container.find('.rotate-button-180').on('click', () => {
	        this.__orient = 3;
	        this.readFile(this.__image);
	      });
	      // default
	      this.__container.find('.rotate-button').on('click', () => {
	        this.__orient = 1;
	        this.readFile(this.__image);
	      });
	    }
	  }, 100)
  }
  // reset
  reset () {
  	// place image in the photo container
    let control = this.__form.find('img#app-section-onboarding-profile-photo-container')
    // reset control
    control.attr('src', control.attr('data-initial-src'))
  }
  // reload croppie control
  reloadCroppie () {
    find('.mine-picture-image-demo').croppie({
      enableExif: true,
      viewport: {
        width: 250,
        height: 250,
        type: 'square'
      },
      boundary : {
        width: 300,
        height: 300
      },
      showZoomer: true,
      enableOrientation: true
    });  }
  // read image data url as base64
  readFile (input: any) {
    // check if control contains a file
    if (input.files && input.files[0]) {
      // initiate the file reader
      var reader = new FileReader();
      // when reader has read data
      reader.onload = (e) => {
        this.__container.find('.mine-picture-image-demo').croppie('bind', {
          url: e.target.result,
          orientation: this.__orient
        });

        // adjust the slider
        this.__container.find('.cr-slider').attr({
          'step'  : '0.0001',
          'min'    : '0.260',
          'max'    : '1.5000',
        })
      };
      // read data
      reader.readAsDataURL(input.files[0]);
    }else {
      alert("Sorry - Photo could not be loaded!");
    }
  }
}
