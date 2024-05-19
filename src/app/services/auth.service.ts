import { config, routes, find, store } from 'src/app/config';
 
 export class AuthService{
    role : string = store.get('role')

    loggedIn: boolean =false;

    login(){
        if (this.role == "Available") this.loggedIn = true
    }
    logout(){
        if (this.role != "Available")  this.loggedIn = false
    }

    IsAuthenticated(){
        return this.loggedIn;
    }
 }