import { OrderUI } from '@app/interfaces/order.interface';
import { OrderHandler } from '@app/orders/order-handler';
import { OrderService } from '@app/orders/order.service';
import { Router } from 'express';
import { Service } from 'typedi';

const ERROR = 400;
const OK = 200;
@Service()
export class OrderController {
    router: Router;

    constructor(private orderService: OrderService, private orderHandler: OrderHandler) {
        this.configureRouter();
    }

    private configureRouter(): void {
        this.router = Router();

        this.router.get('/', async (req, res) => {
            try {
                const { userId } = res.locals;
                console.log(userId);
                const orders = await this.orderService.getOrders(userId);
                return res.send(orders);
            } catch (e) {
                return res.sendStatus(ERROR);
            }
        });

        this.router.post('/', async (req, res) => {
            try {
                const { userId } = res.locals;
                const order = req.body as OrderUI;
                const result = await this.orderHandler.createOrder(order, userId);
                console.log(result);
                if (result) {
                    return res.sendStatus(OK);
                }
                return res.sendStatus(ERROR);
            } catch (e) {
                console.log(e);
                return res.sendStatus(ERROR);
            }
        });

        this.router.delete('/', async (req, res) => {
            try {
                const { orderId } = req.body;
                await this.orderService.deleteOrder(orderId);
                return res.sendStatus(OK);
            } catch (e) {
                return res.sendStatus(ERROR);
            }
        });
    }
}
