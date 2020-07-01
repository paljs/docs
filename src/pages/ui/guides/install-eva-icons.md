import MdxCard from 'src/components/MdxCard';
import SEO from 'src/components/SEO';

<SEO title="Install Eva Icons" />

<MdxCard>

## Eva Icons

In case you need to have more icons available, Pal.js UI provides a `@paljs/icons` pack with 480+ SVG icons.

Install the pack:

```bash
yarn add @paljs/icons
```

Or

```bash
npm i @paljs/icons
```

In your Layout page add icons to Layout component

```jsx{4}
    import icons from '@paljs/icons';

//...
<Layout windowMode evaIcons={icons}>
  <Header changeTheme={changeTheme} toggleSidebar={() => sidebarRef.current?.toggle()} />
  <LayoutContainer>
    <SidebarCustom ref={sidebarRef} />
    <LayoutContent>
      <LayoutColumns>
        <LayoutColumn className="main-content">{props.children}</LayoutColumn>
      </LayoutColumns>
      <LayoutFooter>Footer</LayoutFooter>
    </LayoutContent>
  </LayoutContainer>
</Layout>;
//...
```

</MdxCard>