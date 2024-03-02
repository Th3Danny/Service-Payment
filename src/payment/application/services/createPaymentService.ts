import { SendMessageService } from "../../../shared/broker/application/service/sendMessageService";
import { QueueName } from "../../../shared/broker/domain/entities/queueName";
import { QueueResponse } from "../../../shared/broker/domain/entities/queueResponse";
import { SendDataService } from "../../../shared/socket/application/sendDataService";
import { EventsSocket } from "../../../shared/socket/domain/entities/eventTypes"; 

export class CreatePaymentService {
  constructor(
    private readonly sendMessageService: SendMessageService,
    private readonly sendDataService: SendDataService
  ) {}
  async run(order: any): Promise<void> {
    try {
      const payment = {
        title: `payment with order ${order?.name} was created, total: ${order?.price}`,
        ...order,
      };
      await this.sendMessageService.run(payment, QueueName.PAYMENT);
      await this.sendDataService.run(EventsSocket.SEND_DATA, payment);
    } catch (err: any) {
      console.log(err);
      throw new Error(err);
    }
  }
}