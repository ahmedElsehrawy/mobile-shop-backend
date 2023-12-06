import { nonNull, objectType, mutationField, queryField, list } from "nexus";
import { Context } from "../../context";
import { newProductInput } from "../inputs";

export const Product = objectType({
  name: "Product",
  definition(t) {
    t.nonNull.int("id");
    t.nonNull.string("name");
    t.nonNull.string("code");
    t.nonNull.int("count");
    t.nonNull.float("original_price");
    t.nonNull.float("start_price");
    t.nonNull.float("end_price");
    t.nonNull.int("categoryId");
  },
});

export const createProduct = mutationField("createProduct", {
  type: nonNull(Product),
  args: {
    input: nonNull(newProductInput),
  },
  //@ts-ignore
  resolve: async (_root, args, ctx: Context) => {
    return await ctx.prisma.product.create({
      //@ts-ignore
      data: {
        ...args.input,
      },
    });
  },
});

export const products = queryField("products", {
  type: nonNull(list(Product)),
  //@ts-ignore
  resolve: async (_root, args, ctx: Context) => {
    const products = await ctx.prisma.product.findMany();

    return products;
  },
});
