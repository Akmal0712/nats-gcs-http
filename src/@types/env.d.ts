declare namespace NodeJS {
  interface ProcessEnv {
    MONGO_URL: string;
    NATS_URL: string;
    APP_PORT: string;
    GCLOUD_BUCKET: string;
    GCLOUD_PROJECT_ID: string;
    GCLOUD_KEYFILE: string;
  }
}
