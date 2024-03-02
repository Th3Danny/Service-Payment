
import { QueueContent } from "../../domain/entities/queueContent";
import { QueueName } from "../../domain/entities/queueName";
import { QueueRequest } from "../../domain/entities/queueRequest";
import { BrokerRepository } from "../../domain/repository/brokerRepository";

export class SendMessageService {
  constructor(private readonly brokerRepository: BrokerRepository) {}
  async run(data: QueueContent, queueName: QueueName) {
    try {
      const reqQueue: QueueRequest = {
        queueName: queueName,
        content: data,
      };
      console.log(reqQueue)
      await this.brokerRepository.sendMessageToChannel(reqQueue);
    } catch (err: any) {
      throw new Error(err);
    }
  }
}