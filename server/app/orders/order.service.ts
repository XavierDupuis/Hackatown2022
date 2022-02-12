/* eslint-disable object-shorthand */
/* eslint-disable @typescript-eslint/quotes */
/* eslint-disable quote-props */
/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-magic-numbers */
import { ORDERS_COLLECTION } from '@app/database-service/constants';
import { DatabaseService } from '@app/database-service/database.service';
import { Order, OrderUI } from '@app/interfaces/order.interface';
import { Collection, ObjectId } from 'mongodb';
import { Service } from 'typedi';

@Service()
export class OrderService {
    constructor(private dbService: DatabaseService) {}

    get collection(): Collection<Order> {
        return this.dbService.database.collection(ORDERS_COLLECTION);
    }

    async getOrders(userId: string): Promise<Order[]> {
        return await this.collection.find({ userId }).toArray();
    }

    async createOrder(order: OrderUI): Promise<void> {
        await this.collection.insertOne({
            userId: order.userId,
            total: order.total,
            orderedProduct: order.orderedProduct,
            date: new Date(),
        });
    }

    async deleteOrder(orderId: string): Promise<void> {
        await this.collection.deleteOne({ _id: new ObjectId(orderId) });
    }
}
