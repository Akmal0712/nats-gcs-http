import "dotenv/config";
import express from "express";
import fileUpload from "express-fileupload";
import bodyParser from "body-parser";
import { mongodb } from "../../storage/mongo";
import routes from "../http/routes/api";

const app = express();
app.use(fileUpload({
  limits: { fileSize: 50 * 1024 * 1024 },
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/api/v1", routes);

app.listen(process.env.APP_PORT, async () => {
  await mongodb(process.env.MONGO_URL);

  console.log("Server is running on port 3000");
});