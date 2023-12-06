import { makeSchema, declarativeWrappingPlugin } from "nexus";
import * as types from "./graphql/types";
import path from "path";

export const schema = makeSchema({
  types,
  outputs: {
    schema: path.join(__dirname, "../schema.graphql"),
    typegen: path.join(__dirname, "../schema-typegen.ts"),
  },

  contextType: {
    module: require.resolve("./context.ts"),
    alias: "Context",
    export: "Context",
  },
  nonNullDefaults: {
    output: true,
  },
});
