import { NgModule } from '@angular/core';
// import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from '@app/app.component';
import { HeaderBarComponent } from '@app/components/header-bar/header-bar.component';
import { MainPageComponent } from '@app/components/main-page/main-page.component';
import { ProductCardListComponent } from '@app/components/main-page/products/product-card-list/product-card-list.component';
import { ProductCardComponent } from '@app/components/main-page/products/product-card/product-card.component';
import { ResearchBarComponent } from '@app/components/main-page/research-bar/research-bar.component';
import { ProfilePageComponent } from '@app/components/profile-page/profile-page.component';
import { AppRoutingModule } from '@app/modules/app-routing.module';
import { AppMaterialModule } from '@app/modules/material.module';

@NgModule({
    declarations: [
        AppComponent,
        HeaderBarComponent,
        MainPageComponent,
        ProfilePageComponent,
        ResearchBarComponent,
        ProductCardComponent,
        ProductCardListComponent,
    ],
    imports: [AppMaterialModule, BrowserModule, AppRoutingModule, BrowserAnimationsModule],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule {}
