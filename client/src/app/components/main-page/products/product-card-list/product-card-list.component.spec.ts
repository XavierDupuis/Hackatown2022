import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductCardListComponent } from '@app/components/main-page/products/product-card-list/product-card-list.component';

describe('ProductCardListComponent', () => {
    let component: ProductCardListComponent;
    let fixture: ComponentFixture<ProductCardListComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [ProductCardListComponent],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(ProductCardListComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
