import SEO from 'src/components/SEO';
import { Tabs, Tab } from '@paljs/ui';
import MdxCard from 'src/components/MdxCard';

<SEO title="Nexus prisma plugin generate types" />

<MdxCard>

## Nexus prisma plugin generate types

This is Cli tool to Create CRUD system for [Nexus Prisma plugin](https://nexusjs.org/docs/pluginss/prisma/overview) from your `schema.prisma` file

**_CONTENT_**

- [Install](#install)
- [Configurations](#configurations)
- [OutPut](#output)

</MdxCard>

<MdxCard>

## Install

```shell
yarn global add @paljs/cli
//or
npm install -g @paljs/cli
```

### Configurations

Create new file with `pal.js` name and add this content:

```js
module.exports = {
  backend: {
    generator: 'nexus-plugin-prisma',
  },
};
```

[Here is all options in `pal.js` file ](/cli/generator#config-file)

</MdxCard>

<MdxCard>

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
  birthDate DateTime
  posts     Post[]
}

model Post {
  id     String @id @default(cuid())
  author User[]
}
```

For generate all types you need to run `pal g` command for all options [click here](/cli/generator)

```shell
pal g
```

### OutPut

```ts
// User model
import { objectType, arg, extendType } from '@nexus/schema';

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
    t.field('findFirstUser', {
      type: 'User',
      args: {
        where: 'UserWhereInput',
        orderBy: arg({ type: 'UserOrderByInput', list: true }),
        cursor: 'UserWhereUniqueInput',
        skip: 'Int',
        take: 'Int',
      },
      async resolve(_root, args, ctx) {
        return ctx.prisma.user.findFirst(args);
      },
    });
    t.crud.users({ filtering: true, ordering: true });
    t.field('usersCount', {
      type: 'Int',
      args: {
        where: 'UserWhereInput',
      },
      async resolve(_root, args, ctx) {
        return ctx.prisma.user.count(args);
      },
    });
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
