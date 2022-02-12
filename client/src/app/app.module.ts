import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MealCardComponent } from './meals/meal-card/meal-card.component';
import { MealCardListComponent } from '@app/meals/meal-card-list/meal-card-list.component';
import { ProfilPageComponent } from './profil-page/profil-page.component';
import { ResearchBarComponent } from './research-bar/research-bar.component';

@NgModule({
    declarations: [
        AppComponent, 
        MealCardComponent, 
        MealCardListComponent, 
        ProfilPageComponent, ResearchBarComponent
    ],
    imports: [BrowserModule, AppRoutingModule],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule {}
