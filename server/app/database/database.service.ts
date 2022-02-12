import { CollectionInfo, Db, MongoClient } from 'mongodb';
import { Service } from 'typedi';

// const DB_USER = 'server';
// const DB_PSW = 'ACyZhkpcAUT812QB';
// const CLUSTER_URL = 'scrabblecluster.mqtnr.mongodb.net';

export const DATABASE_URL = '';
export const DATABASE_NAME = '';

@Service()
export class DatabaseService {
    private db: Db;

    async start(url: string = DATABASE_URL) {
        try {
            const client = await MongoClient.connect(url);
            this.db = client.db(DATABASE_NAME);
        } catch {
            throw new Error('Database connection error');
        }

        this.createCollection('name'); // TODO create Collections
    }

    private async isCollectionInDb(name: string): Promise<boolean> {
        const collections = await this.db.listCollections().toArray();
        const collection = collections.find((collectionInDb: CollectionInfo) => collectionInDb.name === name);
        return collection !== undefined;
    }

    private async createCollection(name: string) {
        try {
            const collectionExists = await this.isCollectionInDb(name);
            if (collectionExists) {
                return;
            }
            await this.db.createCollection(name);
            await this.db.collection(name).createIndex({ name: 1 }, { unique: true });
            this.populateCollection(name);
        } catch (error) {
            throw Error('Data base collection creation error');
        }
    }

    private async populateCollection(name: string): Promise<void> {
        try {
            if ((await this.db.collection(name).countDocuments()) === 0) {
                // await this.db.collection(name).insertMany(); // TODO add default population
            }
        } catch (e) {
            throw Error('Data base collection population error');
        }
    }

    get database(): Db {
        return this.db;
    }
}
