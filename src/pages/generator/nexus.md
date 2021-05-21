import SEO from 'src/components/SEO';
import { Tabs, Tab } from '@paljs/ui';
import MdxCard from 'src/components/MdxCard';

<SEO title="Nexus Framework" />

<MdxCard>

## Nexus

Auto generate CRUD system from your `schema.prisma` file.

**CONTENT**

- [Example Usage](#example-usage)
- [Output](#output)
- [Add paljs plugin](#add-paljs-plugin)

</MdxCard>

<MdxCard>

## Example Usage

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
> prisma generate
> pal g
```

For more information about `pal g` command configurations [click here](/cli/generator)

## Output

**Each model will have folder contain 11 files:**

> NOTE: You can customize all this files and add your logic code inside it just `*/type.ts` will rewrite on it.

- User model
  - `User/mutations/createOne.ts`
  - `User/mutations/deleteOne.ts`
  - `User/mutations/updateOne.ts`
  - `User/mutations/upsertOne.ts`
  - `User/mutations/deleteMany.ts`
  - `User/mutations/updateMany.ts`
  - `User/queries/findCount.ts`
  - `User/queries/findCount.ts`
  - `User/queries/findMany.ts`
  - `User/queries/aggregate.ts`
  - `User/type.ts`
- Post model
  - `Post/mutations/createOne.ts`
  - `Post/mutations/deleteOne.ts`
  - `Post/mutations/updateOne.ts`
  - `Post/mutations/upsertOne.ts`
  - `Post/mutations/deleteMany.ts`
  - `Post/mutations/updateMany.ts`
  - `Post/queries/findCount.ts`
  - `Post/queries/findMany.ts`
  - `Post/queries/findUnique.ts`
  - `Post/queries/aggregate.ts`
  - `Post/type.ts`

To understand this code structure please look to [Nexus Docs](https://www.nexusjs.org)

`type.ts`

```ts
import { objectType } from 'nexus'

export const User = objectType({
  nonNullDefaults: {
    output: true,
    input: false,
  },
  name: 'User',
  definition(t) {
    t.int('id')
    t.field('createdAt', { type: 'DateTime' })
    t.string('email')
    t.nullable.string('name')
    t.field('role', { type: 'Role' })
    t.list.field('posts', {
      type: 'Post',
      args: {
        where: 'PostWhereInput',
        orderBy: 'PostOrderByInput',
        cursor: 'PostWhereUniqueInput',
        take: 'Int',
        skip: 'Int',
        distinct: 'PostScalarFieldEnum',
      },
      resolve(root: any) {
        return root.posts
      },
    })
  },
})
```

`queries`

<Tabs>
<Tab title="findUnique.ts">

```ts
import { queryField, nonNull } from 'nexus'

export const UserFindUniqueQuery = queryField('findUniqueUser', {
  type: 'User',
  args: {
    where: nonNull('UserWhereUniqueInput'),
  },
  resolve(_parent, { where }, { prisma, select }) {
    return prisma.user.findUnique({
      where,
      ...select,
    })
  },
})
```

</Tab>
<Tab title="findMany.ts">

```ts
import { queryField, nonNull, list } from 'nexus'

export const UserFindManyQuery = queryField('findManyUser', {
  type: nonNull(list(nonNull('User'))),
  args: {
    where: 'UserWhereInput',
    orderBy: list('UserOrderByInput'),
    cursor: 'UserWhereUniqueInput',
    distinct: 'UserScalarFieldEnum',
    skip: 'Int',
    take: 'Int',
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.user.findMany({
      ...args,
      ...select,
    })
  },
})
```

</Tab>
<Tab title="findCount.ts">

```ts
import { queryField, nonNull, list } from 'nexus'

export const UserFindCountQuery = queryField('findManyUserCount', {
  type: nonNull('Int'),
  args: {
    where: 'UserWhereInput',
    orderBy: list('UserOrderByInput'),
    cursor: 'UserWhereUniqueInput',
    distinct: 'UserScalarFieldEnum',
    skip: 'Int',
    take: 'Int',
  },
  resolve(_parent, args, { prisma }) {
    return prisma.user.count(args as any)
  },
})
```

</Tab>
<Tab title="aggregate.ts">

```ts
import { queryField, list } from 'nexus'

export const UserAggregateQuery = queryField('aggregateUser', {
  type: 'AggregateUser',
  args: {
    where: 'UserWhereInput',
    orderBy: list('UserOrderByInput'),
    cursor: 'UserWhereUniqueInput',
    distinct: 'UserScalarFieldEnum',
    skip: 'Int',
    take: 'Int',
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.user.aggregate({ ...args, ...select }) as any
  },
})
```

</Tab>
</Tabs>

`mutations`

<Tabs>
<Tab title="createOne.ts">

```ts
import { mutationField, nonNull } from 'nexus'

export const UserCreateOneMutation = mutationField('createOneUser', {
  type: nonNull('User'),
  args: {
    data: nonNull('UserCreateInput'),
  },
  resolve(_parent, { data }, { prisma, select }) {
    return prisma.user.create({
      data,
      ...select,
    })
  },
})
```

</Tab>
<Tab title="deleteOne.ts">

```ts
import { mutationField, nonNull } from 'nexus'

export const UserDeleteOneMutation = mutationField('deleteOneUser', {
  type: 'User',
  args: {
    where: nonNull('UserWhereUniqueInput'),
  },
  resolve: async (_parent, { where }, { prisma, select }) => {
    await prisma.onDelete({ model: 'User', where })
    return prisma.user.delete({
      where,
      ...select,
    })
  },
})
```

</Tab>
<Tab title="updateOne.ts">

```ts
import { mutationField, nonNull } from 'nexus'

export const UserUpdateOneMutation = mutationField('updateOneUser', {
  type: nonNull('User'),
  args: {
    where: nonNull('UserWhereUniqueInput'),
    data: nonNull('UserUpdateInput'),
  },
  resolve(_parent, { data, where }, { prisma, select }) {
    return prisma.user.update({
      where,
      data,
      ...select,
    })
  },
})
```

</Tab>
<Tab title="upsertOne.ts">

```ts
import { mutationField, nonNull } from 'nexus'

export const UserUpsertOneMutation = mutationField('upsertOneUser', {
  type: nonNull('User'),
  args: {
    where: nonNull('UserWhereUniqueInput'),
    create: nonNull('UserCreateInput'),
    update: nonNull('UserUpdateInput'),
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.user.upsert({
      ...args,
      ...select,
    })
  },
})
```

</Tab>
<Tab title="deleteMany.ts">

```ts
import { mutationField, nonNull } from 'nexus'

export const UserDeleteManyMutation = mutationField('deleteManyUser', {
  type: nonNull('BatchPayload'),
  args: {
    where: 'UserWhereInput',
  },
  resolve: async (_parent, { where }, { prisma }) => {
    await prisma.onDelete({ model: 'User', where })
    return prisma.user.deleteMany({ where } as any)
  },
})
```

</Tab>
<Tab title="updateMany.ts">

```ts
import { mutationField, nonNull } from 'nexus'

export const UserUpdateManyMutation = mutationField('updateManyUser', {
  type: nonNull('BatchPayload'),
  args: {
    where: 'UserWhereInput',
    data: nonNull('UserUpdateManyMutationInput'),
  },
  resolve(_parent, args, { prisma }) {
    return prisma.user.updateMany(args as any)
  },
})
```

</Tab>
</Tabs>

</MdxCard>

<MdxCard>

## Add paljs plugin

This plugin adds three parts

- [PrismaSelect](/plugins/select) plugin to convert `info: GraphQLResolveInfo` to select object accepted by `prisma client` and add to `context`
- Admin settings queries and mutations `getSchema`, `updateField`, `updateModel`
- All models inputs type
  - `UserWhereInput`
  - `UserWhereUniqueInput`
  - `UserOrderByInput`
  - `UserCreateInput`
  - `UserUpdateInput`
  - `UserUpdateManyMutationInput`

**for include admin settings queries you need to pass in plugin settings**

```ts
paljs({
  excludeFields: ['password'],
  filterInputs: (input) => input.fields.filter((field) => field.name !== 'passowrd'),
});

type options = {
  // this options will pass to PrismaSelect class as second arg. https://paljs.com/plugins/select#constructor
  prismaSelectOptions?: {
    defaultFields?: {
      [key: string]:
              | { [key: string]: boolean }
              | ((select: any) => { [key: string]: boolean });
    };
    dmmf?: DMMF.Document[];
  };
  // by default adminSchemaPath is `adminSettings.json` you can change it
  adminSchemaPath?: string;
  // include Prisma Admin schema query and mutations
  includeAdmin?: boolean;
  // send custom dmmf if you have custom generated client path for generate input types
  dmmf?: DMMF.Document[];
  // take an array of field names to exclude from any input type
  excludeFields?: string[];
  // take a function and the input object as arg and return array of fields you want to generate
  filterInputs?: (input: DMMF.InputType) => DMMF.SchemaArg[];
  // by default when we create update inputs you will set data like {username: {set: "Ahmed"}} by making this option true you will be able to use it like {username: "Ahmed"} without set.
  // but you will also lose these options for number fields
  // increment: x: Adds x to the current value
  // decrement: x: Subtracts x from the current value
  // multiply: x: Multiplies the current value by x
  // divide: x: Divides the current value by x
  // set: x: Sets the value to x (equivalent to data: { age: 18 })
  doNotUseFieldUpdateOperationsInput?: boolean;
}
```

### Install

[![Version](https://img.shields.io/npm/v/@paljs/nexus.svg)](https://npmjs.org/package/@paljs/nexus)
[![Downloads/week](https://img.shields.io/npm/dt/@paljs/nexus.svg)](https://npmjs.org/package/@paljs/nexus)
[![License](https://img.shields.io/npm/l/@paljs/nexus.svg)](https://paljs.com/)

```shell
yarn add @paljs/nexus
or
npm i @paljs/nexus
```

```ts
import { makeSchema } from '@nexus/schema';
import * as types from './graphql';
import { paljs } from '@paljs/nexus';

export const schema = makeSchema({
  types,
  plugins: [paljs()],
  outputs: {
    schema: __dirname + '/generated/schema.graphql',
    typegen: __dirname + '/generated/nexus.ts',
  },
  typegenAutoConfig: {
    sources: [
      {
        source: '@prisma/client',
        alias: 'prisma',
      },
      {
        source: require.resolve('./context'),
        alias: 'Context',
      },
    ],
    contextType: 'Context.Context',
  },
});
```

#### Use

```ts
import { queryField, nonNull } from 'nexus'

export const UserFindUniqueQuery = queryField('findUniqueUser', {
  type: 'User',
  args: {
    where: nonNull('UserWhereUniqueInput'),
  },
  resolve(_parent, { where }, { prisma, select }) {
    return prisma.user.findUnique({
      where,
      ...select,
    })
  },
})
```

</MdxCard>
