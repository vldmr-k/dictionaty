import { Component, OnInit } from '@angular/core';
import { SessionService, UserService, AuthService } from "../_services/index";
import { Router } from "@angular/router";
import { Session } from "../_models/session";


@Component({
    selector: 'app-session',
    template: `
    <div class="row">
        <div class="col-lg-12 text-center">
            <i class="glyphicon glyphicon-refresh a-loading"></i> Инициализация сессии...
        </div>  
    </div>
  `,
    providers: [SessionService, UserService]
})
export class SessionComponent implements OnInit {

    constructor(private sessionService: SessionService, private userService: UserService, private authService: AuthService, private router : Router) { }

    ngOnInit() {
        this.sessionService.create(this.authService.getUser())
            .then((session: Session) => {
                this.router.navigateByUrl(`test/${session.session_id}`);
            })
        /*
        this.userService.getActiveSession(this.authService.getUser())
            .then((session : Session) => {
                this.router.navigateByUrl(`test/${session.session_id}`);
            })
            */
    }

}
