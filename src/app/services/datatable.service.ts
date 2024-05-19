import { Injectable, Inject } from '@angular/core';
import { LogService } from 'src/app/services';

// jquery operator
declare var $: any;

@Injectable({ providedIn: 'root' })
export class DataTablesService {
	constructor (private logger: LogService) {}

	options = {
		sWrapper: "dataTables_wrapper dt-bootstrap5", sFilterInput: "form-control", sLengthSelect: "form-select",
	  language: {
        lengthMenu: "_MENU_",
        search: "_INPUT_",
        searchPlaceholder: "Search..",
        info: "Page _PAGE_ of _PAGES_",
        paginate: {
        	first: '<i class="fa fa-angle-double-left"></i>',
        	previous: '<i class="fa fa-angle-left"></i>',
        	next: '<i class="fa fa-angle-right"></i>',
        	last: '<i class="fa fa-angle-double-right"></i>'
        },
    },
    //buttons: ["copy", "csv", "excel", "pdf", "print"],
    // dom: "<'row'<'col-sm-12'<'text-center bg-body-light py-2 mb-2'B>>><'row'<'col-sm-12 col-md-6'l><'col-sm-12 col-md-6'f>><'row'<'col-sm-12'tr>><'row'<'col-sm-12 col-md-5'i><'col-sm-12 col-md-7'p>>",
  	pagingType: "full_numbers",
    pageLength: 10,
    lengthMenu: [
        [10, 20, 30, 40, 50],
        [10, 20, 30, 40, 50],
    ],
    autoWidth: !1,
    responsive: !0,
	}


	// initialize
	init (table?: string){
		// timeout
		setTimeout(() => {
	    // loop through all datatable cobtrols
	    document.querySelectorAll('.datatable').forEach(table => {
	    	// get table id
	    	let id = `#${$(table).attr('id')}`
	    	// check if not already datatable
	    	if (!$(id).parents('.dataTables_wrapper').length) {
	    		// log data
		    	this.logger.log(id)

		    	// initialize datatable
		      $(id).DataTable(this.options);
		    }
    	});
	  }, 10)
	}

	// re-init table
	reInit (id: any): void {
		// re-initialize table
		setTimeout(() => {
			// check if not already datatable
  		if (!$(`table[data-control-id="${id}"]`).parents('.dataTables_wrapper').length) {
  			// re-init table
				$(`table[data-control-id="${id}"]`).DataTable(this.options)
			}
		}, 10);
	}

	// destroy data table
	destroy (id: any): void {
		// destroy table
		$(`table[data-control-id="${id}"]`).DataTable().destroy();
	}
}
