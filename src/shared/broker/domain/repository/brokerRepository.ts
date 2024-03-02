
import { QueueRequest } from "../entities/queueRequest";
import { QueueName } from "../entities/queueName";

export interface BrokerRepository {
  connectionBroker(): Promise<any>;
  createChannel(): Promise<any>;
  sendMessageToChannel(req: QueueRequest): Promise<void>;
  consumeChannel(queueName: QueueName): Promise<any>;
}