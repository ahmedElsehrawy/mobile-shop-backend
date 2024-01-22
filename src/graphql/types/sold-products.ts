import { extendType, list, mutationField, nonNull, objectType } from "nexus";
import { Product } from "./product";
import {
  createSoldProductInput,
  soldProductsInput,
} from "../inputs/sold-products";
import { Context } from "../../context";
import moment from "moment";

const SoldProduct = objectType({
  name: "soldProduct",
  definition(t) {
    t.nonNull.int("id");
    t.nonNull.int("salePrice");
    t.nonNull.string("createdAt");
    t.nonNull.int("quantity");
    t.nonNull.int("productId");
    t.nonNull.field("product", { type: Product });
  },
});

// export const soldProducts = queryField("soldProducts", {
//   type: nonNull(list(SoldProduct)),
//   args: {
//     input: nonNull(soldProductsInput),
//   },
//   resolve: async (_root, args, ctx: Context) => {
//     let today;
//     let tomorrow;

//     let where = {};
//     if (args.input.createdAt) {
//       today = new Date(args.input.createdAt);
//       tomorrow = new Date();
//       tomorrow.setDate(today.getDate() + 1);
//       where = {
//         createdAt: {
//           gte: today,
//           lt: tomorrow,
//         },
//       };
//     }
//     //@ts-ignore
//     let products = await ctx.prisma.soldProduct.findMany({
//       where,
//       include: {
//         product: true,
//       },
//     });

//     let formatedProducts = products.map((product) => ({
//       ...product,
//       createdAt: new Date(product.createdAt).toLocaleDateString(),
//     }));
//     return formatedProducts;
//   },
// });

export const soldProducts = extendType({
  type: "Query",
  definition(t) {
    t.field("soldProducts", {
      type: objectType({
        name: "soldProducts",
        definition(t) {
          t.int("total");
          t.int("totalOriginalPrice");
          t.field("nodes", { type: list(SoldProduct) });
        },
      }),
      args: {
        input: nonNull(soldProductsInput),
      },

      //@ts-ignore
      resolve: async (_root, args, ctx: Context) => {
        let today;
        let tomorrow;

        let where = {};
        if (args.input.createdAt) {
          today = new Date(args.input.createdAt);
          tomorrow = new Date();
          tomorrow.setDate(today.getDate() + 1);
          where = {
            createdAt: {
              gte: today,
              lt: tomorrow,
            },
          };
        }
        //@ts-ignore
        let products: [any] = await ctx.prisma.soldProduct.findMany({
          where,
          include: {
            product: true,
          },
        });

        let sumOriginalSale = 0;

        products.map((p) => {
          sumOriginalSale += +p.product.original_price * p.quantity;
        });
        console.log(
          "🚀 ~ file: sold-products.ts:113 ~ resolve: ~ sumOriginalSale:",
          sumOriginalSale
        );

        let sum = await ctx.prisma.soldProduct.aggregate({
          where,
          _sum: { salePrice: true },
        });

        let nodes = products.map((product) => ({
          ...product,
          createdAt: new Date(product.createdAt).toLocaleDateString(),
        }));

        return {
          total: sum._sum.salePrice,
          totalOriginalPrice: sumOriginalSale,
          nodes,
        };
      },
    });
  },
  //@ts-ignore
});

export const createSoldProduct = mutationField("createSoldProduct", {
  type: nonNull(SoldProduct),
  args: {
    input: nonNull(createSoldProductInput),
  },
  //@ts-ignore
  resolve: async (_root, args, ctx: Context) => {
    //@ts-ignore
    return await ctx.prisma.soldProduct.create({
      data: {
        ...args.input,
        salePrice: args.input.quantity * args.input.salePrice,
      },
      include: {
        product: true,
      },
    });
  },
});

const soldProductsChartsField = objectType({
  name: "soldProductsChartsField",
  definition(t) {
    t.int("totalSaledPrice");
    t.int("totalOriginalPrice");
    t.string("from");
    t.string("to");
  },
});

export const soldProductsCharts = extendType({
  type: "Query",
  definition(t) {
    t.field("soldProductsCharts", {
      type: objectType({
        name: "soldProductsCharts",
        definition(t) {
          t.nonNull.field("soldProuctsCharts", {
            type: list(soldProductsChartsField),
          });
        },
      }),

      resolve: async (_root, args, ctx: Context) => {
        let dates = [];
        let filters = [];

        for (let index = 9; index >= 0; index--) {
          if (index === 0) {
            dates.push(new Date());
          } else {
            dates.push(new Date(moment().subtract(index, "week").calendar()));
          }
        }

        for (let index = dates.length - 1; index >= 1; index--) {
          filters.push({
            createdAt: {
              gt: dates[index - 1],
              lte: dates[index],
            },
          });
        }

        let data = [];

        for (let index = 0; index < filters.length; index++) {
          const _sum = await ctx.prisma.soldProduct.aggregate({
            where: filters[index],
            _sum: { salePrice: true },
          });

          const soldProducts = await ctx.prisma.soldProduct.findMany({
            where: filters[index],
            include: {
              product: true,
            },
          });

          let sumOriginalSale = 0;

          soldProducts.map((p) => {
            sumOriginalSale += +p.product.original_price * p.quantity;
          });

          data[index] = {
            totalSaledPrice: _sum._sum.salePrice ? _sum._sum.salePrice : 0,
            from: new Date(
              dates[dates.length - index - 2]
            ).toLocaleDateString(),
            to: new Date(dates[dates.length - index - 1]).toLocaleDateString(),
            totalOriginalPrice: sumOriginalSale,
          };
        }

        return {
          soldProuctsCharts: data,
        };
      },
    });
  },
});
