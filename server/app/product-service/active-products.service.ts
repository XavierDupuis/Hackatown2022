import { ACTIVE_PRODUCTS_COLLECTION } from '@app/database-service/constants';
import { DatabaseService } from '@app/database-service/database.service';
import { Product } from '@app/interfaces/product.interface';
import { Collection } from 'mongodb';
import { Service } from 'typedi';

@Service()
export class ActiveProductService {
    constructor(private dbService: DatabaseService) {}

    get collection(): Collection<Product> {
        return this.dbService.database.collection(ACTIVE_PRODUCTS_COLLECTION);
    }

    async getProducts(): Promise<Product[]> {
        return await this.collection.find().toArray();
    }

    async addProduct(product: Product): Promise<void> {
        await this.collection.insertOne({
            id: product.id,
            name: product.name,
            price: product.price,
            quantity: product.quantity,
            sellerId: product.sellerId,
        });
    }

    async deleteProduct(product: Product): Promise<boolean> {
        const result = this.collection.deleteOne(product);
        return (await result).deletedCount === 1;
    }

    // TODO: ADD FIELD SEARCH
    // async getProduct(): Promise<Product> {}
}
