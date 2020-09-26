import SEO from 'src/components/SEO';
import SelectExample from 'src/components/SelectExample';
import MdxCard from 'src/components/MdxCard';

<SEO title="Select Convert" />

<MdxCard>

## Prisma select

Prisma Select takes the `info: GraphQLResolveInfo` object in general graphql arguments (parent, args, context, info) to select object accepted by `prisma client`. The approach allows a better performance since you will only be using one resolver to retrieve all your request. By doing so, it also eliminates the `N + 1` issue.

**CONTENT**

- [Install](#install)
- [Normal Use](#normal-use)
- [Example query](#example-query)
- [Api](#api)
  - [constructor](#constructor)
  - [value](#value)
  - [value with filter](#valuewithfilter)
  - [valueOf](#valueof)
  - [mergeDeep](#mergedeep)
  - [filter](#filter)
    - [map models](#map-models)
- [Performance Example](#performance-example)
- [nexus-plugin](/generator/nexus#add-paljs-plugin)

</MdxCard>

<MdxCard>

## Install

[![Version](https://img.shields.io/npm/v/@paljs/plugins.svg)](https://npmjs.org/package/@paljs/plugins)
[![Downloads/week](https://img.shields.io/npm/dw/@paljs/plugins.svg)](https://npmjs.org/package/@paljs/plugins)
[![License](https://img.shields.io/npm/l/@paljs/plugins.svg)](https://paljs.com/)

```shell
npm i @paljs/plugins
```

## Normal Use

```ts
import { PrismaSelect } from '@paljs/plugins';

// normal resolver
const resolvers = {
  Query: {
    user(_parent, { where }, { prisma }, info) {
      const select = new PrismaSelect(info).value;
      return prisma.user.findOne({
        where,
        ...select,
      });
    },
  },
};
```

</MdxCard>
<SelectExample/>

<MdxCard>

## API

### constructor

Take three args:

- `info` : `GraphQLResolveInfo`
- `defaultFields` : you can pass object with your models and what the fields you need to include for every model even if user not requested in GraphQL query

```ts
const defaultFields = {
  User: { id: true, name: true },
  Type: { id: true, descriptionRaw: true },
  Post: { id: true, body: true },
};
```

- `mergeObject` : any object to merge with client requested fields good to always returned fixed data like `id`.

### Methods

#### value

Return your converted object.

**Example**

```ts
const select = new PrismaSelect(info).value;
```

#### valueWithFilter

function take 1 arg:

- `modelName`: Your schema model name to filter returned object and remove any field, not in your schema model

**Example**

```ts
const select = new PrismaSelect(info).valueWithFilter('User');
```

#### valueOf

function take 3 args:

- `field`: path to field you want inside type. You can deeb inside nested relation with this `user.posts.comments`
- `filterBy`: take schema Model name to filter returned object by his schema type
- `mergeObject` : like constructor you can pass here any object to merge with returned data.

**Example of use**

If We have a mutation called "login", which returns a non schema model type called `AuthPayload` that has a schema model type in it,

like the following example,

```graphql
type AuthPayload {
  token: String
  user: User
}
type Mutation {
  login(email: String!, password: String!): AuthPayload
}
```

Here's how the nested type, filter, and to merge custom object would look like.

```ts
const resolver = {
  Mutation: {
    login: (_parent, { email, password }, { prisma }: Context, info) => {
      const select = new PrismaSelect(info).valueOf('user', 'User', {}, { select: { id: true } });
      return {
        token: 'token',
        user: prisma.user.findOne({
          where: { email },
          ...select,
        }),
      };
    },
  },
};
```

### mergeDeep

This is a static method that you can use to merge our converted object with your custom object.

Also, you can use it to merge any object with another object.

You can use it if you pass select objects inside the context.

```js{4}
const resolvers = {
  Query: {
    user(_parent, { where }, { prisma, select }, info) {
      const mergedObject = PrismaSelect.mergeDeep(select, { select: { id: true } });
      return prisma.user.findOne({
        where,
        ...mergedObject,
      });
    },
  },
};
```

### filter

Prisma Select can also be used as a private method to filter your computed fields not included originally in your prisma schema. This feature gives you the ability to customize additional fields in the schema.

**_Example_**

```prisma
// prisma.schema
model User {
  id        Int      @default(autoincrement()) @id
  firstName      String
  lastName      String
}
```

```graphql
# graphql type
type User {
  id: Int
  firstName: String
  lastName: String
  fullName: String
}
```

By adding `firstName` and `lastName` to PrismaSelect in the user field of Query, and `fullName` in User, the client can request fullName directly.

```ts{8,19}
import { PrismaSelect } from '@prisma-tools/select';

const resolvers = {
  Query: {
    user(_parent, { where }, { prisma }, info) {
      // you can send { User: { firstName: true, lastName: true } } in second arg
      // or you can send { select: { firstName: true, lastName: true } } in third arg
      const select = new PrismaSelect(info, {}, { select: { firstName: true, lastName: true } }).value;
      return prisma.user.findOne({
        where,
        // this object must not have `fullName` because will throw error it's not in our db
        // So we have built in filter to remove any field not in our schema model
        ...select,
      });
    },
  },
  User: {
    fullName: (parent, args, { prisma }: Context) => {
      return parent.firstName + parent.lastName;
    },
  },
};
```

#### Map models

If You need to customize your graphql type and use any name instead of using a prisma model name, you can do this by adding a comment in your schema.prisma file before the model name like this example:

```prisma
/// @PrismaSelect.map([Account, Profile])
model User {
  id        Int      @default(autoincrement()) @id
  firstName      String
  lastName      String
}
```

Now you can create your GrqphQL types with name you provided and you will get filter by the model `User`

```graphql
type User {
  id: Int
  firstName: String
  lastName: String
}

type Account {
  id: Int
  firstName: String
  lastName: String
  fullName: String
}

type Profile {
  id: Int
  firstName: String
  lastName: String
  anyfield: String
}
```

</MdxCard>

<MdxCard>

## Performance Example

If we have a `Prisma Schema` with the models below.

```prisma
model User {
  id        Int       @default(autoincrement()) @id
  email     String    @unique
  password  String
  posts     Post[]
}

model Post {
  id        Int       @default(autoincrement()) @id
  published Boolean   @default(false)
  title     String
  author    User?     @relation(fields: [authorId], references: [id])
  authorId  Int?
  comments  Comment[]
}

model Comment {
  id        Int      @default(autoincrement()) @id
  contain   String
  post      Post     @relation(fields: [postId], references: [id])
  postId    Int
}
```

The normal `GraphQL Resolvers` to get one User will be like this:

```js
const resolvers = {
  Query: {
    findOneUser: (_parent, args, { prisma }) => {
      return prisma.user.findOne(args);
    },
  },
  User: {
    posts: (parent, args, { prisma }) => {
      return prisma.user.findOne({ where: { id: parent.id } }).posts(args);
    },
  },
  Post: {
    comments: (parent, args, { prisma }) => {
      return prisma.post.findOne({ where: { id: parent.id } }).comments(args);
    },
  },
};
```

Let me do GraphQL query to get one user with his posts and comments inside posts and see what is the result:

```graphql
{
  findOneUser(where: { id: 1 }) {
    id
    posts {
      id
      comments {
        id
      }
    }
  }
}
```

Even though we are only requesting ids in the query, the backend is doing 5 queries to select all the table fields as the log shows.

```
prisma:query SELECT `dev`.`User`.`id`, `dev`.`User`.`createdAt`, `dev`.`User`.`email`, `dev`.`User`.`name`, `dev`.`User`.`password`, `dev`.`User`.`groupId` FROM `dev`.`User` WHERE `dev`.`User`.`id` = ? LIMIT ? OFFSET ?
prisma:query SELECT `dev`.`User`.`id` FROM `dev`.`User` WHERE `dev`.`User`.`id` = ? LIMIT ? OFFSET ?
prisma:query SELECT `dev`.`Post`.`id`, `dev`.`Post`.`published`, `dev`.`Post`.`title`, `dev`.`Post`.`authorId`, `dev`.`Post`.`createdAt`, `dev`.`Post`.`updatedAt`, `dev`.`Post`.`authorId` FROM `dev`.`Post` WHERE `dev`.`Post`.`authorId` IN (?) LIMIT ? OFFSET ?
prisma:query SELECT `dev`.`Post`.`id` FROM `dev`.`Post` WHERE `dev`.`Post`.`id` IN (?,?,?) LIMIT ? OFFSET ?
prisma:query SELECT `dev`.`Comment`.`id`, `dev`.`Comment`.`contain`, `dev`.`Comment`.`postId`, `dev`.`Comment`.`authorId`, `dev`.`Comment`.`createdAt`, `dev`.`Comment`.`updatedAt`, `dev`.`Comment`.`postId` FROM `dev`.`Comment` WHERE `dev`.`Comment`.`postId` IN (?,?,?) LIMIT ? OFFSET ?
```

With PalJs's Tool `GraphQL Resolvers`:

```js
import { PrismaSelect } from '@paljs/plugins';

{
  Query: {
    findOneUser: (_parent, args, { prisma }, info) => {
      const select = new PrismaSelect(info).value;
      return prisma.user.findOne({
        ...args,
        ...select,
      });
    },
  },
}
```

When we do the same query:

```graphql
{
  findOneUser(where: { id: 1 }) {
    id
    posts {
      id
      comments {
        id
      }
    }
  }
}
```

According to this log, We only get 3 queries using our tool. By using Paljs,
we first query for all the relationship between models, then we select the `id` from db

```
prisma:query SELECT `dev`.`User`.`id` FROM `dev`.`User` WHERE `dev`.`User`.`id` = ? LIMIT ? OFFSET ?
prisma:query SELECT `dev`.`Post`.`id`, `dev`.`Post`.`authorId` FROM `dev`.`Post` WHERE `dev`.`Post`.`authorId` IN (?) LIMIT ? OFFSET ?
prisma:query SELECT `dev`.`Comment`.`id`, `dev`.`Comment`.`postId` FROM `dev`.`Comment` WHERE `dev`.`Comment`.`postId` IN (?,?,?) LIMIT ? OFFSET ?
```

</MdxCard>
