import { Injectable }       from '@angular/core';
import { Response }   from '@angular/http';


import { TestCase, Word } from '../_models/index';

import 'rxjs/add/operator/toPromise';
import { HttpService } from "./http.service";
import {Answer} from "../_models/answer";


@Injectable()
export class TestService {

    private apiUrl = baseApiUrl + '/api/test';

    constructor (private http: HttpService) {}

    getFreeWord(sessionId: number): Promise<TestCase> {
        return this.http.get(`${this.apiUrl}/${sessionId}/nextword`)
            .toPromise()
            .then((res: any) => {
                return res.json() as TestCase;
            })
            .catch(this.handleError);
    }

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    }
}