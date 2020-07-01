import React from 'react';
import Popover  from '@paljs/ui/Popover';
import { Tabs, Tab } from '@paljs/ui/Tabs';
import { Card, CardBody } from '@paljs/ui/Card';
import { Button } from '@paljs/ui/Button';

function Component() {
  return (
    <Card size="Tiny">
      <header>Popover Component</header>
      <CardBody id="scrollTriggerId">
        <Popover
          className="with-margin inline-block"
          trigger="click"
          placement="top"
          overlay={
            <Tabs activeIndex={0} fullWidth>
              <Tab title="Tab 1" icon="home" responsive>
                Content 1
              </Tab>
              <Tab title="Tab 2" icon="star-outline" responsive>
                Content 2
              </Tab>
            </Tabs>
          }
        >
          <Button fullWidth>Tabs</Button>
        </Popover>
        <Popover
          className="with-margin inline-block"
          trigger="click"
          placement="top"
          overlay={
            <Card className="popover-card">
              <header>Hello!</header>
              <CardBody>Hello, how are you today?</CardBody>
            </Card>
          }
        >
          <Button fullWidth>Card</Button>
        </Popover>
      </CardBody>
    </Card>
  );
}

export default Component;
