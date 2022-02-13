import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicSellerComponent } from './public-seller.component';

describe('PublicSellerComponent', () => {
    let component: PublicSellerComponent;
    let fixture: ComponentFixture<PublicSellerComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [PublicSellerComponent],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(PublicSellerComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
