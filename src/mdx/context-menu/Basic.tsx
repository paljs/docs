import React from 'react';
import ContextMenu from '@paljs/ui/ContextMenu';
import { Button } from '@paljs/ui/Button';
import { Link } from 'gatsby';
import { Location } from '@reach/router';

const getPathReady = (path: string) => {
  return path.endsWith('/') ? path.slice(0, -1) : path;
};

function Basic() {
  return (
    <Location>
      {({ location }) => (
        <ContextMenu
          className="with-margin inline-block"
          placement="bottom"
          items={[
            { title: 'Profile', link: { to: '/profile' } },
            { title: 'Log out', link: { to: '/logout' } },
          ]}
          currentPath={getPathReady(location.pathname)}
          Link={Link}
        >
          <Button fullWidth>Context Menu</Button>
        </ContextMenu>
      )}
    </Location>
  );
}

export default Basic;
