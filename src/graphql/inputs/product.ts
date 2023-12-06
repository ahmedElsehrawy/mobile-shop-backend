import { inputObjectType } from "nexus";

export const newProductInput = inputObjectType({
  name: "newProductInput",
  definition(t) {
    t.nonNull.string("name");
    t.nonNull.string("code");
    t.nonNull.int("count");
    t.nonNull.float("original_price");
    t.nonNull.float("start_price");
    t.nonNull.float("end_price");
    t.nonNull.int("categoryId");
  },
});
