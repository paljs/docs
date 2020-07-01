import MdxCard from 'src/components/MdxCard';
import SEO from 'src/components/SEO';

<SEO title="Start new project" />

<MdxCard>

# Start new project

If you don't have any code yet, please consider checking [Gatsby Cli](https://www.gatsbyjs.org/docs/quick-start) documentation for help to create your app.
In case you want to start based on our gatsby-admin-template starter kit, please check out [Based on Starter Kit (gatsby-admin-template)](/ui/guides/install-based-on-starter-kit) article.

<div class="note note-info">
  <div class="note-title">gatsby-admin-template custom components</div>
  <div class="note-body">
    Please note, this tutorial explains how to install Pal.js UI into your project
    including Theme System, Components. If you want to re-use any of gatsby-admin-template
    <strong> custom</strong> components (like Temperature Widget, Dashboard charts,
    etc) without using gatsby-admin-template itself, please follow this guide and in the end
    just copy any of gatsby-admin-template custom components you need into your project, register
    them in your modules and that's it.
  </div>
</div>

## Using Gatsby CLI

### Installation

We strongly recommend developing React with Gatsby CLI, you can install it with the following command.

```bash
npm install -g gatsby
```

```bash
yarn global add gatsby
```

### Create a New Project

A new project can be created using Gatsby CLI tools.

```bash
gatsby new project-name https://github.com/AhmedElywa/start-gatsby-with-oah-ui
```

if you need to add to your already project

```bash
npm i @paljs/ui styled-components
```

or

```bash
yarn add @paljs/ui styled-components
```

## Layout

This example of layout component with change theme and change direction will explain all the details in his section

```jsx
import React, { useState, useRef, Fragment } from 'react';
import { Link } from 'gatsby';
import { ThemeProvider } from 'styled-components';
import { createTheme } from '@paljs/theme';
import {
  Layout,
  LayoutHeader,
  LayoutContent,
  LayoutFooter,
  LayoutContainer,
  LayoutColumns,
  LayoutColumn,
  ButtonLink,
  Sidebar,
  SidebarBody,
  Menu,
} from '@paljs/ui';

import menuItems from './menuItem';
import SimpleLayout from './SimpleLayout';

export default function LayoutPage(props) {
  const [theme, setTheme] = useState('default');
  const [dir, setDir] = useState('ltr');
  const sidebarRef = useRef();
  const menuRef = useRef();

  // Change theme
  const changeTheme = (newTheme) => {
    setTheme(newTheme);
  };
  // Change Direction from Ltr to Rtl
  const changeDir = () => {
    const newDir = dir === 'ltr' ? 'rtl' : 'ltr';
    setDir(newDir);
  };

  return (
    <ThemeProvider theme={createTheme(theme, { dir, fontSize: '2rem', fontMain: 'font family' })}>
      <Fragment>
        <SimpleLayout />
        <Layout dir={dir} windowMode>
          <LayoutHeader fixed>Header</LayoutHeader>
          <LayoutContainer>
            <Sidebar ref={sidebarRef} property="start" containerFixed responsive>
              <header>sidebar header</header>
              <SidebarBody>
                <Menu
                  className="sidebar-menu"
                  Link={Link}
                  ref={menuRef}
                  items={menuItems}
                  toggleSidebar={() => sidebarRef.current.hide()}
                />
              </SidebarBody>
            </Sidebar>
            <LayoutContent>
              <LayoutColumns>
                <LayoutColumn>{props.children}</LayoutColumn>
              </LayoutColumns>
              <LayoutFooter>Footer</LayoutFooter>
            </LayoutContent>
          </LayoutContainer>
        </Layout>
      </Fragment>
    </ThemeProvider>
  );
}
```

</MdxCard>
