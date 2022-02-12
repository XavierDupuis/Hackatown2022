import { NgModule } from '@angular/core';
// import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from '@app/app.component';
import { AppRoutingModule } from '@app/modules/app-routing.module';
import { AppMaterialModule } from '@app/modules/material.module';

@NgModule({
    declarations: [AppComponent],
    imports: [AppMaterialModule, BrowserModule, AppRoutingModule /* , FormsModule*/],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule {}
