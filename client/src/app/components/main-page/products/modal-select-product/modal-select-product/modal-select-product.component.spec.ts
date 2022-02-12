import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalSelectProductComponent } from './modal-select-product.component';

describe('ModalSelectProductComponent', () => {
    let component: ModalSelectProductComponent;
    let fixture: ComponentFixture<ModalSelectProductComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [ModalSelectProductComponent],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(ModalSelectProductComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
