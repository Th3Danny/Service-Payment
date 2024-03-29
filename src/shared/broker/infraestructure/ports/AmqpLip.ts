import amqp from "amqplib/callback_api";
import { QueueRequest } from "../../domain/entities/queueRequest";
import { QueueName } from "../../domain/entities/queueName";
import { QueueResponse } from "../../domain/entities/queueResponse";
import { BrokerRepository } from "../../domain/repository/brokerRepository";
import { Connection } from "amqplib/callback_api";
import { Channel } from "amqplib/callback_api";

export class AmqpLibPort implements BrokerRepository {
  constructor(private readonly url: string) {}

  connectionBroker(): Promise<Connection> {
    return new Promise<Connection>((resolve, reject) => {
      amqp.connect(this.url, (err: any, conn: Connection) => {
        if (err) reject(err);
        console.log("Successfully connected");
        resolve(conn);
      });
    });
  }

  async createChannel(): Promise<Channel> {
    try {
      const conn = await this.connectionBroker();
      return new Promise<Channel>((resolve, reject) => {
        conn.createChannel((errChanel: any, channel: Channel) => {
          if (errChanel) reject(errChanel);
          resolve(channel);
        });
      });
    } catch (err: any) {
      throw new Error(err);
    }
  }

  async sendMessageToChannel(req: QueueRequest): Promise<void> {
    const { queueName, content } = req;
    try {
      const channel = await this.createChannel();
      await channel.assertQueue(queueName);
      channel.sendToQueue(queueName, Buffer.from(JSON.stringify(content)), {
        persistent: true,
      });
      console.log("message send: " + content);
    } catch (err: any) {
      throw new Error(err);
    }
  }

  async consumeChannel(queueName: QueueName): Promise<QueueResponse> {
    try {
      const channel = await this.createChannel();
      await channel.assertQueue(queueName);
      return new Promise<QueueResponse>((resolve, reject) => {
        channel.consume(queueName, async (data: amqp.Message | null) => {
          console.log(`cola : ${queueName} con datos: `);
          if (data !== null) {
            const content = data?.content;
            const parsedContent = JSON.parse(content.toString());
            await channel.ack(data);
            resolve(parsedContent);
          }
          reject("Invalid data: " + data);
        });
      });
    } catch (err: any) {
      throw new Error(err);
    }
  }
}