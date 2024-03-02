import { QueueName } from "../../domain/entities/queueName";
import { BrokerRepository } from "../../domain/repository/brokerRepository";

export class ConsumeChannelService {
  constructor(private readonly brokerRepository: BrokerRepository) {}
  async run(queueName: QueueName): Promise<any> {
    try {
      const msg = await this.brokerRepository.consumeChannel(queueName);
      console.log("data:")
      console.log(msg)
      return msg;
    } catch (err: any) {
      throw new Error(err);
    }
  }
}