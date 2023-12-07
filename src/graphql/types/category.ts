import { objectType, list, mutationField, nonNull, queryField } from "nexus";
import { Product } from "./product";
import { Context } from "../../context";
import { deleteCategoryInput, newCategoryInput } from "../inputs";

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

export const deleteCategory = mutationField("deleteCategory", {
  type: nonNull(Product),
  args: {
    input: nonNull(deleteCategoryInput),
  },
  //@ts-ignore
  resolve: async (_root, args, ctx: Context) => {
    const category = await ctx.prisma.category.findUnique({
      where: {
        id: args.input.id,
      },
      include: {
        Product: true,
      },
    });
    console.log("🚀 ~ file: category.ts:45 ~ resolve: ~ category:", category);

    if (category.Product.length > 0) {
      throw new Error("this category has some products related");
    }

    return await ctx.prisma.category.delete({
      //@ts-ignore
      where: {
        id: args.input.id,
      },
    });
  },
});

export const categories = queryField("categories", {
  type: nonNull(list(Category)),
  //@ts-ignore
  resolve: async (_root, args, ctx: Context) => {
    return await ctx.prisma.category.findMany({
      include: {
        Product: true,
      },
    });
  },
});
