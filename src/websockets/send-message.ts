import WebSocket from 'ws';
import logger from '../logger';
import { clientsHolder } from './clients-holder';

export default ({
  ws,
  message
}: {
  ws: WebSocket.WebSocket;
  message: string;
}): boolean => {
  if (ws.readyState !== WebSocket.OPEN) {
    logger.debug(`Socket is not opened.`);
    logger.trace(`Removing inactive ws...`);
    clientsHolder.remove({ ws });
    return false;
  }

  ws.send(message);
  return true;
};
