import SEO from 'src/components/SEO';
import { Tabs, Tab } from '@paljs/ui';
import MdxCard from 'src/components/MdxCard';

<SEO title="SDL first" />

<MdxCard>

**CONTENT**

- [Features](#features)
- [Example Usage](#example-usage)
- [Add select function](#add-select-function)
- [GraphQL SDL inputs](/plugins/sdl-inputs)

</MdxCard>

<MdxCard>

## Features

- Auto generate CRUD system from your `schema.prisma` file.

**Every model will have folder contain 2 files**

- **_typeDefs.ts_** contain graphql types for this model
- **_resolvers.ts_** contain 3 queries and 6 mutations:
  - `findOne`
  - `findFirst`
  - `findMany`
  - `findCount`
  - `aggregate`
  - `createOne`
  - `updateOne`
  - `upsertOne`
  - `deleteOne`
  - `updateMany`
  - `deleteMany`

</MdxCard>

<MdxCard>

### Example Usage

For more information about Prisma look at they [Docs](https://www.prisma.io/docs)

`schema.prisma`

```prisma
datasource postgresql {
  url      = env("DATABASE_URL")
  provider = "postgresql"
}
generator client {
  provider = "prisma-client-js"
}
model User {
  id        Int      @id @default(autoincrement())
  createdAt DateTime @default(now())
  email     String   @unique
  name      String?
  role      Role     @default(USER)
  posts     Post[]
}
model Post {
  id         Int        @id @default(autoincrement())
  createdAt  DateTime   @default(now())
  updatedAt  DateTime   @updatedAt
  published  Boolean    @default(false)
  title      String
  author     User?      @relation(fields:  [authorId], references: [id])
  authorId   Int?
}
enum Role {
  USER
  ADMIN
}
```

After build your `schema.prisma` file all you need to run

```shell
prisma generate
pal g
```

- build prisma client
- auto generate your crud system for more information about `pal g` command configurations [click here](/cli/generator)

#### Output For User Model

<Tabs>
<Tab title="typeDefs.ts">

```ts
import gql from 'graphql-tag';

export default gql`
  type User {
    id: Int!
    email: String!
    name: String
    role: Role!
    createdAt: DateTime!
    posts(
      where: PostWhereInput
      orderBy: PostOrderByInput
      cursor: PostWhereUniqueInput
      take: Int
      skip: Int
    ): [Post!]!
  }

  type Query {
    findOneUser(where: UserWhereUniqueInput!): User
    findManyUser(
      where: UserWhereInput
      orderBy: UserOrderByInput
      cursor: UserWhereUniqueInput
      skip: Int
      take: Int
    ): [User!]
    findManyUserCount(
      where: UserWhereInput
      orderBy: UserOrderByInput
      cursor: UserWhereUniqueInput
      skip: Int
      take: Int
    ): Int!
  }
  type Mutation {
    createOneUser(data: UserCreateInput!): User!
    updateOneUser(where: UserWhereUniqueInput!, data: UserUpdateInput!): User!
    deleteOneUser(where: UserWhereUniqueInput!): User
    deleteManyUser(where: UserWhereInput): BatchPayload
    updateManyUser(where: UserWhereInput, data: UserUpdateManyMutationInput): BatchPayload
  }
`;
```

</Tab>
<Tab title="resolvers.ts">

```ts
import { Resolvers } from '../../resolversTypes';

const resolvers: Resolvers = {
  Query: {
    findOneUser: (_parent, args, { prisma }) => {
      return prisma.user.findOne(args);
    },
    findFirstUser: (_parent, args, { prisma }) => {
      return prisma.user.findFirst(args);
    },
    findManyUser: (_parent, args, { prisma }) => {
      return prisma.user.findMany(args);
    },
    findManyUserCount: (_parent, args, { prisma }) => {
      return prisma.user.count(args);
    },
    aggregateUser: (_parent, args, { prisma }) => {
      return prisma.user.aggregate(args);
    },
  },
  Mutation: {
    createOneUser: (_parent, args, { prisma }) => {
      return prisma.user.create(args);
    },
    updateOneUser: (_parent, args, { prisma }) => {
      return prisma.user.update(args);
    },
    deleteOneUser: async (_parent, args, { prisma }) => {
      await prisma.onDelete({ model: 'User', where: args.where });
      return prisma.user.delete(args);
    },
    upsertOneUser: async (_parent, args, { prisma }) => {
      return prisma.user.upsert(args);
    },
    deleteManyUser: async (_parent, args, { prisma }) => {
      await prisma.onDelete({ model: 'User', where: args.where });
      return prisma.user.deleteMany(args);
    },
    updateManyUser: (_parent, args, { prisma }) => {
      return prisma.user.updateMany(args);
    },
  },
};
export default resolvers;
```

</Tab>
</Tabs>

## Add select function

It's a small tool to convert `info: GraphQLResolveInfo` to select object accepted by `prisma client` this will give you the best performance because you will just query exactly what you want

This middleware is take `info` and convert it to Prisma select object and add to resolve args

`server.ts`

```ts
import { ApolloServer } from 'apollo-server';
import { applyMiddleware } from 'graphql-middleware';
import { makeExecutableSchema } from 'graphql-tools';
import { createContext, Context } from './context';
import typeDefs from './graphql/typeDefs';
import resolvers from './graphql/resolvers';
import { GraphQLResolveInfo } from 'graphql';
import { generateGraphQlSDLFile, PrismaSelect } from '@paljs/plugins';

let schema = makeExecutableSchema({ typeDefs, resolvers });

// Build one sdl file have all types you can delete if you not need
generateGraphQlSDLFile(schema);

const middleware = async (resolve, root, args, context: Context, info: GraphQLResolveInfo) => {
  const result = new PrismaSelect(info).value;
  if (Object.keys(result.select).length > 0) {
    args = {
      ...args,
      ...result,
    };
  }
  return resolve(root, args, context, info);
};

schema = applyMiddleware(schema, middleware);

const server = new ApolloServer({
  schema,
  context: createContext,
});

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
```

</MdxCard>
