import { Review, SellerProfile } from '@app/controllers/seller.interface';
import { PRODUCTS_COLLECTION } from '@app/database-service/constants';
import { DatabaseService } from '@app/database-service/database.service';
import { Message } from '@app/message';
import { Product } from '@app/product-service/product.interface';
import { Collection, Document } from 'mongodb';
import { Service } from 'typedi';

// TODO Check for request auth

export const SELLER_COLLECTION = 'sellerProfile';
@Service()
export class SellerProfileService {
    clientMessages: Message[];

    constructor(private readonly databaseService: DatabaseService) {
        this.clientMessages = [];
    }

    get sellerCollection(): Collection<SellerProfile> {
        return this.databaseService.database.collection(SELLER_COLLECTION);
    }

    get productsCollection(): Collection<Product> {
        return this.databaseService.database.collection(PRODUCTS_COLLECTION);
    }

    async getFullName(id: string): Promise<string> {
        const fullName = this.sellerCollection.find({ _id: id }).project({ name: 1 }).toString();
        return fullName;
    }

    async getDescription(id: string): Promise<string> {
        const description = this.sellerCollection.find({ _id: id }).project({ description: 1 }).toString();
        return description;
    }

    async getProducts(id: string): Promise<Product[]> {
        const products = this.productsCollection.find({ sellerId: id }).toArray();
        return products;
    }

    // TODO Object Products[] // toArray()
    async getHistory(id: string): Promise<string> {
        const products = this.sellerCollection.find({ _id: id }).project({ productsHistory: 1 }).toString();
        return products;
    }

    async getImageUrl(id: string): Promise<string> {
        const imageUrl = this.sellerCollection.find({ _id: id }).project({ imageUrl: 1 }).toString();
        return imageUrl;
    }

    // TODO Validate if this works
    async getReviews(id: string): Promise<Document> {
        const reviews = this.sellerCollection.find({ _id: id }).project({ reviews: 1 });
        return reviews;
    }

    async addReview(review: Review) {
        await this.sellerCollection.updateOne({ _id: review.sellerId }, { $addToSet: { reviews: review } });
    }
}
