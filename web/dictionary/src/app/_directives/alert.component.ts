import { Component, OnInit, OnDestroy } from '@angular/core';

import { AlertService } from '../_services/index';

@Component({
    selector: 'alert',
    template: `
       <div *ngIf="message" [ngClass]="{ 'alert': message, 'alert-success': message.type === 'success', 'alert-danger': message.type === 'error' }">{{message.text}}</div>
    `,
})


export class AlertComponent implements OnInit {

    message: any;

    constructor(private alertService: AlertService) { }

    ngOnInit() {
        
        this.alertService.getMessage()
            .subscribe(message => {
                console.log('msg', message);
                this.message = message;
            });
    }

    ngOnDestroy() {
        console.log('AlertComponent Destroy!');
    }
}