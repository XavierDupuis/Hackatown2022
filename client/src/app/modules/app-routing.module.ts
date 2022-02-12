import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainPageComponent } from '@app/components/main-page/main-page.component';
import { ProfilePageComponent } from '@app/components/profile-page/profile-page.component';

const routes: Routes = [
    { path: 'home', component: MainPageComponent },
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    // { path: '**', redirectTo: '/home' },
    { path: 'profile', component: ProfilePageComponent },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
