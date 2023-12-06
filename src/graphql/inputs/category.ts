import { inputObjectType } from "nexus";

export const newCategoryInput = inputObjectType({
  name: "newCategoryInput",
  definition(t) {
    t.nonNull.string("name");
  },
});
