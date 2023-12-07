import { inputObjectType } from "nexus";

export const newCategoryInput = inputObjectType({
  name: "newCategoryInput",
  definition(t) {
    t.nonNull.string("name");
  },
});

export const deleteCategoryInput = inputObjectType({
  name: "deleteCategoryInput",
  definition(t) {
    t.nonNull.int("id");
  },
});
