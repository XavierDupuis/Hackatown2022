import { ProductService } from '@app/product-service/product.service';
import { response, Router } from 'express';
import { Service } from 'typedi';

@Service()
export class ProductController {
    router: Router;

    constructor(private productService: ProductService) {
        this.configureRouter();
    }

    private configureRouter(): void {
        this.router = Router();

        this.router.get('/', async (req, res) => {
            try {
                const products = await this.productService.getProducts();
                if (products.length === 0) {
                    response.sendStatus(400);
                }
                response.send(products);
            } catch (e) {
                response.sendStatus(400);
            }
        });

        this.router.post('/', async (req, res) => {
            try {
                const product = req.body;
                const successful = await this.productService.addProduct(product);
                if (!successful) {
                    response.sendStatus(400);
                }
                response.send(product);
            } catch (e) {
                response.sendStatus(400);
            }
        });
    }
}
