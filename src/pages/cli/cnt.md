import SEO from 'src/components/SEO';
import { Tabs, Tab } from '@paljs/ui';
import MdxCard from 'src/components/MdxCard';

<SEO title="Nexus prisma plugin generate types" />

<MdxCard>

## Nexus prisma plugin generate types

This is Cli tool to Create CRUD system for [Nexus Prisma plugin](https://www.nexusjs.org/#/plugins/prisma) from your `schema.prisma` file

**_CONTENT_**

- [Install](#install)
- [Command options for `cnt`](#command-options-for-cnt)
- [Nexus Example](#nexus-example)
  - [OutPut](#output)
- [Create TypeScript types](#create-typescript-types)
  - [Example](#example)
  - [OutPut](#output-1)

</MdxCard>

<MdxCard>

## Install

[![Version](https://img.shields.io/npm/v/create-nexus-type.svg)](https://npmjs.org/package/create-nexus-type)
[![Downloads/week](https://img.shields.io/npm/dw/create-nexus-type.svg)](https://npmjs.org/package/create-nexus-type)
[![License](https://img.shields.io/npm/l/create-nexus-type.svg)](https://paljs.com/)

```shell
yarn add -D create-nexus-type
or
npm i create-nexus-type --save-dev
```

### Command options for `cnt`

```
  --schema To add schema file path if you not run command in root of project
  --outDir Created files output dir default src/types
  -mq      add this option to create Queries and Mutations for models
  -m       add this option to create Mutations
  -q       add this option to create Queries
  -f       add this option to add {filtering: true} option to Queries
  -o       add this option to add {ordering: true} option to Queries
  --js     create javascript version
  --mjs    create es modules version
```

</MdxCard>

<MdxCard>

### Nexus Example

```prisma
// schema.prisma

datasource postgresql {
  url      = env("DATABASE_URL")
  provider = "postgresql"
}

generator client {
  provider = "prisma-client-js"
}

model User {
  id        String   @id @default(cuid())
  email     String   @unique
  birthDate DateTime
  posts     Post[]
}

model Post {
  id     String @id @default(cuid())
  author User[]
}
```

run

```shell
npx cnt --mq -f -o
```

### OutPut

```ts
import { objectType, extendType } from '@nexus/schema';

export const User = objectType({
  name: 'User',
  definition(t) {
    t.model.id();
    t.model.email();
    t.model.birthDate();
    t.model.posts();
  },
});

export const userQuery = extendType({
  type: 'Query',
  definition(t) {
    t.crud.user();
    t.crud.users({ filtering: true, ordering: true });
  },
});

export const userMutation = extendType({
  type: 'Mutation',
  definition(t) {
    t.crud.createOneUser();
    t.crud.updateOneUser();
    t.crud.upsertOneUser();
    t.crud.deleteOneUser();

    t.crud.updateManyUser();
    t.crud.deleteManyUser();
  },
});
```

</MdxCard>

<MdxCard>

## Create TypeScript types

And have another option to create TypeScript types to use for your work

### Command options for `create-types`

```
  usage: create-types (Create TypeScript types from Prisma schema)
  --schema To add schema file path if you not run command in root of project
  --outDir Created files output dir default src/generated
```

### Example

```prisma
// schema.prisma

datasource postgresql {
  url      = env("DATABASE_URL")
  provider = "postgresql"
}

generator client {
  provider = "prisma-client-js"
}

model User {
  id        String   @id @default(cuid())
  email     String   @unique
  birthDate DateTime?
  role      UserRole
  posts     Post[]
}

model Post {
  id     String @id @default(cuid())
  author User[]
}

enum UserRole {
  USER
  ADMIN
}
```

run

```shell
npx create-types
```

### OutPut

```ts
// types.ts
export interface User {
  id: string;
  email: string;
  birthDate: Date | null;
  role: UserRole;
  posts: Post[];
}

export interface Post {
  id: string;
  author: User[];
}

enum UserRole {
  USER = 'USER',
  ADMIN = 'ADMIN',
}
```

</MdxCard>
