import { inputObjectType } from "nexus";

export const soldProductsInput = inputObjectType({
  name: "inputObjectType",
  definition(t) {
    t.string("createdAt");
  },
});

export const createSoldProductInput = inputObjectType({
  name: "createSoldProductInput",
  definition(t) {
    t.nonNull.int("salePrice");
    t.nonNull.int("productId");
    t.nonNull.int("quantity");
  },
});
