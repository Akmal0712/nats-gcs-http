import { MessageQueue } from "../../MQ/MessageQueue";
import { Nats } from "../../MQ/nats/Nats";
import { StringCodec } from "nats";
import { GoogleCloudStorage } from "../../storage/GCS";
import _ from "lodash";
import OrderModel from "../http/models/order.model";
import TaskModel from "../http/models/task.model";
import { mongodb } from "../../storage/mongo";

const gcs = new GoogleCloudStorage();

async function handler() {
  const nats = new Nats();
  await nats.connect();
  const messageQueue = new MessageQueue(nats);
  await mongodb(process.env.MONGO_URL);

  console.log("Handler service is running");

  const sc = StringCodec();
  const channel = "tasks";
  const subscription = await messageQueue.subscribe(channel);
  for await (const msg of subscription) {
    const taskId =msg["_rdata"];
    await TaskModel.updateOne({ _id: taskId }, { $set: { status: "processing" } });
    console.log(`Task ${taskId} in processing`);

    const orders = await gcs.createReadStream(sc.decode(msg["_rdata"]));

    const batch = _.chunk(orders, 100);
    for (const orders of batch) {
      await OrderModel.insertMany(orders.filter((order) => order.name && order.price && order.amount));
    }

    await TaskModel.updateOne({ _id: taskId }, { $set: { status: "completed" } });
    console.log(`Task ${taskId} completed`);
  }
}

handler();