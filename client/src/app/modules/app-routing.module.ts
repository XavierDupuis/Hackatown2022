import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '@app/auth/guard/auth.guard';
import { MainPageComponent } from '@app/components/main-page/main-page.component';
import { NewProductComponent } from '@app/components/main-page/products/new-product/new-product.component';
import { AuthPageComponent } from '@app/components/pages/auth-page/auth-page.component';
import { SellerComponent } from '@app/components/pages/seller/seller.component';
import { ProfilePageComponent } from '@app/components/profile-page/profile-page.component';

const routes: Routes = [
    { path: 'home', component: MainPageComponent },
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: 'login', component: AuthPageComponent },
    { path: 'new-product', component: NewProductComponent },
    // { path: '**', redirectTo: '/home' },
    {
        path: 'profile',
        canActivate: [AuthGuard],
        component: ProfilePageComponent,
    },
    {
        path: 'seller/:id',
        canActivate: [AuthGuard],
        component: SellerComponent,
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
