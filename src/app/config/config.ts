import { Injectable } from '@angular/core'
import { HttpClient, HttpHeaders } from '@angular/common/http'
import * as CryptoJS from 'crypto-js'
import { environment } from 'src/environments/environment'
import { BehaviorSubject, Observable } from 'rxjs'

// jquery operator
declare var $: any

// get node object
let el = document.querySelector(window.atob(String('iUHgsYm9keQ==').substr(5)))

// jquery selector
export const find = (target: any) => $(target)

// define global config values
export const config = {
  auth: environment.auth,
  base: environment.base,
  users: {
    admin: 'administrator',
    authorizer: 'authorizer'
  },
  
  changeEvent () {
    return new Event('change');
  },
  stringify (item: any) {
    return JSON.stringify(item)
  },
  getRandomGUID () {
    // define array
    let array = new Uint32Array(8);
    // get random values
    window.crypto.getRandomValues(array);
    // define store
    let str = '';
    // loop through array and define guid
    for (let i = 0; i < array.length; i++) {
      str += (i < 2 || i > 5 ? '' : '-') + array[i].toString(16).slice(-4);
    }
    // return value
    return str;
  },
	httpOptions (): any {
    // get token
    let token = store.get('token')
    // return headers object
    return {
      headers: new HttpHeaders({
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "DELETE, POST, GET, OPTIONS",
        "Access-Control-Allow-Headers" : "Authorization, X-Requested-With",
        'Content-Type':  'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${token}`
      })
    }
  },
  httpOptionsNoAuth: (): any => {
    return {
      headers: new HttpHeaders({
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "DELETE, POST, GET, OPTIONS",
        "Access-Control-Allow-Headers" : "Authorization, X-Requested-With",
        'Content-Type':  'application/json',
        'Accept': 'application/json'
      })
    }
  },
}

// define routes (URLs and endpoints)
export const routes = {
  frontend                      :        {
    signin                      :        'signin',
    signup                      :         'signup',
    forgotpass                  :         'forgotpassword',

    dashboard                   :        'dashboard',
    admin                       :         'admin',
    staff                       :         'staff',
    support                     :         'support',
    enrollee                    :         'enrollee',
    adminoverview               :         'admindashboard',
    staffoverview               :         'staffdashboard',
    supportoverview             :         'supportdashboard',
    enrolleeoverview            :         'enrolleedashboard',
    enrolment                   :         'enrolment',
    userlist                    :         'all-users-list',
    enrolmenu                   :         'enrolmenu',

  },

  authentication                :        {
    centrallogin                :         '/account/token/',
    refreshtoken                :         '/account/token/refresh/',
    accountsignup                :         '/account/sign-up/',
  },
  profiles                      :         {
    getuser                     :         '/account/user/',
    updateuser                  :         '/account/user/',
    getAllUser                  :         '/account/users/',
  },
 
}

// define store functions
export const store = {
	needle: window.atob(String(el?.getAttribute('data-action-sum')).substr(4)),
  // clear storage
  clear: () => localStorage.clear(),
	// set store value by encrypting key and value
	set (key: string, value: string) {
		// halt if irregularity in key or value
    if (!String(key).trim().length || !String(value).trim().length) return
    // encrypt key
    key = window.btoa(key).replace(/=/g, '').toUpperCase().split('').reverse().join('');
    // check if value is integer
    if (typeof(value) == "number") {
      // attach flag to value
      value = String(value) + '_IS_INTEGER'
    }
    // store value
    localStorage.setItem(key, CryptoJS.AES.encrypt(String(value), this.needle).toString());
	},
	// get store value
	get (key: string): any {
		// halt if irregularity in key
    if (!String(key).trim().length) return
    // encrypt key
    key = window.btoa(key).replace(/=/g, '').toUpperCase().split('').reverse().join('');
    // get value
    let value = (localStorage.hasOwnProperty(key)
      ? CryptoJS.AES.decrypt(localStorage.getItem(key), this.needle).toString(CryptoJS.enc.Utf8)
      : '');

    // check if value is integer
    if (String(value).length && (new RegExp(/_IS_INTEGER/)).test(value)) {
      return Number(String(value).replace(/_IS_INTEGER/g, ''))
    }

    return value
	},
	// remove value with key
	remove (key: string) {
		// halt if irregularity in key
    if (!String(key).trim().length) return
    // encrypt key
    key = window.btoa(key).replace(/=/g, '').toUpperCase().split('').reverse().join('');
    // remove value
    localStorage.removeItem(key);
	},
	// check if store has value
	has (key: string): any {
		// halt if irregularity in key
    if (!String(key).trim().length) return
    // hold initial key
    let holder = key
    // encrypt key
    key = window.btoa(key).replace(/=/g, '').toUpperCase().split('').reverse().join('');
		// return if store has value
		return (String(this.get(holder)).length > 0)
	},
  // log value
  log (key: string): any {
    // log value
    if (!environment.production) console.log(this.get(key))
  },
	// encrypt data
	encrypt (value: string): any {
	  return CryptoJS.AES.encrypt(value, this.needle).toString();
	},
	// decrypt data
	decrypt (textToDecrypt: string): any {
	  return CryptoJS.AES.decrypt(textToDecrypt, this.needle).toString(CryptoJS.enc.Utf8);
	}
}

export const modal = {
  show (selector: string) {
    // show modal after 100 milliseconds
    setTimeout(() => find(selector).length && find(selector).modal('show'), 100)
  },
  hide (selector: string) {
    // hide modal
    find(selector).modal('hide')
  }
}
