import stringify from 'json-stringify-safe';
import { forEach } from 'lodash';
import { BroadcastRequest } from '../@types/websocket.d';
import logger from '../logger';
import { clientsHolder } from './clients-holder';
import sendMessage from './send-message';

export default ({
  senderClientId,
  receiverClientIds,
  message
}: BroadcastRequest): number => {
  logger.info(
    `Broadcasting message from clientId ${senderClientId} to clientIds ${stringify(
      receiverClientIds
    )} : ${message}`
  );
  let successCount = 0;
  forEach(receiverClientIds, (clientId) => {
    forEach(clientsHolder.get({ clientId }), (ws) => {
      const isSuccess = sendMessage({
        ws,
        message
      });
      if (isSuccess) ++successCount;
    });
  });
  return successCount;
};
