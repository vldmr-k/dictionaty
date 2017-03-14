import { Injectable }       from '@angular/core';
import { Response }   from '@angular/http';

import { HttpService } from "./http.service";


import { Session, User } from '../_models/index';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class SessionService {
    private headers = [];

    private apiUrl = baseApiUrl + '/api/session';

    constructor (private http: HttpService) {}

    create(user: User): Promise<Session> {
        return this.http.post(this.apiUrl, { user_id : user.user_id })
            .toPromise()
            .then(res => { return res.json() as Session })
            .catch(this.handleError)
    }


    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    }
}