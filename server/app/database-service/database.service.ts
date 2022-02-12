import {
    ACTIVE_PRODUCTS_COLLECTION, BASIC_ORDERS, BASIC_PRODUCTS,
    BASIC_SELLER, ORDERS_COLLECTION, PRODUCTS_COLLECTION
} from '@app/database-service/constants';
import { SELLER_COLLECTION } from '@app/services/seller.profile.service';
import { CollectionInfo, Db, MongoClient } from 'mongodb';
import { Service } from 'typedi';

const DB_USER = 'olivier';
const DB_PSW = '8yZ7udaWMcrr7MS';

export const DATABASE_URL = `mongodb+srv://${DB_USER}:${DB_PSW}@cluster0.nbg4o.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
export const DATABASE_NAME = 'FindMyFood';

@Service()
export class DatabaseService {
    private db: Db;

    async start(url: string = DATABASE_URL) {
        try {
            const client = await MongoClient.connect(url);
            this.db = client.db(DATABASE_NAME);
        } catch (e) {
            throw new Error('Database connection error');
        }

        this.createProductsCollection(PRODUCTS_COLLECTION); // TODO create Collections
        this.createProductsCollection(ACTIVE_PRODUCTS_COLLECTION);
        this.createOrdersCollection(ORDERS_COLLECTION);
        this.createSellerCollection();
    }

    private async isCollectionInDb(name: string): Promise<boolean> {
        const collections = await this.db.listCollections().toArray();
        const collection = collections.find((collectionInDb: CollectionInfo) => collectionInDb.name === name);
        return collection !== undefined;
    }

    private async createProductsCollection(name: string) {
        try {
            const collectionExists = await this.isCollectionInDb(name);
            if (collectionExists) {
                return;
            }
            await this.db.createCollection(name);
            await this.db.collection(name).createIndex({ id: 1 });
            this.populateProductsCollection(name);
        } catch (error) {
            throw Error('Data base collection creation error');
        }
    }

    private async createSellerCollection() {
        try {
            const collectionExists = await this.isCollectionInDb(SELLER_COLLECTION);
            if (collectionExists) {
                return;
            }
            await this.db.createCollection(SELLER_COLLECTION);
            // TODO index?
            await this.db.collection(SELLER_COLLECTION).createIndex({ _id: 1 }, { unique: true });
            this.populateSellerCollection();
        } catch (error) {
            throw Error('Data base collection creation error');
        }
    }

    private async populateProductsCollection(name: string): Promise<void> {
        try {
            if ((await this.db.collection(name).countDocuments()) === 0) {
                await this.db.collection(name).insertMany(BASIC_PRODUCTS);
            }
        } catch (e) {
            throw Error('Data base collection population error');
        }
    }

    private async populateSellerCollection() {
        try {
            if ((await this.db.collection(SELLER_COLLECTION).countDocuments()) === 0) {
                await this.db.collection(SELLER_COLLECTION).insertMany(BASIC_SELLER); // TODO add default population
            }
        } catch (e) {
            throw Error('Data base collection population error');
        }
    }

    private async createOrdersCollection(name: string) {
        try {
            const collectionExists = await this.isCollectionInDb(name);
            if (collectionExists) {
                return;
            }
            await this.db.createCollection(name);
            await this.db.collection(name).createIndex({ id: 1 });
            if ((await this.db.collection(name).countDocuments()) === 0) {
                await this.db.collection(name).insertMany(BASIC_ORDERS);
            }
        } catch (error) {
            throw Error('Data base collection creation error');
        }
    }

    get database(): Db {
        return this.db;
    }
}
