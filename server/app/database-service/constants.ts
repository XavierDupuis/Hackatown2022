import { NewSellerProfile } from '@app/sellers/controllers/seller.interface';

export const BASIC_PRODUCTS = [{ name: 'Product1', price: 5, quantity: 10 }];
export const BASIC_ORDERS = [
    { id: 'blabla', userId: 'Mr. Cookie', total: 50, orderedProduct: [{ name: 'Product1', price: 5, quantity: 10 }], date: new Date() },
];

// Collection names
export const PRODUCTS_COLLECTION = 'Products_History';
export const ACTIVE_PRODUCTS_COLLECTION = 'Active_Products';
export const BASIC_SELLER: NewSellerProfile[] = [
    {
        userId: '5b6962dd-3f90-4c93-8f61-eabfa4a803e2',
        name: 'Seller1',
        description: 'Seller1 description',
        imageUrl: 'Seller1 imageUrl',
        reviews: [],
    },
];
export const ORDERS_COLLECTION = 'Orders';
