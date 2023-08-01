import { Server } from 'http';
import WebSocket from 'ws';
import onConnect from './on-connect';

export default async (server: Server) => {
  const wss = new WebSocket.Server({
    noServer: true,
    path: '/websockets'
  });

  server.on('upgrade', (request, socket, head) => {
    wss.handleUpgrade(request, socket, head, (websocket) => {
      wss.emit('connection', websocket, request);
    });
  });

  const clients: WebSocket[] = [];
  wss.on('connection', (client, request) => {
    onConnect({ clients, client, request });
  });

  return wss;
};
