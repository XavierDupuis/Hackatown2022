import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrivateSellerComponent } from './private-seller.component';

describe('PrivateSellerComponent', () => {
    let component: PrivateSellerComponent;
    let fixture: ComponentFixture<PrivateSellerComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [PrivateSellerComponent],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(PrivateSellerComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
