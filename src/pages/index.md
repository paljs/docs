import SEO from 'src/components/SEO';
import MdxCard from 'src/components/MdxCard';

<SEO title="Home Page" />

<MdxCard>

<img src="/header.png" alt="header" />

## Introduction

Pal.js stands for `I am your friend!`. It is a set of tools to help you bootstrap your next NodeJS, Prisma, GraphQL, React project. The library currently contains the following tools and examples:

**_Tools_**

- [`Prisma-select`](/plugins/select) - An extension to tackle down N+1 issues with better query construction using Prisma query engine.
- [`Prisma-delete`](/plugins/delete) - An extension on documenting prisma.schema on dealing with cascade deletes.
- [`Generator Class`](/generator) - Auto CRUD generations based on your prisma schema for SDL, Graphql-modules, and Nexus
- [`Prisma-Table`](/prisma-admin) - Front end components that interacts with pal.js auto generated mutation and queries.

[**_Examples_**](/cli/create#starter-examples)

- `full-stack-nextjs` - A full stack admin framework using nexus and next.js.
- `full-stack-gatsbyjs` - A full stack admin framework using nexus and gatsby.
- `apollo-nexus-schema` - A server side app that uses apollo-sever and nexus with pal.js auto generations.
- `nexus` - A server side app that uses nexus framework with pal.js auto generations.
- `apollo-sdl-first` - A server side app that uses sdl-first approach and apollo server with pal.js auto generations.
- `graphql-modules` - A server side app that uses apollo server and graphql-modules toolsets with pal.js auto generations.

## Requirements

To install `@paljs/cli` on your machine, make sure to have the following tools installed:

- Git - <https://git-scm.com>
- Node.js - <https://nodejs.org> Please note the **version** should be **>=12**
- Yarn - <https://classic.yarnpkg.com/en/docs/install> Node.js package manager, comes with Node.js.
- Prisma - [CLI](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-cli/installation) Modern Database Access for TypeScript & Node.js

## Install PalJS CLI

To install PalJS CLI globally on your machine, please run the commands below.

```shell
yarn global add @paljs/cli
//or
npm install -g @paljs/cli
```

## Create a new

```shell
> pal c


.______      ___       __             __       _______.
|   _  \    /   \     |  |           |  |     /       |
|  |_)  |  /  ^  \    |  |           |  |    |   (----`
|   ___/  /  /_\  \   |  |     .--.  |  |     \   \
|  |     /  _____  \  |  `----.|  `--'  | .----)   |
| _|    /__/     \__\ |_______| \______/  |_______/

✔ Please select your start example · full-stack-nextjs
❯ full-stack-nextjs
  full-stack-gatsbyjs
  apollo-nexus-schema
  nexus
  apollo-sdl-first
  graphql-modules

✔ please enter your project name · great-project
✔ please enter your project description · new NodeJs Prisma GraphQL TypeScript project
✔ please enter your project author · Ahmed Elywa
✔ please enter your project repository · https://github.com/paljs/prisma-tools
✔ please select your package manager · yarn
❯ yarn
  npm

✔ Skip package installation · no
❯ yes
  no
```

Will get 7 questions to help cli create what you want.

Look to our examples contains [here](/cli/create#starter-examples)

## Get your project up

1 Go inside your project dir

```shell
cd hello
```

Open `README.md` file to see next steps.

To build your `schema.prisma` file look [here](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-schema)

### Have questions?

Didn't find something here? Look through the [issues](https://github.com/paljs/prisma-tools/issues) or simply drop us a line at <hello@paljs.com>.

</MdxCard>
