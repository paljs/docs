import React from 'react';
import { Tabs, Tab } from '@paljs/ui/Tabs';
import { Card } from '@paljs/ui/Card';

function Basic() {
  return (
    <Card>
      <Tabs>
        <Tab title="Tab 1">
          <h1>Content 1</h1>
        </Tab>
        <Tab title="Tab 2">
          <h1>Content 2</h1>
        </Tab>
        <Tab title="Tab 3">
          <h1>Content 3</h1>
        </Tab>
      </Tabs>
    </Card>
  );
}

export default Basic;
