/* eslint-disable @typescript-eslint/no-magic-numbers */
import { PRODUCTS_COLLECTION } from '@app/database-service/constants';
import { DatabaseService } from '@app/database-service/database.service';
import { Order, OrderUI } from '@app/interfaces/order.interface';
import { Collection } from 'mongodb';
import { Service } from 'typedi';

@Service()
export class OrderService {
    constructor(private dbService: DatabaseService) {}

    get collection(): Collection<Order> {
        return this.dbService.database.collection(PRODUCTS_COLLECTION);
    }

    async getOrders(userId: string): Promise<Order[]> {
        return await this.collection.find({ userId }).toArray();
    }

    async createOrder(order: OrderUI): Promise<void> {
        await this.collection.insertOne({
            id: this.generateId(),
            userId: order.userId,
            total: order.total,
            orderedProduct: order.orderedProduct,
            date: new Date(),
        });
    }

    async deleteOrder(orderId: string): Promise<boolean> {
        const result = this.collection.deleteOne({ orderId });
        return (await result).deletedCount === 1;
    }

    private generateId(): string {
        return String.fromCharCode(Math.floor(Math.random() * 26) + 97) + Math.random().toString(16).slice(2) + Date.now().toString(16).slice(4);
    }
}
