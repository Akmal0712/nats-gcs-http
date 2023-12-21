import "dotenv/config";
import { QueuedIterator, connect } from "nats";
import { MqInterface } from "../mq.interface";
export class Nats implements MqInterface {
  private nats;
  async connect(): Promise<void> {
    this.nats = await connect({ servers: [process.env.NATS_URL] });
  }

  public async publish(channel: string, message: string): Promise<void> {
    return await this.nats.publish(channel, message);
  }

  public async subscribe(channel: string): Promise<QueuedIterator<string>> {
    return await this.nats.subscribe(channel);
  }
}