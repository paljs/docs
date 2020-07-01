import React from 'react';
import Tooltip from '@paljs/ui/Tooltip';
import { Card, CardBody } from '@paljs/ui/Card';
import { Button } from '@paljs/ui/Button';
import { trigger } from '../shared';

function Trigger() {
  return (
    <Card size="Tiny">
      <header>Popover Trigger</header>
      <CardBody id="scrollTriggerId">
        {trigger.map((trigger) => (
          <Tooltip
            key={trigger}
            eventListener="#scrollTriggerId"
            className="with-margin inline-block"
            trigger={trigger}
            placement="top"
            icon="home"
          >
            <Button fullWidth>{trigger}</Button>
          </Tooltip>
        ))}
      </CardBody>
    </Card>
  );
}

export default Trigger;
