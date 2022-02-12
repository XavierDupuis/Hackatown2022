import { Review, SellerProfile } from '@app/controllers/seller.interface';
import { DatabaseService } from '@app/database/database.service';
import { Message } from '@app/message';
import { Collection } from 'mongodb';
import { Service } from 'typedi';

// TODO Check for request auth

@Service()
export class SellerProfileService {
    clientMessages: Message[];

    constructor(private readonly databaseService: DatabaseService) {
        this.clientMessages = [];
    }

    get collection(): Collection<SellerProfile> {
        return this.databaseService.database.collection('sellerProfile');
    }

    async getFullName(id: string): Promise<string> {
        const fullName = this.collection.find({ _id: id }).project({ name: 1 }).toString();
        return fullName;
    }

    async getDescription(id: string): Promise<string> {
        const description = this.collection.find({ _id: id }).project({ description: 1 }).toString();
        return description;
    }

    // TODO Object Products[]
    async getProducts(id: string): Promise<string> {
        const products = this.collection.find({ _id: id }).project({ availableProducts: 1 }).toString();
        return products;
    }

    // TODO Object Products[] // toArray()
    async getHistory(id: string): Promise<string> {
        const products = this.collection.find({ _id: id }).project({ productsHistory: 1 }).toString();
        return products;
    }

    async getImageUrl(id: string): Promise<string> {
        const imageUrl = this.collection.find({ _id: id }).project({ imageUrl: 1 }).toString();
        return imageUrl;
    }

    // TODO Object Reviews[] // toArray()
    async getReviews(id: string): Promise<string> {
        const reviewList = this.collection.find({ _id: id }).project({ reviews: 1 }).toString();
        return reviewList;
    }

    async addReview(review: Review): Promise<void> {
        await this.collection.updateOne({ _id: review.sellerId }, { $addToSet: { reviews: review } });
    }
}
