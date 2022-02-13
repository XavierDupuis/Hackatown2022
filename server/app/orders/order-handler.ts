/* eslint-disable no-underscore-dangle */
import { OrderUI } from '@app/interfaces/order.interface';
import { OrderService } from '@app/orders/order.service';
import { ActiveProductService } from '@app/product-service/active-products.service';
import { ProductService } from '@app/product-service/products.service';
import { ObjectId } from 'mongodb';
import { Service } from 'typedi';


@Service()
export class OrderHandler {
    constructor(private activeProducts: ActiveProductService, private inactiveProducts: ProductService, private orderService: OrderService) {}

    async createOrder(orderUI: OrderUI, userId: string): Promise<boolean> {
        // TODO validate orderinfo
        console.log(orderUI);
        for (const orderedProduct of orderUI.orderedProducts) {
            const product = await this.activeProducts.getProduct(new ObjectId(orderedProduct.productId));
            if (product === null) {
                throw Error("Product inactive");
            }
            const newQuantity = product.quantityLeft - orderedProduct.quantity;
            if (newQuantity < 0) {
                throw Error("Not enough product left");
            }

            await this.activeProducts.updateProductQty(new ObjectId(orderedProduct.productId), newQuantity);

            if (newQuantity === 0) {
                this.setInactive(orderedProduct.productId);
            }
        }
        await this.orderService.createOrder(orderUI, userId);
        return true;
    }

    async setInactive(productId: string): Promise<void> {
        const product = await this.activeProducts.getProduct(new ObjectId(productId));
        if (product !== null) {
            await this.activeProducts.deleteProduct(new ObjectId(productId));
            await this.inactiveProducts.addProduct(product);
        }

    }
    // private validateOrder(order: OrderUI) {

    // }
}
