import "dotenv/config";
import { MqInterface } from "./mq.interface";
import { QueuedIterator } from "nats";
export class MessageQueue {
  private messageQueue: MqInterface;
  constructor(mq: MqInterface) {
    this.messageQueue = mq;
  }
  public async publish(channel: string, message: string): Promise<void> {
    return await this.messageQueue.publish(channel, message);
  }

  public async subscribe(channel: string): Promise<QueuedIterator<string>> {
    return await this.messageQueue.subscribe(channel);
  }
}