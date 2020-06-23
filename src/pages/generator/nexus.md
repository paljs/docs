import SEO from 'src/components/SEO';
import { Tabs, Tab } from '@paljs/ui';
import MdxCard from 'src/components/MdxCard';

<SEO title="Nexus Framework" />

<MdxCard>

## Nexus

Auto generate CRUD system from your `schema.prisma` file. 
  
**CONTENT**

- [Example Usage](#example-usage)
- [nexus output](#nexus-generator-output-code)
- [nexus schema output](#nexus-schema-generator-output-code)
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

## Output

**Every model will have folder contain 10 files:**

>NOTE: You can customize all this files and add your logic code inside it just `*/type.ts` will rewrite on it.

- User model
  - `User/mutations/createOne.ts`
  - `User/mutations/deleteOne.ts`
  - `User/mutations/updateOne.ts`
  - `User/mutations/upsertOne.ts`
  - `User/mutations/deleteMany.ts`
  - `User/mutations/updateMany.ts`
  - `User/queries/findCount.ts`
  - `User/queries/findMany.ts`
  - `User/queries/findOne.ts`
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
  - `Post/queries/findOne.ts`
  - `Post/type.ts`


</MdxCard>

<MdxCard>

## `nexus` generator output code

To understand this code structure please look to [Nexus Docs](https://www.nexusjs.org/#/guides/schema?id=schema)

`type.ts`

```ts
import { schema } from 'nexus';

schema.objectType({
  name: 'User',
  definition(t) {
    t.int('id', { nullable: false });
    t.string('email', { nullable: false });
    t.string('name', { nullable: true });
    t.field('posts', {
      nullable: false,
      list: [true],
      type: 'Post',
      args: {
        where: 'PostWhereInput',
        orderBy: 'PostOrderByInput',
        cursor: 'PostWhereUniqueInput',
        take: 'Int',
        skip: 'Int',
      },
      resolve(parent: any) {
        return parent['posts'];
      },
    });
  },
});
```

`queries`

<Tabs>
<Tab title="findOne.ts">

```ts
schema.extendType({
  type: 'Query',
  definition(t) {
    t.field('findOneUser', {
      type: 'User',
      nullable: true,
      args: {
        where: schema.arg({
          type: 'UserWhereUniqueInput',
          nullable: false,
        }),
      },
      resolve(_parent, { where }, { prisma, select }) {
        return prisma.user.findOne({
          where,
          ...select,
        })
      },
    })
  },
})
```

</Tab>
<Tab title="findMany.ts">

```ts
schema.extendType({
  type: 'Query',
  definition(t) {
    t.field('findManyUser', {
      type: 'User',
      nullable: true,
      list: true,
      args: {
        where: 'UserWhereInput',
        orderBy: 'UserOrderByInput',
        cursor: 'UserWhereUniqueInput',
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
  },
})

```

</Tab>
<Tab title="findCount.ts">

```ts
schema.extendType({
  type: 'Query',
  definition(t) {
    t.field('findManyUserCount', {
      type: 'Int',
      args: {
        where: 'UserWhereInput',
        orderBy: 'UserOrderByInput',
        cursor: 'UserWhereUniqueInput',
        skip: 'Int',
        take: 'Int',
      },
      resolve(_parent, args, { prisma }) {
        return prisma.user.count(args)
      },
    })
  },
})

```

</Tab>
</Tabs>


`mutations`

<Tabs>
<Tab title="createOne.ts">

```ts
schema.extendType({
  type: 'Mutation',
  definition(t) {
    t.field('createOneUser', {
      type: 'User',
      nullable: false,
      args: {
        data: schema.arg({
          type: 'UserCreateInput',
          nullable: false,
        }),
      },
      resolve(_parent, { data }, { prisma, select }) {
        return prisma.user.create({
          data,
          ...select,
        })
      },
    })
  },
})

```

</Tab>
<Tab title="deleteOne.ts">

```ts
schema.extendType({
  type: 'Mutation',
  definition(t) {
    t.field('deleteOneUser', {
      type: 'User',
      nullable: true,
      args: {
        where: schema.arg({
          type: 'UserWhereUniqueInput',
          nullable: false,
        }),
      },
      resolve: async (_parent, { where }, { prisma, select }) => {
        await prisma.onDelete({ model: 'User', where })
        return prisma.user.delete({
          where,
          ...select,
        })
      },
    })
  },
})

```

</Tab>
<Tab title="updateOne.ts">

```ts
schema.extendType({
  type: 'Mutation',
  definition(t) {
    t.field('updateOneUser', {
      type: 'User',
      nullable: false,
      args: {
        where: schema.arg({
          type: 'UserWhereUniqueInput',
          nullable: false,
        }),
        data: schema.arg({
          type: 'UserUpdateInput',
          nullable: false,
        }),
      },
      resolve(_parent, { data, where }, { prisma, select }) {
        return prisma.user.update({
          where,
          data,
          ...select,
        })
      },
    })
  },
})

```

</Tab>
<Tab title="upsertOne.ts">

```ts
schema.extendType({
  type: 'Mutation',
  definition(t) {
    t.field('upsertOneUser', {
      type: 'User',
      nullable: false,
      args: {
        where: schema.arg({
          type: 'UserWhereUniqueInput',
          nullable: false,
        }),
        create: schema.arg({
          type: 'UserCreateInput',
          nullable: false,
        }),
        update: schema.arg({
          type: 'UserUpdateInput',
          nullable: false,
        }),
      },
      resolve(_parent, args, { prisma, select }) {
        return prisma.user.upsert({
          ...args,
          ...select,
        })
      },
    })
  },
})
```

</Tab>
<Tab title="deleteMany.ts">

```ts
schema.extendType({
  type: 'Mutation',
  definition(t) {
    t.field('deleteManyUser', {
      type: 'BatchPayload',
      args: {
        where: schema.arg({
          type: 'UserWhereInput',
          nullable: true,
        }),
      },
      resolve: async (_parent, { where }, { prisma }) => {
        await prisma.onDelete({ model: 'User', where })
        return prisma.user.deleteMany({ where })
      },
    })
  },
})

```

</Tab>
<Tab title="updateMany.ts">

```ts
schema.extendType({
  type: 'Mutation',
  definition(t) {
    t.field('updateManyUser', {
      type: 'BatchPayload',
      args: {
        where: schema.arg({
          type: 'UserWhereInput',
          nullable: true,
        }),
        data: schema.arg({
          type: 'UserUpdateManyMutationInput',
          nullable: false,
        }),
      },
      resolve(_parent, args, { prisma }) {
        return prisma.user.updateMany(args)
      },
    })
  },
})

```

</Tab>
</Tabs>

</MdxCard>


<MdxCard>

## `nexus-schema` generator output code

To understand this code structure please look to [Nexus schema Docs](https://www.nexusjs.org/#/components/schema/api/index)

`type.ts`

```ts
import { objectType } from '@nexus/schema';

export const User = objectType({
  name: 'User',
  definition(t) {
    t.int('id', { nullable: false });
    t.string('email', { nullable: false });
    t.string('name', { nullable: true });
    t.field('posts', {
      nullable: false,
      list: [true],
      type: 'Post',
      args: {
        where: 'PostWhereInput',
        orderBy: 'PostOrderByInput',
        cursor: 'PostWhereUniqueInput',
        take: 'Int',
        skip: 'Int',
      },
      resolve(parent: any) {
        return parent['posts'];
      },
    });
  },
});
```

`queries`

<Tabs>
<Tab title="findOne.ts">

```ts
import { queryField, arg } from '@nexus/schema'

export const UserFindOneQuery = queryField('findOneUser', {
  type: 'User',
  nullable: true,
  args: {
    where: arg({
      type: 'UserWhereUniqueInput',
      nullable: false,
    }),
  },
  resolve(_parent, { where }, { prisma, select }) {
    return prisma.user.findOne({
      where,
      ...select,
    })
  },
})
```

</Tab>
<Tab title="findMany.ts">

```ts
import { queryField } from '@nexus/schema'

export const UserFindManyQuery = queryField('findManyUser', {
  type: 'User',
  nullable: true,
  list: true,
  args: {
    where: 'UserWhereInput',
    orderBy: 'UserOrderByInput',
    cursor: 'UserWhereUniqueInput',
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
import { queryField } from '@nexus/schema'

export const UserFindManyCountQuery = queryField('findManyUserCount', {
  type: 'Int',
  args: {
    where: 'UserWhereInput',
    orderBy: 'UserOrderByInput',
    cursor: 'UserWhereUniqueInput',
    skip: 'Int',
    take: 'Int',
  },
  resolve(_parent, args, { prisma }) {
    return prisma.user.count(args)
  },
})

```

</Tab>
</Tabs>


`mutations`

<Tabs>
<Tab title="createOne.ts">

```ts
import { mutationField, arg } from '@nexus/schema'

export const UserCreateOneMutation = mutationField('createOneUser', {
  type: 'User',
  nullable: false,
  args: {
    data: arg({
      type: 'UserCreateInput',
      nullable: false,
    }),
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
import { mutationField, arg } from '@nexus/schema'

export const UserDeleteOneMutation = mutationField('deleteOneUser', {
  type: 'User',
  nullable: true,
  args: {
    where: arg({
      type: 'UserWhereUniqueInput',
      nullable: false,
    }),
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
import { mutationField, arg } from '@nexus/schema'

export const UserUpdateOneMutation = mutationField('updateOneUser', {
  type: 'User',
  nullable: false,
  args: {
    where: arg({
      type: 'UserWhereUniqueInput',
      nullable: false,
    }),
    data: arg({
      type: 'UserUpdateInput',
      nullable: false,
    }),
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
import { mutationField, arg } from '@nexus/schema'

export const UserUpsertOneMutation = mutationField('upsertOneUser', {
  type: 'User',
  nullable: false,
  args: {
    where: arg({
      type: 'UserWhereUniqueInput',
      nullable: false,
    }),
    create: arg({
      type: 'UserCreateInput',
      nullable: false,
    }),
    update: arg({
      type: 'UserUpdateInput',
      nullable: false,
    }),
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
import { mutationField, arg } from '@nexus/schema'

export const UserDeleteManyMutation = mutationField('deleteManyUser', {
  type: 'BatchPayload',
  args: {
    where: arg({
      type: 'UserWhereInput',
      nullable: true,
    }),
  },
  resolve: async (_parent, { where }, { prisma }) => {
    await prisma.onDelete({ model: 'User', where })
    return prisma.user.deleteMany({ where })
  },
})


```

</Tab>
<Tab title="updateMany.ts">

```ts
import { mutationField, arg } from '@nexus/schema'

export const UserUpdateManyMutation = mutationField('updateManyUser', {
  type: 'BatchPayload',
  args: {
    where: arg({
      type: 'UserWhereInput',
      nullable: true,
    }),
    data: arg({
      type: 'UserUpdateManyMutationInput',
      nullable: false,
    }),
  },
  resolve(_parent, args, { prisma }) {
    return prisma.user.updateMany(args)
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
    


### nexus

`server.ts`

```ts
import { use } from 'nexus';
import { paljs } from 'nexus-plugin-paljs';

use(paljs());
```

### nexus schema

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
schema.extendType({
  type: 'Query',
  definition(t) {
    t.field('findOneUser', {
      type: 'User',
      nullable: true,
      args: {
        where: schema.arg({
          type: 'UserWhereUniqueInput',
          nullable: false,
        }),
      },
      resolve(_, { where }, { prisma, select }) {
        return prisma.user.findOne({
          where,
          ...select,
        });
      },
    });
  },
});
```

</MdxCard>
