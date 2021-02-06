import SEO from 'src/components/SEO';
import MdxCard from 'src/components/MdxCard';

<SEO title="Prisma admin table" description="Auto Generate your React Admin panel for Prisma projects In minutes" />

<MdxCard>

## Introduction

[![Version](https://img.shields.io/npm/v/@paljs/admin.svg)](https://npmjs.org/package/@paljs/admin)
[![Downloads/total](https://img.shields.io/npm/dt/@paljs/admin.svg)](https://npmjs.org/package/@paljs/admin)
[![License](https://img.shields.io/npm/l/@paljs/admin.svg)](https://paljs.com/)

We try to build Prisma db CRUD tables with ability to customize this tables with beautiful UI.

> NOTE: We have already Full stack projects [With NextJS and GatsbyJS](/cli/create)

**Install**

```shell
yarn add @paljs/admin
or
npm i @paljs/admin
```

**CONTENT**

- [Online Demo](https://prisma-admin.paljs.com)
- [Settings](#settings)
  - [Add graphql queries and mutation](#add-graphql-queries-and-mutation)
  - [Add Settings React Component](#add-settings-react-component)
    - [Models card](#models-card)
    - [Fields Accordions](#fields-accordions)
- [Prisma table](#prisma-table)
  - [Using with NextJS](#using-with-nextjs)
  - [Using with GatsbyJS](#using-with-gatsbyjs)
  - [Props](#props)
  - [Add pages to menu](#add-pages-to-menu)
  - [How to add and update list values?](#how-to-add-and-update-list-values)

</MdxCard>

<MdxCard>

## Settings

To be able to custom your tables you need to generate `adminSettings.json` file and use it as DB to get table settings from it.

**Generate settings schema**

1- with our cli `pal g`

add in your `pal.js` config file this settings

```
frontend: {
  admin: true,
},
```

2- with code use our [`UIGenerator`](/generator#uigenerator) class

### Add graphql queries and mutation

To be able to update `adminSettings.json` file with your custom setting in a beautiful UI you have to add 1 query to pull schema in frontend and 2 mutations one for an update model settings and other for update field.

If you use `Nexus` all you need to be sure you added [nexus-paljs](/generator/nexus#add-paljs-plugin) plugin in your backend

If you use another way you need to add these resolvers and typeDev to your backend graphql schema

```shell
yarn add lowdb
```

1- create resolver file and add

```ts
import low from 'lowdb';
import FileSync from 'lowdb/adapters/FileSync';

const adapter = new FileSync<{
  [key: string]: { [key: string]: { [key: string]: any }[] }[];
}>('prisma/adminSettings.json');
const db = low(adapter);

export default {
  Query: {
    getSchema: () => {
      return db.value();
    },
  },
  Mutation: {
    updateModel: (_parent, { id, data }) => {
      return db.get('models').find({ id }).assign(data).write();
    },
    updateField: (_parent, { id, modelId, data }) => {
      return db.get('models').find({ id: modelId }).get('fields').find({ id }).assign(data).write();
    },
  },
};
```

2- create typeDefs file and add

```ts
import gql from 'graphql-tag';

export default gql`
  type Schema {
    enums: [Enum!]!
    models: [Model!]!
  }

  type Query {
    getSchema: Schema!
  }

  type Mutation {
    updateField(data: UpdateFieldInput, id: String!, modelId: String!): Field!
    updateModel(data: UpdateModelInput, id: String!): Model!
  }

  type Enum {
    fields: [String!]!
    name: String!
  }

  type Model {
    create: Boolean!
    delete: Boolean!
    displayFields: [String!]!
    fields: [Field!]!
    id: String!
    idField: String!
    name: String!
    update: Boolean!
  }

  type Field {
    create: Boolean!
    editor: Boolean!
    filter: Boolean!
    id: String!
    isId: Boolean!
    kind: KindEnum!
    list: Boolean!
    name: String!
    order: Int!
    read: Boolean!
    relationField: Boolean
    required: Boolean!
    sort: Boolean!
    title: String!
    type: String!
    unique: Boolean!
    update: Boolean!
  }

  input UpdateFieldInput {
    create: Boolean
    editor: Boolean
    filter: Boolean
    id: String
    isId: Boolean
    kind: KindEnum
    list: Boolean
    name: String
    order: Int
    read: Boolean
    relationField: Boolean
    required: Boolean
    sort: Boolean
    title: String
    type: String
    unique: Boolean
    update: Boolean
  }

  input UpdateModelInput {
    create: Boolean
    delete: Boolean
    displayFields: [String!]
    fields: [UpdateFieldInput!]
    idField: String
    name: String
    update: Boolean
  }
  enum KindEnum {
    enum
    object
    scalar
  }
`;
```

### Add Settings React Component

You have `Settings` react component to change your tables settings.

> NOTE: You must add this component under [@paljs/ui Layout Component](/ui/components/layout) like we use in our examples.
> Because we use themes and components from @paljs/ui package to render our settings component

> NOTE: You must add this component under `ApolloProvider` component because we use `@apollo/client` to query and update settings.

Now you can add our component to any page like this.

```jsx{2,6}
import React from 'react';
import { Settings } from '@paljs/admin';

export default function SettingsPage() {
  // Settings component not have any props
  return <Settings />;
}
```

When you open this in your browser will get it like this image.

<img src="/settings.png" alt="settings" />

#### Models card

- **Models select menu:** to change between your schema models.
- **Database Name:** your original Model name like your schema.prisma.
- **Display Name:** Model name to display in model table page.
- **Id field:** field that have `@id` attribute in your model.
- **Display Fields** you can select one or more to display in relation tables.
- **Actions** add actions to your table create, update and delete.

#### Fields Accordions

**order** you can sort this fields in table view, update form and create form by Drag and Drop.

Every field has Accordion with this content:

- **Database Name:** your original Field name like your schema.prisma.
- **Display Name:** it will display into table page, update form and create form.
- **Actions**
  - **read** show this field in table view.
  - **create** show this field in create record form.
  - **update** show this field in update record form.
  - **filter** add filter option to this field in table if read checked.
  - **sort** add sortBy option to this field in table if read checked.
  - **editor** convert update and create input type to use quill editor or any custom editor you will add.
  - **upload** use the `Upload` component in the update and create. You must send this component into `formInputs` prop because we do not have any default one for this option.

</MdxCard>

<MdxCard>

## Prisma table

React component to list, create, update and delete your model data.

> NOTE: You must add this component under [@paljs/ui Layout Component](/ui/components/layout) like we use in our examples.
> Because we use themes and components from @paljs/ui package to render our settings component

> NOTE: This component use 3 queries (findUnique, findMany, findManyCount) and 3 mutations (createOne, updateOne, deleteOne) be sure to add them in your backend by using our CLI [`pal generate`](/cli/generator)

<img src="/table.png" alt="table" />

### Using with NextJS

Adding style to `_app.tsx` file.

`src/pages/_app.tsx`

```js
import 'react-quill/dist/quill.snow.css';
import 'react-datepicker/dist/react-datepicker.css';
```

`src/Components/PrismaTable.tsx`

```tsx{3,7}
import React from 'react';
import { useRouter } from 'next/router';
import { PrismaTable } from '@paljs/admin';

const Table: React.FC<{ model: string }> = ({ model }) => {
  const router = useRouter();
  return <PrismaTable model={model} push={router.push} query={router.query} />;
};

export default Table;
```

### Using with GatsbyJS

`src/components/PrismaTable.tsx`

```tsx{2,14}
import React from 'react';
import { PrismaTable } from '@paljs/admin';
import { navigate } from 'gatsby';
import { useLocation } from '@reach/router';
import * as queryString from 'query-string';

// Adding this to import to style editor and date picker in forms
import 'react-quill/dist/quill.snow.css';
import 'react-datepicker/dist/react-datepicker.css';

const Table: React.FC<{ model: string }> = ({ model }) => {
  const location = useLocation();
  const query = queryString.parse(location.search);
  return <PrismaTable model={model} push={navigate} query={query} />;
};

export default Table;
```

### Props

Prisma Table has many props to can custom it like you want.

To customize [`tableColumns`](https://github.com/paljs/prisma-tools/blob/master/admin/src/PrismaTable/Table/Columns.tsx) and [`formInputs`](https://github.com/paljs/prisma-tools/blob/master/admin/src/PrismaTable/Form/Inputs.tsx) components you need to look to default components and have good react skills.

```ts{3,5,7,9,12,15,18,20,22,24-28,30,32,35,38,41}
interface ModelTableProps {
  // customize your table permissions and overwrite the settings it's allow you to give users different permissions
  actions?: ('create' | 'update' | 'delete')[];
  // model name like in `schema.prisma` file
  model: string;
  // push function to move between tables and change link
  push: (url: string) => void;
  // link query object used in filters `?id=1` => {id: 1}
  query: { [key: string]: any };
  // model pages path you must have all models pages in same path to can move between them.
  // default `/admin/models/`
  pagesPath?: string;
  // in table pagination you can select pageSize you can pass this options here.
  // default: [10, 20, 30, 40, 50, 100]
  pageSizeOptions?: number[];
  // moving between table pages. we not show you all available pages we just see current page and other 3 options.
  // default: 4
  paginationOptions?: number;
  // add a checkbox for every record on the table you can use for custom cases like delete many
  onSelect?: (values: any[]) => void;
  // this event call when you click cancel button in create record modal
  onCancelCreate?: (options: { model: string; setCreateModal: (state: boolean) => void }) => void;
  // this event call when you click save button in create record modal
  onSaveCreate?: (options: {
    model: string;
    setCreateModal: (state: boolean) => void;
    refetchTable: (options?: any) => void;
  }) => void;
  // this event call when you click cancel button in edit record page
  onCancelUpdate?: (options: { model: string }) => void;
  // this event call when you click save button in edit record page
  onSaveUpdate?: (options: { model: string; refetchTable: (options?: any) => void }) => void;
  // In create and update form when you click save this function will call before take every value to apollo mutation
  // Here we handle numbers list json values you can use it if you need to add any featuer
  valueHandler?: (value: string, field?: SchemaField, create?: boolean) => any;
  // it's function return object with react table columns https://github.com/tannerlinsley/react-table
  // default here: https://github.com/paljs/prisma-tools/blob/master/admin/src/PrismaTable/Table/Columns.tsx
  tableColumns?: GetColumnsPartial;
  // it's object with form input components for every field type we use this package https://react-hook-form.com/
  // default here: https://github.com/paljs/prisma-tools/blob/master/admin/src/PrismaTable/Form/Inputs.tsx
  formInputs?: Partial<FormInputs>;
}

type FormInputs = Record<'Default' | 'Editor' | 'Enum' | 'Object' | 'Date' | 'Boolean', React.FC<InputProps>>;

interface InputProps {
  field: SchemaField;
  value: any;
  data: any;
  error: any;
  // import { FormContextValues } from 'react-hook-form';
  register: FormContextValues['register'];
  setValue: FormContextValues['setValue'];
  getValues: FormContextValues['getValues'];
  watch: FormContextValues['watch'];
  disabled: boolean;
}

// import {Column,UseFiltersColumnOptions,UseSortByColumnOptions} from 'react-table';
type Columns = Record<
  'boolean' | 'number' | 'enum' | 'DateTime' | 'object' | 'string' | 'list',
  Column & UseFiltersColumnOptions<any> & UseSortByColumnOptions<any>
>;

export type GetColumnsPartial = (field: SchemaField, model?: SchemaModel) => Partial<Columns>;
```

## Generate pages

Now we need to generate a page for every model with our prisma table here `src/components/PrismaTable.tsx`.

You can add them manulay or use our cli `pal generate`

Add to your `pal.js` config file

```
frontend: {
  admin: boolean or object,
},
```

- Add true To generate pages with default settings
- you can customize it by add object with this proparty [AdminPagesOptions](/generator#adminpagesoptions)

### Add pages to menu

In my examples I use `Menu` component from `@paljs/ui` package.

Menu component accept array of items we will add our pages to this array.

In our examples you will find this file in this path `src/Layouts/Admin/menuItem.ts`

```ts
import { MenuItemType } from '@paljs/ui';

const items: MenuItemType[] = [
  { title: 'Home Page', icon: { name: 'home' }, link: { href: '/admin' } },
  {
    title: 'Models',
    icon: { name: 'layers-outline' },
    children: [
      { title: 'Users', link: { href: '/admin/models/User' } },
      {
        title: 'Posts',
        link: { href: '/admin/models/Post' },
      },
    ],
  },
];
export default items;
```

### How to add and update list values?

As we know we can use list values with prisma but how we work on this fields in admin forms

**Example**

```prisma

model SchemaModel {
  id            Int           @id @default(autoincrement())
  string        String[]
  integer       Int[]
  boolean       Boolean[]
  float         Float[]
  json          Json[]
  enums         FieldKind[]
}

enum FieldKind {
  object
  enum
  scalar
}
```

This fields inputs will ba as text type

- `Int[]` => `1,2,3,4` converted to `[1,2,3,4]`
- `Flout[]` => `1.2,2.3,3.5` converted to `[1.2,2.3,3.5 ]`
- `String[]` => `first,second` converted to `['first','second']`
- `Boolean[]` => `true,false` converted to `[true,false]`
- `enum[]` => `object,enum `converted to `['object','enum']`
- `Json[]` => `[{"first": 1},{"second": 2}] `we will pass value throught `JSON.parse()`

</MdxCard>
