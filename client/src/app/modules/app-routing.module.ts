import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '@app/auth/guard/auth.guard';
import { MainPageComponent } from '@app/components/main-page/main-page.component';
import { AuthPageComponent } from '@app/components/pages/auth-page/auth-page.component';
import { ProfilePageComponent } from '@app/components/profile-page/profile-page.component';

const routes: Routes = [
    { path: 'home', component: MainPageComponent },
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: 'login', component: AuthPageComponent },
    // { path: '**', redirectTo: '/home' },
    {
        path: 'profile',
        canActivate: [AuthGuard],
        component: ProfilePageComponent,
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
