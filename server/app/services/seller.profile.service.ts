import { DatabaseService } from '@app/database/database.service';
import { Message } from '@app/message';
import { Service } from 'typedi';

@Service()
export class SellerProfileService {
    clientMessages: Message[];
    // TODO database service
    constructor(private readonly databaseService: DatabaseService) {
        this.clientMessages = [];
    }

    about(): Message {
        return {
            title: 'Basic Server About Page',
            body: 'Try calling /api/docs to get the documentation',
        };
    }

    // async helloWorld(): Promise<Message> {
    //     return this.dateService
    //         .currentTime()
    //         .then((timeMessage: Message) => {
    //             return {
    //                 title: 'Hello world',
    //                 body: 'Time is ' + timeMessage.body,
    //             };
    //         })
    //         .catch((error: unknown) => {
    //             return {
    //                 title: 'Error',
    //                 body: error as string,
    //             };
    //         });
    // }

    // TODO : ceci est à titre d'exemple. À enlever pour la remise
    storeMessage(message: Message): void {
        // eslint-disable-next-line no-console
        console.log(message);
        this.clientMessages.push(message);
    }

    getAllMessages(): Message[] {
        return this.clientMessages;
    }
}
