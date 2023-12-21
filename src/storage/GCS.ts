import { Storage } from "@google-cloud/storage";
import "dotenv/config";
import XLSX from "xlsx";

export class GoogleCloudStorage {
  private storage;
  private bucket;

  constructor() {
    console.log("GOOGLE CLOUD STORAGE");
    this.storage = new Storage({
      projectId: process.env.GCLOUD_PROJECT_ID,
      keyFilename: process.env.GCLOUD_KEYFILE
    });
    this.bucket = this.storage.bucket(process.env.GCLOUD_BUCKET);
  }
  async upload(reqFile, fileName) {
    const blob = this.bucket.file(fileName);

    const blobStream = blob.createWriteStream();

    blobStream.end(reqFile.data);

    await new Promise((resolve, reject) => {
      blobStream.on("error", (err) => {
        console.error(err);
        reject("Error uploading file.");
      });

      blobStream.on("finish", () => {
        console.log("File uploaded successfully.");
        resolve("success");
      });
    });

  }

  async createReadStream(fileName: string) {
    const blob = this.bucket.file(fileName);
    const readStream = blob.createReadStream();

    return new Promise((resolve, reject) => {
      const buffers = [];

      readStream.on("data", function (data) {
        buffers.push(data);
      });

      readStream.on("end", function () {
        const buffer = Buffer.concat(buffers);
        const workbook = XLSX.read(buffer, { type: "buffer" });
        const workSheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[workSheetName];
        const data = XLSX.utils.sheet_to_json(worksheet, { defval: "" });
        resolve(data);
      });

      readStream.on("error", (err) => {
        reject(err);
      });
    });
  }
}