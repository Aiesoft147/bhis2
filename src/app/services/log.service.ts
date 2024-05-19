import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class LogService {
	// log message
	log (msg: any){
		// check if development
		if (!environment.production) console.log(msg);
	}

	// log error
	error (e: any){
		// get message
    let message = ((typeof e === 'object')
    	? ((typeof e.error !== 'object') ? e.error : e.message) : e)
		// check if development
		if (!environment.production) console.error(message);
	}
}
