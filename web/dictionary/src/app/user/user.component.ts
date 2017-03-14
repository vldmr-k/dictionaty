import { Component, Input, OnInit } from "@angular/core";
import { UserService, SessionService } from "../_services/index";
import { Router } from "@angular/router";
import { User, Session } from "../_models/index";
import { AuthService } from "../_services/auth.service";



@Component({
    selector: 'user-comp',
    template: `
        <div class="row">
            <div class="col-xs-8">
              <div class="form-group">
                <input class="form-control input-lg" type="text" [(ngModel)]="user" placeholder="Введите ваше имя" required />
              </div>
            </div>
            <div class="col-xs-4">
              <div class="form-group">
                <button class="btn btn-success btn-lg" (click)="createUser(user)">Начать тест <span class="glyphicon glyphicon-chevron-right" aria-hidden="true"></span></button>
              </div>
            </div>
        </div>
    `,
    styles: [`
        .ng-touched.ng-invalid { border-color: red }
        .ng-valid { border-color: green }
    `],
    providers: [ UserService, SessionService ]
})

export class UserComponent implements OnInit {

    constructor(private userService : UserService, private authService: AuthService, private sessionService: SessionService, private router : Router) {}

    ngOnInit() {
        if(this.authService.isAuth() === true) {
            this.userService.getActiveSession(this.authService.getUser())
                .then((session: Session) => {
                    if(session != null) {
                        this.router.navigateByUrl(`test/${session.session_id}`)
                    }
                })
        }
    }

    createUser(username: string): void {
        this.userService.create(username)
            .then((user : User) => {
                this.authService.login(user);
                this.router.navigateByUrl('session');
            })
    }
}
