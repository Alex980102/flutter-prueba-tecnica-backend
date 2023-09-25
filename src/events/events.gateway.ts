import { Logger } from '@nestjs/common';
import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class EventsGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  private clients: { [key: string]: string } = {};

  consttructor() {}

  @WebSocketServer()
  server: Server;

  afterInit(server: Server): void {
    console.log('This runs when initialized');
  }

  handleConnection(client: Socket, ...args: any[]): void {
    console.log('This runs when connected');
  }

  handleDisconnect(client: Socket): void {
    console.log('This runs when disconnected');
  }

  @SubscribeMessage('message')
  handleMessage(client: any, payload: any) {
    Logger.log(payload);
    this.server.emit('message', 'Funciona');
  }

  emitMessage(payload: any) {
    Logger.log(`Emitting message: ${payload}`, `EventsGateway.emitMessage`);
    this.server.emit('message', payload);
  }
}
