import { EventsSocket } from "../domain/entities/eventTypes";
import { QueueContent } from "../../broker/domain/entities/queueContent";
import { SocketRepository } from "../domain/repositories.ts/socketRepository";


export class SendDataService {
  constructor(private readonly socketRepository: SocketRepository) {}
  async run(eventEmit: EventsSocket, data: QueueContent) {
    try {
      await this.socketRepository.sendData(eventEmit, data);
      console.log("Sent data");
    } catch (err: any) {
      throw new Error(err);
    }
  }
}