
import { QueueContent } from "./queueContent";
import { QueueName } from "./queueName";

export interface QueueRequest {
  queueName: QueueName;
  content: QueueContent;
}