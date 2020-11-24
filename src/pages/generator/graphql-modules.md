import SEO from 'src/components/SEO';
import { Tabs, Tab } from '@paljs/ui';
import MdxCard from 'src/components/MdxCard';

<SEO title="Graphql Modules" />

<MdxCard>

**CONTENT**

- [Features](#features)
- [Example Usage](#example-usage)
  - [Merge all modules](#merge-all-modules)
  - [cretae `inputs.module.ts`](##create-inputsmodulets)
  - [create `Prisma.provider.ts`](#create-prismaproviderts)
  - [Add select object to args](#add-select-object-to-args)
  - [GraphQL SDL inputs](/plugins/sdl-inputs)

</MdxCard>

<MdxCard>

## Features

Auto generate CRUD system from your `schema.prisma` file.
**Every model will have folder contain 3 files**

- **_X.module.ts_** contain `GraphQLModule` for this model.
- **_typeDefs.ts_** contain graphql types for this model.
- **_resolvers.ts_** contain 3 queries and 6 mutations:
  - `findUnique`
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
    createdAt: DateTime!
    email: String!
    name: String
    password: String!
  }

  type Query {
    findUniqueUser(where: UserWhereUniqueInput!): User
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
import { PrismaProvider } from '../Prisma.provider';

export default {
  Query: {
    findUniqueUser: (_parent, args, { injector }: GraphQLModules.Context) => {
      return injector.get(PrismaProvider).user.findUnique(args);
    },
    findFirstUser: (_parent, args, { injector }: GraphQLModules.Context) => {
      return injector.get(PrismaProvider).user.findFirst(args);
    },
    findManyUser: (_parent, args, { injector }: GraphQLModules.Context) => {
      return injector.get(PrismaProvider).user.findMany(args);
    },
    findManyUserCount: (_parent, args, { injector }: GraphQLModules.Context) => {
      return injector.get(PrismaProvider).user.count(args);
    },
    aggregateUser: (_parent, args, { injector }: GraphQLModules.Context) => {
      return injector.get(PrismaProvider).user.aggregate(args);
    },
  },
  Mutation: {
    createOneUser: (_parent, args, { injector }: GraphQLModules.Context) => {
      return injector.get(PrismaProvider).user.create(args);
    },
    updateOneUser: (_parent, args, { injector }: GraphQLModules.Context) => {
      return injector.get(PrismaProvider).user.update(args);
    },
    deleteOneUser: async (_parent, args, { injector }: GraphQLModules.Context) => {
      await injector.get(PrismaProvider).onDelete({ model: 'User', where: args.where });
      return injector.get(PrismaProvider).user.delete(args);
    },
    upsertOneUser: async (_parent, args, { injector }: GraphQLModules.Context) => {
      return injector.get(PrismaProvider).user.upsert(args);
    },
    deleteManyUser: async (_parent, args, { injector }: GraphQLModules.Context) => {
      await injector.get(PrismaProvider).onDelete({ model: 'User', where: args.where });
      return injector.get(PrismaProvider).user.deleteMany(args);
    },
    updateManyUser: (_parent, args, { injector }: GraphQLModules.Context) => {
      return injector.get(PrismaProvider).user.updateMany(args);
    },
  },
};
```

</Tab>
<Tab title="User.module.ts">

```ts
import { createModule } from 'graphql-modules';
import typeDefs from './typeDefs';
import resolvers from './resolvers';

export const UserModule = createModule({
  id: 'User',
  typeDefs,
  resolvers,
});
```

</Tab>
</Tabs>

### Merge all modules

`src/app/application.ts`

```ts
import { createApplication } from 'graphql-modules';
import { InputsModule } from './inputs/inputs.module';
import { CommonModule } from './common/common.module';
import { addSelect } from './addSelect';
import { PrismaProvider } from './Prisma.provider';

export const application = createApplication({
  modules: [InputsModule, CommonModule],
  providers: [PrismaProvider],
  middlewares: {
    '*': { '*': [addSelect] },
  },
});
```

### create `inputs.module.ts`

Create the inputs module to share will all modules to use Prisma and inputs

`src/app/inputs/inputs.module.ts`

```ts{2,6}
import { createModule } from 'graphql-modules';
import { sdlInputs } from '@paljs/plugins';

export const InputsModule = createModule({
  id: 'Inputs',
  typeDefs: sdlInputs(),
});
```

### create `Prisma.provider.ts`

create Prisma instance and add onDelete plugin to it

`src/app/Prisma.provider.ts`

```ts
import { PrismaDelete, onDeleteArgs } from '@paljs/plugins';
import { Injectable, OnDestroy } from 'graphql-modules';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaProvider extends PrismaClient implements OnDestroy {
  constructor() {
    super();
    this.$connect();
  }
  onDestroy(): void {
    this.$disconnect();
  }

  async onDelete(args: onDeleteArgs) {
    const prismaDelete = new PrismaDelete(this);
    await prismaDelete.onDelete(args);
  }
}
```

## Add select object to args

It's a small tool to convert `info: GraphQLResolveInfo` to select object accepted by `prisma client` this will give you the best performance because you will just query exactly what you want

This middleware is take `info` and convert it to Prisma select object and add to resolve args

`src/app/addSelect.ts`

```ts
import { PrismaSelect } from '@paljs/plugins';

export const addSelect = (context, next) => {
  const result = new PrismaSelect(context.info).value;
  if (!result.select || Object.keys(result.select).length > 0) {
    context.args = {
      ...context.args,
      ...result,
    };
  }
  return next();
};
```

</MdxCard>
