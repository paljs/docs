import React from 'react';
import { Card, CardBody } from '@paljs/ui/Card';
import Alert from '@paljs/ui/Alert';
import { status } from '../shared';

function Status() {
  return (
    <Card>
      <header>Alert Status</header>
      <CardBody>
        {status.map((key) => (
          <Alert key={key} closable status={key}>
            You have been successfully authenticated!
          </Alert>
        ))}
      </CardBody>
    </Card>
  );
}

export default Status;
