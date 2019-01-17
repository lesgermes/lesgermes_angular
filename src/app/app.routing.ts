import { Routes, RouterModule } from '@angular/router';

import { HomepageComponent } from './homepage/homepage.component';
import { LoginpageComponent } from './loginpage/loginpage.component';
import { RegisterpageComponent } from './registerpage/registerpage.component';
import { ProfilepageComponent } from './profilepage/profilepage.component';
import { ChatComponent } from './chat/chat.component';

const APP_ROUTES: Routes = [
    {
        path: '',
        component: HomepageComponent
    },
    {
        path: 'login',
        component: LoginpageComponent
    },
    {
        path: 'register',
        component: RegisterpageComponent
    },
    {
        path: 'profile',
        component: ProfilepageComponent
    },
    {
        path: 'chat',
        component: ChatComponent
    },
    // {
    //     path: 'post',
    //     component: PostComponent,
    //     canActivate: [AuthGuard]
    // },
    { path: '**', redirectTo: '' }
];

export const Routing = RouterModule.forRoot(APP_ROUTES);