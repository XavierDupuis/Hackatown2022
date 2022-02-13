import { ActiveProductService } from '@app/product-service/active-products.service';
import { Router } from 'express';
import { ObjectId } from 'mongodb';
import { Service } from 'typedi';

const ERROR = 400;
const OK = 200;
@Service()
export class ProductController {
    router: Router;

    constructor(private activeProductService: ActiveProductService) {
        this.configureRouter();
    }

    private configureRouter(): void {
        this.router = Router();

        this.router.get('/', async (req, res) => {
            try {
                const products = await this.activeProductService.getProducts();
                return res.send(products);
            } catch (e) {
                return res.sendStatus(ERROR);
            }
        });

        this.router.delete('/', async (req, res) => {
            try {
                const { productId } = req.body;
                const result = await this.activeProductService.deleteProduct(new ObjectId(productId));
                if (result) {
                    return res.sendStatus(OK);
                }
                return res.sendStatus(ERROR);
            } catch (e) {
                return res.sendStatus(ERROR);
            }
        });
    }
}
