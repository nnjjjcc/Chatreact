import { WebSocketGateway } from '@nestjs/websockets';

@WebSocketGateway(2999, {
  cors: {
    origin: '*',
  },
})
export class EventsGateway {}
