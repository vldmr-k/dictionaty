import { Component, OnInit } from '@angular/core';

import { AlertService } from '../_services/index';

@Component({
    selector: 'alert',
    template: `
        <div *ngIf="alertService.alertMessage">{{alertService.alertMessage.message}}</div>
    `,
})

export class AlertComponent  {

    constructor(private alertService: AlertService) { }

}