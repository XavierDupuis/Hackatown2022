import { JWTValidatorService } from '@app/auth/jwt-aws-validator.service';
import * as express from 'express';
import { JwtPayload } from 'jsonwebtoken';
import { Service } from 'typedi';

const UNAUTORIZED = 401;
@Service()
export class AuthService {
    constructor(private jwtValidator: JWTValidatorService) {}

    get middleware() {
        return async (req: express.Request, res: express.Response, next: express.NextFunction) => {
            const authHeader = req.header('Authorization');
            if (authHeader === undefined) {
                return res.sendStatus(UNAUTORIZED);
            }

            const [authScheme, token] = authHeader.split(' ');
            if (authScheme !== 'Bearer') {
                return res.sendStatus(UNAUTORIZED);
            }

            try {
                const payload = (await this.getUserId(token)) as JwtPayload;
                res.locals.userId = payload.username;
                return next();
            } catch (e) {
                return res.sendStatus(UNAUTORIZED);
            }
        };
    }

    async getUserIdMock(token: string) {
        // TODO remove in prod
        switch (token) {
            case 'abc':
                return { username: '5b6962dd-3f90-4c93-8f61-eabfa4a803e2' };
            case 'def':
                return { username: '5b6962dd-3f90-4c93-8f61-eabfa4a803e1' };
            case 'ghi':
                return { username: '5b6962dd-3f90-4c93-8f61-eabfa4a803e0' };
            default:
                return undefined;
        }
    }

    async getUserId(token: string) {
        return await this.jwtValidator.validate(token);
    }
}
