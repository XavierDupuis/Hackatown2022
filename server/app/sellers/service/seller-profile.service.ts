import { ACTIVE_PRODUCTS_COLLECTION, PRODUCTS_COLLECTION } from '@app/database-service/constants';
import { DatabaseService } from '@app/database-service/database.service';
import { Product } from '@app/interfaces/product.interface';
import { NewSellerProfile, Review, SellerProfile, SellerProfileCreation } from '@app/sellers/controllers/seller.interface';
import { SELLER_COLLECTION } from '@app/sellers/seller-constants';
import { Collection, Document, ObjectId } from 'mongodb';
import { Service } from 'typedi';

@Service()
export class SellerProfileService {
    constructor(private databaseService: DatabaseService) {}

    get sellerCollection(): Collection<SellerProfile> {
        return this.databaseService.database.collection(SELLER_COLLECTION);
    }

    get productsCollection(): Collection<Product> {
        return this.databaseService.database.collection(ACTIVE_PRODUCTS_COLLECTION);
    }

    get historyCollection(): Collection<Product> {
        return this.databaseService.database.collection(PRODUCTS_COLLECTION);
    }

    async getFullName(id: string): Promise<string> {
        const fullName = this.sellerCollection
            .find({ _id: new ObjectId(id) })
            .project({ name: 1 })
            .toString();
        return fullName;
    }

    async getDescription(id: string): Promise<string> {
        const description = this.sellerCollection
            .find({ _id: new ObjectId(id) })
            .project({ description: 1 })
            .toString();
        return description;
    }

    async getProducts(id: string): Promise<Product[]> {
        const products = this.productsCollection.find({ sellerId: id }).toArray();
        return products;
    }

    // TODO Object Products[] // toArray()
    async getHistory(id: string): Promise<Product[]> {
        const products = this.historyCollection.find({ sellerId: id }).toArray();
        return products;
    }

    async getImageUrl(id: string): Promise<string> {
        const imageUrl = this.sellerCollection
            .find({ _id: new ObjectId(id) })
            .project({ imageUrl: 1 })
            .toString();
        return imageUrl;
    }

    // TODO Validate if this works
    async getReviews(id: string): Promise<Document> {
        const reviews = this.sellerCollection.find({ _id: new ObjectId(id) }).project({ reviews: 1 });
        return reviews;
    }

    async addReview(review: Review) {
        await this.sellerCollection.updateOne({ _id: new ObjectId(review.sellerId) }, { $addToSet: { reviews: review } });
    }

    async getProfile(id: string) {
        await this.sellerCollection.findOne({ _id: new ObjectId(id) });
    }

    async createProfile(creationParams: SellerProfileCreation) {
        const newSellerProfile = this.createNewSellerProfile(creationParams);
        await this.sellerCollection.insertOne(newSellerProfile);
    }

    private createNewSellerProfile(creationParams: SellerProfileCreation) {
        const newProfile = creationParams as NewSellerProfile;
        // TODO add url from message server
        newProfile.imageUrl = 'default_image';
        newProfile.reviews = [];
        return newProfile;
    }
}
