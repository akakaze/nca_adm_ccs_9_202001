import fs from "fs";
import { Schema } from "electron-store";

interface s extends Schema {
  properties: {
    [key: string]: Schema;
  };
}

const configDefaultSchema = fs.readFileSync("src/config/default.json", {
  encoding: "utf8"
});

const schema: s = JSON.parse(configDefaultSchema);

export default schema;
