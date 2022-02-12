import { SellerProfileService } from '@app/services/seller.profile.service';
import { Request, Response, Router } from 'express';
import { StatusCodes } from 'http-status-codes';
import { Service } from 'typedi';

// const HTTP_STATUS_CREATED = 201;
// TODO Check for request auth

@Service()
export class SellerProfileController {
    router: Router;

    constructor(private readonly sellerProfileService: SellerProfileService) {
        this.configureRouter();
    }

    private configureRouter(): void {
        this.router = Router();

        this.router.get('/sellerProfile/name/:id', async (req: Request, res: Response) => {
            try {
                const fullName = await this.sellerProfileService.getFullName(req.params.id);
                res.json(fullName);
            } catch (e) {
                res.sendStatus(StatusCodes.NOT_FOUND);
            }
        });

        this.router.get('/sellerProfile/description/:id', async (req: Request, res: Response) => {
            try {
                const description = await this.sellerProfileService.getDescription(req.params.id);
                res.json(description);
            } catch (e) {
                res.sendStatus(StatusCodes.NOT_FOUND);
            }
        });

        this.router.get('/sellerProfile/availableProducts/:id', async (req: Request, res: Response) => {
            try {
                const productList = await this.sellerProfileService.getProducts(req.params.id);
                res.json(productList);
            } catch (e) {
                res.sendStatus(StatusCodes.NOT_FOUND);
            }
        });

        this.router.get('/sellerProfile/productsHistory/:id', async (req: Request, res: Response) => {
            try {
                const historyList = await this.sellerProfileService.getHistory(req.params.id);
                res.json(historyList);
            } catch (e) {
                res.sendStatus(StatusCodes.NOT_FOUND);
            }
        });

        this.router.get('/sellerProfile/imageUrl/:id', async (req: Request, res: Response) => {
            try {
                const imageUrl = await this.sellerProfileService.getImageUrl(req.params.id);
                res.json(imageUrl);
            } catch (e) {
                res.sendStatus(StatusCodes.NOT_FOUND);
            }
        });

        // TODO Image server?
        this.router.get('/sellerProfile/reviews/:id', async (req: Request, res: Response) => {
            try {
                const reviewList = await this.sellerProfileService.getReviews(req.params.id);
                res.json(reviewList);
            } catch (e) {
                res.sendStatus(StatusCodes.NOT_FOUND);
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
                const review = req.body;
                this.sellerProfileService.addReview(review);
            } catch (e) {
                res.sendStatus(StatusCodes.NOT_FOUND);
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
