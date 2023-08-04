import { find, map, reject } from 'lodash';
import WebSocket from 'ws';
import { AdapterClient, IClientsHolder } from '../@types/websocket.d';

export class ClientsHolder implements IClientsHolder {
  public constructor(private clients: AdapterClient[] = []) {}

  add({ clientId, ws }: { clientId: string; ws: WebSocket.WebSocket }): void {
    const client: AdapterClient = find(Array.from(this.clients.values()), {
      clientId
    }) as AdapterClient;
    if (client) {
      client.sockets.push(ws);
    } else {
      const newClient: AdapterClient = {
        clientId,
        sockets: [ws]
      };
      this.clients.push(newClient);
    }
  }

  remove({ ws }: { ws: WebSocket.WebSocket }): void {
    const clients: AdapterClient[] = map(
      this.clients,
      (client: AdapterClient) => {
        const { clientId } = client;
        const sockets = reject(client.sockets, ws);
        return { clientId, sockets } as AdapterClient;
      }
    );
    this.clients = reject(
      clients,
      (client: AdapterClient) => client.sockets.length === 0
    );
  }

  get({ clientId }: { clientId: string }): WebSocket.WebSocket[] {
    return (find(this.clients, { clientId }) as AdapterClient).sockets;
  }
}

export const clientsHolder: IClientsHolder = new ClientsHolder();
