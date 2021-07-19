import Mongoose = require("mongoose");
import config from '../config/appConfig.json';

export default class DBConnection {
  private static db: Mongoose.Connection;

  private static uri = config.development.mongo_url;

  static async connect(): Promise<Mongoose.Connection> {
    if (this.db !== undefined) return this.db;

    await Mongoose.connect(this.uri, {
      useNewUrlParser: true,
      useFindAndModify: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });

    this.db = Mongoose.connection;

    this.db.once("open", async () => {
      console.log("Connected to database");
    });
    this.db.on("error", () => {
      console.log("Error connecting to database");
    });

    return this.db;
  }

  static async disconnect() {
    if (!this.db) {
      return;
    }
    await Mongoose.disconnect();
  }
}
