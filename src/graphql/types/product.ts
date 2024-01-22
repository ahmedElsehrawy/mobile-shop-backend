import {
  nonNull,
  objectType,
  mutationField,
  list,
  extendType,
  intArg,
  nullable,
  queryField,
} from "nexus";
import { Context } from "../../context";
import {
  createProductInput,
  deleteProductInput,
  sellProductInput,
  fliterProductsInput,
  getOneProductInput,
  updateProductInput,
  updateProductWhere,
} from "../inputs";

const Category = objectType({
  name: "category",
  definition(t) {
    t.nonNull.int("id");
    t.nonNull.string("name");
    t.nonNull.field("Product", { type: list(Product) });
  },
});

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
    t.field("category", { type: Category });
  },
});

export const createProduct = mutationField("createProduct", {
  type: nonNull(Product),
  args: {
    input: nonNull(createProductInput),
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

export const deleteProduct = mutationField("deleteProduct", {
  type: nonNull(Product),
  args: {
    input: nonNull(deleteProductInput),
  },
  //@ts-ignore
  resolve: async (_root, args, ctx: Context) => {
    return await ctx.prisma.product.delete({
      //@ts-ignore
      where: {
        id: args.input.id,
      },
    });
  },
});

export const sellProduct = mutationField("sellProduct", {
  type: nonNull(Product),
  args: {
    input: nonNull(sellProductInput),
  },
  //@ts-ignore
  resolve: async (_root, args, ctx: Context) => {
    let existingProduct;
    try {
      existingProduct = await ctx.prisma.product.findUnique({
        where: {
          id: args.input.id,
        },
      });
    } catch (error) {
      throw new Error("No such product exists");
    }

    if (existingProduct.count < args.input.count) {
      throw new Error("inventory doesn't have that number of product");
    }

    return await ctx.prisma.product.update({
      //@ts-ignore
      where: {
        id: args.input.id,
      },
      data: {
        count: existingProduct.count - args.input.count,
      },
    });
  },
});

export const products = extendType({
  type: "Query",
  definition(t) {
    t.field("products", {
      type: objectType({
        name: "products",
        definition(t) {
          t.int("count");
          t.field("nodes", { type: list(Product) });
        },
      }),
      args: {
        skip: nonNull(intArg()),
        take: nonNull(intArg()),
        where: nullable(fliterProductsInput),
      },

      //@ts-ignore
      resolve: async (_root, args, ctx: Context) => {
        console.log("🚀 ~ file: product.ts:116 ~ resolve: ~ args:", args);

        let where = {};

        if (args.where.categoryId && args.where.count) {
          where = {
            AND: [
              {
                category: {
                  id: args.where.categoryId,
                },
              },
              {
                count: args.where.count,
              },
            ],
          };
        } else if (args.where.count != null || args.where.count != undefined) {
          where = {
            count: args.where.count,
          };
        } else if (args.where.categoryId) {
          where = {
            categoryId: args.where.categoryId,
          };
        }

        let nodes = await ctx.prisma.product.findMany({
          skip: args.skip,
          take: args.take,
          where: where,
          include: {
            category: true,
          },
        });

        const count = await ctx.prisma.product.count();

        return { count, nodes };
      },
    });
  },
  //@ts-ignore
});

export const getOneProduct = queryField("getOneProduct", {
  type: nonNull(Product),
  args: {
    where: nonNull(getOneProductInput),
  },
  //@ts-ignore
  resolve: async (_, args, ctx) => {
    return await ctx.prisma.product.findUnique({
      where: {
        id: args.where.id,
      },
      include: {
        category: true,
      },
    });
  },
});

export const updateProduct = mutationField("updateProduct", {
  type: nonNull(Product),
  args: {
    input: nonNull(updateProductInput),
    where: nonNull(updateProductWhere),
  },
  //@ts-ignore
  resolve: async (_root, args, ctx: Context) => {
    return await ctx.prisma.product.update({
      where: {
        id: args.where.id,
      },
      data: args.input,
      include: {
        category: true,
      },
    });
  },
});
