/**
 * This file was generated by Nexus Schema
 * Do not make changes to this file directly
 */


import type { Context as Context } from "./src/context"




declare global {
  interface NexusGen extends NexusGenTypes {}
}

export interface NexusGenInputs {
  createProductInput: { // input type
    categoryId: number; // Int!
    code: string; // String!
    count: number; // Int!
    end_price: number; // Float!
    name: string; // String!
    original_price: number; // Float!
    start_price: number; // Float!
  }
  createSoldProductInput: { // input type
    productId: number; // Int!
    quantity: number; // Int!
    salePrice: number; // Int!
  }
  deleteCategoryInput: { // input type
    id: number; // Int!
  }
  deleteProductInput: { // input type
    id: number; // Int!
  }
  fliterProductsInput: { // input type
    categoryId?: number | null; // Int
    count?: number | null; // Int
  }
  getOneProductInput: { // input type
    id: number; // Int!
  }
  inputObjectType: { // input type
    createdAt?: string | null; // String
  }
  newCategoryInput: { // input type
    name: string; // String!
  }
  sellProductInput: { // input type
    count: number; // Int!
    id: number; // Int!
  }
  updateProductInput: { // input type
    categoryId?: number | null; // Int
    code?: string | null; // String
    count?: number | null; // Int
    end_price?: number | null; // Float
    name?: string | null; // String
    original_price?: number | null; // Float
    start_price?: number | null; // Float
  }
  updateProductWhere: { // input type
    id: number; // Int!
  }
}

export interface NexusGenEnums {
}

export interface NexusGenScalars {
  String: string
  Int: number
  Float: number
  Boolean: boolean
  ID: string
}

export interface NexusGenObjects {
  Category: { // root type
    Product: NexusGenRootTypes['Product'][]; // [Product!]!
    id: number; // Int!
    name: string; // String!
  }
  Mutation: {};
  Product: { // root type
    category: NexusGenRootTypes['category']; // category!
    categoryId: number; // Int!
    code: string; // String!
    count: number; // Int!
    end_price: number; // Float!
    id: number; // Int!
    name: string; // String!
    original_price: number; // Float!
    start_price: number; // Float!
  }
  Query: {};
  category: { // root type
    Product: NexusGenRootTypes['Product'][]; // [Product!]!
    id: number; // Int!
    name: string; // String!
  }
  products: { // root type
    count: number; // Int!
    nodes: NexusGenRootTypes['Product'][]; // [Product!]!
  }
  soldProduct: { // root type
    createdAt: string; // String!
    id: number; // Int!
    product: NexusGenRootTypes['Product']; // Product!
    productId: number; // Int!
    quantity: number; // Int!
    salePrice: number; // Int!
  }
  soldProducts: { // root type
    nodes: NexusGenRootTypes['soldProduct'][]; // [soldProduct!]!
    total: number; // Int!
    totalOriginalPrice: number; // Int!
  }
  soldProductsCharts: { // root type
    soldProuctsCharts: NexusGenRootTypes['soldProductsChartsField'][]; // [soldProductsChartsField!]!
  }
  soldProductsChartsField: { // root type
    from: string; // String!
    to: string; // String!
    totalOriginalPrice: number; // Int!
    totalSaledPrice: number; // Int!
  }
}

export interface NexusGenInterfaces {
}

export interface NexusGenUnions {
}

export type NexusGenRootTypes = NexusGenObjects

export type NexusGenAllTypes = NexusGenRootTypes & NexusGenScalars

export interface NexusGenFieldTypes {
  Category: { // field return type
    Product: NexusGenRootTypes['Product'][]; // [Product!]!
    id: number; // Int!
    name: string; // String!
  }
  Mutation: { // field return type
    createCategory: NexusGenRootTypes['Category']; // Category!
    createProduct: NexusGenRootTypes['Product']; // Product!
    createSoldProduct: NexusGenRootTypes['soldProduct']; // soldProduct!
    deleteCategory: NexusGenRootTypes['Product']; // Product!
    deleteProduct: NexusGenRootTypes['Product']; // Product!
    sellProduct: NexusGenRootTypes['Product']; // Product!
    updateProduct: NexusGenRootTypes['Product']; // Product!
  }
  Product: { // field return type
    category: NexusGenRootTypes['category']; // category!
    categoryId: number; // Int!
    code: string; // String!
    count: number; // Int!
    end_price: number; // Float!
    id: number; // Int!
    name: string; // String!
    original_price: number; // Float!
    start_price: number; // Float!
  }
  Query: { // field return type
    categories: NexusGenRootTypes['Category'][]; // [Category!]!
    getOneProduct: NexusGenRootTypes['Product']; // Product!
    products: NexusGenRootTypes['products']; // products!
    soldProducts: NexusGenRootTypes['soldProducts']; // soldProducts!
    soldProductsCharts: NexusGenRootTypes['soldProductsCharts']; // soldProductsCharts!
  }
  category: { // field return type
    Product: NexusGenRootTypes['Product'][]; // [Product!]!
    id: number; // Int!
    name: string; // String!
  }
  products: { // field return type
    count: number; // Int!
    nodes: NexusGenRootTypes['Product'][]; // [Product!]!
  }
  soldProduct: { // field return type
    createdAt: string; // String!
    id: number; // Int!
    product: NexusGenRootTypes['Product']; // Product!
    productId: number; // Int!
    quantity: number; // Int!
    salePrice: number; // Int!
  }
  soldProducts: { // field return type
    nodes: NexusGenRootTypes['soldProduct'][]; // [soldProduct!]!
    total: number; // Int!
    totalOriginalPrice: number; // Int!
  }
  soldProductsCharts: { // field return type
    soldProuctsCharts: NexusGenRootTypes['soldProductsChartsField'][]; // [soldProductsChartsField!]!
  }
  soldProductsChartsField: { // field return type
    from: string; // String!
    to: string; // String!
    totalOriginalPrice: number; // Int!
    totalSaledPrice: number; // Int!
  }
}

export interface NexusGenFieldTypeNames {
  Category: { // field return type name
    Product: 'Product'
    id: 'Int'
    name: 'String'
  }
  Mutation: { // field return type name
    createCategory: 'Category'
    createProduct: 'Product'
    createSoldProduct: 'soldProduct'
    deleteCategory: 'Product'
    deleteProduct: 'Product'
    sellProduct: 'Product'
    updateProduct: 'Product'
  }
  Product: { // field return type name
    category: 'category'
    categoryId: 'Int'
    code: 'String'
    count: 'Int'
    end_price: 'Float'
    id: 'Int'
    name: 'String'
    original_price: 'Float'
    start_price: 'Float'
  }
  Query: { // field return type name
    categories: 'Category'
    getOneProduct: 'Product'
    products: 'products'
    soldProducts: 'soldProducts'
    soldProductsCharts: 'soldProductsCharts'
  }
  category: { // field return type name
    Product: 'Product'
    id: 'Int'
    name: 'String'
  }
  products: { // field return type name
    count: 'Int'
    nodes: 'Product'
  }
  soldProduct: { // field return type name
    createdAt: 'String'
    id: 'Int'
    product: 'Product'
    productId: 'Int'
    quantity: 'Int'
    salePrice: 'Int'
  }
  soldProducts: { // field return type name
    nodes: 'soldProduct'
    total: 'Int'
    totalOriginalPrice: 'Int'
  }
  soldProductsCharts: { // field return type name
    soldProuctsCharts: 'soldProductsChartsField'
  }
  soldProductsChartsField: { // field return type name
    from: 'String'
    to: 'String'
    totalOriginalPrice: 'Int'
    totalSaledPrice: 'Int'
  }
}

export interface NexusGenArgTypes {
  Mutation: {
    createCategory: { // args
      input: NexusGenInputs['newCategoryInput']; // newCategoryInput!
    }
    createProduct: { // args
      input: NexusGenInputs['createProductInput']; // createProductInput!
    }
    createSoldProduct: { // args
      input: NexusGenInputs['createSoldProductInput']; // createSoldProductInput!
    }
    deleteCategory: { // args
      input: NexusGenInputs['deleteCategoryInput']; // deleteCategoryInput!
    }
    deleteProduct: { // args
      input: NexusGenInputs['deleteProductInput']; // deleteProductInput!
    }
    sellProduct: { // args
      input: NexusGenInputs['sellProductInput']; // sellProductInput!
    }
    updateProduct: { // args
      input: NexusGenInputs['updateProductInput']; // updateProductInput!
      where: NexusGenInputs['updateProductWhere']; // updateProductWhere!
    }
  }
  Query: {
    getOneProduct: { // args
      where: NexusGenInputs['getOneProductInput']; // getOneProductInput!
    }
    products: { // args
      skip: number; // Int!
      take: number; // Int!
      where?: NexusGenInputs['fliterProductsInput'] | null; // fliterProductsInput
    }
    soldProducts: { // args
      input: NexusGenInputs['inputObjectType']; // inputObjectType!
    }
  }
}

export interface NexusGenAbstractTypeMembers {
}

export interface NexusGenTypeInterfaces {
}

export type NexusGenObjectNames = keyof NexusGenObjects;

export type NexusGenInputNames = keyof NexusGenInputs;

export type NexusGenEnumNames = never;

export type NexusGenInterfaceNames = never;

export type NexusGenScalarNames = keyof NexusGenScalars;

export type NexusGenUnionNames = never;

export type NexusGenObjectsUsingAbstractStrategyIsTypeOf = never;

export type NexusGenAbstractsUsingStrategyResolveType = never;

export type NexusGenFeaturesConfig = {
  abstractTypeStrategies: {
    isTypeOf: false
    resolveType: true
    __typename: false
  }
}

export interface NexusGenTypes {
  context: Context;
  inputTypes: NexusGenInputs;
  rootTypes: NexusGenRootTypes;
  inputTypeShapes: NexusGenInputs & NexusGenEnums & NexusGenScalars;
  argTypes: NexusGenArgTypes;
  fieldTypes: NexusGenFieldTypes;
  fieldTypeNames: NexusGenFieldTypeNames;
  allTypes: NexusGenAllTypes;
  typeInterfaces: NexusGenTypeInterfaces;
  objectNames: NexusGenObjectNames;
  inputNames: NexusGenInputNames;
  enumNames: NexusGenEnumNames;
  interfaceNames: NexusGenInterfaceNames;
  scalarNames: NexusGenScalarNames;
  unionNames: NexusGenUnionNames;
  allInputTypes: NexusGenTypes['inputNames'] | NexusGenTypes['enumNames'] | NexusGenTypes['scalarNames'];
  allOutputTypes: NexusGenTypes['objectNames'] | NexusGenTypes['enumNames'] | NexusGenTypes['unionNames'] | NexusGenTypes['interfaceNames'] | NexusGenTypes['scalarNames'];
  allNamedTypes: NexusGenTypes['allInputTypes'] | NexusGenTypes['allOutputTypes']
  abstractTypes: NexusGenTypes['interfaceNames'] | NexusGenTypes['unionNames'];
  abstractTypeMembers: NexusGenAbstractTypeMembers;
  objectsUsingAbstractStrategyIsTypeOf: NexusGenObjectsUsingAbstractStrategyIsTypeOf;
  abstractsUsingStrategyResolveType: NexusGenAbstractsUsingStrategyResolveType;
  features: NexusGenFeaturesConfig;
}


declare global {
  interface NexusGenPluginTypeConfig<TypeName extends string> {
  }
  interface NexusGenPluginInputTypeConfig<TypeName extends string> {
  }
  interface NexusGenPluginFieldConfig<TypeName extends string, FieldName extends string> {
  }
  interface NexusGenPluginInputFieldConfig<TypeName extends string, FieldName extends string> {
  }
  interface NexusGenPluginSchemaConfig {
  }
  interface NexusGenPluginArgConfig {
  }
}