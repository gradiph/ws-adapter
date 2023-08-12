import WebSocket from 'ws';
import { Client } from './client.d';

export interface AdapterClient {
  clientId: string;
  sockets: WebSocket.WebSocket[];
}

export interface IClientsHolder {
  add({ clientId, ws }: { clientId: string; ws: WebSocket.WebSocket }): void;
  remove({ ws }: { ws: WebSocket.WebSocket }): void;
  get({ clientId }: { clientId: string }): WebSocket.WebSocket[];
  all(): string[];
}

export interface BroadcastRequest {
  senderClient: Client;
  receiverClientIds: string[];
  message: string;
}
