import { SellerProfileService } from '@app/services/seller.profile.service';
import { Request, Response, Router } from 'express';
import { Service } from 'typedi';

// const HTTP_STATUS_CREATED = 201;

@Service()
export class SellerProfileController {
    router: Router;

    constructor(private readonly sellerProfileService: SellerProfileService) {
        this.configureRouter();
    }

    private configureRouter(): void {
        this.router = Router();

        this.router.get('/sellerProfile/name/:id', async (req: Request, res: Response) => {
            const fullName = await this.sellerProfileService.getFullName(req.params.id);
            res.json(fullName);
        });

        this.router.get('/sellerProfile/description/:id', async (req: Request, res: Response) => {
            const description = await this.sellerProfileService.getDescription(req.params.id);
            res.json(description);
        });

        this.router.get('/sellerProfile/availableProducts/:id', async (req: Request, res: Response) => {
            const productList = await this.sellerProfileService.getProducts(req.params.id);
            res.json(productList);
        });

        this.router.get('/sellerProfile/productsHistory/:id', async (req: Request, res: Response) => {
            const historyList = await this.sellerProfileService.getHistory(req.params.id);
            res.json(historyList);
        });

        this.router.get('/sellerProfile/imageUrl/:id', async (req: Request, res: Response) => {
            const imageUrl = await this.sellerProfileService.getImageUrl(req.params.id);
            res.json(imageUrl);
        });

        this.router.get('/sellerProfile/reviews/:id', async (req: Request, res: Response) => {
            const reviewList = await this.sellerProfileService.getReviews(req.params.id);
            res.json(reviewList);
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
