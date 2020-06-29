import SEO from 'src/components/SEO';
import MdxCard from 'src/components/MdxCard';

<SEO title="On Delete" />

<MdxCard>

## Introduction

Prisma Delete is a plugin built for making delete operations in prisma [Prisma](https://prisma.io). Its a feature that utilizes the
comments area in prisma.schema to annotate delete side effects on relations. This is a necessary feature as the official
Prisma Migrate Cli has not released a standardized way to resolve `Relation onDelete`. 

P.S. Prisma Delete uses Pal.js's `Schema` cli to generate a schema file for reference in our code in the server side to check for the types.
The schema file will reside one level above the graphql models generated from the server side code. For example, when you have your models
generated in the /api/graphql, a schema will be generated in the /api directory.


**CONTENT**

- [Introduction](#introduction)
- [Install](#install)
- [Example](#example)
  - [`schema.prisma`](#schemaprisma)
  - [Use](#use)
- [`PrismaDelete` class](#prismadelete-class)
- [Add to Context](#add-to-context)
- [Have questions?](#have-questions)

</MdxCard>

<MdxCard>

## Install

```shell
npm i @paljs/plugins
```

</MdxCard>

<MdxCard>

## Example

Checkout the example [`pal create`](/cli/create) to fast start your next (prisma , nexus , typescript) project

In our prisma.schema, we can set the values from the options below to specify the deletion behavior. In case a node with related nodes gets deleted, the deletion behavior determines what should happen to the related nodes. The input values for this argument are defined as an enum with the following possible values:

- `SET_NULL`: Set the related node(s) to `null`.
- `CASCADE`: Delete the related node(s). Note that is not possible to set both ends of a bidirectional relation to `CASCADE`.

To add onDelete Relation to any field, just add the annotation one line above the field inside `prisma.schema` comment area
`// @onDelete(CASCADE)` or `// @onDelete(SET_NULL)`

### `schema.prisma`

```prisma
datasource db {
  provider = "sqlite"
  url      = env("DATABASE_URL")
}

generator client {
  provider = "prisma-client-js"
}

model User {
  id        Int       @default(autoincrement()) @id
  createdAt DateTime  @default(now())
  email     String    @unique
  name      String?
  password  String
  // @onDelete(CASCADE)
  posts     Post[]
  group     Group?    @relation(fields: [groupId], references: [id])
  groupId   Int?
  // @onDelete(SET_NULL)
  comments  Comment[]
}

model Post {
  id        Int       @default(autoincrement()) @id
  published Boolean   @default(false)
  title     String
  author    User?     @relation(fields: [authorId], references: [id])
  authorId  Int?
  // @onDelete(CASCADE)
  comments  Comment[]
  createdAt DateTime  @default(now())
  updatedAt DateTime  @updatedAt
}

model Comment {
  id        Int      @default(autoincrement()) @id
  contain   String
  post      Post     @relation(fields: [postId], references: [id])
  postId    Int
  author    User?    @relation(fields: [authorId], references: [id])
  authorId  Int?
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}

model Group {
  id        Int      @default(autoincrement()) @id
  name      String
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  // @onDelete(SET_NULL)
  users     User[]
}
```

- When a `User` record gets deleted, all the related `posts` records from the user will be deleted, and all the related `author` field in `comments` record will be set a Null.
- When a `Post` record gets deleted, all the related `posts` and `comments` records under user will be deleted.

### How it works

When we make a deletion on the `user` model. The code will go through the `schema` file that was generated alongside when using Prisma Delete, and check for the annotations
of // OnDelete(VALUE) that was set on the schema.

```ts
import {PrismaDelete} from '@paljs/plugins';
import { schema } from '../prisma/schema';

t.field('deleteOneUser', {
  type: 'User',
  nullable: true,
  args: {
    where: arg({
      type: 'UserWhereUniqueInput',
      nullable: false,
    }),
  },
  resolve(_, { where }, { prisma, select }) {
    const prismaDelete = new PrismaDelete(prisma, schema);
    await prismaDelete.onDelete({ model: 'User', where });
    return prisma.user.delete({
      where,
      ...select,
    });
  },
});

// normal resolver
const resolvers = {
  Query: {
    deleteOneUser(_parent, { where }, { prisma }) {
      const prismaDelete = new PrismaDelete(prisma, schema);
      await prismaDelete.onDelete({ model: 'User', where });
      return prisma.user.delete({
        where,
        ...select,
      });
    },
  },
};
```

</MdxCard>

<MdxCard>

## `PrismaDelete` class

- `prisma` prisma client class
- `schema` schema as object converted by our [schema cli](/schema#convert-to-file).

`prismaDelete.onDelete` accept object

- `model` model name that was defined in `schema.prisma`
- `where` query object to retrive the result `{ id: 1}`
- `deleteParent` A flag to determine whether the model should be deleted and returned when its defined as `true`

```ts
await prismaDelete.onDelete({ model: 'User', where, deleteParent: true });
```

## Add to Context

```ts
import { PrismaClient, PrismaClientOptions } from '@prisma/client';
import { PrismaDelete, onDeleteArgs } from '@paljs/plugins';
import { schema } from './schema';

class Prisma extends PrismaClient {
  constructor(options?: PrismaClientOptions) {
    super(options);
  }

  async onDelete(args: onDeleteArgs) {
    const prismaDelete = new PrismaDelete(this, schema);
    await prismaDelete.onDelete(args);
  }
}

const prisma = new Prisma();

export interface Context {
  prisma: Prisma;
}

export function createContext(): Context {
  return {
    prisma,
  };
}
```

The above code below is how it should be used in resolvers. This part of code could also be auto generated
from Pal.js's server models.

```ts
resolve(_, { where }, { prisma }) {
  await prisma.onDelete({ model: 'User', where, deleteParent: true });
}
```

</MdxCard>
