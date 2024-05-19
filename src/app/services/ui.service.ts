import { Injectable } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LogService } from 'src/app/services';
import { modal } from 'src/app/config';
import $ from "jquery";

declare var $: any

@Injectable({ providedIn: 'root' })
export class UiService {
	constructor(private toastrService: ToastrService,
		private logger: LogService,
		private router: Router){}

	// show message
	success(msg: string){
		this.toastrService.success(msg)
	}
	// show message
	info(msg: string){
		this.toastrService.info(msg)
	}
	// show message
	warning(msg: string){
		this.toastrService.warning(msg)
	}
	// show message
	error(e: any){
		// get message
    let message = ((typeof e === 'object')
    	? ((typeof e.error !== 'object') ? e.error : e.message) : e)
    // get filter
    let filter = (new RegExp(/One or more validation errors occurred/i)).test(JSON.stringify(e))
    	? `An error occurred! Please try again or contact the administrator.`
    	: message

		// check for status and code
		if (e.status == '401' && (new RegExp(/User is not authenticated/i)).test(JSON.stringify(e))) {
			// hide all modals
			modal.hide('.modal')
			// clear localstorage
    	localStorage.clear()
    	// redirect
    	this.router.navigate(['/signin'])
    	// show error message
			this.toastrService.warning(`Session has expired! You can sign back in with your credentials.`)
		} else {
			// show error message
			this.toastrService.error(message)
			// log error
			this.logger.log(e)
		}
	}
	// block ui
	blockUiOn(msg: string) {
		// block screen with message
    $.blockUI({
    	message: `<div class="block-ui-spinner">
						    	<div class="spinner-border text-danger" role="status">
							    	<span class="sr-only">Loading...</span>
									</div>
									<span class="ml-3">${msg}</span>
								</div>`
		})
	}
	// unblock ui
	blockUiOff() {
		// unblock screen
    $.unblockUI()
	}
}
