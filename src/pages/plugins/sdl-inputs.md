import SEO from 'src/components/SEO';
import MdxCard from 'src/components/MdxCard';

<SEO title="Prisma GraphQL inputs type generator" description="Generate all Prisma inputs type for GraphQL" />

<MdxCard>

# GraphQL SDL inputs

Generate all Prisma inputs type for GraphQL

## Install

[![Version](https://img.shields.io/npm/v/@paljs/plugins.svg)](https://npmjs.org/package/@paljs/plugins)
[![Downloads/total](https://img.shields.io/npm/dt/@paljs/plugins.svg)](https://npmjs.org/package/@paljs/plugins)
[![License](https://img.shields.io/npm/l/@paljs/plugins.svg)](https://paljs.com/)

```shell
npm i @paljs/plugins
```

## use

```js
import { mergeTypeDefs } from '@graphql-tools/merge';
import { sdlInputs } from '@paljs/plugins';

export default mergeTypeDefs([sdlInputs(), ...customTypes]);
```

## api

`sdlInputs` function using a Prisma generated files `dmmf` to create `DocumentNode` have all your inputs type.

takes one arg: you can pass object of options.

#### example

```ts
interface OptionsType {
  // if you use a custom generated files path you need to import dmmf from this path and send to our function through this option.
  dmmf?: DMMF.Document;
  // by default when we create update inputs you will set data like {username: {set: "Ahmed"}} by making this option true you will be able to use it like {username: "Ahmed"} without set.
  // but you will also lose these options for number fields
  // increment: x: Adds x to the current value
  // decrement: x: Subtracts x from the current value
  // multiply: x: Multiplies the current value by x
  // divide: x: Divides the current value by x
  // set: x: Sets the value to x (equivalent to data: { age: 18 })
  doNotUseFieldUpdateOperationsInput?: boolean;
}

// example
import { dmmf } from './prismaCustomPath';
import { mergeTypeDefs } from '@graphql-tools/merge';
import { sdlInputs } from '@paljs/plugins';

export default mergeTypeDefs([sdlInputs({ dmmf }), ...customTypes]);
```

</MdxCard>
