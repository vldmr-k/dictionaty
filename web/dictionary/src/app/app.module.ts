
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule, RequestOptions, XHRBackend } from '@angular/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { UserComponent } from './user/user.component';
import { SessionComponent } from './session/session.component';

import { AuthService, HttpService, AlertService } from './_services/index';

import { routing } from './app.routes';
import { AuthGuard } from "./_guards/index";
import { TestComponent } from './test/test.component';
import { VariantItemComponent } from "./test/variant-item.component";
import { AlertComponent } from "./_directives/index";

function httpFactory(backend: XHRBackend, defaultOptions: RequestOptions, authService: AuthService) {
    return  new HttpService(backend, defaultOptions, authService);
}
@NgModule({
    imports: [
        BrowserModule,
        HttpModule,
        FormsModule,
        routing
    ],
    declarations: [
        AppComponent,
        UserComponent,
        SessionComponent,
        TestComponent,
        VariantItemComponent,
        AlertComponent
    ],
    providers: [
        AlertService,
        AuthService,
        AuthGuard,
        {
            provide: HttpService,
            useFactory: httpFactory,
            deps: [XHRBackend, RequestOptions, AuthService]
        }
    ],
    bootstrap: [AppComponent]
})

export class AppModule { }
