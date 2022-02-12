import { TestBed } from '@angular/core/testing';
import { CartService } from '@app/services/cart-service/cart.service';

describe('CartServiceService', () => {
    let service: CartService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(CartService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
