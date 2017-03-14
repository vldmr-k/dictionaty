import { Injectable }       from '@angular/core';
import { Response, Headers , URLSearchParams}   from '@angular/http';

import { User, Session } from '../_models/index';

import 'rxjs/add/operator/toPromise';
import { HttpService } from "./http.service";

@Injectable()
export class UserService {
    private headers = ['Content-Type: application/json'];

    private apiUrl = baseApiUrl + '/api/user';

    constructor (private http: HttpService) {}

    getActiveSession(user: User): Promise<Session> {
        return this.http.get(`${this.apiUrl}/${user.user_id}?expand=activeSession`)
            .toPromise()
            .then(res => { return res.json().activeSession as Session })
            .catch(this.handleError);
    }


    create(name: string): Promise<User> {
        return this.http.post(this.apiUrl, { name : name })
            .toPromise()
            .then(res => { return res.json() as User })
            .catch(this.handleError)
    }


    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    }
}