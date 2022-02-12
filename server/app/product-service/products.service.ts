import { PRODUCTS_COLLECTION } from '@app/database/constants';
import { DatabaseService } from '@app/database/database.service';
import { Product } from '@app/product-service/product.interface';
import { Collection } from 'mongodb';
import { Service } from 'typedi';

@Service()
export class ProductService {
    constructor(private dbService: DatabaseService) {}

    get collection(): Collection<Product> {
        return this.dbService.database.collection(PRODUCTS_COLLECTION);
    }

    async getProducts(): Promise<Product[]> {
        return await this.collection.find().toArray();
    }

    async addProduct(product: Product): Promise<void> {
        await this.collection.insertOne({ name: product.name, price: product.price, quantity: product.quantity });
    }

    // TODO: NOT USED FOR NOW
    async deleteProduct(product: Product): Promise<boolean> {
        const result = this.collection.deleteOne(product);
        return (await result).deletedCount === 1;
    }

    // TODO: ADD FIELD SEARCH
    // async getProduct(): Promise<Product> {}
}
