import { inputObjectType } from "nexus";

export const createProductInput = inputObjectType({
  name: "createProductInput",
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

export const deleteProductInput = inputObjectType({
  name: "deleteProductInput",
  definition(t) {
    t.nonNull.int("id");
  },
});

export const sellProductInput = inputObjectType({
  name: "sellProductInput",
  definition(t) {
    t.nonNull.int("id");
    t.nonNull.int("count");
  },
});

export const fliterProductsInput = inputObjectType({
  name: "fliterProductsInput",
  definition(t) {
    t.nullable.int("count");
    t.nullable.int("categoryId");
  },
});

export const getOneProductInput = inputObjectType({
  name: "getOneProductInput",
  definition(t) {
    t.nonNull.int("id");
  },
});

export const updateProductInput = inputObjectType({
  name: "updateProductInput",
  definition(t) {
    t.nullable.string("name");
    t.nullable.string("code");
    t.nullable.int("count");
    t.nullable.float("original_price");
    t.nullable.float("start_price");
    t.nullable.float("end_price");
    t.nullable.int("categoryId");
  },
});

export const updateProductWhere = inputObjectType({
  name: "updateProductWhere",
  definition(t) {
    t.nonNull.int("id");
  },
});
