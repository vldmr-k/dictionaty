import {Injectable} from '@angular/core';
import {Http, XHRBackend, RequestOptions, Request, RequestOptionsArgs, Response, Headers, URLSearchParams} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import {AuthService} from "./auth.service";

@Injectable()
export class HttpService extends Http {

    private token: string;

    constructor (backend: XHRBackend, options: RequestOptions, private authService: AuthService) {
        super(backend, options);
        
        this.token = this.authService.getAccessToken();
        options.headers.set('Authorization', `Bearer ${this.token}`);

        this._defaultOptions = options;
    }

    request(url: string|Request, options?: RequestOptionsArgs): Observable<Response> {

        if (typeof url === 'string') { // meaning we have to add the token to the options, not in url
            if (!options) {

                url = this.addAccessToken(url);

                // let's make option object
                options = {headers: new Headers()};
            }

            options.headers.set('Authorization', `Bearer ${this.token}`);
        } else {
            // we have to add the token to the url object
            url.headers.set('Authorization', `Bearer ${this.token}`);
            url.url = this.addAccessToken(url.url)
        }

        return super.request(url, options).catch(this.catchAuthError(this));
    }

    private addAccessToken(url): string {
        let separator = url.indexOf('?') === -1 ? '?' : '&';
        return `${url}${separator}access-token=${this.token}`;
    }

    /*
    get(url: string, options?: RequestOptionsArgs): Observable<Response> {

        let separator = url.indexOf('?') === -1 ? '?' : '&';

        url = `${url}${separator}access-token=${this.token}`;
        console.log('url', url);
        return super.get(url, options);
    }*/

    private catchAuthError (self: HttpService) {
        // we have to pass HttpService's own instance here as `self`
        return (res: Response) => {
            console.log(res);
            if (res.status === 401 || res.status === 403) {
                // if not authenticated
                console.log(res);
            }
            return Observable.throw(res);
        };
    }
}