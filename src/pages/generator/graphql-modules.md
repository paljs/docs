import SEO from 'src/components/SEO';
import { Tabs, Tab } from '@paljs/ui';
import MdxCard from 'src/components/MdxCard';

<SEO title="Graphql Modules" />

<MdxCard>

**CONTENT**

- [Features](#features)
- [Example Usage](#example-usage)
  - [Merge all modules](#merge-all-modules)
  - [cretae `common.module.ts`](##create-commonmodulets)
  - [create `Prisma.provider.ts`](#create-prismaproviderts)
  - [Add select object to args](#add-select-object-to-args)

</MdxCard>

<MdxCard>

## Features

Auto generate CRUD system from your `schema.prisma` file.
**Every model will have folder contain 3 files**

- **_X.module.ts_** contain `GraphQLModule` for this model.
- **_typeDefs.ts_** contain graphql types for this model.
- **_resolvers.ts_** contain 3 queries and 6 mutations:
  - `findOne`
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
- auto generate your crud system for more information about `pal g` command configurations  [click here](/cli/generator) 

#### Output For User Model

<Tabs>
<Tab title="typeDefs.ts">

```ts
import gql from 'graphql-tag';

export default gql`
  type User {
    id: Int!
    createdAt: DateTime!
    email: String!
    name: String
    password: String!
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
    upsertOneUser(where: UserWhereUniqueInput!, create: UserCreateInput!, update: UserUpdateInput!): User
    deleteManyUser(where: UserWhereInput): BatchPayload
    updateManyUser(where: UserWhereInput, data: UserUpdateManyMutationInput): BatchPayload
  }
`;
```

</Tab>
<Tab title="resolvers.ts">

```ts
import { ModuleContext } from '@graphql-modules/core';
import { PrismaProvider } from '../common/Prisma.provider';

export default {
  Query: {
    findOneUser: (_parent, args, { injector }: ModuleContext) => {
      return injector.get(PrismaProvider).user.findOne(args);
    },
    findManyUser: (_parent, args, { injector }: ModuleContext) => {
      return injector.get(PrismaProvider).user.findMany(args);
    },
    findManyUserCount: (_parent, args, { injector }: ModuleContext) => {
      return injector.get(PrismaProvider).user.count(args);
    },
  },
  Mutation: {
    createOneUser: (_parent, args, { injector }: ModuleContext) => {
      return injector.get(PrismaProvider).user.create(args);
    },
    updateOneUser: (_parent, args, { injector }: ModuleContext) => {
      return injector.get(PrismaProvider).user.update(args);
    },
    deleteOneUser: async (_parent, args, { injector }: ModuleContext) => {
      await injector.get(PrismaProvider).onDelete('User', args.where, false);
      return injector.get(PrismaProvider).user.delete(args);
    },
    upsertOneUser: async (_parent, args, { injector }: ModuleContext) => {
      return injector.get(PrismaProvider).user.upsert(args);
    },
    deleteManyUser: async (_parent, args, { injector }: ModuleContext) => {
      await injector.get(PrismaProvider).onDelete('User', args.where, false);
      return injector.get(PrismaProvider).user.deleteMany(args);
    },
    updateManyUser: (_parent, args, { injector }: ModuleContext) => {
      return injector.get(PrismaProvider).user.updateMany(args);
    },
  },
};
```

</Tab>
<Tab title="User.module.ts">

```ts
import { GraphQLModule } from '@graphql-modules/core';
import typeDefs from './typeDefs';
import resolvers from './resolvers';
import { addSelect } from '../common/addSelect';
import { CommonModule } from '../common/common.module';

export const UserModule = new GraphQLModule({
  name: 'User',
  typeDefs,
  resolvers,
  imports: [CommonModule],
  resolversComposition: {
    Query: [addSelect],
    Mutation: [addSelect],
  },
});
```

</Tab>
</Tabs>

### Merge all modules

`app/app.module.ts`

```ts
import { GraphQLModule } from '@graphql-modules/core';
import { CommonModule } from './common/common.module';
import { PostModule } from './Post/post.module';
import { UserModule } from './User/user.module';

export const AppModule = new GraphQLModule({
  imports: [CommonModule, UserModule, PostModule],
});
```

### create `common.module.ts`

Create the common module to share will all modules to use Prisma and inputs

`src/app/common/common.module.ts`

```ts{3,6}
import { GraphQLModule } from '@graphql-modules/core';
import { PrismaProvider } from './Prisma.provider';
import { sdlInputs } from '@paljs/plugins';

export const CommonModule = new GraphQLModule({
  typeDefs: sdlInputs,
  providers: [PrismaProvider],
});
```

### create `Prisma.provider.ts`

create Prisma instance and add onDelete plugin to it

`src/app/common/Prisma.provider.ts`

```ts
import { PrismaDelete, onDeleteArgs } from '@paljs/plugins';
import { OnRequest, OnResponse } from '@graphql-modules/core';
import { PrismaClient } from '@prisma/client';
import { Injectable } from '@graphql-modules/di';
import { schema } from '../../schema';

@Injectable()
export class PrismaProvider extends PrismaClient implements OnRequest, OnResponse {
  constructor() {
    super();
  }
  onRequest() {
    this.connect();
  }
  onResponse() {
    this.disconnect();
  }

  async onDelete(args: onDeleteArgs) {
    const prismaDelete = new PrismaDelete(this, schema);
    await prismaDelete.onDelete(args);
  }
}
```

## Add select object to args

It's a small tool to convert `info: GraphQLResolveInfo` to select object accepted by `prisma client` this will give you the best performance because you will just query exactly what you want

This middleware is take `info` and convert it to Prisma select object and add to resolve args

`src/app/common/addSelect.ts`

```ts
import { PrismaSelect } from '@paljs/plugins';

export const addSelect = (next) => async (root, args, context, info) => {
  const result = new PrismaSelect(info).value;
  if (Object.keys(result.select).length > 0) {
    args = {
      ...args,
      ...result,
    };
  }
  return next(root, args, context, info);
};
```

</MdxCard>
