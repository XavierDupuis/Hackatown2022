import { SellerProfileService } from '@app/sellers/service/seller-profile.service';
import { Request, Response, Router } from 'express';
import { Service } from 'typedi';

const ERROR = 400;
const OK = 200;
// TODO Check for request auth

@Service()
export class SellerProfileController {
    router: Router;

    constructor(private sellerProfileService: SellerProfileService) {
        this.configureRouter();
    }

    private configureRouter(): void {
        this.router = Router();

        this.router.get('/:id', async (req, res) => {
            // TODO if userId === id then return private profile
            const { id } = req.params;
            try {
                const seller = await this.sellerProfileService.getProfile(id);
                return res.send(seller);
            } catch (e) {
                return res.sendStatus(ERROR);
            }
        });

        this.router.post('/create', async (req, res) => {
            const { userId } = res.locals;
            const { name, description } = req.body;
            if (name === undefined || description === undefined) {
                return res.sendStatus(ERROR);
            }

            try {
                const params = {
                    name,
                    description,
                    userId,
                };
                await this.sellerProfileService.createProfile(params);
                return res.sendStatus(OK);
            } catch (e) {
                return res.sendStatus(ERROR);
            }
        });

        this.router.get('/name/:id', async (req: Request, res: Response) => {
            try {
                const fullName = await this.sellerProfileService.getFullName(req.params.id);
                res.json(fullName);
            } catch (e) {
                res.sendStatus(ERROR);
            }
        });

        this.router.get('/description/:id', async (req: Request, res: Response) => {
            try {
                const description = await this.sellerProfileService.getDescription(req.params.id);
                res.json(description);
            } catch (e) {
                res.sendStatus(ERROR);
            }
        });

        this.router.get('/availableProducts/:id', async (req: Request, res: Response) => {
            try {
                const productList = await this.sellerProfileService.getProducts(req.params.id);
                res.json(productList);
            } catch (e) {
                res.sendStatus(ERROR);
            }
        });

        this.router.get('/productsHistory/:id', async (req: Request, res: Response) => {
            try {
                const historyList = await this.sellerProfileService.getHistory(req.params.id);
                res.json(historyList);
            } catch (e) {
                res.sendStatus(ERROR);
            }
        });

        this.router.get('/imageUrl/:id', async (req: Request, res: Response) => {
            try {
                const imageUrl = await this.sellerProfileService.getImageUrl(req.params.id);
                res.json(imageUrl);
            } catch (e) {
                res.sendStatus(ERROR);
            }
        });

        // TODO Image server?
        this.router.get('/reviews/:id', async (req: Request, res: Response) => {
            try {
                const { reviewList } = await this.sellerProfileService.getReviews(req.params.id);
                res.json(reviewList);
            } catch (e) {
                res.sendStatus(ERROR);
            }
        });

        // // TODO TODO
        // this.router.post('/image', async (req, res) => {
        //     // TODO Send image to image server and store url to database
        //     console.log(req);
        //     console.log(res);
        // });

        this.router.post('/review', async (req, res) => {
            try {
                const { review } = req.body;
                await this.sellerProfileService.addReview(review);
            } catch (e) {
                res.sendStatus(ERROR);
            }
        });

        // this.router.get('/about', (req: Request, res: Response) => {
        //     // Send the request to the service and send the response
        //     res.json(this.exampleService.about());
        // });

        // this.router.post('/send', (req: Request, res: Response) => {
        //     const message: Message = req.body;
        //     this.exampleService.storeMessage(message);
        //     res.sendStatus(HTTP_STATUS_CREATED);
        // });
    }
}
