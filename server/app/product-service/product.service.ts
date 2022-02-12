import { DatabaseService } from '@app/database/database.service';
import { Product } from '@app/product-service/product.interface';
import { Collection } from 'mongodb';
import { Service } from 'typedi';

const PRODUCTS_COLLECTION = 'Products';
@Service()
export class ProductService {
    constructor(private dbService: DatabaseService) {}

    get collection(): Collection<Product> {
        return this.dbService.database.collection(PRODUCTS_COLLECTION);
    }

    async getProducts(): Promise<Product[]> {
        // return await this.collection.find({}).toArray();
        return [{ name: 'Product1', price: 5, quantity: 10 }];
    }

    async addProduct(product: Product): Promise<boolean> {
        console.log(product);
        return true;
    }
    async getProduct(): Promise<Product> {
        return { name: 'Product1', price: 5, quantity: 10 };
    }
}

// create product  : in dtatabse
// add product
// get objet produit : product infos
// get prodcuts
