import { NewSellerProfile } from '@app/sellers/controllers/seller.interface';

export const BASIC_PRODUCTS = [
    {
        userId: '5b6962dd-3f90-4c93-8f61-eabfa4a803e2',
        total: 50,
        orderedProduct: [
            {
                name: 'Product35',
                price: 5,
                quantity: 0,
            },
        ],
        date: '2022-02-13T01:43:21.576Z',
    },
];
export const BASIC_ORDERS = [
    { userId: 'id1', total: 50, orderedProducts: [{ id: 'Product1', pickupDate: new Date(), quantity: 10 }], date: new Date() },
];

// Collection names
export const INACTIVE_PRODUCTS_COLLECTION = 'Inactive_Products';
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
