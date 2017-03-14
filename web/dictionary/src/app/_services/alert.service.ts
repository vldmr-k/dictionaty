import { Injectable } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class AlertService {

    private static subject = null;
    private keepAfterNavigationChange = false;


    constructor(private router: Router) {

        this.initSubject();

        router.events.subscribe(event => {
            if (event instanceof NavigationStart) {
                if (this.keepAfterNavigationChange) {
                    this.keepAfterNavigationChange = false;
                } else {
                    AlertService.subject.next();
                }
            }
        });

    }

    initSubject() {

        if(AlertService.subject === null) {
            AlertService.subject  = new Subject<any>();
        }
    }

    success(message: string, keepAfterNavigationChange = false) {
        this.keepAfterNavigationChange = keepAfterNavigationChange;
        AlertService.subject.next({ type: 'success', text: message });
    }

    error(message: string, keepAfterNavigationChange = false) {
        this.keepAfterNavigationChange = keepAfterNavigationChange;
        AlertService.subject.next({ type: 'error', text: message });
    }

    getMessage(): Observable<any> {
        return AlertService.subject.asObservable();
    }
}