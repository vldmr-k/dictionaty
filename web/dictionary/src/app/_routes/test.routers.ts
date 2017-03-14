import { Routes } from '@angular/router';

import { TestComponent }    from '../test/test.component';
import { AuthGuard } from "../_guards/index";

// Route Configuration
export const testRoutes: Routes = [
    { path: 'test/:sessionId', component: TestComponent, canActivate: [ AuthGuard ] }
];