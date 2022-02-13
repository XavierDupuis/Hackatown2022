import { INACTIVE_PRODUCTS_COLLECTION } from '@app/database-service/constants';
import { DatabaseService } from '@app/database-service/database.service';
import { Product } from '@app/interfaces/product.interface';
import { Collection, ObjectId } from 'mongodb';
import { Service } from 'typedi';

@Service()
export class ProductService {
    constructor(private dbService: DatabaseService) {}

    get collection(): Collection<Product> {
        return this.dbService.database.collection(INACTIVE_PRODUCTS_COLLECTION);
    }

    async getProducts(): Promise<Product[]> {
        return await this.collection.find({}, {}).toArray();
    }

    async addProduct(product: Product): Promise<void> {
        await this.collection.insertOne({
            name: product.name,
            description: product.description,
            price: product.price,
            quantityLeft: product.quantityLeft,
            quantityInitial: product.quantityInitial,
            imageURL: product.imageURL,
            maxPickupDate: product.maxPickupDate,
            productionDate: product.productionDate,
        });
    }

    // TODO: NOT USED FOR NOW
    async deleteProduct(productId: ObjectId): Promise<boolean> {
        const result = this.collection.deleteOne({ _id: productId });
        return (await result).deletedCount === 1;
    }

    async setInactiveProduct(productId: ObjectId): Promise<void> {
        await this.collection.updateOne({ _id: productId }, { $set: { quantityLeft: 0 } });
    }
}
