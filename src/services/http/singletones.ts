import { GoogleCloudStorage } from "../../storage/GCS";
import { MessageQueue } from "../../MQ/MessageQueue";
import { Nats } from "../../MQ/nats/Nats";

let gcs;
let messageQueue;

(async () => {
  gcs = new GoogleCloudStorage();
  const nats = new Nats();
  await nats.connect();
  messageQueue = new MessageQueue(nats);
})();

export { gcs, messageQueue };