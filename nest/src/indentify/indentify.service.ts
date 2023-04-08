import { Injectable } from '@nestjs/common';

@Injectable()
export class IndentifyService {
    getHello(): string {
        return 'Hello World!';
    }
}
