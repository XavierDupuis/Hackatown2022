import { ActiveProductService } from '@app/product-service/active-products.service';
import { Product } from '@app/product-service/product.interface';
import { ProductService } from '@app/product-service/products.service';
import { Router } from 'express';
import { Service } from 'typedi';

const ERROR = 400;
const OK = 200;
@Service()
export class ProductController {
    router: Router;

    constructor(private productService: ProductService, private activeProductService: ActiveProductService) {
        this.configureRouter();
    }

    private configureRouter(): void {
        this.router = Router();

        this.router.get('/', async (req, res) => {
            try {
                const products = await this.activeProductService.getProducts();
                if (products.length === 0) {
                    res.sendStatus(ERROR);
                }
                res.send(products);
            } catch (e) {
                res.sendStatus(ERROR);
            }
        });

        this.router.get('/history', async (req, res) => {
            try {
                const products = await this.productService.getProducts();
                if (products.length === 0) {
                    res.sendStatus(ERROR);
                }
                res.send(products);
            } catch (e) {
                res.sendStatus(ERROR);
            }
        });

        this.router.post('/', async (req, res) => {
            try {
                const product = req.body as Product;
                await this.productService.addProduct(product);
                await this.activeProductService.addProduct(product);
                res.sendStatus(OK);
            } catch (e) {
                res.sendStatus(ERROR);
            }
        });

        this.router.delete('/', async (req, res) => {
            try {
                const product = req.body as Product;
                await this.activeProductService.deleteProduct(product);
                res.sendStatus(OK);
            } catch (e) {
                res.sendStatus(ERROR);
            }
        });
    }
}
