import { OrderUI } from '@app/interfaces/order.interface';
import { OrderService } from '@app/orders/order.service';
import { Router } from 'express';
import { Service } from 'typedi';

const ERROR = 400;
const OK = 200;
@Service()
export class OrderController {
    router: Router;

    constructor(private orderService: OrderService) {
        this.configureRouter();
    }

    private configureRouter(): void {
        this.router = Router();

        this.router.get('/', async (req, res) => {
            try {
                const userId = req.body;
                const products = await this.orderService.getOrders(userId); // TODO: TO test
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
                const order = req.body as OrderUI;
                await this.orderService.createOrder(order);
                res.sendStatus(OK);
            } catch (e) {
                res.sendStatus(ERROR);
            }
        });

        this.router.delete('/', async (req, res) => {
            try {
                const orderId = req.body;
                const result = await this.orderService.deleteOrder(orderId);
                if (result) {
                    res.sendStatus(OK);
                }
                res.sendStatus(ERROR);
            } catch (e) {
                res.sendStatus(ERROR);
            }
        });
    }
}
