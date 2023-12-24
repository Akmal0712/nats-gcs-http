import { QueuedIterator } from "nats";

export interface MqInterface {
  publish(channel: string, message: string): Promise<void>;

  subscribe(channel: string): Promise<QueuedIterator<string>>;

  connect(): Promise<void>;
}