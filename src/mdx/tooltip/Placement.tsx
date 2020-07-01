import React from 'react';
import Tooltip from '@paljs/ui/Tooltip';
import { Card, CardBody } from '@paljs/ui/Card';
import { Button } from '@paljs/ui/Button';
import { placement } from '../shared';

function Placement() {
  return (
    <Card size="Tiny">
      <header>Popover Placement</header>
      <CardBody id="scrollPlacementId">
        {placement.map((place) => (
          <Tooltip
            key={place}
            eventListener="#scrollPlacementId"
            className="with-margin inline-block"
            trigger="hint"
            placement={place}
            content="Hello"
            icon="home"
          >
            <Button fullWidth>{place}</Button>
          </Tooltip>
        ))}
      </CardBody>
    </Card>
  );
}

export default Placement;
