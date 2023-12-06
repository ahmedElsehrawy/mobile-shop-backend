import { objectType, list, mutationField, nonNull, queryField } from "nexus";
import { Product } from "./product";
import { Context } from "../../context";
import { newCategoryInput } from "../inputs";

export const Category = objectType({
  name: "Category",
  definition(t) {
    t.nonNull.int("id");
    t.nonNull.string("name");
    t.nonNull.field("Product", { type: list(Product) });
  },
});

export const createCategory = mutationField("createCategory", {
  type: nonNull(Category),
  args: {
    input: nonNull(newCategoryInput),
  },
  //@ts-ignore
  resolve: async (_root, args, ctx: Context) => {
    return await ctx.prisma.category.create({
      data: {
        ...args.input,
      },
    });
  },
});

export const categories = queryField("categories", {
  type: nonNull(list(Category)),
  //@ts-ignore
  resolve: async (_root, args, ctx: Context) => {
    return await ctx.prisma.category.findMany();
  },
});
