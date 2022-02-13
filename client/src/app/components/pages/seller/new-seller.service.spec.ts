import { TestBed } from '@angular/core/testing';

import { NewSellerService } from './new-seller.service';

describe('NewSellerService', () => {
    let service: NewSellerService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(NewSellerService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
