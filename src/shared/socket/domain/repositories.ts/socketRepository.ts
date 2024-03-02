import { QueueContent } from "../../../broker/domain/entities/queueContent";
import { EventsSocket } from "../entities/eventTypes";

export interface SocketRepository {
  connect(): Promise<any>;
  sendData(eventEmit: EventsSocket , data : QueueContent): Promise<void>;
}