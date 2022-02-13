import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from '@app/app.component';
import { AuthInterceptor } from '@app/auth/interceptor/auth.interceptor';
import { HeaderBarComponent } from '@app/components/header-bar/header-bar.component';
import { MainPageComponent } from '@app/components/main-page/main-page.component';
import { ProductCardListComponent } from '@app/components/main-page/products/product-card-list/product-card-list.component';
import { ProductCardComponent } from '@app/components/main-page/products/product-card/product-card.component';
import { ResearchBarComponent } from '@app/components/main-page/research-bar/research-bar.component';
import { ProfilePageComponent } from '@app/components/profile-page/profile-page.component';
import { AppRoutingModule } from '@app/modules/app-routing.module';
import { AppMaterialModule } from '@app/modules/material.module';
import { AmplifyAuthenticatorModule } from '@aws-amplify/ui-angular';
import { Amplify } from 'aws-amplify';
// eslint-disable-next-line no-restricted-imports
import awsmobile from '../aws-exports';
import { CartModalComponent } from './components/main-page/cart/cart-modal/cart-modal.component';
// eslint-disable-next-line max-len
import { ModalSelectProductComponent } from './components/main-page/products/modal-select-product/modal-select-product/modal-select-product.component';
import { NewProductComponent } from './components/main-page/products/new-product/new-product.component';
import { AuthPageComponent } from './components/pages/auth-page/auth-page.component';
import { NewSellerPageComponent } from './components/pages/new-seller-page/new-seller-page.component';
import { PrivateSellerComponent } from './components/pages/seller/private-seller/private-seller.component';
import { PublicSellerComponent } from './components/pages/seller/public-seller/public-seller.component';
import { SellerComponent } from './components/pages/seller/seller.component';
import { NewSellerComponent } from './components/pages/seller/new-seller/new-seller.component';

Amplify.configure(awsmobile);

@NgModule({
    declarations: [
        AppComponent,
        HeaderBarComponent,
        MainPageComponent,
        ProfilePageComponent,
        ResearchBarComponent,
        ProductCardComponent,
        ProductCardListComponent,
        AuthPageComponent,
        ModalSelectProductComponent,
        CartModalComponent,
        NewProductComponent,
        NewSellerPageComponent,
        SellerComponent,
        PrivateSellerComponent,
        PublicSellerComponent,
        NewSellerComponent,
    ],
    imports: [AppMaterialModule, BrowserModule, AppRoutingModule, BrowserAnimationsModule, AmplifyAuthenticatorModule, FormsModule, HttpClientModule],
    providers: [
        {
            provide: HTTP_INTERCEPTORS,
            useClass: AuthInterceptor,
            multi: true,
        },
    ],
    bootstrap: [AppComponent],
})
export class AppModule {}
