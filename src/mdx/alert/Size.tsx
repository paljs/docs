import React from 'react';
import { Card, CardBody } from '@paljs/ui/Card';
import Alert from '@paljs/ui/Alert';
import { size } from '../shared';

function Accent() {
  return (
    <Card>
      <header>Alert Size</header>
      <CardBody>
        {size.map((key) => (
          <Alert key={key} size={key}>
            You have been successfully authenticated!
          </Alert>
        ))}
      </CardBody>
    </Card>
  );
}

export default Accent;
