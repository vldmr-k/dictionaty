import { Component, OnInit } from '@angular/core';
import { AlertMessage } from "./_models/index";
import { AlertService } from "./_services/alert.service";

@Component({
    selector: 'dictionary-root',
    template: `

        <div class="container">
          <div class="row banner"></div>
            <div class="row app-test">
                <div class="col-lg-8 col-lg-push-2">   
                    <alert></alert>
                    
                    <router-outlet></router-outlet>
                </div>
            </div>
        </div>
        
  `
})
export class AppComponent implements OnInit {
    
    alertMessage: AlertMessage;

    constructor(private alertService: AlertService){};

    ngOnInit() {
        console.log("app init");

    }
}
