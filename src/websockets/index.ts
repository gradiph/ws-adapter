import { Server } from 'http';
import WebSocket from 'ws';
import onConnection from './on-connection';
import onUpgrade from './on-upgrade';

export default async (server: Server) => {
  const wss = new WebSocket.Server({
    noServer: true,
    path: '/websockets'
  });

  wss.on('connection', onConnection);

  server.on('upgrade', (req, socket, head) => {
    onUpgrade(wss, req, socket, head);
  });

  return wss;
};
