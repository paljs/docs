import MdxCard from 'src/components/MdxCard';
import SEO from 'src/components/SEO';

<SEO title="Start new Next.Js project" />

<MdxCard>

# Start new Next.Js project

Starting Pal.js UI from [nextjs-admin-template](https://github.com/paljs/nextjs-admin-template) starter kit is the easiest way to run your first Pal.js UI application.

Please note, that **nextjs-admin-template** is just a frontend application. Backend integration can be done relatively simple, but you should be aware that all the data is mocked using JavaScript objects.
If you want the data to be dynamic, you should consider developing a backend integration by your own.
The Pal.js UI team doesn't consider providing generic integration layer as a part of this project because every backend API has a different structure in terms of data format and URLs.

## Install tools

To install gatsby-admin-template on your machine you need to have the following tools installed:

- Git - <https://git-scm.com>
- Node.js - <https://nodejs.org> Please note the **version** should be **>=8**
- Npm - Node.js package manager, comes with Node.js. Please make sure npm **version** is **>=5**
- You might also need some specific native packages depending on your operating system like `build-essential` on Ubuntu

<div class="note note-warning">
  <div class="note-title">Warning!</div>
  <div class="note-body">
    Please note that <strong>it is not possible</strong> to build nextjs-admin-template
    <strong> without these tools</strong> and it will not be possible because of
    the way how React is built.
  </div>
</div>

## Download the code

When you completed tools setup, you need to download the code of **nextjs-admin-template** application. The easiest way to do that is to clone GitHub repository:

```bash
git clone https://github.com/paljs/nextjs-admin-template.git
```

After the clone completed, you need to install npm modules:

```bash
cd nextjs-admin-template && npm i || yarn
```

<div class="note note-warning">
  <div class="note-title">Warning!</div>
  <div class="note-body">
    Please make sure that installation process successfully completed without
    errors.
  </div>
</div>

## Run local copy

To run a local copy in development mode, execute:

```bash
npm run dev || yarn dev
```

Go to <http://localhost:3000> in your browser.

## Production bundle

To create a bundle in production mode, execute:

```bash
npm run build || yarn build
```

This will clear up your `.next` folder (where release files located) and generate a release build.
Now you can copy the sources from the `.next` folder and use it with any backend frameworks

</MdxCard>
