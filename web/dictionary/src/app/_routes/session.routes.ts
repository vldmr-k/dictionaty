import { Routes } from '@angular/router';

import { SessionComponent }    from '../session/session.component';
import {AuthGuard} from "../_guards/index";

// Route Configuration
export const sessionRoutes: Routes = [
    { path: 'session', component: SessionComponent, canActivate: [AuthGuard] }
];