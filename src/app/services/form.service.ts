// jquery operator
declare var $: any

// define app object
export const App = {
	// toggle password reveal
	togglePasswordReveal: (target: any): void => {
		// define states
		let states: any = { 'password' : 'text', 'text' : 'password', 'mdi-eye-off-outline' : 'mdi-eye', 'mdi-eye' : 'mdi-eye-off-outline' }
		let icons: any = { 'password' : 'mdi-eye-outline', 'text' : 'mdi-eye-off-outline' }
		// get parent
		let parent = $(target).parents('div.form-group')
		// get input control
		let control = parent.find('input[data-context="password"]')
		// change trigger state
		parent.find('i.form-group-icon-password')
			.removeClass(icons[control.attr('type')])
			.addClass(icons[states[control.attr('type')]])
		// change state of control
		control.attr('type', states[control.attr('type')])
	},
}

// define rogue object
export const Rogue = {
	// form actions
	Form: {
		// flag form errors
		flag (form: any) {
			// add validation class
			form.addClass('was-validated')
			// check if form has been calibrated
			if (form.hasClass('needs-validation') && !form.attr('data-controls-calibrated')) {
				// add flag
				form.attr('data-controls-calibrated', '')
				// calibrate
				form.find('input, select').on('focus blur', function (e: any) {
					// check if validation flag is present
					if ($(e.target).parents('form.was-validated').length) {
						// remove validation flag
						$(e.target).parents('form').removeClass('was-validated')
					}
				})
			}
		},
		// reset form
		reset: (form: any) => {
			// get form
			let obj = form
			// get elements
			let elements = Array.from(obj.find('input:not(:hidden), select, textarea'))
			// loop through elements
			for (let i = 0; i < elements.length; i++) {
				// get current element
				let el = elements[i]
				// validate
		    if(($(el).val() !== null
		            && $(el).val().toString().trim().length > 0
		            && $(el).get(0).toString() === '[object HTMLInputElement]')
		            && !$(el).hasClass('-skip-value-reset')){
		      $(el).val('');
		    } else if(($(el).val() !== null
		            && $(el).val().toString().trim().length > 0
		            && $(el).get(0).toString() === '[object HTMLTextAreaElement]')
		            && !$(el).hasClass('-skip-value-reset')){
		      $(el).val('');
		    } else if(($(el).get(0).toString() === '[object HTMLSelectElement]'
		            &&
		            ($(el).val() !== null
		            && ($(el).val().toString().trim().length > 0
		            || $(el).val().toString().trim() !== '0'))
		            && !$(el).hasClass('-skip-value-reset'))){
		      ($(el).children('option[value="0"]').length)
		      ? $(el).val('0').trigger('change')
		      : ($(el).children('optgroup').length
		        ? $(el).val($(el).children('optgroup:eq(0)').find('option:eq(0)').attr('value')).trigger('change')
		        : $(el).val($(el).children('option:eq(0)').attr('value')).trigger('change'));
		    }
		  }
		}
	},
  // modal transitions
	Modal: {
		// ease transitions
		ease () {
			// define module global variable
			let modalObjectStore = []
			// timeout
			setTimeout(() => {
				// shown event
				$('.modal').on('show.bs.modal', function (e) {
					// get control
					let modal = $(e.target)
            obj: modal;

					// check if array already contains something
					if (modalObjectStore.length > 0) {
						// get object
						let entry = modalObjectStore[modalObjectStore.length - 1].obj

						// change opacity
						entry.animate({
							opacity: '.05'
						}, 100)
					}

					// add to modal
					modalObjectStore.push({
						obj: modal,
						id: modal.attr('id')
					})
				})

				// hidden event
				$('.modal').on('hidden.bs.modal', function (e) {
					// get control
					let modal = $(e.target)

					// slice out the last part of the array
					modalObjectStore.splice(modalObjectStore.length - 1, 1)

					// get object
					let entry = modalObjectStore[modalObjectStore.length - 1].obj

					// check if valid
					if (entry) {
						// change opacity for last object
						entry.animate({
							opacity: '1'
						}, 100)
					}
				})
			}, 100)
		},
	},
}
