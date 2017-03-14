import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { AlertMessage } from "../_models/index";

@Injectable()
export class AlertService {

    public static alertMessage: AlertMessage;

    success(message: string) {
        AlertService.alertMessage = {show:true,message:message,type:'success'};
    }

}