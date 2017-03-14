import { Injectable } from '@angular/core';
import {User} from "../_models/user";

@Injectable()
export class AuthService {

    constructor() { }

    public getAccessToken() {
        const user = this.getUser();
        if(user != null && user.hasOwnProperty('access_token')) {
            return user.access_token;
        }

        return null;
    }

    getUser(): User {
        let data = localStorage.getItem('currentUser');
        return JSON.parse(data) as User;
    }

    isAuth() {
        return this.getAccessToken() ? true : false;
    }

    login(user: User) {
        localStorage.setItem('currentUser', JSON.stringify(user));
    }

    logout() {
        localStorage.removeItem('currentUser');
    }
}