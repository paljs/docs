import MdxCard from 'src/components/MdxCard';

<MdxCard>

## Menu

Vertical menu component.

Accepts a list of menu items and renders them accordingly. Supports multi-level menus.

Basic example

[Basic](demo://Basic.tsx)

## Usage

```js
import { Menu } from '@paljs/ui/Menu';
```

```jsx{4}
import { Link } from 'gatsby';

function Layout() {
  return <Menu items={items} Link={Link} />;
}
```

Use menu Ref methods like this example:

[Ref](demo://Ref.tsx)

Pass `Sidebar` toggle method to menu to hide sidebar when click on link

```jsx
import React, { useRef } from 'react';

function Layout() {
  const sidebarRef = useRef();

  return (
    <Sidebar ref={sidebarRef}>
      <Menu items={items} Link={Link} toggleSidebar={() => sidebarRef.current.hide()} />
    </Sidebar>
  );
}
```

</MdxCard>
