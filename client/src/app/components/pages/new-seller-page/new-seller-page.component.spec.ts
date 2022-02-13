import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewSellerPageComponent } from './new-seller-page.component';

describe('NewSellerPageComponent', () => {
    let component: NewSellerPageComponent;
    let fixture: ComponentFixture<NewSellerPageComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [NewSellerPageComponent],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(NewSellerPageComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
