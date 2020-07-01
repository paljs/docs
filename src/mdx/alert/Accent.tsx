import React from 'react';
import { Card, CardBody } from '@paljs/ui/Card';
import Alert from '@paljs/ui/Alert';
import { status } from '../shared';

function Accent() {
  return (
    <Card>
      <header>Alert Accent</header>
      <CardBody>
        {status.map((key, index) => (
          <Alert key={index} accent={key} status={status[status.length - index]}>
            You have been successfully authenticated!
          </Alert>
        ))}
      </CardBody>
    </Card>
  );
}

export default Accent;
