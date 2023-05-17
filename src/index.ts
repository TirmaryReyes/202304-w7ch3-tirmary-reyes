import "./loadEnvironment.js";
import createDebug from "debug";
import chalk from "chalk";
import mongoose from "mongoose";
import app from "./server/index.js";

const debug = createDebug("itemsdb-api:root");

const port = process.env.PORT ?? 4000;
const mongoDbConnection = process.env.MONGODB_CONNECTION;

if (!mongoDbConnection) {
  debug(chalk.red(`Missing environment variables`));
  process.exit(1);
}

app.listen(port, () => {
  debug(chalk.blueBright(`Listening on http://localhost:${port}`));
});

try {
  mongoose.set("debug", true);
  mongoose.set("toJSON", {
    virtuals: true,
    versionKey: false,
    transform(doc, ret) {
      delete ret._id;
    },
  });

  await mongoose.connect(mongoDbConnection);
} catch (error: unknown) {
  debug(`Error connecting data base: ${chalk.red((error as Error).message)}`);
}
