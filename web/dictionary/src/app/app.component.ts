import { Component, OnInit } from '@angular/core';
import { AlertService } from "./_services/index";

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

    ngOnInit() {
        console.log('AppComponent init!');
    }

}
