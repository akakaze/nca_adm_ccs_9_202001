import fs from "fs";
import { JSONSchema } from "json-schema-typed";

interface schema extends JSONSchema {
  properties: { [key: string]: JSONSchema };
}

let configDefaultSchema = fs.readFileSync("src/config/default.json", {
  encoding: "utf8"
});

let schema: schema = JSON.parse(configDefaultSchema);

export default schema;
