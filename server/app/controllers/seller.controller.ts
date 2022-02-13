import { OrderService } from '@app/orders/order.service';
import { ActiveProductService } from '@app/product-service/active-products.service';
import { InactiveProductsService } from '@app/product-service/inactive-products.service';
import { SellerProfileService } from '@app/sellers/service/seller-profile.service';
import { Router } from 'express';
import { Service } from 'typedi';

const ERROR = 400;
const OK = 200;
@Service()
export class SellerController {
    router: Router;

    constructor(
        private inactiveProductService: InactiveProductsService,
        private activeProductService: ActiveProductService,
        private sellerService: SellerProfileService,
        private orderService: OrderService,
    ) {
        this.configureRouter();
    }

    private configureRouter(): void {
        this.router = Router();

        this.router.get('/order', async (req, res) => {
            try {
                const { userId } = res.locals;
                const orders = await this.orderService.getOrders(userId);
                return res.send(orders);
            } catch (e) {
                return res.sendStatus(ERROR);
            }
        });
        this.router.get('/', async (req, res) => {
            try {
                const { userId } = res.locals;
                const activeproducts = await this.activeProductService.getProductsFromSeller(userId);
                return res.send(activeproducts);
            } catch (e) {
                return res.sendStatus(ERROR);
            }
        });

        this.router.get('/seller-products/:sellerId', async (req, res) => {
            try {
                const { sellerId } = req.params;
                console.log('asdfasdf', sellerId);
                const activeproducts = await this.activeProductService.getProductsFromSeller(sellerId);
                console.log(activeproducts);
                return res.send(activeproducts);
            } catch (e) {
                return res.sendStatus(ERROR);
            }
        });

        this.router.get('/seller-id/:userId', async (req, res) => {
            const { userId } = req.params;
            console.log(userId);
            if (userId === undefined) {
                return res.sendStatus(ERROR);
            }
            try {
                const seller = await this.sellerService.getProfileWithUserId(userId);
                // eslint-disable-next-line no-underscore-dangle
                const sellerId = seller?._id;
                return res.send({ sellerId });
            } catch (e) {
                console.error(e);
                return res.sendStatus(ERROR);
            }
        });

        this.router.get('/history', async (req, res) => {
            try {
                const { userId } = res.locals;
                const activeproducts = await this.activeProductService.getProductsFromSeller(userId);
                const products = await this.inactiveProductService.getProductsFromSeller(userId);
                const productHistory = activeproducts.concat(products);
                return res.send(productHistory);
            } catch (e) {
                return res.sendStatus(ERROR);
            }
        });

        this.router.post('/', async (req, res) => {
            try {
                const product = req.body;
                const { userId } = res.locals;
                const exists = await this.sellerService.isSellerExists(userId);
                if (!exists) {
                    return res.sendStatus(401);
                }
                await this.activeProductService.addProduct(product, userId);
                return res.sendStatus(OK);
            } catch (e) {
                return res.sendStatus(ERROR);
            }
        });

        this.router.delete('/', async (req, res) => {
            try {
                const { productId } = req.body;
                const result = await this.activeProductService.deleteProduct(productId);
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
